import { useLang } from '../context/LangContext'

export default function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang()
  return (
    <div className="flex items-center gap-2 select-none">
      <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0" aria-hidden>
        {/* globe */}
        <circle cx="16" cy="17.5" r="12.5" fill="#1E3A8A" />
        <g fill="none" stroke="#93C5FD" strokeWidth="1.1" strokeLinecap="round">
          <ellipse cx="16" cy="17.5" rx="6" ry="12.5" />
          <line x1="3.7" y1="17.5" x2="28.3" y2="17.5" />
          <path d="M5.3 12 H26.7" />
          <path d="M5.3 23 H26.7" />
        </g>
        <circle cx="16" cy="17.5" r="12.5" fill="none" stroke="#2563EB" strokeWidth="1.4" />
        {/* speech bubble "A" (top-left, light) */}
        <path
          d="M3 4 h11 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-5 l-3 3 v-3 h-3 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 z"
          fill="#EFF6FF"
          stroke="#2563EB"
          strokeWidth="1"
        />
        <text x="8.5" y="12" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1E3A8A">
          A
        </text>
        {/* speech bubble "文" (bottom-right, blue) */}
        <path
          d="M19 17 h11 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-3 v3 l-3 -3 h-5 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 z"
          fill="#2563EB"
          stroke="#1E3A8A"
          strokeWidth="1"
        />
        <text x="24.5" y="25" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#ffffff">
          文
        </text>
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
