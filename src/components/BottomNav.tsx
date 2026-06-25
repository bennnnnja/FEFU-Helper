import { Home, Calendar, MapPin, MessageCircle, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import type { TranslationKey } from '../i18n'

const tabs: { to: string; icon: typeof Home; label: TranslationKey; badge?: number }[] = [
  { to: '/', icon: Home, label: 'navHome' },
  { to: '/schedule', icon: Calendar, label: 'navSchedule' },
  { to: '/map', icon: MapPin, label: 'navMap' },
  { to: '/chats', icon: MessageCircle, label: 'navChats', badge: 2 },
  { to: '/profile', icon: User, label: 'navProfile' },
]

export default function BottomNav() {
  const { t } = useLang()
  return (
    <nav className="sticky bottom-0 z-20 bg-white/95 dark:bg-night-card/95 backdrop-blur border-t border-slate-100 dark:border-slate-800 px-2 pt-2 pb-3">
      <ul className="flex items-stretch justify-between">
        {tabs.map(({ to, icon: Icon, label, badge }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                'flex flex-col items-center gap-1 text-[11px] font-medium ' +
                (isActive
                  ? 'text-brand'
                  : 'text-slate-400 dark:text-slate-500')
              }
            >
              <span className="relative">
                <Icon size={22} />
                {badge ? (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-brand text-white text-[10px] grid place-items-center">
                    {badge}
                  </span>
                ) : null}
              </span>
              {t(label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
