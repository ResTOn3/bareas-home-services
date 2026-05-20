import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Phone } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/about', label: t('nav.about') },
    { to: '/testimonials', label: t('nav.testimonials') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-brand-orange ${
      isActive ? 'text-brand-orange' : 'text-gray-700'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold text-brand-navy leading-tight">
              Tampa<span className="text-brand-orange">Pro</span>
            </span>
            <span className="hidden sm:block text-xs text-gray-500 font-medium">Services</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass} end={to === '/'}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${t('phone').replace(/\D/g, '')}`}
              className="hidden md:flex items-center gap-1 text-sm font-semibold text-brand-navy hover:text-brand-orange transition-colors"
              aria-label={`Call ${t('phone')}`}
            >
              <Phone size={15} />
              {t('phone')}
            </a>
            <LanguageToggle />
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center bg-brand-orange text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand-orange-dark transition-colors"
            >
              {t('nav.getQuote')}
            </Link>
            <button
              className="lg:hidden p-1 rounded-md text-gray-700 hover:text-brand-navy"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="lg:hidden bg-white border-t px-4 pb-4 pt-2 space-y-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-orange/10 text-brand-orange'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-navy'
                }`
              }
              end={to === '/'}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t">
            <a
              href={`tel:${t('phone').replace(/\D/g, '')}`}
              className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-brand-navy"
            >
              <Phone size={15} />
              {t('phone')}
            </a>
            <Link
              to="/contact"
              className="mt-2 block text-center bg-brand-orange text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand-orange-dark transition-colors"
              onClick={() => setOpen(false)}
            >
              {t('nav.getQuote')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
