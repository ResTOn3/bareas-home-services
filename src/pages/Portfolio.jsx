import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'
import { portfolioImages } from '../lib/portfolioImages'
import { supabase } from '../lib/supabase'

const filters = ['all', 'painting', 'remodeling', 'construction', 'plumbing', 'electrical']

export default function Portfolio() {
  const { t } = useTranslation('services')
  const [active, setActive] = useState('all')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setItems(data && data.length > 0 ? data : portfolioImages.map((p) => ({
          id: p.id,
          service: p.service,
          title: p.alt,
          location: p.location,
          image_url: p.url,
        })))
        setLoading(false)
      })
  }, [])

  const visible = active === 'all' ? items : items.filter((p) => p.service === active)

  return (
    <>
      <SEO
        title="Portfolio - Before and After Projects"
        description="Browse completed home improvement projects in Tampa Bay - painting, remodeling, construction, plumbing, and electrical work."
      />

      <section className="py-16 md:py-24 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-3">Our Work</h1>
            <p className="text-gray-500">Real projects. Real results. Tampa Bay homeowners.</p>
          </div>

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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((n) => (
                <div key={n} className="bg-gray-200 rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((p) => (
                <article
                  key={p.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.title ?? p.service}
                      width="800"
                      height="208"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-brand-orange px-2 py-0.5 rounded">
                      {t(`items.${p.service}.title`)}
                    </span>
                  </div>
                  <div className="p-4">
                    {p.location && <p className="text-xs text-gray-400">{p.location}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && visible.length === 0 && (
            <p className="text-center text-gray-400 py-12">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
