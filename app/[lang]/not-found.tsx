'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ValidLocale } from '@/i18n/config'

const errorMessages = {
  en: {
    title: "404 - Page Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    backHome: "Back to Home"
  },
  zh: {
    title: "404 - 页面未找到",
    description: "抱歉，您访问的页面不存在。",
    backHome: "返回首页"
  },
  id: {
    title: "404 - Halaman Tidak Ditemukan",
    description: "Maaf, halaman yang Anda cari tidak ada.",
    backHome: "Kembali ke Beranda"
  }
}

export default function NotFound() {
  const params = useParams()
  const lang = (params?.lang as ValidLocale) || 'en'
  const messages = errorMessages[lang] || errorMessages.en

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">
          {messages.title}
        </h1>
        <p className="text-xl text-gray-600">
          {messages.description}
        </p>
        <Link
          href={`/${lang}`}
          className="inline-block px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {messages.backHome}
        </Link>
      </div>
    </div>
  )
} 