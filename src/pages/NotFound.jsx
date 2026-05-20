import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/ui/SEO'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-7xl font-bold text-brand-orange mb-4">404</p>
        <h1 className="text-2xl font-bold text-brand-navy mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          We couldn't find that page. Let's get you back on track.
        </p>
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-brand-navy text-white font-bold px-6 py-2.5 rounded-lg hover:bg-brand-navy-dark transition-colors"
          >
            {t('cta.backHome')}
          </Link>
          <Link
            to="/contact"
            className="bg-brand-orange text-white font-bold px-6 py-2.5 rounded-lg hover:bg-brand-orange-dark transition-colors"
          >
            {t('cta.freeQuote')}
          </Link>
        </div>
      </div>
    </>
  )
}
