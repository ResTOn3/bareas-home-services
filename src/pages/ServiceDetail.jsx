import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Paintbrush, Hammer, HardHat, Wrench, Zap } from 'lucide-react'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'

const BASE = 'https://images.unsplash.com/photo-'
const Q = '?w=1200&q=80&auto=format&fit=crop'

const iconMap = {
  painting: Paintbrush,
  remodeling: Hammer,
  construction: HardHat,
  plumbing: Wrench,
  electrical: Zap,
}

const heroImages = {
  painting:     `${BASE}1693985120993-e9b203ce7631${Q}`,
  remodeling:   `${BASE}1546551613-09c2f83e1ede${Q}`,
  construction: `${BASE}1777105931951-edcf01fc8891${Q}`,
  plumbing:     `${BASE}1505695715220-3a366d958259${Q}`,
  electrical:   `${BASE}1676630656246-3047520adfdf${Q}`,
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
        title={`${t(`items.${slug}.title`)} - Tampa Bay`}
        description={t(`items.${slug}.shortDesc`)}
      />

      {/* Hero banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-brand-navy">
        <img
          src={heroImages[slug]}
          alt={t(`items.${slug}.title`)}
          width="1200"
          height="400"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-brand-navy/20" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center shrink-0">
              <Icon size={20} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {t(`items.${slug}.title`)}
            </h1>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-20 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link to="/services" className="hover:text-brand-orange transition-colors">
              {t('common:nav.services')}
            </Link>
            {' / '}
            <span className="text-gray-700">{t(`items.${slug}.title`)}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              {t(`items.${slug}.description`)}
            </p>

            <h2 className="font-bold text-brand-navy mb-4">{"What's Included"}</h2>
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
