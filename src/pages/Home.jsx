import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Paintbrush, Hammer, HardHat, Wrench, Zap, CheckCircle2 } from 'lucide-react'
import SEO from '../components/ui/SEO'
import ServiceCard from '../components/ui/ServiceCard'
import TestimonialCard from '../components/ui/TestimonialCard'
import TrustBadges from '../components/sections/TrustBadges'
import CTABanner from '../components/sections/CTABanner'
import { useTestimonials } from '../hooks/useTestimonials'

const BASE = 'https://images.unsplash.com/photo-'
const Q = '?w=400&q=75&auto=format&fit=crop'

const services = [
  { slug: 'painting',     icon: Paintbrush, imageUrl: `${BASE}1693985120993-e9b203ce7631${Q}` },
  { slug: 'remodeling',   icon: Hammer,     imageUrl: `${BASE}1546551613-09c2f83e1ede${Q}` },
  { slug: 'construction', icon: HardHat,    imageUrl: `${BASE}1777105931951-edcf01fc8891${Q}` },
  { slug: 'plumbing',     icon: Wrench,     imageUrl: `${BASE}1505695715220-3a366d958259${Q}` },
  { slug: 'electrical',   icon: Zap,        imageUrl: `${BASE}1676630656246-3047520adfdf${Q}` },
]

const fallbackTestimonials = [
  {
    id: '1',
    client_name: 'Maria Lopez',
    service: 'Painting',
    review: "Excellent work on our entire house interior. Clean, professional, and finished on time. We highly recommend Barea's Home Services!",
    rating: 5,
    location: 'Tampa, FL',
  },
  {
    id: '2',
    client_name: 'Robert Johnson',
    service: 'Bathroom Remodel',
    review: 'They completely transformed our master bathroom. Communication was great the whole way through and they really cleaned up after themselves.',
    rating: 5,
    location: 'Brandon, FL',
  },
  {
    id: '3',
    client_name: 'Carmen Diaz',
    service: 'Electrical',
    review: 'Necesitaba actualizar el panel electrico y lo hicieron rapido y al precio cotizado. Muy profesionales y hablan espanol.',
    rating: 5,
    location: 'Clearwater, FL',
  },
]

export default function Home() {
  const { t } = useTranslation(['home', 'common'])
  const { testimonials, loading } = useTestimonials({ featuredOnly: true, limit: 3 })
  const displayTestimonials = !loading && testimonials.length > 0 ? testimonials : fallbackTestimonials

  return (
    <>
      <SEO
        description="Licensed and insured home services contractor in Tampa Bay. Free estimates for painting, remodeling, construction, plumbing, and electrical. Bilingual English/Spanish."
      />

      {/* Hero */}
      <section className="relative bg-brand-navy overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          width="1600"
          height="900"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-dark/90 to-brand-navy/85" />
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          <div className="relative w-64 h-64">
            <Paintbrush size={72} className="absolute top-0 right-8 text-white opacity-[0.07] rotate-12" />
            <Hammer size={56} className="absolute top-16 right-0 text-white opacity-[0.06] -rotate-6" />
            <Wrench size={64} className="absolute bottom-16 right-12 text-white opacity-[0.07] rotate-45" />
            <Zap size={48} className="absolute bottom-0 right-2 text-white opacity-[0.06] rotate-12" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              Tampa Bay Area
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-balance">
              {t('home:hero.headline')}
            </h1>
            <p className="text-brand-orange font-semibold text-lg mb-4">
              {t('home:hero.subheadline')}
            </p>
            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
              {t('home:hero.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-brand-orange text-white font-bold px-8 py-3.5 rounded-lg hover:bg-brand-orange-dark transition-colors text-base"
              >
                {t('home:hero.cta')}
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-lg hover:border-white/70 hover:bg-white/10 transition-all duration-200 text-base"
              >
                {t('home:hero.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
        <div className="relative bg-white/5 border-t border-white/10 py-5 px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-2">
              {t('home:services.title')}
            </h2>
            <p className="text-gray-500">{t('home:services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map(({ slug, icon, imageUrl }) => (
              <ServiceCard key={slug} slug={slug} icon={icon} imageUrl={imageUrl} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-2">
              {t('home:whyUs.title')}
            </h2>
            <p className="text-gray-500">{t('home:whyUs.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t('home:whyUs.items', { returnObjects: true }).map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <CheckCircle2 size={28} className="text-brand-orange" />
                <h3 className="font-bold text-brand-navy text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-2">
              {t('home:testimonials.title')}
            </h2>
            <p className="text-gray-500">{t('home:testimonials.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.map((item) => (
              <TestimonialCard
                key={item.id}
                clientName={item.client_name}
                service={item.service}
                review={item.review}
                rating={item.rating}
                location={item.location}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-1 text-brand-orange font-semibold hover:underline"
            >
              {t('home:testimonials.viewAll')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
