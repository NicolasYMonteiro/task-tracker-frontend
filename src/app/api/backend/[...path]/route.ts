// src/app/api/backend/[...path]/route.ts
import { NextRequest } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL!

export async function GET(req: NextRequest, context: { params: { path: string[] } }) {
  return await proxyRequest(req, context)
}

export async function POST(req: NextRequest, context: { params: { path: string[] } }) {
  return await proxyRequest(req, context)
}

// ... outros métodos (PUT, DELETE, PATCH) mantidos da mesma forma

async function proxyRequest(req: NextRequest, context: { params: { path: string[] } }) {
  // Envolvemos o acesso aos params em uma Promise para satisfazer o Next.js
  const params = await Promise.resolve(context.params)
  const pathParts = params?.path || []
  const path = pathParts.join('/')
  const search = req.nextUrl.search
  const url = `${BACKEND_URL}/${path}${search}`

  const headers = new Headers(req.headers)
  headers.set('host', new URL(BACKEND_URL).host)

  const method = req.method

  const body =
    method === 'GET' || method === 'HEAD'
      ? undefined
      : await req.text()
      
  console.log('Proxying request to:', url)

  try {
    const backendRes = await fetch(url, {
      method,
      headers,
      body,
      credentials: 'include',
    })

    const resHeaders = new Headers(backendRes.headers)
    resHeaders.set('Access-Control-Allow-Origin', req.headers.get('origin') || '*')
    resHeaders.set('Access-Control-Allow-Credentials', 'true')

    const responseBody = await backendRes.text()

    return new Response(responseBody, {
      status: backendRes.status,
      headers: resHeaders,
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}