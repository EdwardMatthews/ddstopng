import 'server-only'
import type { ValidLocale } from './config'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  zh: () => import('./dictionaries/zh.json').then(module => module.default),
  id: () => import('./dictionaries/id.json').then(module => module.default)
} as const

export const getDictionary = async (locale: ValidLocale) => {
  if (!(locale in dictionaries)) {
    throw new Error(`Dictionary not found for locale: ${locale}`)
  }
  return dictionaries[locale]()
} 