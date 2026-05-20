import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Star, Images, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'

function StatCard({ label, count, icon: Icon, to, color }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold text-brand-navy">{count ?? '—'}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <ArrowRight size={16} className="text-gray-300" />
    </Link>
  )
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    async function load() {
      const [quotes, testimonials, portfolio] = await Promise.all([
        supabase.from('quote_requests').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('portfolio_items').select('id', { count: 'exact', head: true }),
      ])
      setCounts({
        quotes: quotes.count ?? 0,
        testimonials: testimonials.count ?? 0,
        portfolio: portfolio.count ?? 0,
      })
    }
    load()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back. Here is an overview of your site content.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Quote Requests"
          count={counts.quotes}
          icon={MessageSquare}
          to="/admin/quotes"
          color="bg-brand-navy"
        />
        <StatCard
          label="Testimonials"
          count={counts.testimonials}
          icon={Star}
          to="/admin/testimonials"
          color="bg-brand-orange"
        />
        <StatCard
          label="Portfolio Items"
          count={counts.portfolio}
          icon={Images}
          to="/admin/portfolio"
          color="bg-emerald-600"
        />
      </div>
    </div>
  )
}
