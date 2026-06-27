export type TranslateLang = 'en' | 'zh' | 'ru'

export interface TranslateResult {
  text: string
  error?: string
}

/**
 * Optional contact email for the MyMemory API. Providing one raises the
 * free daily quota (anonymous use is limited and starts returning bad /
 * garbage matches once exhausted). Change it to your own address if needed.
 */
const MYMEMORY_EMAIL = 'fefu.helper.demo@gmail.com'

interface MyMemoryMatch {
  translation?: string
  quality?: string | number
  match?: number
  'created-by'?: string
}

/** Detect MyMemory quota / warning strings that come back as "translations". */
function isWarning(text: string): boolean {
  const t = text.toUpperCase()
  return t.includes('MYMEMORY WARNING') || t.includes('QUOTA') || t.includes('INVALID')
}

/**
 * Pick the best translation from a MyMemory response.
 *
 * MyMemory's `responseData.translatedText` is just the top translation-memory
 * match, which is often a low-quality, user-contributed entry (this is what
 * produced nonsense like "САША БИБЛИОТЕКА ПОЗОРНАЯ"). The `matches` array also
 * contains the actual machine-translation result (`created-by` = "MT!"), which
 * is far more reliable. We prefer the MT entry, then the highest-scoring clean
 * match, and only fall back to translatedText.
 */
function pickTranslation(data: any): string {
  const fallback: string = data?.responseData?.translatedText ?? ''
  const matches: MyMemoryMatch[] = Array.isArray(data?.matches) ? data.matches : []

  const clean = matches.filter(
    (m): m is MyMemoryMatch & { translation: string } =>
      typeof m.translation === 'string' && m.translation.trim() !== '' && !isWarning(m.translation),
  )

  // 1. Prefer the machine-translation entry.
  const mt = clean.find((m) => String(m['created-by'] ?? '').toUpperCase().includes('MT'))
  if (mt) return mt.translation

  // 2. Otherwise the highest-scoring match (match score, then quality).
  if (clean.length) {
    clean.sort(
      (a, b) =>
        (b.match ?? 0) - (a.match ?? 0) ||
        Number(b.quality ?? 0) - Number(a.quality ?? 0),
    )
    return clean[0].translation
  }

  // 3. Last resort: the raw translatedText (unless it's a warning).
  return isWarning(fallback) ? '' : fallback
}

/**
 * Translate text using the free MyMemory API (no key required).
 * langpair format: source|target, e.g. en|zh
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
    const params = new URLSearchParams({
      q: trimmed,
      langpair: `${source}|${target}`,
      mt: '1', // ask for machine translation
    })
    if (MYMEMORY_EMAIL) params.set('de', MYMEMORY_EMAIL)

    const res = await fetch('https://api.mymemory.translated.net/get?' + params.toString())
    if (!res.ok) throw new Error('translate request failed')
    const data = await res.json()
    if (data?.responseStatus && Number(data.responseStatus) !== 200) {
      throw new Error('translate api error')
    }

    const translated = pickTranslation(data)
    if (!translated) throw new Error('empty translation')
    return { text: translated }
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
