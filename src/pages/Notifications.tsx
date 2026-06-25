import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import notifications from '../data/notifications.json'

const icon: Record<string, string> = {
  schedule: '📅',
  university: '📢',
  chat: '💬',
}

export default function Notifications() {
  const { t, lang } = useLang()
  return (
    <div className="pb-6">
      <PageHeader title={t('notificationsTitle')} />
      <div className="px-4 space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className="p-4 flex gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 dark:bg-slate-800 grid place-items-center">
              {icon[n.type] ?? '🔔'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {lang === 'ru' ? n.titleRu : n.titleEn}
                </span>
                <span className="text-[11px] text-slate-400 shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {lang === 'ru' ? n.textRu : n.textEn}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
