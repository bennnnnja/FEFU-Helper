interface ChatBubbleProps {
  text: string
  mine: boolean
  author?: string
  time?: string
}

export default function ChatBubble({ text, mine, author, time }: ChatBubbleProps) {
  return (
    <div className={'flex ' + (mine ? 'justify-end' : 'justify-start')}>
      <div
        className={
          'max-w-[78%] px-3.5 py-2 rounded-2xl text-sm shadow-sm ' +
          (mine
            ? 'bg-brand text-white rounded-br-md'
            : 'bg-white dark:bg-night-card text-slate-800 dark:text-slate-100 rounded-bl-md')
        }
      >
        {!mine && author && (
          <div className="text-[11px] font-semibold text-brand mb-0.5">{author}</div>
        )}
        <p className="whitespace-pre-wrap break-words">{text}</p>
        {time && (
          <div
            className={
              'text-[10px] mt-1 text-right ' +
              (mine ? 'text-blue-100' : 'text-slate-400')
            }
          >
            {time}
          </div>
        )}
      </div>
    </div>
  )
}
