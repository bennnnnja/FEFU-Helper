export type TranslateLang = 'en' | 'zh' | 'ru'

export interface TranslateResult {
  text: string
  error?: string
}

/**
 * Optional contact email for the MyMemory fallback API. Providing one
 * raises the free daily quota. Change it to your own address if needed.
 */
const MYMEMORY_EMAIL = 'fefu.helper.demo@gmail.com'

/** Provider-specific language codes. */
const GOOGLE_CODES: Record<TranslateLang, string> = { en: 'en', ru: 'ru', zh: 'zh-CN' }

/* -------------------------------------------------------------------------- */
/*  Primary provider: Google Translate (free public "gtx" endpoint, no key)   */
/* -------------------------------------------------------------------------- */

async function googleTranslate(
  text: string,
  source: TranslateLang,
  target: TranslateLang,
): Promise<string> {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx' +
    `&sl=${GOOGLE_CODES[source]}&tl=${GOOGLE_CODES[target]}&dt=t&q=` +
    encodeURIComponent(text)

  const res = await fetch(url)
  if (!res.ok) throw new Error('google request failed')
  const data = await res.json()
  // Response shape: [[["译文","source", ...], ...], ...]
  const segments = data?.[0]
  if (!Array.isArray(segments)) throw new Error('bad google response')
  const out = segments.map((s: any[]) => (s && s[0]) || '').join('')
  if (!out.trim()) throw new Error('empty google translation')
  return out
}

/* -------------------------------------------------------------------------- */
/*  Fallback provider: MyMemory (free, no key, but lower quality)              */
/* -------------------------------------------------------------------------- */

interface MyMemoryMatch {
  translation?: string
  quality?: string | number
  match?: number
  'created-by'?: string
}

function isWarning(text: string): boolean {
  const t = text.toUpperCase()
  return t.includes('MYMEMORY WARNING') || t.includes('QUOTA') || t.includes('INVALID')
}

/** Prefer the machine-translation match over noisy translation-memory hits. */
function pickMyMemory(data: any): string {
  const fallback: string = data?.responseData?.translatedText ?? ''
  const matches: MyMemoryMatch[] = Array.isArray(data?.matches) ? data.matches : []
  const clean = matches.filter(
    (m): m is MyMemoryMatch & { translation: string } =>
      typeof m.translation === 'string' && m.translation.trim() !== '' && !isWarning(m.translation),
  )
  const mt = clean.find((m) => String(m['created-by'] ?? '').toUpperCase().includes('MT'))
  if (mt) return mt.translation
  if (clean.length) {
    clean.sort(
      (a, b) =>
        (b.match ?? 0) - (a.match ?? 0) || Number(b.quality ?? 0) - Number(a.quality ?? 0),
    )
    return clean[0].translation
  }
  return isWarning(fallback) ? '' : fallback
}

async function myMemoryTranslate(
  text: string,
  source: TranslateLang,
  target: TranslateLang,
): Promise<string> {
  const params = new URLSearchParams({ q: text, langpair: `${source}|${target}`, mt: '1' })
  if (MYMEMORY_EMAIL) params.set('de', MYMEMORY_EMAIL)
  const res = await fetch('https://api.mymemory.translated.net/get?' + params.toString())
  if (!res.ok) throw new Error('mymemory request failed')
  const data = await res.json()
  if (data?.responseStatus && Number(data.responseStatus) !== 200) {
    throw new Error('mymemory api error')
  }
  const out = pickMyMemory(data)
  if (!out) throw new Error('empty mymemory translation')
  return out
}

/* -------------------------------------------------------------------------- */

/**
 * Translate text. Tries Google Translate first (reliable, correct target
 * language), then falls back to MyMemory if Google is unreachable.
 */
export async function translateText(
  text: string,
  source: TranslateLang,
  target: TranslateLang,
): Promise<TranslateResult> {
  const trimmed = text.trim()
  if (!trimmed) return { text: '' }
  if (source === target) return { text: trimmed }

  try {
    return { text: await googleTranslate(trimmed, source, target) }
  } catch {
    // Google blocked/unreachable — try the fallback provider.
  }

  try {
    return { text: await myMemoryTranslate(trimmed, source, target) }
  } catch (e) {
    return { text: '', error: e instanceof Error ? e.message : 'translate error' }
  }
}

/** BCP-47 lang code for speechSynthesis. */
export function speechLang(lang: TranslateLang): string {
  switch (lang) {
    case 'en':
      return 'en-US'
    case 'zh':
      return 'zh-CN'
    case 'ru':
      return 'ru-RU'
  }
}
