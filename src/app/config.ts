export const Config = {
  Basic: {
    // from environment or fed by server
    language: 'en',
    region: 'APAC',
  },
  Seo: {
    tags: [
      { property: 'og:site_name', content: 'Kidzee' },
      { property: 'og:type', content: 'website' },
      { property: 'twitter:site', content: '@Kidzee' },
      {
        property: 'twitter:card',
        content:
          'https://.kidzee.com/assets/img/KidzeeFooterLogo_whiteText.png',
      },
      { property: 'twitter:creator', content: '@sekrabbin' },
      { name: 'author', content: 'Kidzee' },
    ],
    defaultImage:
      'https://kidzee.com/assets/img/KidzeeFooterLogo_whiteText.png',
    logoUrl:
      'https://kidzee.com/assets/img/KidzeeFooterLogo_whiteText.png',
    baseUrl: 'https://kidzee.com',
    defaultLanguage: 'en',
    defaultRegion: 'www',
    hrefLangs: [{ region: 'APAC', language: 'en' }, { language: 'x-default' }],
  },
};
