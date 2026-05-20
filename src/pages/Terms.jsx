import SEO from '../components/ui/SEO'

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Service" description="Terms of service for Barea's Home Services." />
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl font-bold text-brand-navy mb-6">Terms of Service</h1>
        <div className="text-sm leading-relaxed space-y-4 text-gray-600">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>
          <p>{"By using this website, you agree to these terms. Barea's Home Services provides this website for informational purposes to connect potential clients with our services."}</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">Use of Website</h2>
          <p>This website is for lawful purposes only. You may not use it to submit false inquiries, spam, or harmful content.</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">Service Estimates</h2>
          <p>Submitting a quote request does not constitute a contract. All work is governed by a separate written agreement signed prior to project commencement.</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">Liability</h2>
          <p>{"Barea's Home Services is not liable for damages arising from the use of this website. Content is provided as-is without warranties."}</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">Contact</h2>
          <p>Questions? Reach us at ernebarea@gmail.com or +1 (321) 466-3684.</p>
        </div>
      </div>
    </>
  )
}
