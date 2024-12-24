import FileUploadSection from '@/components/FileUploadSection'
import IntroSection from '@/components/IntroSection'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import LanguageDetector from '@/components/LanguageDetector'
import { getDictionary } from '@/i18n/getDictionary'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function Home() {
  const dictionary = await getDictionary('en')

  return (
    <>
      <Header lang="en" />
      <LanguageDetector />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <LanguageSwitcher />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="home" className="py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 mb-8">
              {dictionary.hero.title}
            </h1>
            <p className="text-xl text-center text-gray-600 mb-12">
              {dictionary.hero.subtitle}
            </p>
            <FileUploadSection dictionary={dictionary.hero} />
          </section>

          <section id="intro">
            <IntroSection dictionary={dictionary.intro} />
          </section>

          <section id="features">
            <FeaturesSection dictionary={dictionary.features} />
          </section>

          <section id="how-it-works">
            <HowItWorks dictionary={dictionary.howItWorks} />
          </section>

          <section id="faq">
            <FAQ dictionary={dictionary.faq} />
          </section>
        </div>
      </main>
      <Footer dictionary={dictionary.footer} />
    </>
  )
}