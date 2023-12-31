import { Locale, format, parseISO } from 'date-fns';
import I18n from 'i18n-js';

import ar from 'date-fns/locale/ar-SA';
import ko from 'date-fns/locale/ko';
import en from 'date-fns/locale/en-US';

type Options = Parameters<typeof format>[2];

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split('-')[0];
  const mapped = {
    ar,
    ko,
  };
  return mapped[locale] ?? en;
};

export const formatDate = (
  date: string,
  dateFormat?: string,
  options?: Options,
) => {
  return format(parseISO(date), dateFormat ?? 'MMM dd, yyyy', options);
};
