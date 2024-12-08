'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQProps {
  dictionary: {
    title: string
    items: {
      what: {
        question: string
        answer: string
      }
      why: {
        question: string
        answer: string
      }
      limits: {
        question: string
        answer: string
      }
      security: {
        question: string
        answer: string
      }
      formats: {
        question: string
        answer: string
      }
    }
  }
}

export default function FAQ({ dictionary }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    dictionary.items.what,
    dictionary.items.why,
    dictionary.items.limits,
    dictionary.items.security,
    dictionary.items.formats
  ]

  return (
    <section 
      className="py-20 bg-gray-50"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="faq-heading"
          className="text-3xl font-bold text-center text-gray-900 mb-4"
        >
          {dictionary.title}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Common questions about DDS to PNG conversion process and our online converter
        </p>

        <div 
          className="space-y-4"
          itemScope 
          itemType="https://schema.org/FAQPage"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm"
              initial={false}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span 
                  className="text-lg font-medium text-gray-900"
                  itemProp="name"
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div 
                      className="px-6 pb-4 text-gray-600"
                      itemProp="text"
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 