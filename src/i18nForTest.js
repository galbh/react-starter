import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    
    resources: {
      'en-US': {common: {}},
      he: {}
    },
    
    react: {
      useSuspense: false
    },
    
    ns: ['common'],

    defaultNS: 'common',

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

  });

export default i18n;