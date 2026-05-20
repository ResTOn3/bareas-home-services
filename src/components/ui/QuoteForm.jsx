import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { quoteSchema } from '../../lib/validation'
import { useQuoteSubmission } from '../../hooks/useQuoteSubmission'

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600" role="alert">{message}</p>
}

export default function QuoteForm({ sourcePage = '' }) {
  const { t } = useTranslation('contact')
  const { status, submitQuote } = useQuoteSubmission()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(quoteSchema) })

  async function onSubmit(data) {
    const ok = await submitQuote(data, sourcePage)
    if (ok) reset()
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
        <p className="text-green-800 font-semibold">{t('form.success')}</p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent'

  const serviceOptions = Object.entries(
    t('form.services', { returnObjects: true })
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            {t('form.name')}
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t('form.namePlaceholder')}
            className={inputClass}
            {...register('name')}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            {t('form.email')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('form.emailPlaceholder')}
            className={inputClass}
            {...register('email')}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
            {t('form.phone')}
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t('form.phonePlaceholder')}
            className={inputClass}
            {...register('phone')}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service">
            {t('form.service')}
          </label>
          <select id="service" className={inputClass} {...register('service')}>
            <option value="">{t('form.servicePlaceholder')}</option>
            {serviceOptions.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <FieldError message={errors.service?.message} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
          {t('form.message')}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={t('form.messagePlaceholder')}
          className={inputClass}
          {...register('message')}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">{t('form.error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-brand-orange-dark transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? t('form.submitting') : t('form.submit')}
      </button>
    </form>
  )
}
