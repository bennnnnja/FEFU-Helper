import { useNavigate } from 'react-router-dom'
import {
  Users,
  Search,
  UserPlus,
  User,
  Settings as SettingsIcon,
  LogOut,
  Languages,
  Map as MapIcon,
  Calendar,
  Bus,
  HeartHandshake,
  Headphones,
  ChevronRight,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import type { Lang, TranslationKey } from '../i18n'

const menu: { icon: typeof Users; label: TranslationKey; to: string }[] = [
  { icon: Users, label: 'groupSearch', to: '/chats' },
  { icon: Search, label: 'findFriend', to: '/find-friends' },
  { icon: UserPlus, label: 'addContact', to: '/find-friends' },
  { icon: User, label: 'myProfile', to: '/profile' },
]

const services: { icon: typeof Users; label: TranslationKey; to: string }[] = [
  { icon: Languages, label: 'translator', to: '/translator' },
  { icon: Headphones, label: 'support', to: '/support' },
  { icon: HeartHandshake, label: 'psychTitle', to: '/psych-help' },
  { icon: Calendar, label: 'events', to: '/events' },
  { icon: Bus, label: 'shuttles', to: '/shuttles' },
  { icon: MapIcon, label: 'cityAdaptation', to: '/city-adaptation' },
  { icon: Calendar, label: 'tourBooking', to: '/tour-booking' },
  { icon: SettingsIcon, label: 'singleWindowTitle', to: '/single-window' },
]

export default function Profile() {
  const { t, lang, setLang } = useLang()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <div className="pb-6">
      <TopBar title={t('profileTitle')} />

      <div className="px-4 space-y-4">
        {/* Profile card */}
        <Card className="p-4 flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-brand/10 grid place-items-center text-2xl">
            🧑‍🎓
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">Alex Ivanov</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {t('student')} · B51125
            </div>
          </div>
        </Card>

        {/* Main menu */}
        <Card className="p-2">
          {menu.map(({ icon: Icon, label, to }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-card hover:bg-canvas dark:hover:bg-slate-800"
            >
              <Icon size={20} className="text-brand" />
              <span className="flex-1 text-left text-sm font-medium text-slate-800 dark:text-slate-100">
                {t(label)}
              </span>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          ))}
        </Card>

        {/* Services */}
        <div className="text-xs font-semibold text-slate-400 px-1">{t('more')}</div>
        <Card className="p-2 grid grid-cols-2 gap-1">
          {services.map(({ icon: Icon, label, to }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-card hover:bg-canvas dark:hover:bg-slate-800"
            >
              <Icon size={22} className="text-brand" />
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 text-center px-1">
                {t(label)}
              </span>
            </button>
          ))}
        </Card>

        {/* Settings */}
        <Card className="p-4 space-y-4">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SettingsIcon size={18} className="text-brand" /> {t('settings')}
          </div>

          {/* Language */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700 dark:text-slate-200">{t('language')}</span>
            <div className="flex bg-canvas dark:bg-slate-800 rounded-full p-1">
              {(['ru', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={
                    'px-4 h-8 rounded-full text-sm font-semibold transition-colors ' +
                    (lang === l ? 'bg-brand text-white' : 'text-slate-500 dark:text-slate-300')
                  }
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700 dark:text-slate-200">{t('theme')}</span>
            <div className="flex bg-canvas dark:bg-slate-800 rounded-full p-1">
              <button
                onClick={() => setTheme('light')}
                className={
                  'px-4 h-8 rounded-full text-sm font-semibold transition-colors ' +
                  (theme === 'light' ? 'bg-brand text-white' : 'text-slate-500 dark:text-slate-300')
                }
              >
                {t('themeLight')}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={
                  'px-4 h-8 rounded-full text-sm font-semibold transition-colors ' +
                  (theme === 'dark' ? 'bg-brand text-white' : 'text-slate-500 dark:text-slate-300')
                }
              >
                {t('themeDark')}
              </button>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <button className="w-full h-12 rounded-card bg-white dark:bg-night-card text-red-500 font-semibold flex items-center justify-center gap-2 shadow-sm">
          <LogOut size={18} /> {t('logout')}
        </button>
      </div>
    </div>
  )
}
