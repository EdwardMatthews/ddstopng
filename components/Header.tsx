import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  lang: string
}

export default function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Site Name */}
          <Link href={`/${lang}`} className="flex items-center space-x-3">
            <div className="hover:animate-header-logo-hover">
              <Image
                src="/logo.svg"
                alt="DDS to PNG Converter"
                width={32}
                height={24}
                className="w-8 h-6"
              />
            </div>
            <span 
              className="text-xl font-semibold text-gray-900 opacity-0 translate-x-[-20px] animate-header-logo-slide"
              style={{ animationDelay: '100ms' }}
            >
              DDS to PNG
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}