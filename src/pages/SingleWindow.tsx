import { useState } from 'react'
import { GraduationCap, Home as HomeIcon, FileText, Wallet, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import type { TranslationKey } from '../i18n'

const sections: {
  icon: typeof GraduationCap
  title: TranslationKey
  desc: TranslationKey
}[] = [
  { icon: GraduationCap, title: 'swStudy', desc: 'swStudyDesc' },
  { icon: HomeIcon, title: 'swDorm', desc: 'swDormDesc' },
  { icon: FileText, title: 'swDocs', desc: 'swDocsDesc' },
  { icon: Wallet, title: 'swFinance', desc: 'swFinanceDesc' },
]

export default function SingleWindow() {
  const { t } = useLang()
  const [active, setActive] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="pb-6">
      <PageHeader title={t('singleWindowTitle')} />
      <div className="px-4 space-y-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('singleWindowDesc')}</p>

        <div className="grid grid-cols-2 gap-3">
          {sections.map((s, i) => (
            <Card
              key={s.title}
              onClick={() => {
                setActive(i)
                setSent(false)
              }}
              className={
                'p-4 ' + (active === i ? 'ring-2 ring-brand' : '')
              }
            >
              <s.icon size={24} className="text-brand mb-2" />
              <div className="font-semibold text-sm text-slate-900 dark:text-white">
                {t(s.title)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t(s.desc)}</div>
            </Card>
          ))}
        </div>

        {active !== null && (
          <Card className="p-4">
            <div className="font-semibold text-slate-900 dark:text-white mb-2">
              {t(sections[active].title)}
            </div>
            {sent ? (
              <div className="flex items-center gap-2 text-green-500 font-medium">
                <CheckCircle2 size={20} /> {t('requestSent')}
              </div>
            ) : (
              <>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('describeIssue')}
                  rows={3}
                  className="w-full resize-none rounded-card bg-canvas dark:bg-slate-800 p-3 text-sm text-slate-800 dark:text-slate-100 outline-none"
                />
                <button
                  onClick={() => {
                    setSent(true)
                    setText('')
                  }}
                  disabled={!text.trim()}
                  className="w-full h-11 mt-3 rounded-card bg-brand text-white font-semibold disabled:opacity-40"
                >
                  {t('send')}
                </button>
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
