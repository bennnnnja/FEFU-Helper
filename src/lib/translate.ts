export type TranslateLang = 'en' | 'zh' | 'ru'

export interface TranslateResult {
  text: string
  error?: string
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
    const url =
      'https://api.mymemory.translated.net/get?q=' +
      encodeURIComponent(trimmed) +
      `&langpair=${source}|${target}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('translate request failed')
    const data = await res.json()
    const translated: string | undefined = data?.responseData?.translatedText
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
