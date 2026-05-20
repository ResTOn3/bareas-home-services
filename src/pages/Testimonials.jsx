import { useTranslation } from 'react-i18next'
import SEO from '../components/ui/SEO'
import TestimonialCard from '../components/ui/TestimonialCard'
import CTABanner from '../components/sections/CTABanner'
import { useTestimonials } from '../hooks/useTestimonials'

const fallback = [
  { id: '1', client_name: 'Maria Lopez', service: 'Painting', review: 'Excellent work on our entire house interior. Clean, professional, and finished on time.', rating: 5, location: 'Tampa, FL' },
  { id: '2', client_name: 'Robert Johnson', service: 'Bathroom Remodel', review: 'They completely transformed our master bathroom. Communication was great the whole way through.', rating: 5, location: 'Brandon, FL' },
  { id: '3', client_name: 'Carmen Diaz', service: 'Electrical', review: 'Actualizaron el panel electrico rapido y al precio cotizado. Muy profesionales y hablan espanol.', rating: 5, location: 'Clearwater, FL' },
  { id: '4', client_name: 'David Kim', service: 'Construction', review: 'They built a deck that added real value to our home. Permit was handled, work was solid.', rating: 5, location: 'Wesley Chapel, FL' },
  { id: '5', client_name: 'Ana Martinez', service: 'Remodeling', review: 'Remodelamos la cocina completa. Quedo hermosa y el equipo fue siempre puntual y ordenado.', rating: 5, location: 'Tampa, FL' },
  { id: '6', client_name: 'Tom Harris', service: 'Plumbing', review: 'Fixed a leak that two other plumbers missed. Quick diagnosis and same-day repair. Great work!', rating: 5, location: 'St. Petersburg, FL' },
]

export default function Testimonials() {
  const { t } = useTranslation(['home', 'common'])
  const { testimonials, loading } = useTestimonials()
  const list = !loading && testimonials.length > 0 ? testimonials : fallback

  return (
    <>
      <SEO
        title="Client Reviews - Barea's Home Services"
        description="See what Tampa Bay homeowners say about our painting, remodeling, construction, plumbing, and electrical services."
      />

      <section className="py-16 md:py-24 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-3">
              {t('home:testimonials.title')}
            </h1>
            <p className="text-gray-500">{t('home:testimonials.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((item) => (
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
        </div>
      </section>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
