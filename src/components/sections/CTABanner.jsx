import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'

export default function CTABanner({ titleKey, bodyKey, namespace = 'home' }) {
  const { t } = useTranslation([namespace, 'common'])
  const phone = t('common:phone')

  return (
    <section className="bg-brand-navy py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          {t(`${namespace}:${titleKey}`)}
        </h2>
        <p className="text-gray-300 mb-8">{t(`${namespace}:${bodyKey}`)}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-brand-orange text-white font-bold px-8 py-3 rounded-lg hover:bg-brand-orange-dark transition-colors"
          >
            {t('common:cta.freeQuote')}
          </Link>
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-brand-navy transition-colors"
          >
            <Phone size={18} />
            {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
