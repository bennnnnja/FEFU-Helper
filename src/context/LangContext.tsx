import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dictionaries, LANGS, type Lang, type TranslationKey } from '../i18n'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: (key: TranslationKey) => string
}

const LangContext = createContext<LangContextValue | undefined>(undefined)

const STORAGE_KEY = 'fefu-lang'

function getInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'ru' || stored === 'en' || stored === 'zh') return stored
  return 'ru'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  // Cycle through the available languages: ru -> en -> zh -> ru
  const toggleLang = () =>
    setLangState((p) => LANGS[(LANGS.indexOf(p) + 1) % LANGS.length])
  const t = (key: TranslationKey) => dictionaries[lang][key] ?? key

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
