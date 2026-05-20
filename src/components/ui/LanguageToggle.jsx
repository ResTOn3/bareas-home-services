import { useTranslation } from 'react-i18next'

const USFlag = () => (
  <svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" width="20" height="14">
    <rect width="20" height="14" fill="#B22234" rx="2" />
    {[1, 3, 5, 7, 9, 11].map((i) => (
      <rect key={i} y={i * (14 / 13)} width="20" height={14 / 13} fill="white" />
    ))}
    <rect width="8" height={14 / 13 * 7} fill="#3C3B6E" rx="1" />
  </svg>
)

const SpainFlag = () => (
  <svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" width="20" height="14">
    <rect width="20" height="14" fill="#AA151B" rx="2" />
    <rect y="3.5" width="20" height="7" fill="#F1BF00" />
  </svg>
)

const flags = [
  { code: 'en', Flag: USFlag, label: 'Switch to English' },
  { code: 'es', Flag: SpainFlag, label: 'Cambiar a Español' },
]

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language === 'es' ? 'es' : 'en'

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Select language">
      {flags.map(({ code, Flag, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          aria-label={label}
          aria-pressed={current === code}
          className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center transition-all duration-200 ring-offset-white ${
            current === code
              ? 'ring-2 ring-brand-orange ring-offset-2 opacity-100'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          <Flag />
        </button>
      ))}
    </div>
  )
}
