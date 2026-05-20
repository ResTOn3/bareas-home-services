import { Star } from 'lucide-react'

export default function TestimonialCard({ clientName, service, review, rating, location }) {
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
      <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">"{review}"</blockquote>
      <footer className="mt-auto">
        <p className="font-semibold text-brand-navy text-sm">{clientName}</p>
        <p className="text-xs text-gray-400">
          {service}
          {location ? ` · ${location}` : ''}
        </p>
      </footer>
    </article>
  )
}
