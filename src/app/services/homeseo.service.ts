import { Injectable } from '@angular/core';
import { Config } from '../config';
import { RES } from '../resources';
import { SeoService } from './SeoService';

@Injectable({
  providedIn: 'root',
})
export class HomeSeoService extends SeoService {
  setHome() {
    // first empty
    this.emptyJsonSnippet();
    // add json snippet on homepage, for Logo and Search action
    this.updateJsonSnippet({
      '@type': 'Organization',
      url: this.defaultUrl,
      logo: Config.Seo.logoUrl,
      name: RES.SITE_NAME,
    });

    // also add search

    this.updateJsonSnippet({
      '@type': 'Website',
      url: this.defaultUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: this.defaultUrl + '?q={search_term}',
        },
        'query-input': 'required name=search_term',
      },
    });
  }
}
