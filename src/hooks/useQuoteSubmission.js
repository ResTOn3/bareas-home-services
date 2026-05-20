import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useQuoteSubmission() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function submitQuote(data, sourcePage = '') {
    setStatus('submitting')
    const { error } = await supabase
      .from('quote_requests')
      .insert([{ ...data, source_page: sourcePage }])

    if (error) {
      setStatus('error')
      return false
    }
    setStatus('success')
    return true
  }

  return { status, submitQuote }
}
