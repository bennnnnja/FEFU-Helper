import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import { clothingAdvice, fetchWeather, weatherEmoji, type FullWeather } from '../lib/weather'

export default function Weather() {
  const { t, lang } = useLang()
  const [weather, setWeather] = useState<FullWeather | null>(null)

  useEffect(() => {
    fetchWeather().then(setWeather)
  }, [])

  return (
    <div className="pb-6">
      <PageHeader title={t('weatherTitle')} />
      <div className="px-4 space-y-4">
        {!weather ? (
          <Card className="p-8 text-center text-slate-400">{t('loading')}</Card>
        ) : (
          <>
            <Card className="p-6 text-center">
              <div className="text-7xl mb-2">{weatherEmoji(weather.code)}</div>
              <div className="text-5xl font-extrabold text-slate-900 dark:text-white">
                {weather.temp > 0 ? '+' : ''}
                {weather.temp}°C
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('weatherIn')}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {t('feelsLike')} {weather.feelsLike > 0 ? '+' : ''}
                {weather.feelsLike}° · {weather.minTemp}° / {weather.maxTemp}°
              </div>
            </Card>

            <Card className="p-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xs text-slate-400">{t('humidity')}</div>
                <div className="font-bold text-slate-800 dark:text-white">{weather.humidity}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">{t('wind')}</div>
                <div className="font-bold text-slate-800 dark:text-white">{weather.wind} m/s</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">{t('pressure')}</div>
                <div className="font-bold text-slate-800 dark:text-white">{weather.pressure}</div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-sm font-semibold text-brand mb-1">{t('weatherAdvice')}</div>
              <p className="text-slate-700 dark:text-slate-200">
                {clothingAdvice(weather.temp, weather.code, lang)}
              </p>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
