import { useMemo, useState } from 'react'
import TopBar from '../components/TopBar'
import MapView from '../components/MapView'
import CategoryFilter, { type FilterOption } from '../components/CategoryFilter'
import { useLang } from '../context/LangContext'
import campusPoints from '../data/campusPoints.json'

const filters: FilterOption[] = [
  { value: 'all', label: 'filterAll' },
  { value: 'food', label: 'catFood' },
  { value: 'buildings', label: 'catBuildings' },
  { value: 'transport', label: 'catTransport' },
  { value: 'attractions', label: 'catAttractions' },
]

export default function MapPage() {
  const { t } = useLang()
  const [active, setActive] = useState('all')

  const points = useMemo(
    () => (active === 'all' ? campusPoints : campusPoints.filter((p) => p.category === active)),
    [active],
  )

  return (
    <div className="flex flex-col h-full">
      <TopBar title={t('mapTitle')} />
      <div className="px-4 pb-3">
        <CategoryFilter options={filters} active={active} onChange={setActive} />
      </div>
      <div className="flex-1 min-h-[320px]">
        <MapView points={points} center={[43.0254, 131.8916]} zoom={15} />
      </div>
    </div>
  )
}
