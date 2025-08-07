// src/app/api/backend/[...path]/route.ts
import { NextRequest } from 'next/server'

const BACKEND_URL = `${process.env.BACKEND_URL}`
const MAX_RETRIES = 5 
const INITIAL_RETRY_DELAY = 5000
const BACKEND_TIMEOUT = 60000 

export const dynamic = 'force-dynamic'

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT)

    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId))

    if (!response.ok && retries > 0) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response

  } catch (error) {
    if (retries <= 0) throw error
    
    // aumenta progressivamente o tempo de espera
    const delay = INITIAL_RETRY_DELAY * (MAX_RETRIES - retries + 1)
    
    await new Promise(resolve => setTimeout(resolve, delay))
    return fetchWithRetry(url, options, retries - 1)
  }
}

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

    const startTime = Date.now()
    const backendResponse = await fetchWithRetry(url.toString(), {
      method: request.method,
      headers,
      body,
      credentials: 'include'
    })

    const responseBody = await backendResponse.text()

    const responseHeaders = new Headers(backendResponse.headers)
    responseHeaders.delete('content-encoding')
    responseHeaders.delete('content-length') 
    responseHeaders.delete('transfer-encoding')

    // Headers CORS
    responseHeaders.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*')
    responseHeaders.set('Access-Control-Allow-Credentials', 'true')
    responseHeaders.set('Access-Control-Expose-Headers', 'Set-Cookie')

    return new Response(responseBody, {
      status: backendResponse.status,
      headers: responseHeaders
    })

  } catch (error) {
    console.error('Erro ao conectar ao backend:', error)
    return new Response(JSON.stringify({
      error: 'Serviço em inicialização',
      message: 'O sistema está iniciando. Por favor, aguarde e tente novamente em alguns instantes.',
      retryAfter: 30 // Segundos
    }), {
      status: 503, // Service Unavailable
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '30',
        'X-Backend-Status': 'starting'
      }
    })
  }
}

export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const DELETE = handleRequest
export const PATCH = handleRequest