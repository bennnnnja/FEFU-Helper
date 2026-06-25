import { createContext, useContext, useState, type ReactNode } from 'react'
import chatsData from '../data/chats.json'

export interface Message {
  id: number
  author: string
  mine: boolean
  textEn: string
  textRu: string
  time: string
}

export interface Chat {
  id: string
  name: string
  emoji: string
  type: string
  members: number
  time: string
  unread: number
  lastEn: string
  lastRu: string
  messages: Message[]
}

interface ChatsContextValue {
  chats: Chat[]
  getChat: (id: string) => Chat | undefined
  sendMessage: (chatId: string, text: string) => void
  createGroup: (name: string) => void
}

const ChatsContext = createContext<ChatsContextValue | undefined>(undefined)

export function ChatsProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(() =>
    (chatsData as Chat[]).map((c) => ({ ...c, messages: [...c.messages] })),
  )

  const getChat = (id: string) => chats.find((c) => c.id === id)

  const sendMessage = (chatId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              time,
              lastEn: trimmed,
              lastRu: trimmed,
              messages: [
                ...c.messages,
                {
                  id: c.messages.length + 1,
                  author: 'me',
                  mine: true,
                  textEn: trimmed,
                  textRu: trimmed,
                  time,
                },
              ],
            }
          : c,
      ),
    )
  }

  const createGroup = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = 'group-' + Date.now()
    setChats((prev) => [
      {
        id,
        name: trimmed,
        emoji: '✨',
        type: 'group',
        members: 1,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: 0,
        lastEn: 'Group created',
        lastRu: 'Группа создана',
        messages: [],
      },
      ...prev,
    ])
  }

  return (
    <ChatsContext.Provider value={{ chats, getChat, sendMessage, createGroup }}>
      {children}
    </ChatsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChats() {
  const ctx = useContext(ChatsContext)
  if (!ctx) throw new Error('useChats must be used within ChatsProvider')
  return ctx
}
