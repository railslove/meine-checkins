import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import de from 'src/shared/i18n/de';

export const resources = {
  de,
};

i18n.use(initReactI18next).init({
  lng: 'de',
  ns: Object.keys(de),

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },

  resources,
});

export default i18n;
