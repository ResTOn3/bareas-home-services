import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ slug, icon: Icon, imageUrl }) {
  const { t } = useTranslation('services')

  return (
    <Link
      to={`/services/${slug}`}
      className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-orange-200 transition-all duration-200 overflow-hidden"
    >
      {imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={t(`items.${slug}.title`)}
            width="400"
            height="160"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center justify-center w-10 h-10 bg-brand-orange rounded-lg shadow">
            <Icon size={20} className="text-white" />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 p-5 flex-1">
        {!imageUrl && (
          <div className="flex items-center justify-center w-14 h-14 bg-brand-orange/10 rounded-xl text-brand-orange group-hover:scale-110 transition-transform duration-200 mb-1">
            <Icon size={26} />
          </div>
        )}
        <h3 className="text-base font-bold tracking-tight text-brand-navy group-hover:text-brand-orange transition-colors">
          {t(`items.${slug}.title`)}
        </h3>
        <p className="text-sm text-gray-600 flex-1">{t(`items.${slug}.shortDesc`)}</p>
        <span className="flex items-center gap-1 text-sm font-semibold text-brand-orange mt-1">
          {t('common:cta.learnMore')} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}
