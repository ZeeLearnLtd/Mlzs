import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Config } from '../config';
import { RES, toFormat } from '../resources';
import { IListParams } from './models';


@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private _jsonSnippet!: HTMLScriptElement;
  _metadata!: MetaDefinition[];
  private _graphObjects: any[] = [];

  private _canonicalLink!: HTMLLinkElement;
  private _alternateLinks: HTMLLinkElement[] = [];

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {
    // ad fixed tags
    this.AddTags();
  }

  AddTags() {
    // get fixed tags and add, always check since we have inhertited services
    // add tags
    let seoobj = [];

    // add canonical link
    const _canonical = this.doc.querySelector('link[rel="canonical"]');
    this._canonicalLink =
      (_canonical as HTMLLinkElement) || this.createCanonicalLink();

    // add alternate language, one at a time, here
    const _links = this.doc.querySelectorAll('link[rel="alternate"]');
    if (_links.length > 0) {
      this._alternateLinks = Array.from(_links) as HTMLLinkElement[];
    } else {
      this._alternateLinks = Config.Seo.hrefLangs.map((n) =>
        this.createAlternateLink()
      );
    }

    // create the initial ld+json script
    this._jsonSnippet =
      this.doc.querySelector('script[type="application/ld+json"]') ||
      this.createJsonSnippet();
  }
  get url(): string {
    let url = this.doc.location.pathname;
    if (url.indexOf(';') > -1) {
      url = url.substring(0, url.indexOf(';'));
    }
    return url;
  }

  get defaultUrl(): string {
    return toFormat(
      Config.Seo.baseUrl,
      Config.Seo.defaultRegion,
      Config.Seo.defaultLanguage,
      ''
    );
  }
  get siteUrl(): string {
    return toFormat(
      Config.Seo.baseUrl,
      Config.Basic.region,
      Config.Basic.language,
      ''
    );
  }

  /**** the private functions  ****/
  private createAlternateLink(): HTMLLinkElement {
    // append alternate link to body
    const _link = this.doc.createElement('link');
    _link.setAttribute('rel', 'alternate');
    this.doc.head.appendChild(_link);
    return _link;
  }

  private createCanonicalLink(): HTMLLinkElement {
    // append canonical to body
    const _canonicalLink = this.doc.createElement('link');
    _canonicalLink.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(_canonicalLink);

    return _canonicalLink;
  }

  private createJsonSnippet(): HTMLScriptElement {
    // if on browser platform, return
    const _script = this.doc.createElement('script');
    // set attribute to application/ld+json
    _script.setAttribute('type', 'application/ld+json');

    // append and return reference
    this.doc.body.appendChild(_script);
    return _script;
  }

  /*** the protected functions ***/
  protected setUrl(params?: IListParams) {
    // prefix with baseUrl and remove language, but not in development
    const path = this.doc.location.pathname.substring(
      environment.production ? 4 : 1
    );

    let url = this.defaultUrl;

    if (url.indexOf(';') > -1) {
      url = url.substring(0, url.indexOf(';'));
    }
    // if category or page exist, append them as query params
    // or matrix params, that should be okay, but not wise
    if (params) {
      const s = new URLSearchParams();
      if (params.category != undefined) {
        let k = params.category.key!;
        params.category && s.append('category', k);
        params.page && s.append('page', params.page.toString());
        url += '?' + s.toString();
      }
    }

    // set attribute and og:url
    this._canonicalLink.setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });

    this.setAlternateLinks(path);
  }

  protected setAlternateLinks(path: string) {
    // for each config hrefLang, set the link that already exists
    Config.Seo.hrefLangs.forEach((n, i) => {
      // what is the right language
      let lang = n.language;
      if (lang === 'x-default') lang = Config.Seo.defaultLanguage;

      // construct the url
      const url = toFormat(
        Config.Seo.baseUrl,
        n.region || Config.Seo.defaultRegion,
        lang,
        path
      );

      // construct hreflang
      const hreflang = n.language + (n.region ? '-' + n.region : '');
      this._alternateLinks[i].setAttribute('href', url);
      this._alternateLinks[i].setAttribute('hreflang', hreflang);
    });
  }
  protected setkeyword(keyword: string) {
    //this._canonicalLink.setAttribute('href', url);
    this.meta.updateTag({ name: 'keywords', content: keyword });
  }
  protected setcurl(url: string) {
    this._canonicalLink.setAttribute('href', url);
    this._alternateLinks[0].setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });
  }
  protected setTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({
      property: 'og:title',
      content: title,
    });
    this.meta.updateTag({ property: 'twitter:title', content: title });
  }
  protected setDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      property: 'og:description',
      content: description,
    });
    this.meta.updateTag({
      property: 'twitter:card',
      content: description,
    });
  }

  protected setImage(imageUrl?: string) {
    // prepare image, either passed or
    const _imageUrl = imageUrl || Config.Seo.defaultImage;

    this.meta.updateTag({
      name: 'image',
      property: 'og:image',
      content: _imageUrl,
    });
    this.meta.updateTag({ property: 'og:image', content: _imageUrl });
    this.meta.updateTag({ property: 'twitter:image', content: _imageUrl });
  }

  protected updateJsonSnippet(schema: any) {
    // if on briwser platform return
    // first find the graph objects then append to it
    const found = this._graphObjects.findIndex(
      (n) => n['@type'] === schema['@type']
    );
    if (found > -1) {
      this._graphObjects[found] = schema;
    } else {
      this._graphObjects.push(schema);
    }

    const _graph = {
      '@context': 'https://schema.org',
      '@graph': this._graphObjects,
    };
    this._jsonSnippet.textContent = JSON.stringify(_graph);
  }

  protected emptyJsonSnippet() {
    // sometimes, in browser platform, we need to empty objects first
    this._graphObjects = [];
  }

  /*** public and shared methods ***/
  setPage(title: string) {
    // set to title if found, else fall back to default
    this.setTitle(RES.DEFAULT_PAGE_TITLE);

    // aslo reset canonical
    this.setUrl();
  }
}
