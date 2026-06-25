import { useState } from 'react'
import { Phone, HeartHandshake, Send, MessageCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import ChatBubble from '../components/ChatBubble'
import { useLang } from '../context/LangContext'
import { contacts } from '../data/contacts'

export default function Support() {
  const { t } = useLang()
  const [messages, setMessages] = useState<{ id: number; mine: boolean; text: string }[]>([
    { id: 1, mine: false, text: t('hotlineDesc') },
  ])
  const [text, setText] = useState('')

  const send = () => {
    if (!text.trim()) return
    setMessages((m) => [...m, { id: m.length + 1, mine: true, text: text.trim() }])
    setText('')
    setTimeout(() => {
      setMessages((m) => [...m, { id: m.length + 1, mine: false, text: t('questionSent') }])
    }, 600)
  }

  return (
    <div className="pb-6 flex flex-col h-full">
      <PageHeader title={t('support')} />
      <div className="px-4 space-y-3">
        {/* Hotline */}
        <Card className="p-4 flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-brand/10 grid place-items-center text-brand">
            <Phone size={20} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 dark:text-white">{t('hotline')}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{contacts.hotline.label}</div>
          </div>
          <a
            href={`tel:${contacts.hotline.tel}`}
            className="px-4 h-9 rounded-full bg-brand text-white text-sm font-semibold grid place-items-center"
          >
            {t('call')}
          </a>
        </Card>

        {/* Ask for help */}
        <Card className="p-4 flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-brand/10 grid place-items-center text-brand">
            <HeartHandshake size={20} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 dark:text-white">{t('askForHelp')}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{t('askForHelpDesc')}</div>
          </div>
        </Card>
      </div>

      {/* Support chat */}
      <div className="px-4 mt-3 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
        <MessageCircle size={16} /> {t('support')}
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-2 min-h-[160px]">
        {messages.map((m) => (
          <ChatBubble key={m.id} mine={m.mine} text={m.text} author={m.mine ? undefined : t('support')} />
        ))}
      </div>
      <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={t('typeMessage')}
          className="flex-1 h-10 rounded-full bg-canvas dark:bg-slate-800 px-4 text-sm text-slate-800 dark:text-slate-100 outline-none"
        />
        <button
          onClick={send}
          disabled={!text.trim()}
          className="h-10 w-10 grid place-items-center rounded-full bg-brand text-white disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
