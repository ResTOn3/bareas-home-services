import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'

const Home            = lazy(() => import('./pages/Home'))
const Services        = lazy(() => import('./pages/Services'))
const ServiceDetail   = lazy(() => import('./pages/ServiceDetail'))
const Portfolio       = lazy(() => import('./pages/Portfolio'))
const About           = lazy(() => import('./pages/About'))
const Testimonials    = lazy(() => import('./pages/Testimonials'))
const Contact         = lazy(() => import('./pages/Contact'))
const FAQ             = lazy(() => import('./pages/FAQ'))
const Privacy         = lazy(() => import('./pages/Privacy'))
const Terms           = lazy(() => import('./pages/Terms'))
const NotFound        = lazy(() => import('./pages/NotFound'))

const AdminLogin        = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard    = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminQuotes       = lazy(() => import('./pages/admin/AdminQuotes'))
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'))
const AdminPortfolio    = lazy(() => import('./pages/admin/AdminPortfolio'))

function PageLoader() {
  return <div className="flex items-center justify-center min-h-[40vh]" aria-label="Loading" />
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin - login (no layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin - protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
