import { useLang } from '../context/LangContext'
import type { TranslationKey } from '../i18n'

export interface FilterOption {
  value: string
  label: TranslationKey
}

interface CategoryFilterProps {
  options: FilterOption[]
  active: string
  onChange: (value: string) => void
}

export default function CategoryFilter({ options, active, onChange }: CategoryFilterProps) {
  const { t } = useLang()
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={
            'shrink-0 px-4 h-9 rounded-full text-sm font-semibold transition-colors ' +
            (active === opt.value
              ? 'bg-brand text-white'
              : 'bg-white dark:bg-night-card text-slate-600 dark:text-slate-300')
          }
        >
          {t(opt.label)}
        </button>
      ))}
    </div>
  )
}
