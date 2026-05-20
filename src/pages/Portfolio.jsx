import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'

const filters = ['all', 'painting', 'remodeling', 'construction', 'plumbing', 'electrical']

const projects = [
  { id: 1, category: 'painting', title: 'Full Interior Repaint — Tampa Home', location: 'Tampa, FL' },
  { id: 2, category: 'remodeling', title: 'Master Bathroom Renovation', location: 'Brandon, FL' },
  { id: 3, category: 'construction', title: 'Backyard Deck Addition', location: 'Wesley Chapel, FL' },
  { id: 4, category: 'painting', title: 'Exterior Paint & Pressure Wash', location: 'Clearwater, FL' },
  { id: 5, category: 'remodeling', title: 'Kitchen Remodel — Open Concept', location: 'Tampa, FL' },
  { id: 6, category: 'electrical', title: 'Electrical Panel Upgrade 200A', location: 'St. Petersburg, FL' },
]

export default function Portfolio() {
  const { t } = useTranslation('services')
  const [active, setActive] = useState('all')

  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <SEO
        title="Portfolio — Before & After Projects"
        description="Browse completed home improvement projects in Tampa Bay — painting, remodeling, construction, plumbing, and electrical work."
      />

      <section className="py-14 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-3">Our Work</h1>
            <p className="text-gray-500">Real projects. Real results. Tampa Bay homeowners.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter by service">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active === f
                    ? 'bg-brand-navy text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-navy hover:text-brand-navy'
                }`}
                aria-pressed={active === f}
              >
                {f === 'all' ? 'All' : t(`items.${f}.title`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((p) => (
              <article key={p.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                {/* Placeholder image area — replace with real WebP photos */}
                <div className="h-48 bg-gradient-to-br from-brand-navy/10 to-brand-orange/10 flex items-center justify-center">
                  <span className="text-3xl" aria-hidden="true">📸</span>
                </div>
                <div className="p-4">
                  <span className="inline-block text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded mb-2">
                    {t(`items.${p.category}.title`)}
                  </span>
                  <h3 className="font-bold text-brand-navy text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{p.location}</p>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-gray-400 py-12">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
