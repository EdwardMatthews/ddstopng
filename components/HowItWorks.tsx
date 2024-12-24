import { Upload, Cog, Download } from 'lucide-react'

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
      ...dictionary.steps.upload,
      ariaLabel: "Step 1: Upload DDS file"
    },
    {
      icon: <Cog className="w-8 h-8" />,
      ...dictionary.steps.convert,
      ariaLabel: "Step 2: Convert DDS to PNG"
    },
    {
      icon: <Download className="w-8 h-8" />,
      ...dictionary.steps.download,
      ariaLabel: "Step 3: Download PNG file"
    }
  ]

  return (
    <section 
      className="py-20 bg-gray-50"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 
            id="how-it-works-heading"
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            {dictionary.title}
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {dictionary.subtitle}
          </p>
        </div>

        <div 
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
          role="list"
          aria-label="DDS to PNG conversion steps"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative opacity-0 translate-y-5 animate-how-it-works-step"
              style={{ animationDelay: `${index * 200}ms` }}
              role="listitem"
              aria-label={step.ariaLabel}
            >
              <div className="flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4"
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-center text-gray-600 max-w-xs">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div 
                  className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 