import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Paintbrush, Hammer, HardHat, Wrench, Zap, ArrowLeft } from 'lucide-react'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'

const BASE = 'https://images.unsplash.com/photo-'
const Q = '?w=1200&q=80&auto=format&fit=crop'

const iconMap = {
  painting:     Paintbrush,
  remodeling:   Hammer,
  construction: HardHat,
  plumbing:     Wrench,
  electrical:   Zap,
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

      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden bg-brand-navy">
        <img
          src={heroImages[slug]}
          alt={t(`items.${slug}.title`)}
          width="1200"
          height="400"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8 max-w-3xl mx-auto w-full">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors w-fit"
          >
            <ArrowLeft size={14} /> All Services
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-brand-orange rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <Icon size={22} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {t(`items.${slug}.title`)}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 md:py-16 px-4 bg-gray-50 min-h-[50vh]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              {t(`items.${slug}.description`)}
            </p>

            <h2 className="font-bold text-brand-navy mb-4 text-lg">{"What's Included"}</h2>
            <ul className="space-y-3 mb-8">
              {Array.isArray(features) && features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
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
