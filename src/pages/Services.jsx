import { useTranslation } from 'react-i18next'
import { Paintbrush, Hammer, HardHat, Wrench, Zap } from 'lucide-react'
import SEO from '../components/ui/SEO'
import ServiceCard from '../components/ui/ServiceCard'
import CTABanner from '../components/sections/CTABanner'

const BASE = 'https://images.unsplash.com/photo-'
const Q = '?w=400&q=75&auto=format&fit=crop'

const services = [
  { slug: 'painting',     icon: Paintbrush, imageUrl: `${BASE}1693985120993-e9b203ce7631${Q}` },
  { slug: 'remodeling',   icon: Hammer,     imageUrl: `${BASE}1546551613-09c2f83e1ede${Q}` },
  { slug: 'construction', icon: HardHat,    imageUrl: `${BASE}1777105931951-edcf01fc8891${Q}` },
  { slug: 'plumbing',     icon: Wrench,     imageUrl: `${BASE}1505695715220-3a366d958259${Q}` },
  { slug: 'electrical',   icon: Zap,        imageUrl: `${BASE}1676630656246-3047520adfdf${Q}` },
]

export default function Services() {
  const { t } = useTranslation('services')

  return (
    <>
      <SEO
        title="Home Services - Barea's Home Services"
        description="Professional home services in Tampa Bay. Painting, remodeling, construction, plumbing, and electrical work. Licensed and insured. Free estimates."
      />

      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-3">
              {t('title')}
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ slug, icon, imageUrl }) => (
              <ServiceCard key={slug} slug={slug} icon={icon} imageUrl={imageUrl} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
