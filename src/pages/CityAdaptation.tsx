import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import MapView from '../components/MapView'
import CategoryFilter, { type FilterOption } from '../components/CategoryFilter'
import { useLang } from '../context/LangContext'
import cityPoints from '../data/cityPoints.json'

const filters: FilterOption[] = [
  { value: 'all', label: 'filterAll' },
  { value: 'sight', label: 'catSight' },
  { value: 'mall', label: 'catMall' },
  { value: 'shop', label: 'catShop' },
  { value: 'hospital', label: 'catHospital' },
  { value: 'pharmacy', label: 'catPharmacy' },
]

export default function CityAdaptation() {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')

  const points = useMemo(
    () => (filter === 'all' ? cityPoints : cityPoints.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={t('cityTitle')} />
      <div className="px-4 pb-3 space-y-2">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('cityDesc')}</p>
        <CategoryFilter options={filters} active={filter} onChange={setFilter} />
      </div>
      <div className="flex-1 min-h-[300px]">
        <MapView points={points} center={[43.115, 131.885]} zoom={12} />
      </div>
    </div>
  )
}
