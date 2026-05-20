import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ slug, icon: Icon }) {
  const { t } = useTranslation('services')

  return (
    <Link
      to={`/services/${slug}`}
      className="group flex flex-col gap-3 bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-brand-orange/30 transition-all"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-brand-orange/10 rounded-lg text-brand-orange">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
        {t(`items.${slug}.title`)}
      </h3>
      <p className="text-sm text-gray-600 flex-1">{t(`items.${slug}.shortDesc`)}</p>
      <span className="flex items-center gap-1 text-sm font-semibold text-brand-orange mt-1">
        {t('common:cta.learnMore')} <ArrowRight size={14} />
      </span>
    </Link>
  )
}
