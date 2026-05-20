import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useTestimonials({ featuredOnly = false, limit = null } = {}) {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetch() {
      let query = supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (featuredOnly) query = query.eq('is_featured', true)
      if (limit) query = query.limit(limit)

      const { data, error: err } = await query
      if (err) setError(err)
      else setTestimonials(data)
      setLoading(false)
    }
    fetch()
  }, [featuredOnly, limit])

  return { testimonials, loading, error }
}
