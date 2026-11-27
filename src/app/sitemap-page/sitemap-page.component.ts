import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser,
  isPlatformServer
} from '@angular/common';

import {
  TransferState,
  makeStateKey
} from '@angular/core';

import { Router } from '@angular/router';
import { CommonService } from '../components/service/common.service';

import { take } from 'rxjs/operators';

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

const SITEMAP_STATE_KEY =
  makeStateKey<FlatSitemapItem[]>('dynamic-sitemap-items');

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap-page.component.html',
  styleUrls: ['./sitemap-page.component.css']
})
export class SitemapComponent implements OnInit {

  sitemapCategories: SitemapCategory[] = [];

  isLoading = true;
  hasError = false;
  searchQuery = '';

  private readonly isBrowser: boolean;
  private readonly isServer: boolean;

  // Replace with your actual production domain.
  private readonly productionOrigin = 'https://YOUR-DOMAIN.com';

  constructor(
    private apiservice: CommonService,
    private router: Router,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit(): void {
    this.fetchSitemap();
  }

  private getOrigin(): string {
    return this.isBrowser
      ? window.location.origin
      : this.productionOrigin;
  }

  fetchSitemap(): void {
    this.isLoading = true;
    this.hasError = false;

    // Use data already fetched during SSR.
    if (this.transferState.hasKey(SITEMAP_STATE_KEY)) {
      const items = this.transferState.get(SITEMAP_STATE_KEY, []);
      this.transferState.remove(SITEMAP_STATE_KEY);
      this.applySitemap(items);
      return;
    }

    this.apiservice.getsitemapurls()
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          const items: FlatSitemapItem[] = Array.isArray(response)
            ? response
            : Array.isArray(response?.data)
              ? response.data
              : [];

          if (!Array.isArray(response) && !Array.isArray(response?.data)) {
            console.error('Invalid sitemap API response:', response);
            this.sitemapCategories = [];
            this.hasError = true;
            this.isLoading = false;
            return;
          }

          // Serialize the API data into the HTML for hydration.
          if (this.isServer) {
            this.transferState.set(SITEMAP_STATE_KEY, items);
          }

          this.applySitemap(items);
        },
        error: (error: unknown) => {
          console.error('Error fetching sitemap:', error);
          this.sitemapCategories = [];
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  private applySitemap(items: FlatSitemapItem[]): void {
    this.sitemapCategories = this.groupSitemapData(items);
    this.isLoading = false;
    this.hasError = false;
  }

  private groupSitemapData(
    items: FlatSitemapItem[]
  ): SitemapCategory[] {
    if (!Array.isArray(items)) {
      return [];
    }

    const standardCategories: Record<string, SitemapLink[]> = {};
    const locationItems: FlatSitemapItem[] = [];

    items.forEach(item => {
      if (!item) {
        return;
      }

      const categoryName = (item.sitemap || '').trim().toLowerCase();
      const url = item.url || '';

      if (!url || categoryName === 'main') {
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
        url: this.cleanUrl(url),
        isExternal: /^https?:\/\//i.test(url)
      });
    });

    const result: SitemapCategory[] = Object.keys(standardCategories)
      .sort()
      .map(categoryName => ({
        categoryName,
        isNested: false,
        links: standardCategories[categoryName]
      }));

    const cityMap: Record<
      string,
      { cityUrl: string; links: SitemapLink[] }
    > = {};

    locationItems.forEach(item => {
      const url = item.url || '';

      try {
        const parsedUrl = new URL(url, this.getOrigin());
        const segments = parsedUrl.pathname.split('/').filter(Boolean);

        if (!segments.length) {
          return;
        }

        let city = '';
        let areaTitle = '';
        let isCityItself = false;
        let constructedCityUrl = '';

        const centerIndex = segments.findIndex(
          segment => segment.toLowerCase() === 'center'
        );

        if (centerIndex !== -1) {
          if (segments.length > centerIndex + 1) {
            city = segments[centerIndex + 1];

            if (segments.length === centerIndex + 2) {
              isCityItself = true;
            } else {
              areaTitle = segments[centerIndex + 2];
            }
          }

          const citySegments = segments.slice(0, centerIndex + 2);
          const tempUrl = new URL(parsedUrl);
          tempUrl.pathname = '/' + citySegments.join('/');
          tempUrl.search = '';
          tempUrl.hash = '';

          constructedCityUrl = /^https?:\/\//i.test(url)
            ? tempUrl.toString()
            : tempUrl.pathname;
        } else if (segments.length === 1) {
          city = segments[0];
          isCityItself = true;

          const tempUrl = new URL(parsedUrl);
          tempUrl.pathname = '/' + segments[0];
          tempUrl.search = '';
          tempUrl.hash = '';

          constructedCityUrl = /^https?:\/\//i.test(url)
            ? tempUrl.toString()
            : tempUrl.pathname;
        } else {
          city = segments[segments.length - 2];
          areaTitle = segments[segments.length - 1];

          const citySegments = segments.slice(0, -1);
          const tempUrl = new URL(parsedUrl);
          tempUrl.pathname = '/' + citySegments.join('/');
          tempUrl.search = '';
          tempUrl.hash = '';

          constructedCityUrl = /^https?:\/\//i.test(url)
            ? tempUrl.toString()
            : tempUrl.pathname;
        }

        if (!city || city.toLowerCase() === 'center') {
          return;
        }

        const formattedCity = this.toTitleCase(city);

        if (!cityMap[formattedCity]) {
          cityMap[formattedCity] = {
            cityUrl: constructedCityUrl,
            links: []
          };
        }

        const cleanedUrl = this.cleanUrl(url);

        if (isCityItself) {
          cityMap[formattedCity].cityUrl = cleanedUrl;
        } else if (areaTitle) {
          const title = item.title || this.toTitleCase(areaTitle);

          if (!cityMap[formattedCity].links.some(link => link.url === cleanedUrl)) {
            cityMap[formattedCity].links.push({
              title,
              url: cleanedUrl,
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
      .map(cityName => ({
        subCategoryName: cityName,
        cityUrl: cityMap[cityName].cityUrl || '#',
        links: cityMap[cityName].links
      }));

    if (subGroups.length) {
      result.push({
        categoryName: 'Location Hubs',
        isNested: true,
        subGroups
      });
    }

    return result;
  }

  private cleanUrl(url: string): string {
    if (!url || url === '#') {
      return '#';
    }

    try {
      const parsedUrl = new URL(url, this.getOrigin());

      const keysToDelete: string[] = [];

      parsedUrl.searchParams.forEach((_, key) => {
        if (['_gl', '_gcl', '_ga'].some(param => key.startsWith(param))) {
          keysToDelete.push(key);
        }
      });

      keysToDelete.forEach(key => parsedUrl.searchParams.delete(key));

      return /^https?:\/\//i.test(url)
        ? parsedUrl.toString()
        : parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
    } catch {
      return url;
    }
  }

  private toTitleCase(value: string): string {
    return value
      .replace(/-/g, ' ')
      .replace(/\b\w/g, letter => letter.toUpperCase());
  }

  private formatTitleFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url, this.getOrigin());
      const segments = parsedUrl.pathname.split('/').filter(Boolean);

      return segments.length
        ? this.toTitleCase(segments[segments.length - 1])
        : parsedUrl.hostname;
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
      .map(category => {
        if (category.isNested) {
          const filteredSubGroups = (category.subGroups || [])
            .map(subGroup => ({
              ...subGroup,
              links: subGroup.links.filter(link =>
                link.title.toLowerCase().includes(query) ||
                link.url.toLowerCase().includes(query)
              )
            }))
            .filter(subGroup =>
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
          links: (category.links || []).filter(link =>
            link.title.toLowerCase().includes(query) ||
            link.url.toLowerCase().includes(query)
          )
        };
      })
      .filter(category =>
        category.isNested
          ? (category.subGroups?.length || 0) > 0
          : (category.links?.length || 0) > 0
      );
  }

  navigateToUrl(
    url: string | undefined,
    isExternal: boolean | undefined,
    event: MouseEvent
  ): void {
    event.preventDefault();
    event.stopPropagation();

    const targetUrl = url || '#';

    if (targetUrl === '#') {
      return;
    }

    if (isExternal || /^https?:\/\//i.test(targetUrl)) {
      window.location.href = targetUrl;
    } else {
      void this.router.navigateByUrl(targetUrl);
    }
  }
}
