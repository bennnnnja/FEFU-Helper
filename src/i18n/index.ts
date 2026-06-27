import en from './en'
import ru from './ru'
import zh from './zh'

export type Lang = 'ru' | 'en' | 'zh'
export type TranslationKey = keyof typeof en

export const LANGS: Lang[] = ['ru', 'en', 'zh']

export const dictionaries: Record<Lang, typeof en> = { en, ru, zh }
