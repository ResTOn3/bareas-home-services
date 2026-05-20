import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Paintbrush, Hammer, HardHat, Wrench, Zap } from 'lucide-react'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'

const iconMap = {
  painting: Paintbrush,
  remodeling: Hammer,
  construction: HardHat,
  plumbing: Wrench,
  electrical: Zap,
}

const validSlugs = Object.keys(iconMap)

export default function ServiceDetail() {
  const { slug } = useParams()
  const { t } = useTranslation('services')

  if (!validSlugs.includes(slug)) return <Navigate to="/services" replace />

  const Icon = iconMap[slug]
  const features = t(`items.${slug}.features`, { returnObjects: true })

  return (
    <>
      <SEO
        title={`${t(`items.${slug}.title`)} — Tampa Bay`}
        description={t(`items.${slug}.shortDesc`)}
      />

      <div className="py-14 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link to="/services" className="hover:text-brand-orange transition-colors">
              {t('common:nav.services')}
            </Link>
            {' / '}
            <span className="text-gray-700">{t(`items.${slug}.title`)}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                <Icon size={28} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy">
                {t(`items.${slug}.title`)}
              </h1>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              {t(`items.${slug}.description`)}
            </p>

            <h2 className="font-bold text-brand-navy mb-4">What's Included</h2>
            <ul className="space-y-3 mb-8">
              {Array.isArray(features) &&
                features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
            </ul>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-brand-orange text-white font-bold px-8 py-3 rounded-lg hover:bg-brand-orange-dark transition-colors"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
