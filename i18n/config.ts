export const defaultLocale = 'en'
export const locales = ['en', 'zh', 'id'] as const
export type ValidLocale = typeof locales[number]

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  zh: '中文',
  id: 'Bahasa Indonesia'
}

export function isValidLocale(locale: string): locale is ValidLocale {
  return Array.from(locales).includes(locale as ValidLocale)
} 