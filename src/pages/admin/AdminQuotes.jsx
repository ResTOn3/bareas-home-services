import { useEffect, useState } from 'react'
import { Phone, Mail, Calendar } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const SERVICE_LABELS = {
  painting: 'Painting',
  remodeling: 'Remodeling',
  construction: 'Construction',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  other: 'Other',
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setQuotes(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy mb-1">Quote Requests</h1>
      <p className="text-gray-500 text-sm mb-8">All submissions from the contact form.</p>

      {loading && <p className="text-gray-400 text-sm">Loading...</p>}

      {!loading && quotes.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
          No quote requests yet.
        </div>
      )}

      <div className="space-y-3">
        {quotes.map((q) => (
          <div key={q.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <p className="font-bold text-brand-navy">{q.name}</p>
                <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                  {q.phone && (
                    <a href={`tel:${q.phone}`} className="flex items-center gap-1 hover:text-brand-orange">
                      <Phone size={13} /> {q.phone}
                    </a>
                  )}
                  {q.email && (
                    <a href={`mailto:${q.email}`} className="flex items-center gap-1 hover:text-brand-orange">
                      <Mail size={13} /> {q.email}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {q.service && (
                  <span className="text-xs font-semibold bg-brand-orange/10 text-brand-orange px-2 py-1 rounded">
                    {SERVICE_LABELS[q.service] ?? q.service}
                  </span>
                )}
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(q.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            {q.message && (
              <p className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
                {q.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
