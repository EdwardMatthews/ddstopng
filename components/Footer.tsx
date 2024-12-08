'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Twitter, Facebook, Linkedin, Github } from 'lucide-react'

interface FooterProps {
  dictionary: {
    about: {
      title: string
      description: string
    }
    navigation: {
      title: string
      items: {
        label: string
        href: string
      }[]
    }
    tools: {
      title: string
      items: {
        label: string
        href: string
      }[]
    }
    social: {
      title: string
      share: string
      github: string
    }
  }
}

export default function Footer({ dictionary }: FooterProps) {
  const shareUrl = 'https://ddstopng.pro'
  const shareText = 'Convert DDS files to PNG online - Free, Fast, and Secure'
  const githubUrl = 'https://github.com/EdwardMatthews/ddstopng'

  const socialLinks = [
    {
      icon: <Twitter className="w-5 h-5" />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      label: 'Twitter'
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      label: 'Facebook'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      label: 'LinkedIn'
    }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">
              {dictionary.about.title}
            </h3>
            <p className="text-sm leading-relaxed">
              {dictionary.about.description}
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">
              {dictionary.navigation.title}
            </h3>
            <ul className="space-y-2">
              {dictionary.navigation.items.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tools Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">
              {dictionary.tools.title}
            </h3>
            <ul className="space-y-2">
              {dictionary.tools.items.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">
              {dictionary.social.title}
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
                <span>{dictionary.social.github}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 