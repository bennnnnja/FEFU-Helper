import { useLang } from '../context/LangContext'

export default function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang()
  return (
    <div className="flex items-center gap-2 select-none">
      <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="13" fill="#1E3A8A" />
        <g
          fill="none"
          stroke="#93C5FD"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <ellipse cx="16" cy="16" rx="6.5" ry="13" />
          <line x1="3" y1="16" x2="29" y2="16" />
          <path d="M5 10.5 H27" />
          <path d="M5 21.5 H27" />
        </g>
        <circle cx="16" cy="16" r="13" fill="none" stroke="#2563EB" strokeWidth="1.5" />
      </svg>
      {!compact && (
        <div className="leading-none">
          <span className="font-extrabold text-brand text-lg tracking-tight">FEFU</span>
          <span className="block text-[10px] font-bold text-brand-light tracking-[0.2em]">
            {t('appName').replace('FEFU ', '')}
          </span>
        </div>
      )}
    </div>
  )
}
