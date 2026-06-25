import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, X } from 'lucide-react'
import TopBar from '../components/TopBar'
import { useLang } from '../context/LangContext'
import { useChats } from '../context/ChatsContext'

const tabs = [
  { value: 'all', label: 'allChats' },
  { value: 'group', label: 'groups' },
  { value: 'contact', label: 'contacts' },
] as const

export default function Chats() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const { chats, createGroup } = useChats()
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'all' | 'group' | 'contact'>('all')
  const [modal, setModal] = useState(false)
  const [groupName, setGroupName] = useState('')

  const filtered = useMemo(() => {
    return chats.filter((c) => {
      const matchesTab = tab === 'all' || c.type === tab
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase())
      return matchesTab && matchesQuery
    })
  }, [chats, tab, query])

  const onCreate = () => {
    createGroup(groupName)
    setGroupName('')
    setModal(false)
  }

  return (
    <div className="pb-4">
      <TopBar title={t('chatsTitle')} />

      {/* Search */}
      <div className="px-4">
        <div className="flex items-center gap-2 bg-white dark:bg-night-card rounded-card px-3 h-11 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchChats')}
            className="flex-1 bg-transparent outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-3 flex gap-2">
        {tabs.map((tb) => (
          <button
            key={tb.value}
            onClick={() => setTab(tb.value)}
            className={
              'px-4 h-9 rounded-full text-sm font-semibold transition-colors ' +
              (tab === tb.value
                ? 'bg-brand text-white'
                : 'bg-white dark:bg-night-card text-slate-600 dark:text-slate-300')
            }
          >
            {t(tb.label)}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="px-4 mt-3 space-y-2">
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/chats/${c.id}`)}
            className="w-full flex items-center gap-3 bg-white dark:bg-night-card rounded-card p-3 shadow-sm text-left active:scale-[0.99] transition-transform"
          >
            <div className="h-12 w-12 shrink-0 rounded-full bg-blue-50 dark:bg-slate-800 grid place-items-center text-2xl">
              {c.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-900 dark:text-white truncate">
                  {c.name}
                </span>
                <span className="text-[11px] text-slate-400 shrink-0">{c.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {c.type === 'group'
                    ? `${c.members} ${t('members')}`
                    : lang === 'ru'
                      ? c.lastRu
                      : c.lastEn}
                </span>
                {c.unread > 0 && (
                  <span className="shrink-0 min-w-5 h-5 px-1.5 rounded-full bg-brand text-white text-[11px] grid place-items-center">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Create group button */}
      <div className="px-4 mt-3">
        <button
          onClick={() => setModal(true)}
          className="w-full h-12 rounded-card border-2 border-dashed border-brand/40 text-brand font-semibold flex items-center justify-center gap-2"
        >
          <Plus size={18} /> {t('createGroup')}
        </button>
      </div>

      {/* Create group modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[340px] bg-white dark:bg-night-card rounded-xl2 p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{t('createGroup')}</h3>
              <button onClick={() => setModal(false)} className="text-slate-400">
                <X size={20} />
              </button>
            </div>
            <input
              autoFocus
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder={t('groupName')}
              className="w-full h-11 rounded-card bg-canvas dark:bg-slate-800 px-3 text-sm text-slate-800 dark:text-slate-100 outline-none"
            />
            <button
              onClick={onCreate}
              disabled={!groupName.trim()}
              className="w-full h-11 mt-4 rounded-card bg-brand text-white font-semibold disabled:opacity-40"
            >
              {t('create')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
