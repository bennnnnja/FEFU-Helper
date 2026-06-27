import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useLang } from '../context/LangContext'

export interface MapPoint {
  id: string
  category: string
  lat: number
  lng: number
  titleEn: string
  titleRu: string
  descEn: string
  descRu: string
}

interface MapViewProps {
  points: MapPoint[]
  center: [number, number]
  zoom?: number
  className?: string
}

/**
 * Set to true and provide VITE_YANDEX_MAPS_KEY in .env to use Yandex Maps.
 * When false (default) the free OpenStreetMap / Leaflet renderer is used,
 * which requires no API key.
 */
export const USE_YANDEX_MAPS = true

const CATEGORY_COLORS: Record<string, string> = {
  food: '#F59E0B',
  buildings: '#2563EB',
  transport: '#10B981',
  attractions: '#8B5CF6',
  sight: '#8B5CF6',
  mall: '#EC4899',
  shop: '#F97316',
  hospital: '#EF4444',
  pharmacy: '#14B8A6',
}

function markerIcon(category: string) {
  const color = CATEGORY_COLORS[category] ?? '#2563EB'
  return L.divIcon({
    className: 'fefu-marker',
    html: `<div style="background:${color};width:18px;height:18px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 18],
    popupAnchor: [0, -16],
  })
}

/** Re-fit the map when points / center change. */
function Recenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

function LeafletMap({ points, center, zoom = 15, className = '' }: MapViewProps) {
  const { lang } = useLang()
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      attributionControl={false}
      className={'w-full h-full ' + className}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Recenter center={center} zoom={zoom} />
      {points.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={markerIcon(p.category)}>
          <Popup>
            <div className="font-semibold text-slate-900">
              {lang === 'ru' ? p.titleRu : p.titleEn}
            </div>
            <div className="text-slate-600">{lang === 'ru' ? p.descRu : p.descEn}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

/* ----------------------- Yandex Maps implementation ----------------------- */

declare global {
  interface Window {
    ymaps3?: any
  }
}

function loadYandexScript(key: string): Promise<any> {
  if (window.ymaps3) return window.ymaps3.ready.then(() => window.ymaps3)
  return new Promise((resolve, reject) => {
    const existing = document.getElementById('ymaps3-script')
    const onload = () => window.ymaps3.ready.then(() => resolve(window.ymaps3))
    if (existing) {
      existing.addEventListener('load', onload)
      return
    }
    const script = document.createElement('script')
    script.id = 'ymaps3-script'
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${key}&lang=ru_RU`
    script.onload = onload
    script.onerror = reject
    document.head.appendChild(script)
  })
}

/** Inject the marker / balloon styles once. */
function ensureYandexMarkerStyles() {
  if (document.getElementById('fefu-ymap-styles')) return
  const style = document.createElement('style')
  style.id = 'fefu-ymap-styles'
  style.textContent = `
    .fefu-ym-marker{position:relative;transform:translate(-50%,-50%);cursor:pointer}
    .fefu-ym-dot{width:18px;height:18px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)}
    .fefu-ym-balloon{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);
      width:max-content;max-width:200px;background:#fff;color:#0f172a;border-radius:12px;
      padding:8px 10px;box-shadow:0 6px 20px rgba(0,0,0,.25);display:none;z-index:10}
    .fefu-ym-marker.open .fefu-ym-balloon{display:block}
    .fefu-ym-balloon b{display:block;font-size:13px;margin-bottom:2px}
    .fefu-ym-balloon span{font-size:12px;color:#475569}
  `
  document.head.appendChild(style)
}

function YandexMap({
  points,
  center,
  zoom = 15,
  className = '',
  onError,
}: MapViewProps & { onError?: () => void }) {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const key = import.meta.env.VITE_YANDEX_MAPS_KEY
    if (!key || !ref.current) return
    ensureYandexMarkerStyles()
    let map: any
    let openEl: HTMLElement | null = null
    loadYandexScript(key).then((ymaps3) => {
      if (!ref.current) return
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3
      map = new YMap(ref.current, {
        location: { center: [center[1], center[0]], zoom },
      })
      map.addChild(new YMapDefaultSchemeLayer())
      map.addChild(new YMapDefaultFeaturesLayer())
      points.forEach((p) => {
        const title = lang === 'ru' ? p.titleRu : p.titleEn
        const desc = lang === 'ru' ? p.descRu : p.descEn
        const wrap = document.createElement('div')
        wrap.className = 'fefu-ym-marker'
        wrap.innerHTML =
          `<div class="fefu-ym-dot" style="background:${CATEGORY_COLORS[p.category] ?? '#2563EB'}"></div>` +
          `<div class="fefu-ym-balloon"><b></b><span></span></div>`
        ;(wrap.querySelector('b') as HTMLElement).textContent = title
        ;(wrap.querySelector('span') as HTMLElement).textContent = desc
        wrap.addEventListener('click', (e) => {
          e.stopPropagation()
          if (openEl && openEl !== wrap) openEl.classList.remove('open')
          wrap.classList.toggle('open')
          openEl = wrap.classList.contains('open') ? wrap : null
        })
        map.addChild(new YMapMarker({ coordinates: [p.lng, p.lat] }, wrap))
      })
    }).catch(() => {
      // Yandex script failed to load (bad key / IP restriction / offline).
      // Fall back to OpenStreetMap so a map is always shown.
      onError?.()
    })
    return () => {
      if (map) map.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, center, zoom, lang])

  return <div ref={ref} className={'w-full h-full ' + className} />
}

export default function MapView(props: MapViewProps) {
  const [yandexFailed, setYandexFailed] = useState(false)
  const useYandex =
    USE_YANDEX_MAPS && !!import.meta.env.VITE_YANDEX_MAPS_KEY && !yandexFailed

  if (useYandex) {
    return <YandexMap {...props} onError={() => setYandexFailed(true)} />
  }
  return <LeafletMap {...props} />
}
