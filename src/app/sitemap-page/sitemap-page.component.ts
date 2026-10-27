import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../components/service/common.service';

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
  subCategoryName: string;
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
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sitemap-page.component.html',
  styleUrls: ['./sitemap-page.component.css']
})
export class SitemapComponent implements OnInit {

  sitemapCategories: SitemapCategory[] = [];

  isLoading = false;
  hasError = false;
  searchQuery = '';

  constructor(private apiservice: CommonService) { }

  ngOnInit(): void {
    this.fetchSitemap();
  }


  fetchSitemap(): void {
    this.isLoading = true;
    this.hasError = false;

    this.apiservice.getsitemapurls().subscribe({
      next: (response: any) => {
        console.log('Sitemap API response:', response);

        // Supports either { data: [...] } or a direct array response.
        const items = Array.isArray(response)
          ? response
          : response?.data;

        if (Array.isArray(items)) {
          this.sitemapCategories = this.groupSitemapData(items);
        } else {
          console.error('Invalid sitemap API response:', response);
          this.sitemapCategories = [];
          this.hasError = true;
        }

        this.isLoading = false;
      },

      error: (error: any) => {
        console.error('Error fetching sitemap:', error);

        this.sitemapCategories = [];
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  private groupSitemapData(
    items: FlatSitemapItem[]
  ): SitemapCategory[] {

    if (!Array.isArray(items)) {
      return [];
    }

    const standardCategories: Record<string, SitemapLink[]> = {};
    const locationItems: FlatSitemapItem[] = [];

    items.forEach((item) => {
      if (!item) {
        return;
      }

      const categoryName = (item.sitemap || '').trim().toLowerCase();
      const url = item.url || '';

      if (categoryName === 'main') {
        return;
      }

      if (
        categoryName === 'location' ||
        url.toLowerCase().includes('/center/')
      ) {
        locationItems.push(item);
        return;
      }

      const formattedCategory = item.sitemap
        ? item.sitemap.charAt(0).toUpperCase() + item.sitemap.slice(1)
        : 'Other';

      if (!standardCategories[formattedCategory]) {
        standardCategories[formattedCategory] = [];
      }

      standardCategories[formattedCategory].push({
        title: item.title || this.formatTitleFromUrl(url),
        url: url || '#',
        isExternal: /^https?:\/\//i.test(url)
      });
    });

    const result: SitemapCategory[] = Object.keys(standardCategories)
      .sort()
      .map((categoryName) => ({
        categoryName,
        isNested: false,
        links: standardCategories[categoryName]
      }));

    const cityMap: Record<
      string,
      { cityUrl: string; links: SitemapLink[] }
    > = {};

    locationItems.forEach((item) => {
      const url = item.url || '';

      try {
        const parsedUrl = new URL(url, window.location.origin);
        const segments = parsedUrl.pathname
          .split('/')
          .filter(Boolean);

        let city = '';
        let areaTitle = '';
        let isCityItself = false;

        const centerIndex = segments.findIndex(
          (segment) => segment.toLowerCase() === 'center'
        );

        if (centerIndex !== -1 && segments.length > centerIndex + 1) {
          city = segments[centerIndex + 1];

          if (segments.length === centerIndex + 2) {
            isCityItself = true;
          } else {
            areaTitle = segments[centerIndex + 2];
          }
        } else if (segments.length === 1) {
          city = segments[0];
          isCityItself = true;
        } else if (segments.length >= 2) {
          city = segments[segments.length - 2];
          areaTitle = segments[segments.length - 1];
        }

        if (!city || city.toLowerCase() === 'center') {
          return;
        }

        const formattedCity = this.toTitleCase(city);

        if (!cityMap[formattedCity]) {
          cityMap[formattedCity] = {
            cityUrl: '',
            links: []
          };
        }

        if (isCityItself) {
          cityMap[formattedCity].cityUrl = url;
        } else if (areaTitle) {
          const formattedArea = item.title || this.toTitleCase(areaTitle);

          const exists = cityMap[formattedCity].links.some(
            (link) => link.url === url
          );

          if (!exists) {
            cityMap[formattedCity].links.push({
              title: formattedArea,
              url,
              isExternal: false
            });
          }
        }
      } catch (error) {
        console.warn('Invalid sitemap URL:', url, error);
      }
    });

    const subGroups: CitySubGroup[] = Object.keys(cityMap)
      .sort()
      .map((cityName) => ({
        subCategoryName: cityName,
        cityUrl: cityMap[cityName].cityUrl || '#',
        links: cityMap[cityName].links
      }));

    if (subGroups.length > 0) {
      result.push({
        categoryName: 'Location Hubs',
        isNested: true,
        subGroups
      });
    }

    return result;
  }

  private toTitleCase(value: string): string {
    return value
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  private formatTitleFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url, window.location.origin);
      const segments = parsedUrl.pathname.split('/').filter(Boolean);

      if (segments.length > 0) {
        return this.toTitleCase(segments[segments.length - 1]);
      }

      return parsedUrl.hostname;
    } catch {
      return url;
    }
  }

  get filteredCategories(): SitemapCategory[] {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      return this.sitemapCategories;
    }

    return this.sitemapCategories
      .map((category) => {
        if (category.isNested) {
          const filteredSubGroups = (category.subGroups || [])
            .map((subGroup) => ({
              ...subGroup,
              links: subGroup.links.filter(
                (link) =>
                  link.title.toLowerCase().includes(query) ||
                  link.url.toLowerCase().includes(query)
              )
            }))
            .filter(
              (subGroup) =>
                subGroup.links.length > 0 ||
                subGroup.subCategoryName.toLowerCase().includes(query)
            );

          return {
            ...category,
            subGroups: filteredSubGroups
          };
        }

        return {
          ...category,
          links: (category.links || []).filter(
            (link) =>
              link.title.toLowerCase().includes(query) ||
              link.url.toLowerCase().includes(query)
          )
        };
      })
      .filter((category) =>
        category.isNested
          ? (category.subGroups?.length || 0) > 0
          : (category.links?.length || 0) > 0
      );
  }
}
