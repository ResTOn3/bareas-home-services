import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const isES = i18n.language === 'es'

  return (
    <button
      onClick={() => i18n.changeLanguage(isES ? 'en' : 'es')}
      className="flex items-center gap-1 text-sm font-semibold text-brand-navy border border-brand-navy rounded px-2 py-1 hover:bg-brand-navy hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-orange"
      aria-label={isES ? 'Switch to English' : 'Cambiar a Español'}
    >
      {isES ? 'EN' : 'ES'}
    </button>
  )
}
