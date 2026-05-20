import { useTranslation } from 'react-i18next'
import { Paintbrush, Hammer, HardHat, Wrench, Zap } from 'lucide-react'
import SEO from '../components/ui/SEO'
import ServiceCard from '../components/ui/ServiceCard'
import CTABanner from '../components/sections/CTABanner'

const services = [
  { slug: 'painting', icon: Paintbrush },
  { slug: 'remodeling', icon: Hammer },
  { slug: 'construction', icon: HardHat },
  { slug: 'plumbing', icon: Wrench },
  { slug: 'electrical', icon: Zap },
]

export default function Services() {
  const { t } = useTranslation('services')

  return (
    <>
      <SEO
        title="Home Services — Painting, Remodeling, Construction, Plumbing, Electrical"
        description="Professional home services in Tampa Bay. Painting, remodeling, construction, plumbing, and electrical work. Licensed and insured. Free estimates."
      />

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-3">
              {t('title')}
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ slug, icon }) => (
              <ServiceCard key={slug} slug={slug} icon={icon} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
