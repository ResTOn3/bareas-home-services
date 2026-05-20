import { useEffect, useState, useRef } from 'react'
import { Plus, Trash2, Upload, X, Loader } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const SERVICES = ['painting', 'remodeling', 'construction', 'plumbing', 'electrical']

const SERVICE_LABELS = {
  painting: 'Painting',
  remodeling: 'Remodeling',
  construction: 'Construction',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
}

function AddModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ service: 'painting', title: '', location: '' })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef()

  function handleFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) { setError('Please select an image.'); return }
    setUploading(true)
    setError('')

    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(path, file, { upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(uploadData.path)

    const { error: insertError } = await supabase.from('portfolio_items').insert({
      service: form.service,
      title: form.title || null,
      location: form.location || null,
      image_url: publicUrl,
    })

    if (insertError) {
      setError(insertError.message)
      setUploading(false)
      return
    }

    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-brand-navy">Add Portfolio Item</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

          <div
            onClick={() => inputRef.current.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange/50 transition-colors overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <Upload size={24} className="text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">Click to upload photo</p>
                <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP</p>
              </>
            )}
          </div>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Service</label>
            <select
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
            >
              {SERVICES.map((s) => <option key={s} value={s}>{SERVICE_LABELS[s]}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title (optional)</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Kitchen remodel"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location (optional)</label>
              <input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="Tampa, FL"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 px-5 py-2 bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-brand-orange-dark disabled:opacity-60"
            >
              {uploading && <Loader size={14} className="animate-spin" />}
              {uploading ? 'Uploading...' : 'Upload & Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminPortfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)

  async function load() {
    const { data } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(item) {
    if (!window.confirm('Delete this photo?')) return
    const path = item.image_url.split('/portfolio/')[1]
    if (path) await supabase.storage.from('portfolio').remove([path])
    await supabase.from('portfolio_items').delete().eq('id', item.id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy mb-1">Portfolio</h1>
          <p className="text-gray-500 text-sm">Upload real project photos to replace Unsplash placeholders.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-brand-orange text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand-orange-dark"
        >
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {loading && <p className="text-gray-400 text-sm">Loading...</p>}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
          No photos yet. Upload your first project photo.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={item.image_url}
                alt={item.title ?? item.service}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                {SERVICE_LABELS[item.service] ?? item.service}
              </span>
              {item.location && <p className="text-xs text-gray-400 mt-1">{item.location}</p>}
            </div>
            <button
              onClick={() => handleDelete(item)}
              className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {showAdd && (
        <AddModal
          onClose={() => setShowAdd(false)}
          onSaved={() => { setShowAdd(false); load() }}
        />
      )}
    </div>
  )
}
