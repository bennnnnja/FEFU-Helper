import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'
import { clothingAdvice, fetchWeather, weatherEmoji, type FullWeather } from '../lib/weather'

const SESSION_KEY = 'fefu-weather-shown'

/**
 * Shows a one-time-per-session weather modal with a clothing
 * recommendation for Vladivostok.
 */
export default function WeatherModal() {
  const { t, lang } = useLang()
  const [weather, setWeather] = useState<FullWeather | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    fetchWeather().then((w) => {
      setWeather(w)
      setOpen(true)
      sessionStorage.setItem(SESSION_KEY, '1')
    })
  }, [])

  if (!open || !weather) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40">
      <div className="w-full max-w-[340px] bg-white dark:bg-night-card rounded-xl2 p-6 text-center shadow-2xl">
        <div className="text-6xl mb-2">{weatherEmoji(weather.code)}</div>
        <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
          {weather.temp > 0 ? '+' : ''}
          {weather.temp}°C
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('weatherIn')}
        </div>
        <div className="mt-4 text-sm font-semibold text-brand">{t('weatherAdvice')}</div>
        <p className="text-slate-700 dark:text-slate-200 mt-1">
          {clothingAdvice(weather.temp, weather.code, lang)}
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-6 w-full h-11 rounded-card bg-brand text-white font-semibold active:scale-[0.98] transition-transform"
        >
          {t('ok')}
        </button>
      </div>
    </div>
  )
}
