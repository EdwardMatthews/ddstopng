import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { getDictionary } from '@/i18n/getDictionary'
import { DictionaryProvider } from '@/i18n/DictionaryProvider'
import { ValidLocale, locales } from '@/i18n/config'
import Header from '@/components/Header'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DDS to PNG Converter',
  description: 'Convert DDS files to PNG format online - Free, Fast, and Secure',
  icons: {
    icon: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: ['/logo.svg'],
    apple: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      }
    ]
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: ValidLocale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <DictionaryProvider dictionary={dictionary}>
          <Header />
          {children}
        </DictionaryProvider>
      </body>
    </html>
  )
} 