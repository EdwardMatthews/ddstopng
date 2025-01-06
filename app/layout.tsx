import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import '@/app/globals.css'
import { getDictionary } from '@/i18n/getDictionary'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary('en')
  
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    metadataBase: new URL('https://www.ddstopng.pro'),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/',
        'zh': '/zh',
        'id': '/id'
      }
    },
    openGraph: {
      title: dictionary.metadata.ogTitle,
      description: dictionary.metadata.ogDescription,
      url: 'https://www.ddstopng.pro',
      siteName: dictionary.metadata.siteName,
      locale: 'en',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.twitterTitle,
      description: dictionary.metadata.twitterDescription,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/logo.svg',
      apple: '/logo.svg',
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 