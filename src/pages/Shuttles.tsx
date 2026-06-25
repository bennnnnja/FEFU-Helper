import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import MapView from '../components/MapView'
import { useLang } from '../context/LangContext'
import shuttles from '../data/shuttles.json'
import campusPoints from '../data/campusPoints.json'

export default function Shuttles() {
  const { t, lang } = useLang()
  const stops = campusPoints.filter((p) => p.category === 'transport')

  return (
    <div className="pb-6">
      <PageHeader title={t('shuttlesTitle')} />
      <div className="px-4 space-y-4">
        <Card className="p-2 overflow-hidden">
          <div className="h-40 rounded-card overflow-hidden">
            <MapView points={stops} center={[43.0254, 131.8916]} zoom={15} />
          </div>
        </Card>

        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 px-1">
          {t('shuttleSchedule')}
        </div>

        {shuttles.map((s) => (
          <Card key={s.id} className="p-4">
            <div className="font-semibold text-slate-900 dark:text-white mb-2">
              🚌 {lang === 'ru' ? s.routeRu : s.routeEn}
            </div>
            <div className="text-xs text-slate-400 mb-1">{t('departure')}</div>
            <div className="flex flex-wrap gap-2">
              {s.departures.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-brand text-xs font-semibold"
                >
                  {d}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
