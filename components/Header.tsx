'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { motion } from 'framer-motion'

export default function Header() {
  const params = useParams()
  const lang = params?.lang as string || 'en'

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Site Name */}
          <Link href={`/${lang}`} className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo.svg"
                alt="DDS to PNG Converter"
                width={32}
                height={24}
                className="w-8 h-6"
              />
            </motion.div>
            <motion.span 
              className="text-xl font-semibold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              DDS to PNG
            </motion.span>
          </Link>

          {/* Language Switcher */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LanguageSwitcher />
          </motion.div>
        </div>
      </div>
    </header>
  )
} 