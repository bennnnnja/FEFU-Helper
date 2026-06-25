import type { Lang } from '../i18n'
import { dictionaries } from '../i18n'

export interface WeatherData {
  temp: number
  feelsLike: number
  code: number
  maxTemp: number
  minTemp: number
  isFallback: boolean
}

const ENDPOINT =
  'https://api.open-meteo.com/v1/forecast?latitude=43.12&longitude=131.92' +
  '&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m,surface_pressure' +
  '&daily=temperature_2m_max,temperature_2m_min&timezone=auto'

export interface FullWeather extends WeatherData {
  humidity: number
  wind: number
  pressure: number
}

export async function fetchWeather(): Promise<FullWeather> {
  try {
    const res = await fetch(ENDPOINT)
    if (!res.ok) throw new Error('weather request failed')
    const data = await res.json()
    return {
      temp: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature),
      code: data.current.weather_code,
      humidity: Math.round(data.current.relative_humidity_2m),
      wind: Math.round(data.current.wind_speed_10m),
      pressure: Math.round(data.current.surface_pressure * 0.750062), // hPa -> mmHg
      maxTemp: Math.round(data.daily.temperature_2m_max[0]),
      minTemp: Math.round(data.daily.temperature_2m_min[0]),
      isFallback: false,
    }
  } catch {
    // Fallback stub: +23°C sunny
    return {
      temp: 23,
      feelsLike: 21,
      code: 0,
      humidity: 60,
      wind: 3,
      pressure: 758,
      maxTemp: 24,
      minTemp: 18,
      isFallback: true,
    }
  }
}

// WMO weather codes that indicate rain/snow/precipitation
const PRECIP_CODES = new Set([
  51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99,
])

export function isPrecipitation(code: number): boolean {
  return PRECIP_CODES.has(code)
}

/** Build a clothing recommendation string for the given temperature & code. */
export function clothingAdvice(temp: number, code: number, lang: Lang): string {
  const d = dictionaries[lang]
  let advice: string
  if (temp < 0) advice = d.adviceCold
  else if (temp < 10) advice = d.adviceCool
  else if (temp < 18) advice = d.adviceMild
  else if (temp < 24) advice = d.adviceWarm
  else advice = d.adviceHot

  if (isPrecipitation(code)) {
    advice += `, ${d.takeUmbrella}`
  }
  return advice
}

/** Map WMO weather code to an emoji for quick display. */
export function weatherEmoji(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 2) return '🌤️'
  if (code === 3) return '☁️'
  if (code >= 45 && code <= 48) return '🌫️'
  if (code >= 51 && code <= 67) return '🌧️'
  if (code >= 71 && code <= 77) return '❄️'
  if (code >= 80 && code <= 82) return '🌦️'
  if (code >= 85 && code <= 86) return '🌨️'
  if (code >= 95) return '⛈️'
  return '🌤️'
}
