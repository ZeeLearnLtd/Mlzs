import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, catchError, of, map } from 'rxjs';
import { ApicallService } from 'src/app/services/apicall.service';
import { CommonService } from '../service/common.service';

export interface FlatSitemapItem {
  url: string;
  sitemap: string;
  title?: string; // Optional if your API provides it, or we can generate it
}

export interface FlatSitemapItem {
  url: string;
  sitemap: string;
  title?: string;
}

export interface SitemapLink {
  title: string;
  url: string;
  isExternal?: boolean;
}

export interface CitySubGroup {
  subCategoryName: string; // e.g., "Mumbai"
  cityUrl?: string;
  links: SitemapLink[];
}

export interface SitemapCategory {
  categoryName: string;
  isNested?: boolean;
  links?: SitemapLink[];
  subGroups?: CitySubGroup[];
}
@Component({
  selector: 'app-sitemap',
  templateUrl: './test-site-map.component.html',
  styleUrls: ['./test-site-map.component.css']
})
export class TestSitemapComponent implements OnInit {
  sitemapData$: Observable<SitemapCategory[]> | null = null;
  // sitemapData$: any = [];
  sitemapCategories: SitemapCategory[] = [];
  isLoading = true;
  hasError = false;
  searchQuery: string = '';

  // Replace with your actual API endpoint


  constructor(private apiservice: CommonService) { }

  ngOnInit(): void {
    this.fetchSitemap();
  }

  fetchSitemap() {
    this.isLoading = true;
    this.hasError = false;

    // this.apiservice.getsitemapurls().subscribe({
    //   next: (data) => {
    //     this.isLoading = false;
    //     this.sitemapData$ = data;
    //   },error: (error) => {
    //     console.error('Error fetching sitemap:', error);
    //     this.isLoading = false;
    //     this.hasError = true;
    //   }
    //  })
    this.apiservice.getsitemapurls().subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.sitemapCategories = this.groupSitemapData(data.data);
      },
      error: (error) => {
        console.error('Error fetching sitemap:', error);
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  private groupSitemapData(items: FlatSitemapItem[]): SitemapCategory[] {
    if (!Array.isArray(items)) {
      console.warn('Sitemap API response is not an array:', items);
      return [];
    }

    const standardCategories: Record<string, SitemapLink[]> = {};
    const locationItems: FlatSitemapItem[] = [];

    // Step 1: Filter out 'Main' and separate 'Location' items from other categories
    items.forEach((item) => {
      if (!item) return;
      const categoryName = (item.sitemap || '').trim().toLowerCase();

      // Skip 'Main' category entirely
      if (categoryName === 'main') {
        return;
      }

      // If it's a location item, store it separately so it can be cleaned/removed from Pages
      if (categoryName === 'location') {
        locationItems.push(item);
      } else {
        // Double-check: ensure location-like URLs aren't accidentally added here if mislabeled in API
        if (item.url && item.url.includes('/center/')) {
          locationItems.push(item);
          return;
        }

        const formattedCat = item.sitemap ? item.sitemap.charAt(0).toUpperCase() + item.sitemap.slice(1) : 'Other';

        if (!standardCategories[formattedCat]) {
          standardCategories[formattedCat] = [];
        }

        const title = item.title || this.formatTitleFromUrl(item.url);
        const isExternal = item.url ? item.url.startsWith('http://') || item.url.startsWith('https://') : false;

        standardCategories[formattedCat].push({
          title,
          url: item.url || '#',
          isExternal
        });
      }
    });

    const result: SitemapCategory[] = [];

    // Step 2: Add standard categories (Pages, Microsite, etc.)
    Object.keys(standardCategories).forEach((key) => {
      result.push({
        categoryName: key,
        isNested: false,
        links: standardCategories[key]
      });
    });

    // Step 3: Process Location items into hierarchical City -> Area structures (excluding 'General')
    if (locationItems.length > 0) {
      const cityMap: Record<string, { cityUrl: string; links: SitemapLink[] }> = {};

      locationItems.forEach((item) => {
        try {
          const parsedUrl = new URL(item.url);
          const segments = parsedUrl.pathname.split('/').filter(Boolean);

          let city = '';
          let areaTitle = '';
          let isCityItself = false;

          const centerIndex = segments.findIndex((s) => s.toLowerCase() === 'center');
          if (centerIndex !== -1 && segments.length > centerIndex + 1) {
            city = segments[centerIndex + 1];

            // Check if this item is the city itself (e.g., /center/mumbai)
            if (segments.length === centerIndex + 2) {
              isCityItself = true;
            } else if (segments.length > centerIndex + 2) {
              // This is an area inside the city (e.g., /center/mumbai/borivali)
              areaTitle = segments[centerIndex + 2];
            }
          } else if (segments.length === 1) {
            city = segments[0];
            isCityItself = true;
          } else if (segments.length >= 2) {
            city = segments[segments.length - 2];
            areaTitle = segments[segments.length - 1];
          }

          if (city && city.toLowerCase() !== 'center') {
            const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

            if (!cityMap[formattedCity]) {
              cityMap[formattedCity] = { cityUrl: '', links: [] };
            }

            if (isCityItself) {
              // Capture the actual API URL for the city itself
              cityMap[formattedCity].cityUrl = item.url;
            } else {
              // It's an area link
              const formattedArea = item.title || areaTitle.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
              const exists = cityMap[formattedCity].links.some(l => l.url === item.url);

              if (!exists) {
                cityMap[formattedCity].links.push({
                  title: formattedArea,
                  url: item.url,
                  isExternal: false
                });
              }
            }
          }
        } catch { }
      });

      const subGroups: CitySubGroup[] = Object.keys(cityMap)
        .sort()
        .map((cityName) => ({
          subCategoryName: cityName,
          cityUrl: cityMap[cityName].cityUrl || '#', // Fallback to '#' if no explicit city URL exists in API
          links: cityMap[cityName].links
        }));

      if (subGroups.length > 0) {
        result.push({
          categoryName: 'Location Hubs',
          isNested: true,
          subGroups: subGroups
        });
      }
    }

    return result;
  }

  private formatTitleFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      }
      return parsedUrl.hostname;
    } catch {
      return url;
    }
  }

  get filteredCategories(): SitemapCategory[] {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      return this.sitemapCategories;
    }

    const query = this.searchQuery.toLowerCase().trim();

    return this.sitemapCategories.map(category => {
      if (category.isNested) {
        const filteredSubGroups = category.subGroups?.map(sub => ({
          subCategoryName: sub.subCategoryName,
          links: sub.links.filter(link =>
            link.title.toLowerCase().includes(query) || link.url.toLowerCase().includes(query)
          )
        })).filter(sub => sub.links.length > 0 || sub.subCategoryName.toLowerCase().includes(query));

        return {
          ...category,
          subGroups: filteredSubGroups
        };
      } else {
        const filteredLinks = category.links?.filter(link =>
          link.title.toLowerCase().includes(query) || link.url.toLowerCase().includes(query)
        );

        return {
          ...category,
          links: filteredLinks
        };
      }
    }).filter(cat => {
      if (cat.isNested) {
        return cat.subGroups && cat.subGroups.length > 0;
      }
      return cat.links && cat.links.length > 0;
    });
  }
}