// need to be localized
export const RES = {
  SITE_NAME: 'Kidzee',
  DEFAULT_PAGE_TITLE: 'Welcome to Kidzee',
  // group static titles together
  PAGE_TITLES: {
    NOT_FOUND: 'Page no longer exists',
    ERROR: 'Oh oh! Something went wrong.',
    PROJECT_CONTACT: 'Contact us about a project',
    HOME: 'Home',
  },
  // group other formatted strings together
  SEO_CONTENT: {
    PROJECT_TITLE: 'Kidzee',
    PROJECT_RESULTS_TITLE: 'Kidzee',
    PROJECT_RESULTS_DESC: 'Kidzee',
  },
};

export const toFormat = (s: string, ...args: any) => {
  const regExp = /\$(\d+)/gi;
  // match $1 $2 ...
  return s.replace(regExp, (match, index) => {
    return args[index] ?? match;
  });
};
