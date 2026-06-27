import { useEffect } from 'react'
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

/**
 * Campus / city map rendered with OpenStreetMap tiles via react-leaflet.
 * No API key required.
 */
export default function MapView({ points, center, zoom = 15, className = '' }: MapViewProps) {
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
