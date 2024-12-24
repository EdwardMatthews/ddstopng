'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { locales, type ValidLocale } from '@/i18n/config'

const LANGUAGE_PREFERENCE_KEY = 'language_preference_shown'

export default function LanguageDetector() {
  const router = useRouter()
  const [showDialog, setShowDialog] = useState(false)
  const [detectedLocale, setDetectedLocale] = useState<ValidLocale | null>(null)

  useEffect(() => {
    // 检查是否已经显示过语言选择
    const hasShownPreference = localStorage.getItem(LANGUAGE_PREFERENCE_KEY)
    if (hasShownPreference) {
      return
    }

    // 获取浏览器语言
    const browserLang = navigator.language.split('-')[0]
    
    // 检查是否是英文
    if (browserLang === 'en') {
      return
    }

    // 检查是否是支持的语言
    const supportedLocale = locales.find(locale => locale === browserLang)
    if (supportedLocale && supportedLocale !== 'en') {
      setDetectedLocale(supportedLocale)
      setShowDialog(true)
    }
  }, [])

  const handleAccept = () => {
    if (detectedLocale) {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, 'shown')
      router.push(`/${detectedLocale}`)
    }
  }

  const handleDecline = () => {
    localStorage.setItem(LANGUAGE_PREFERENCE_KEY, 'shown')
    setShowDialog(false)
  }

  if (!showDialog) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-4">
          Language Preference
        </h3>
        <p className="text-gray-600 mb-6">
          Would you like to switch to {detectedLocale} version?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            No, stay in English
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Yes, switch language
          </button>
        </div>
      </div>
    </div>
  )
}