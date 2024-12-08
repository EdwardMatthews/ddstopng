import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DDS to PNG Converter',
  description: 'Convert DDS files to PNG format online - Free, Fast, and Secure',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 