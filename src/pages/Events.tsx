import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import events from '../data/events.json'

export default function Events() {
  const { t, lang } = useLang()
  return (
    <div className="pb-6">
      <PageHeader title={t('eventsTitle')} />
      <div className="px-4 space-y-3">
        {events.map((e) => {
          const locale = lang === 'ru' ? 'ru-RU' : lang === 'zh' ? 'zh-CN' : 'en-US'
          const date = new Date(e.date).toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
          })
          return (
            <Card key={e.id} className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-card bg-brand/10 grid place-items-center text-2xl">
                {e.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white">
                  {lang === 'ru' ? e.titleRu : e.titleEn}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'ru' ? e.descRu : e.descEn}
                </div>
              </div>
              <div className="text-xs font-semibold text-brand shrink-0">{date}</div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
