import type { ReactNode } from 'react'

/**
 * Centers the app in a phone-sized frame. On desktop a light-grey
 * "device" border is shown around the 420px-wide screen.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-200 dark:bg-slate-950 flex justify-center sm:py-6">
      <div className="relative w-full max-w-phone bg-canvas dark:bg-night-bg sm:rounded-[2.2rem] sm:shadow-2xl sm:ring-8 sm:ring-slate-300 dark:sm:ring-slate-800 overflow-hidden flex flex-col min-h-screen sm:min-h-[860px] sm:h-[860px]">
        {children}
      </div>
    </div>
  )
}
