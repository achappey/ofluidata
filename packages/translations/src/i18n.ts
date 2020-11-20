import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './lang/en.json'
import nl from './lang/nl.json'

export const i18nNamespace = 'ofluidata'

const resources = {
  en: {
    [i18nNamespace]: {
      ...en
    }
  },
  nl: {
    [i18nNamespace]: {
      ...nl
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: ['en', 'nl'],
    defaultNS: i18nNamespace,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
