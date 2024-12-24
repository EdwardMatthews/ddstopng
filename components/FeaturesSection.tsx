import { Shield, Zap, Download, Smile } from 'lucide-react'

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
      ...dictionary.items.speed,
      ariaLabel: "Fast DDS to PNG conversion speed"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      ...dictionary.items.security,
      ariaLabel: "Secure DDS file conversion"
    },
    {
      icon: <Download className="w-6 h-6" />,
      ...dictionary.items.free,
      ariaLabel: "Free DDS to PNG downloads"
    },
    {
      icon: <Smile className="w-6 h-6" />,
      ...dictionary.items.easy,
      ariaLabel: "Easy DDS to PNG conversion"
    }
  ]

  return (
    <section className="py-20 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 
            id="features-heading" 
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            {dictionary.title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {dictionary.subtitle}
          </p>
        </div>

        <div 
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="DDS to PNG converter features"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 opacity-0 translate-y-4 animate-feature"
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
              role="listitem"
              aria-label={feature.ariaLabel}
            >
              <div 
                className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4"
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 