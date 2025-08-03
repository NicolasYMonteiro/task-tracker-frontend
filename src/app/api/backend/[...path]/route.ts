// src/app/api/backend/[...path]/route.ts
import { NextRequest } from 'next/server'

const BACKEND_URL = `${process.env.BACKEND_URL}`

export const dynamic = 'force-dynamic'

async function handleRequest(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname.replace('/api/backend/', '')
    const url = new URL(path + request.nextUrl.search, BACKEND_URL)

    const headers = new Headers()
    request.headers.forEach((value, key) => {
      if (!['host', 'referer', 'content-length'].includes(key.toLowerCase())) {
        headers.set(key, value)
      }
    })

    let body: BodyInit | null = null
    if (!['GET', 'HEAD'].includes(request.method)) {
      body = await request.text()
    }

    const backendResponse = await fetch(url.toString(), {
      method: request.method,
      headers,
      body,
      credentials: 'include'
    })

    const responseBody = await backendResponse.text()

    const responseHeaders = new Headers(backendResponse.headers)

    // 🔴 Remover headers que causam problemas
    responseHeaders.delete('content-encoding')
    responseHeaders.delete('content-length') // Pode ser inconsistente após modificação
    responseHeaders.delete('transfer-encoding')

    // ✅ Headers CORS
    responseHeaders.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*')
    responseHeaders.set('Access-Control-Allow-Credentials', 'true')
    responseHeaders.set('Access-Control-Expose-Headers', 'Set-Cookie')


    return new Response(responseBody, {
      status: backendResponse.status,
      headers: responseHeaders
    })

  } catch (error) {
    console.error('Proxy error:', error)
    return new Response(JSON.stringify({
      error: 'Bad Gateway',
      message: 'Failed to connect to backend service'
    }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const DELETE = handleRequest
export const PATCH = handleRequest