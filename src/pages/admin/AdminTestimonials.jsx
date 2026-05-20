import { useEffect, useState } from 'react'
import { Plus, Trash2, Star, StarOff, Pencil, X, Check } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const SERVICES = ['Painting', 'Remodeling', 'Construction', 'Plumbing', 'Electrical', 'Other']

const empty = { client_name: '', service: '', review: '', rating: 5, location: '', featured: false }

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-brand-navy">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function TestimonialForm({ initial, onSave, onClose, saving }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form) }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Client Name</label>
          <input
            value={form.client_name}
            onChange={(e) => set('client_name', e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
          <input
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="Tampa, FL"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Service</label>
          <select
            value={form.service}
            onChange={(e) => set('service', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          >
            <option value="">Select service</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Rating</label>
          <select
            value={form.rating}
            onChange={(e) => set('rating', Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          >
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Review</label>
        <textarea
          value={form.review}
          onChange={(e) => set('review', e.target.value)}
          required
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 resize-none"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set('featured', e.target.checked)}
          className="accent-brand-orange"
        />
        Show on homepage (featured)
      </label>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-brand-orange-dark disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleSave(form) {
    setSaving(true)
    if (modal.id) {
      await supabase.from('testimonials').update(form).eq('id', modal.id)
    } else {
      await supabase.from('testimonials').insert(form)
    }
    setSaving(false)
    setModal(null)
    load()
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this testimonial?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    load()
  }

  async function toggleFeatured(item) {
    await supabase.from('testimonials').update({ featured: !item.featured }).eq('id', item.id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy mb-1">Testimonials</h1>
          <p className="text-gray-500 text-sm">Manage client reviews shown on the site.</p>
        </div>
        <button
          onClick={() => setModal({ ...empty })}
          className="flex items-center gap-2 bg-brand-orange text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand-orange-dark"
        >
          <Plus size={16} /> Add Review
        </button>
      </div>

      {loading && <p className="text-gray-400 text-sm">Loading...</p>}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
          No testimonials yet. Add the first one.
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-brand-navy text-sm">{item.client_name}</p>
                  {item.service && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{item.service}</span>
                  )}
                  {item.location && (
                    <span className="text-xs text-gray-400">{item.location}</span>
                  )}
                  {item.featured && (
                    <span className="text-xs bg-brand-orange/10 text-brand-orange font-semibold px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.review}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleFeatured(item)}
                  title={item.featured ? 'Remove from featured' : 'Set as featured'}
                  className="p-1.5 text-gray-400 hover:text-brand-orange transition-colors"
                >
                  {item.featured ? <Star size={16} className="fill-brand-orange text-brand-orange" /> : <StarOff size={16} />}
                </button>
                <button
                  onClick={() => setModal({ ...item })}
                  className="p-1.5 text-gray-400 hover:text-brand-navy transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal
          title={modal.id ? 'Edit Testimonial' : 'Add Testimonial'}
          onClose={() => setModal(null)}
        >
          <TestimonialForm
            initial={modal}
            onSave={handleSave}
            onClose={() => setModal(null)}
            saving={saving}
          />
        </Modal>
      )}
    </div>
  )
}
