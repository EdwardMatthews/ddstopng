import { getDictionary } from '@/i18n/getDictionary'
import { DictionaryProvider } from '@/i18n/DictionaryProvider'
import { ValidLocale, locales } from '@/i18n/config'
import Header from '@/components/Header'

export async function generateMetadata({ params: { lang } }: { params: { lang: ValidLocale } }) {
  const dictionary = await getDictionary(lang)
  
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    metadataBase: new URL('https://www.ddstopng.pro'),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
        'id': '/id'
      }
    },
    openGraph: {
      title: dictionary.metadata.ogTitle,
      description: dictionary.metadata.ogDescription,
      url: `https://www.ddstopng.pro/${lang}`,
      siteName: dictionary.metadata.siteName,
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.twitterTitle,
      description: dictionary.metadata.twitterDescription,
    },
    icons: {
      icon: '/logo.svg',
      shortcut: '/logo.svg',
      apple: '/logo.svg',
    }
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: ValidLocale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <div className="min-h-screen flex flex-col" lang={lang}>
            <Header lang={lang} />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </DictionaryProvider>
      </body>
    </html>
  )
} 