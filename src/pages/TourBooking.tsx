import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'

export default function TourBooking() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className="pb-6">
        <PageHeader title={t('tourTitle')} />
        <div className="px-4">
          <Card className="p-8 text-center">
            <CheckCircle2 size={56} className="mx-auto text-green-500" />
            <p className="mt-4 font-semibold text-slate-900 dark:text-white">{t('tourBooked')}</p>
            <button
              onClick={() => setDone(false)}
              className="mt-6 text-sm font-semibold text-brand"
            >
              {t('back')}
            </button>
          </Card>
        </div>
      </div>
    )
  }

  const field = 'w-full h-11 rounded-card bg-canvas dark:bg-slate-800 px-3 text-sm text-slate-800 dark:text-slate-100 outline-none'

  return (
    <div className="pb-6">
      <PageHeader title={t('tourTitle')} />
      <div className="px-4 space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('tourDesc')}</p>
        <Card className="p-4">
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('name')}
              </label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className={field} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('date')}
              </label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={field} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('time')}
              </label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className={field} />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-card bg-brand text-white font-semibold active:scale-[0.99] transition-transform"
            >
              {t('book')}
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}
