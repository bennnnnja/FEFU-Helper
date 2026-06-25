import { Moon, Sun } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'

interface TopBarProps {
  title?: string
}

export default function TopBar({ title }: TopBarProps) {
  const { lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 bg-canvas/90 dark:bg-night-bg/90 backdrop-blur px-4 py-3 flex items-center justify-between">
      {title ? (
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
      ) : (
        <Logo />
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLang}
          className="h-9 px-3 rounded-full bg-white dark:bg-night-card text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm"
          aria-label="Toggle language"
        >
          {lang.toUpperCase()}
        </button>
        <button
          onClick={toggleTheme}
          className="h-9 w-9 grid place-items-center rounded-full bg-white dark:bg-night-card text-slate-700 dark:text-slate-200 shadow-sm"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
