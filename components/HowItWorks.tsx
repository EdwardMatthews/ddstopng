'use client'

import { Upload, Cog, Download } from 'lucide-react'
import { motion } from 'framer-motion'

interface HowItWorksProps {
  dictionary: {
    title: string
    subtitle: string
    steps: {
      upload: {
        title: string
        description: string
      }
      convert: {
        title: string
        description: string
      }
      download: {
        title: string
        description: string
      }
    }
  }
}

export default function HowItWorks({ dictionary }: HowItWorksProps) {
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      ...dictionary.steps.upload
    },
    {
      icon: <Cog className="w-8 h-8" />,
      ...dictionary.steps.convert
    },
    {
      icon: <Download className="w-8 h-8" />,
      ...dictionary.steps.download
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-center text-gray-600">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 