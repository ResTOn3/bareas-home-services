import { useTranslation } from 'react-i18next'
import { Shield, Award, Calendar } from 'lucide-react'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/sections/CTABanner'

const BASE = 'https://images.unsplash.com/photo-'

export default function About() {
  const { t } = useTranslation('about')
  const values = t('values.items', { returnObjects: true })

  return (
    <>
      <SEO
        title="About - Barea's Home Services"
        description="4+ years of professional contracting in Tampa Bay. Licensed, insured, and bilingual. Learn about our story and values."
      />

      {/* Hero */}
      <section className="relative bg-brand-navy overflow-hidden">
        <img
          src={`${BASE}1513584684374-8bab748fbf90?w=1600&q=80&auto=format&fit=crop`}
          alt=""
          aria-hidden="true"
          width="1600"
          height="600"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 to-brand-navy/75" />
        <div className="relative py-20 md:py-28 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('hero.headline')}
            </h1>
            <p className="text-gray-300 text-lg">{t('hero.body')}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy mb-5">{t('story.title')}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{t('story.body1')}</p>
            <p className="text-gray-600 leading-relaxed">{t('story.body2')}</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src={`${BASE}1771122453274-d3270e73cf94?w=800&q=80&auto=format&fit=crop`}
              alt="Professional contractor tools and equipment"
              width="800"
              height="600"
              loading="lazy"
              className="w-full h-72 lg:h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-navy mb-8 text-center">{t('values.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-brand-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-navy mb-8 text-center">
            {t('credentials.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center gap-3 p-6 bg-gray-50 rounded-xl">
              <Shield size={32} className="text-brand-orange" />
              <div>
                <p className="font-bold text-brand-navy text-sm">{t('credentials.license')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('credentials.licenseNumber')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-6 bg-gray-50 rounded-xl">
              <Award size={32} className="text-brand-orange" />
              <div>
                <p className="font-bold text-brand-navy text-sm">{t('credentials.insurance')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('credentials.insuranceDetail')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-6 bg-gray-50 rounded-xl">
              <Calendar size={32} className="text-brand-orange" />
              <div>
                <p className="font-bold text-brand-navy text-sm">{t('credentials.years')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('credentials.yearsDetail')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner titleKey="cta.title" bodyKey="cta.body" namespace="home" />
    </>
  )
}
