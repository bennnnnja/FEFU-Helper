import en from './en'
import ru from './ru'

export type Lang = 'ru' | 'en'
export type TranslationKey = keyof typeof en

export const dictionaries: Record<Lang, typeof en> = { en, ru }
