import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../../_locales/en/messages.json'

const convertToI18n = resource => {
  const convert = (parts, res, value) => {
    if (parts.length === 1) {
      res[parts[0]] = value
      return;
    }

    const part = parts.shift()
    res[part] = res[part] ? res[part] : {}
    convert(parts, res[part], value)
  }

  const res = {}
  for (const key in resource) {
    const value = resource[key].message
    const parts = key.split(':')
    convert(parts, res, value)
  }

  console.log(res)
  return res
}

const resources = {
  en: convertToI18n(en)
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
