import { useState } from 'react'
import { ArrowLeftRight, Copy, Volume2, Check } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import { speechLang, translateText, type TranslateLang } from '../lib/translate'
import type { TranslationKey } from '../i18n'

const LANGS: { value: TranslateLang; label: TranslationKey }[] = [
  { value: 'en', label: 'langEnglish' },
  { value: 'zh', label: 'langChinese' },
  { value: 'ru', label: 'langRussian' },
]

export default function Translator() {
  const { t } = useLang()
  const [source, setSource] = useState<TranslateLang>('en')
  const [target, setTarget] = useState<TranslateLang>('zh')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const swap = () => {
    setSource(target)
    setTarget(source)
    setInput(output)
    setOutput(input)
  }

  const onTranslate = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setOutput('')
    const res = await translateText(input, source, target)
    setLoading(false)
    if (res.error) setError(t('error'))
    else setOutput(res.text)
  }

  const onCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const onSpeak = () => {
    if (!output) return
    const u = new SpeechSynthesisUtterance(output)
    u.lang = speechLang(target)
    speechSynthesis.cancel()
    speechSynthesis.speak(u)
  }

  return (
    <div className="pb-6">
      <PageHeader title={t('translatorTitle')} />

      <div className="px-4 space-y-4">
        {/* Language selectors */}
        <div className="flex items-center gap-2">
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as TranslateLang)}
            className="flex-1 h-11 rounded-card bg-white dark:bg-night-card px-3 text-sm font-semibold text-slate-800 dark:text-slate-100 shadow-sm outline-none"
          >
            {LANGS.map((l) => (
              <option key={l.value} value={l.value}>
                {t(l.label)}
              </option>
            ))}
          </select>
          <button
            onClick={swap}
            className="h-11 w-11 shrink-0 grid place-items-center rounded-card bg-white dark:bg-night-card text-brand shadow-sm"
            aria-label="Swap languages"
          >
            <ArrowLeftRight size={18} />
          </button>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value as TranslateLang)}
            className="flex-1 h-11 rounded-card bg-white dark:bg-night-card px-3 text-sm font-semibold text-slate-800 dark:text-slate-100 shadow-sm outline-none"
          >
            {LANGS.map((l) => (
              <option key={l.value} value={l.value}>
                {t(l.label)}
              </option>
            ))}
          </select>
        </div>

        {/* Input */}
        <Card className="p-3">
          <textarea
            value={input}
            maxLength={5000}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('enterText')}
            rows={4}
            className="w-full resize-none bg-transparent outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
          <div className="text-right text-[11px] text-slate-400">{input.length}/5000</div>
        </Card>

        {/* Translate button */}
        <button
          onClick={onTranslate}
          disabled={loading || !input.trim()}
          className="w-full h-12 rounded-card bg-brand text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] transition-transform"
        >
          <ArrowLeftRight size={18} />
          {loading ? t('loading') : t('translate')}
        </button>

        {/* Output */}
        <Card className="p-4 min-h-[120px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t('translation')}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={onCopy} className="text-slate-400 hover:text-brand" aria-label={t('copy')}>
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
              <button onClick={onSpeak} className="text-slate-400 hover:text-brand" aria-label={t('speak')}>
                <Volume2 size={18} />
              </button>
            </div>
          </div>
          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : output ? (
            <p className="text-sm text-slate-800 dark:text-slate-100 whitespace-pre-wrap">
              {output}
            </p>
          ) : (
            <p className="text-sm text-slate-400">{t('translationPlaceholder')}</p>
          )}
        </Card>
      </div>
    </div>
  )
}
