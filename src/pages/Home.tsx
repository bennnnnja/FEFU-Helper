import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Map as MapIcon, CloudSun, MessageCircle, Search, Bell, ArrowRight } from 'lucide-react'
import TopBar from '../components/TopBar'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import MapView from '../components/MapView'
import { useLang } from '../context/LangContext'
import { fetchWeather, weatherEmoji, type FullWeather } from '../lib/weather'
import scheduleData from '../data/schedule.json'
import notifications from '../data/notifications.json'
import campusPoints from '../data/campusPoints.json'

const quick = [
  { icon: Calendar, label: 'quickSchedule', to: '/schedule' },
  { icon: MapIcon, label: 'quickMap', to: '/map' },
  { icon: CloudSun, label: 'quickWeather', to: '/weather' },
  { icon: MessageCircle, label: 'quickChats', to: '/chats' },
] as const

export default function Home() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [weather, setWeather] = useState<FullWeather | null>(null)

  useEffect(() => {
    fetchWeather().then(setWeather)
  }, [])

  const today = scheduleData.lessons.thu
  const locale = lang === 'ru' ? 'ru-RU' : lang === 'zh' ? 'zh-CN' : 'en-US'
  const dateStr = new Date().toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="pb-4">
      <TopBar />

      {/* Greeting */}
      <section className="px-4 pt-1 pb-3 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {t('greeting')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('greetingSub')}</p>
          <p className="text-xs font-medium text-brand mt-1 capitalize">📅 {dateStr}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="h-10 w-10 grid place-items-center rounded-full bg-white dark:bg-night-card shadow-sm text-slate-600 dark:text-slate-300">
            <Search size={18} />
          </button>
          <button
            onClick={() => navigate('/notifications')}
            className="relative h-10 w-10 grid place-items-center rounded-full bg-white dark:bg-night-card shadow-sm text-slate-600 dark:text-slate-300"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand text-white text-[10px] grid place-items-center">
              3
            </span>
          </button>
          <button onClick={() => navigate('/profile')} aria-label={t('profileTitle')}>
            <Avatar size={40} className="ring-2 ring-white dark:ring-night-card shadow-sm" />
          </button>
        </div>
      </section>

      {/* Quick cards */}
      <section className="px-4 grid grid-cols-4 gap-2">
        {quick.map(({ icon: Icon, label, to }) => (
          <Card key={to} onClick={() => navigate(to)} className="py-3 flex flex-col items-center gap-1.5">
            <Icon className="text-brand" size={24} />
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 text-center px-0.5">
              {t(label)}
            </span>
          </Card>
        ))}
      </section>

      {/* Today's schedule */}
      <section className="px-4 mt-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-900 dark:text-white">{t('todaySchedule')}</h2>
            <button onClick={() => navigate('/schedule')} className="text-sm font-semibold text-brand">
              {t('fullSchedule')}
            </button>
          </div>
          <div className="space-y-2">
            {today.slice(0, 4).map((l, i) => (
              <div
                key={i}
                className="rounded-card bg-blue-50 dark:bg-slate-800/60 px-3 py-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand">
                    {l.from} – {l.to}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    📍 {l.room}
                  </span>
                </div>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mt-0.5">
                  {lang === 'ru' ? l.titleRu : l.titleEn}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/schedule')}
            className="w-full mt-3 text-sm font-semibold text-brand flex items-center justify-center gap-1"
          >
            {t('fullSchedule')} <ArrowRight size={16} />
          </button>
        </Card>
      </section>

      {/* Mini map + weather */}
      <section className="px-4 mt-4 grid grid-cols-1 gap-3">
        <Card className="p-4">
          <h2 className="font-bold text-slate-900 dark:text-white mb-2">{t('campusMap')}</h2>
          <div className="h-36 rounded-card overflow-hidden relative">
            <MapView points={campusPoints} center={[43.0254, 131.8916]} zoom={15} />
            <button
              onClick={() => navigate('/map')}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[400] bg-white dark:bg-night-card text-brand text-sm font-semibold px-4 h-9 rounded-full shadow-md flex items-center gap-1"
            >
              <MapIcon size={16} /> {t('openMap')}
            </button>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-bold text-slate-900 dark:text-white mb-2">{t('weatherIn')}</h2>
          {weather ? (
            <div className="flex items-center gap-4">
              <div className="text-5xl">{weatherEmoji(weather.code)}</div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {weather.temp > 0 ? '+' : ''}
                  {weather.temp}°C
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t('feelsLike')} {weather.feelsLike > 0 ? '+' : ''}
                  {weather.feelsLike}°
                </div>
              </div>
              <div className="ml-auto text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div>💧 {t('humidity')}: {weather.humidity}%</div>
                <div>💨 {t('wind')}: {weather.wind} m/s</div>
                <div>🌡 {t('pressure')}: {weather.pressure}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-400">{t('loading')}</div>
          )}
        </Card>
      </section>

      {/* Notifications */}
      <section className="px-4 mt-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-900 dark:text-white">{t('notifications')}</h2>
            <button onClick={() => navigate('/notifications')} className="text-sm font-semibold text-brand">
              {t('viewAll')}
            </button>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="flex gap-3">
                <div className="h-9 w-9 shrink-0 rounded-full bg-blue-100 dark:bg-slate-800 grid place-items-center">
                  {n.type === 'chat' ? '💬' : n.type === 'university' ? '📢' : '📅'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {lang === 'ru' ? n.titleRu : n.titleEn}
                    </span>
                    <span className="text-[11px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {lang === 'ru' ? n.textRu : n.textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
