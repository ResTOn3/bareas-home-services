import SEO from '../components/ui/SEO'

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Privacy policy for Barea's Home Services." />
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl font-bold text-brand-navy mb-6">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-4 text-gray-600">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>
          <p>{"Barea's Home Services collects information you provide through our contact form including your name, email, phone number, and project details, solely to respond to your service inquiries."}</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">Information We Collect</h2>
          <p>We collect information you voluntarily provide when submitting a quote request: name, email address, phone number, service type, and project description.</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">How We Use Your Information</h2>
          <p>We use your information to contact you about your project inquiry. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">Data Storage</h2>
          <p>Form submissions are stored securely via Supabase. We retain data only as long as necessary to service your inquiry.</p>
          <h2 className="text-base font-bold text-brand-navy mt-6">Contact</h2>
          <p>Questions about this policy? Email us at ernebarea@gmail.com.</p>
        </div>
      </div>
    </>
  )
}
