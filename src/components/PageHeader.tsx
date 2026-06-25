import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PageHeader({ title }: { title: string }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 bg-canvas/90 dark:bg-night-bg/90 backdrop-blur px-4 py-3 flex items-center gap-2">
      <button
        onClick={() => navigate(-1)}
        className="h-9 w-9 grid place-items-center rounded-full bg-white dark:bg-night-card text-slate-700 dark:text-slate-200 shadow-sm"
        aria-label="Back"
      >
        <ChevronLeft size={20} />
      </button>
      <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
    </header>
  )
}
