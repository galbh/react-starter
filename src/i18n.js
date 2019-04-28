import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import resBundle from 'i18next-resource-store-loader!./assets/locale/index.js'; // eslint-disable-line

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    resources: resBundle,

    whiteList: ['en-US', 'He'],

    fallbackLng: 'en-US',

    ns: ['common'],

    react: {
      useSuspense: false
    },

    defaultNS: 'common',

    debug: false,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    backend: {
      // path where resources get loaded from
      loadPath: 'locales/{{lng}}/{{ns}}.json',

      // jsonIndent to use when storing json files
      jsonIndent: 2
    }
  });

export default i18n;
