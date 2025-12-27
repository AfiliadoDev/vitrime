import { NextRequest, NextResponse } from 'next/server'
import { validatePin, createAdminSession, checkRateLimit, recordLoginAttempt } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Pega IP do cliente para rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Verifica rate limiting
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Muitas tentativas. Tente novamente em 15 minutos.'
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { pin } = body

    // Valida PIN
    if (!validatePin(pin)) {
      recordLoginAttempt(ip, false)

      return NextResponse.json(
        {
          success: false,
          error: 'PIN inválido',
          remainingAttempts: rateLimit.remainingAttempts
        },
        { status: 401 }
      )
    }

    // Login bem-sucedido
    recordLoginAttempt(ip, true)
    await createAdminSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao fazer login' },
      { status: 500 }
    )
  }
}
