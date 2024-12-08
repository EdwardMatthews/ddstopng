'use client'

import { motion } from 'framer-motion'

interface IntroSectionProps {
  dictionary: {
    title: string
    description: string[]
    useCases: {
      title: string
      items: string[]
    }
    freeToUse: {
      title: string
      description: string
    }
  }
}

export default function IntroSection({ dictionary }: IntroSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dictionary.title}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-12"
        >
          {/* Description */}
          <div className="space-y-4">
            {dictionary.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {dictionary.useCases.title}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {dictionary.useCases.items.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Free to Use */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {dictionary.freeToUse.title}
            </h3>
            <p className="text-blue-700">
              {dictionary.freeToUse.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 