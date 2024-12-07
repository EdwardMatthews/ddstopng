'use client'

import { Shield, Zap, Download, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeaturesSectionProps {
  dictionary: {
    title: string
    subtitle: string
    items: {
      speed: {
        title: string
        description: string
      }
      security: {
        title: string
        description: string
      }
      free: {
        title: string
        description: string
      }
      easy: {
        title: string
        description: string
      }
    }
  }
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function FeaturesSection({ dictionary }: FeaturesSectionProps) {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      ...dictionary.items.speed
    },
    {
      icon: <Shield className="w-6 h-6" />,
      ...dictionary.items.security
    },
    {
      icon: <Download className="w-6 h-6" />,
      ...dictionary.items.free
    },
    {
      icon: <Smile className="w-6 h-6" />,
      ...dictionary.items.easy
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {dictionary.subtitle}
          </p>
        </div>

        <motion.div 
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={item}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 