import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const { t } = useTranslation()
  const phone = t('phone').replace(/\D/g, '')
  const msg = encodeURIComponent("Hi! I found your website and I'd like a free quote.")

  return (
    <a
      href={`https://wa.me/1${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Contact us on WhatsApp"
    >
      {/* One-shot pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-green-500"
        style={{ animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) 2' }}
        aria-hidden="true"
      />
      <MessageCircle size={26} fill="white" className="relative z-10" />
    </a>
  )
}
