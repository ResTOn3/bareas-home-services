import { Star } from 'lucide-react'

const AVATAR_COLORS = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-rose-600',
  'bg-amber-600',
  'bg-teal-600',
]

function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function avatarColor(name) {
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export default function TestimonialCard({ clientName, service, review, rating, location }) {
  const initials = getInitials(clientName)
  const colorClass = avatarColor(clientName)

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
      <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-brand-orange fill-brand-orange' : 'text-gray-200 fill-gray-200'}
          />
        ))}
      </div>
      <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">{`"${review}"`}</blockquote>
      <footer className="mt-auto flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center shrink-0`}
          aria-hidden="true"
        >
          <span className="text-white text-xs font-bold">{initials}</span>
        </div>
        <div>
          <p className="font-semibold text-brand-navy text-sm">{clientName}</p>
          <p className="text-xs text-gray-400">
            {service}
            {location ? ` - ${location}` : ''}
          </p>
        </div>
      </footer>
    </article>
  )
}
