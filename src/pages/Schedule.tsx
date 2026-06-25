import { useState } from 'react'
import TopBar from '../components/TopBar'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import scheduleData from '../data/schedule.json'

type DayKey = keyof typeof scheduleData.lessons

export default function Schedule() {
  const { t, lang } = useLang()
  const [active, setActive] = useState<DayKey>('thu')

  const lessons = scheduleData.lessons[active]

  return (
    <div className="pb-4">
      <TopBar title={t('scheduleTitle')} />

      {/* Day strip */}
      <div className="px-4 mt-1">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {scheduleData.days.map((d) => (
            <button
              key={d.key}
              onClick={() => setActive(d.key as DayKey)}
              className={
                'shrink-0 w-14 py-2 rounded-card flex flex-col items-center transition-colors ' +
                (active === d.key
                  ? 'bg-brand text-white'
                  : 'bg-white dark:bg-night-card text-slate-600 dark:text-slate-300')
              }
            >
              <span className="text-xs font-semibold">
                {lang === 'ru' ? d.labelRu : d.labelEn}
              </span>
              <span className="text-[11px] opacity-80">{d.date.replace('Apr ', '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lessons */}
      <div className="px-4 mt-4 space-y-3">
        {lessons.length === 0 && (
          <Card className="p-8 text-center text-slate-400">{t('noClasses')} 🎉</Card>
        )}
        {lessons.map((l, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-brand">
                {l.from} – {l.to}
              </span>
              <span className="text-xs font-medium text-brand">
                {lang === 'ru' ? l.typeRu : l.typeEn}
              </span>
            </div>
            <div className="font-semibold text-slate-900 dark:text-white">
              {lang === 'ru' ? l.titleRu : l.titleEn}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              📍 {t('room')}: {l.room}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
