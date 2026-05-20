import { useTranslation } from 'react-i18next'
import { Shield, Clock, MapPin, Tag, Star } from 'lucide-react'

const badges = [
  { key: 'licensed', Icon: Shield },
  { key: 'experience', Icon: Clock },
  { key: 'localTampa', Icon: MapPin },
  { key: 'freeEstimate', Icon: Tag },
  { key: 'satisfaction', Icon: Star },
]

export default function TrustBadges({ className = '' }) {
  const { t } = useTranslation()

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {badges.map(({ key, Icon }) => (
        <div
          key={key}
          className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100"
        >
          <Icon size={16} className="text-brand-orange shrink-0" />
          <span className="text-xs font-semibold text-brand-navy whitespace-nowrap">
            {t(`trust.${key}`)}
          </span>
        </div>
      ))}
    </div>
  )
}
