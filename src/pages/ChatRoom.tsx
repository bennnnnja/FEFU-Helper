import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Paperclip, Send } from 'lucide-react'
import ChatBubble from '../components/ChatBubble'
import { useLang } from '../context/LangContext'
import { useChats } from '../context/ChatsContext'

export default function ChatRoom() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const { getChat, sendMessage } = useChats()
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const chat = getChat(id)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages.length])

  if (!chat) {
    return (
      <div className="p-6 text-center text-slate-400">
        {t('error')}
      </div>
    )
  }

  const onSend = () => {
    sendMessage(chat.id, text)
    setText('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-night-card/95 backdrop-blur px-3 py-2.5 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => navigate('/chats')}
          className="h-9 w-9 grid place-items-center rounded-full text-slate-600 dark:text-slate-300"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="h-9 w-9 rounded-full bg-blue-50 dark:bg-slate-800 grid place-items-center text-xl">
          {chat.emoji}
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-white leading-tight">
            {chat.name}
          </div>
          <div className="text-[11px] text-slate-400">
            {chat.type === 'group' ? `${chat.members} ${t('members')}` : t('contacts')}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-2">
        {chat.messages.map((m) => (
          <ChatBubble
            key={m.id}
            mine={m.mine}
            author={m.author}
            time={m.time}
            text={lang === 'ru' ? m.textRu : m.textEn}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-night-card flex items-center gap-2">
        <button className="text-slate-400 shrink-0" aria-label="Attach">
          <Paperclip size={20} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder={t('typeMessage')}
          className="flex-1 h-10 rounded-full bg-canvas dark:bg-slate-800 px-4 text-sm text-slate-800 dark:text-slate-100 outline-none"
        />
        <button
          onClick={onSend}
          disabled={!text.trim()}
          className="h-10 w-10 shrink-0 grid place-items-center rounded-full bg-brand text-white disabled:opacity-40"
          aria-label={t('send')}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
