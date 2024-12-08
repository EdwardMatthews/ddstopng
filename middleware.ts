import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from './i18n/config'

function getLocale(request: NextRequest): string {
  // 检查 cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale
  }

  // 检查是否是搜索引擎爬虫
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent)
  
  // 如果是爬虫且没有其他语言指示，返回默认语言
  if (isBot) {
    return defaultLocale
  }

  try {
    // 获取 Accept-Language header
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // 如果没有语言相关的 header，返回默认语言
    if (!negotiatorHeaders['accept-language']) {
      return defaultLocale
    }

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    return languages.length > 0
      ? matchLocale(languages, locales, defaultLocale)
      : defaultLocale
  } catch (error) {
    console.error('Language detection error:', error)
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 对于静态文件和API路由，直接跳过处理
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next()
  }

  // 检查路径是否已包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 如果路径已包含语言前缀，直接使用该语言
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // 只有在路径不包含语言前缀时，才进行语言检测
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  const response = NextResponse.redirect(newUrl)
  
  // 只为非爬虫设置 cookie
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent)
  if (!isBot) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
    '/'
  ],
} 