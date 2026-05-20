import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enServices from './locales/en/services.json'
import enContact from './locales/en/contact.json'
import enAbout from './locales/en/about.json'
import enFaq from './locales/en/faq.json'

import esCommon from './locales/es/common.json'
import esHome from './locales/es/home.json'
import esServices from './locales/es/services.json'
import esContact from './locales/es/contact.json'
import esAbout from './locales/es/about.json'
import esFaq from './locales/es/faq.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      services: enServices,
      contact: enContact,
      about: enAbout,
      faq: enFaq,
    },
    es: {
      common: esCommon,
      home: esHome,
      services: esServices,
      contact: esContact,
      about: esAbout,
      faq: esFaq,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
