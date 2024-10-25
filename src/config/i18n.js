import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // To load translation files
import LanguageDetector from 'i18next-browser-languagedetector'; // To detect user's language

i18n
  .use(Backend) // Load translations from files
  .use(LanguageDetector) // Detect language (e.g., from browser or URL)
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Fallback language if translation is missing
    ns: ['login'], // Define the namespaces you will use
    defaultNS: 'common', // Default namespace
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path where your translation JSON files are stored
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'], // Cache user language in these
    },
  });

export default i18n;
