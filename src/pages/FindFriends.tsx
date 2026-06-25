import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import CategoryFilter, { type FilterOption } from '../components/CategoryFilter'
import { useLang } from '../context/LangContext'
import friends from '../data/friends.json'

const filters: FilterOption[] = [
  { value: 'all', label: 'filterAll' },
  { value: 'en', label: 'langEnglish' },
  { value: 'zh', label: 'langChinese' },
  { value: 'ru', label: 'langRussian' },
]

const langName: Record<string, string> = { en: 'EN', zh: 'ZH', ru: 'RU' }

export default function FindFriends() {
  const { t, lang } = useLang()
  const [filter, setFilter] = useState('all')
  const [connected, setConnected] = useState<number[]>([])

  const list = useMemo(
    () => (filter === 'all' ? friends : friends.filter((f) => f.native === filter)),
    [filter],
  )

  return (
    <div className="pb-6">
      <PageHeader title={t('friendsTitle')} />
      <div className="px-4 space-y-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('languagePartner')}</p>
        <CategoryFilter options={filters} active={filter} onChange={setFilter} />

        {list.map((f) => (
          <Card key={f.id} className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-brand/10 grid place-items-center text-2xl">
              {f.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900 dark:text-white">{f.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t('nativeLang')}: {langName[f.native]} · {t('learning')}: {langName[f.learning]}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {t('interests')}: {lang === 'ru' ? f.interestsRu : f.interestsEn}
              </div>
            </div>
            <button
              onClick={() => setConnected((c) => [...c, f.id])}
              disabled={connected.includes(f.id)}
              className="px-3 h-9 rounded-full bg-brand text-white text-xs font-semibold shrink-0 disabled:opacity-50"
            >
              {connected.includes(f.id) ? t('connected') : t('connect')}
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
