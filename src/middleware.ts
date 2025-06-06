import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

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
  ],
}
