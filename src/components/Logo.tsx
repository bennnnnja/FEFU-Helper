import { useLang } from '../context/LangContext'

export default function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang()
  return (
    <div className="flex items-center gap-2 select-none">
      <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden>
        <path
          fill="#2563EB"
          d="M6 26c6-2 8-8 9-14 3 5 2 11-3 14 5 0 9-4 10-9 1 6-2 12-8 14-5 1-12-1-15-5 2 1 5 1 7 0z"
        />
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
