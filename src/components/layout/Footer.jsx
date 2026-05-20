import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Shield } from 'lucide-react'
import LogoIcon from './Logo'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const services = [
    { to: '/services/painting', key: 'painting' },
    { to: '/services/remodeling', key: 'remodeling' },
    { to: '/services/construction', key: 'construction' },
    { to: '/services/plumbing', key: 'plumbing' },
    { to: '/services/electrical', key: 'electrical' },
  ]

  const links = [
    { to: '/about', label: t('nav.about') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/testimonials', label: t('nav.testimonials') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <footer className="bg-brand-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
              <div className="flex items-center justify-center w-9 h-9 bg-brand-orange rounded-lg group-hover:bg-brand-orange-dark transition-colors">
                <LogoIcon size={22} />
              </div>
              <div className="leading-tight">
                <span className="block text-base font-extrabold text-white tracking-tight">
                  Barea's
                </span>
                <span className="block text-[10px] font-semibold text-brand-orange uppercase tracking-widest -mt-0.5">
                  Home Services
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">{t('footer.tagline')}</p>
            <div className="mt-4 flex items-start gap-2">
              <Shield size={16} className="text-brand-orange mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">{t('footer.license')}</p>
                <p className="text-xs text-gray-400">{t('footer.licenseNumber')}</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2">
              {services.map(({ to, key }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-brand-orange transition-colors"
                  >
                    {t(`services:items.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-brand-orange transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${t('phone').replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-orange transition-colors"
                >
                  <Phone size={14} className="shrink-0" />
                  {t('phone')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('email')}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-orange transition-colors"
                >
                  <Mail size={14} className="shrink-0" />
                  {t('email')}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                <span>
                  {t('footer.serviceAreaDetail')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-500">
          <p>{t('footer.copyright', { year })}</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
