import { getDictionary } from '@/i18n/getDictionary'
import { DictionaryProvider } from '@/i18n/DictionaryProvider'
import { ValidLocale, locales } from '@/i18n/config'
import Header from '@/components/Header'

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
    <DictionaryProvider dictionary={dictionary}>
      <div className="min-h-screen flex flex-col" lang={lang}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </DictionaryProvider>
  )
} 