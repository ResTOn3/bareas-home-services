import { useTranslation } from 'react-i18next'
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import SEO from '../components/ui/SEO'
import QuoteForm from '../components/ui/QuoteForm'

export default function Contact() {
  const { t } = useTranslation(['contact', 'common'])
  const phone = t('common:phone')

  return (
    <>
      <SEO
        title="Get a Free Quote - Barea's Home Services"
        description="Request a free estimate for painting, remodeling, construction, plumbing, or electrical work in Tampa Bay. Call, text, or fill out our quick form."
      />

      <div className="py-12 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-3">
              {t('contact:title')}
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">{t('contact:subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <QuoteForm sourcePage="contact" />
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-brand-navy rounded-2xl p-6 text-white">
                <h2 className="font-bold text-lg mb-4">{t('contact:directContact.title')}</h2>
                <ul className="space-y-4">
                  <li>
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                      {t('contact:directContact.call')}
                    </p>
                    <a
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-2 text-brand-orange font-bold text-lg hover:underline"
                    >
                      <Phone size={18} />
                      {phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                      {t('contact:directContact.whatsapp')}
                    </p>
                    <a
                      href={`https://wa.me/1${phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-400 font-semibold hover:underline"
                    >
                      <MessageCircle size={18} />
                      {phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                      {t('contact:directContact.email')}
                    </p>
                    <a
                      href={`mailto:${t('common:email')}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      <Mail size={16} />
                      {t('common:email')}
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock size={16} />
                    {t('contact:directContact.hours')}
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-brand-navy mb-3">{t('contact:serviceArea.title')}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('contact:serviceArea.detail')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
