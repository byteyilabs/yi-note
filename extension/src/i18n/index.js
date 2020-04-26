import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'

const resources = {
  en
}

export const init = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)

    .init({
      resources,
      fallbackLng: 'en',
      defaultNS: 'common',
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    })
}

export default {
  init,
  i18n
}
