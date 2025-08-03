import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up']

const PROXY_PATH = '/api/proxy'
const BACKEND_URL = process.env.BACKEND_URL

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith(PROXY_PATH)) {
    console.log('pathname:', pathname)
    console.log('BACKEND_URL:', BACKEND_URL)
    // Remove o prefixo do proxy e adiciona o caminho do backend
    const apiPath = pathname.slice(PROXY_PATH.length)
    const proxyUrl = new URL(apiPath + req.nextUrl.search, BACKEND_URL)
    console.log('apiPath:', apiPath)

    console.log('final URL:', apiPath + req.nextUrl.search)

    // Clona a requisição original para o backend
    return NextResponse.rewrite(proxyUrl, {
      request: {
        headers: new Headers(req.headers)
      }
    })
  }

  const token = req.cookies.get('token')?.value
  const isPublic = PUBLIC_PATHS.includes(pathname)

  if (!token && !isPublic) {
    // user não autenticado tentando acessar rota privada
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  if (token && isPublic) {
    // user autenticado tentando acessar rota pública
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
    '/api/proxy/:path*'
  ],
}
