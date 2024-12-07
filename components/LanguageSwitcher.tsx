'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, localeNames, type ValidLocale } from '@/i18n/config'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = (newLocale: ValidLocale) => {
    const currentPathname = pathname
    const segments = currentPathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  const currentLocale = pathname.split('/')[1] as ValidLocale

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={currentLocale}
        onChange={(e) => handleChange(e.target.value as ValidLocale)}
        className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  )
} 