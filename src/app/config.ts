export const Config = {
  Basic: {
    // from environment or fed by server
    language: 'en',
    region: 'APAC',
  },
  Seo: {
    tags: [
      { property: 'og:site_name', content: 'Mlzs' },
      { property: 'og:type', content: 'website' },
      { property: 'twitter:site', content: '@Mlzs' },
      {
        property: 'twitter:card',
        content:
          'https://cdn.zeelearn.com/zeecms/mlzsWeb-assets/img/KidzeeFooterLogo_whiteText.png',
      },
      { property: 'twitter:creator', content: '@sekrabbin' },
      { name: 'author', content: 'Mlzs' },
    ],
    defaultImage:
      'https://cdn.zeelearn.com/zeecms/mlzsWeb-assets/img/KidzeeFooterLogo_whiteText.png',
    logoUrl:
      'https://cdn.zeelearn.com/zeecms/mlzsWeb-assets/img/KidzeeFooterLogo_whiteText.png',
    baseUrl: 'https://www.mountlitera.com/',
    defaultLanguage: 'en',
    defaultRegion: 'www',
    hrefLangs: [{ region: 'APAC', language: 'en' }, { language: 'x-default' }],
  },
};
