import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// Chave secreta para JWT (gerada automaticamente)
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sua-chave-super-secreta-mude-isso-em-producao-' + process.env.ADMIN_PIN
)

const TOKEN_NAME = 'admin_session'
const TOKEN_DURATION = 60 * 60 * 2 // 2 horas

// Rate limiting em memória (previne brute force)
const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutos

/**
 * Previne ataques de timing ao comparar PINs
 * Usa comparação de tempo constante
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

/**
 * Verifica rate limiting para prevenir brute force
 */
export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now()
  const attempt = loginAttempts.get(ip)

  // Limpa tentativas antigas
  if (attempt && now > attempt.resetAt) {
    loginAttempts.delete(ip)
  }

  const current = loginAttempts.get(ip)

  if (!current) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 }
  }

  if (current.count >= MAX_ATTEMPTS) {
    return { allowed: false, remainingAttempts: 0 }
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - current.count - 1 }
}

/**
 * Registra tentativa de login
 */
export function recordLoginAttempt(ip: string, success: boolean) {
  const now = Date.now()
  const attempt = loginAttempts.get(ip)

  if (success) {
    // Limpa tentativas em caso de sucesso
    loginAttempts.delete(ip)
    return
  }

  if (!attempt) {
    loginAttempts.set(ip, {
      count: 1,
      resetAt: now + LOCKOUT_DURATION
    })
  } else {
    attempt.count++
    attempt.resetAt = now + LOCKOUT_DURATION
  }
}

/**
 * Valida o PIN do admin
 */
export function validatePin(pin: string): boolean {
  const adminPin = process.env.ADMIN_PIN || '98099596'

  // Validação básica
  if (!pin || typeof pin !== 'string') {
    return false
  }

  // Remove espaços e caracteres não numéricos
  const cleanPin = pin.replace(/\D/g, '')

  // Verifica tamanho
  if (cleanPin.length < 6 || cleanPin.length > 8) {
    return false
  }

  // Comparação segura contra timing attacks
  return timingSafeEqual(cleanPin, adminPin)
}

/**
 * Cria sessão de admin
 */
export async function createAdminSession() {
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_DURATION}s`)
    .sign(SECRET_KEY)

  const cookieStore = await cookies()
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_DURATION,
    path: '/'
  })

  return true
}

/**
 * Verifica se o admin está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(TOKEN_NAME)

    if (!token?.value) {
      return false
    }

    const verified = await jwtVerify(token.value, SECRET_KEY)
    return verified.payload.admin === true
  } catch {
    return false
  }
}

/**
 * Remove sessão de admin
 */
export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_NAME)
}

/**
 * Sanitiza string para prevenir XSS
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/[<>'"]/g, '')
    .trim()
    .slice(0, 500) // Limite de caracteres
}

/**
 * Valida URL de imagem
 */
export function validateImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)

    // Apenas HTTPS
    if (parsed.protocol !== 'https:') {
      return false
    }

    // Apenas domínios da Shopee
    const allowedDomains = [
      'shopee.com.br',
      'shopee.com',
      'cf.shopee.com.br',
      'down-br.img.susercontent.com',
      'img.susercontent.com'
    ]

    return allowedDomains.some(domain =>
      parsed.hostname === domain || parsed.hostname.endsWith('.' + domain)
    )
  } catch {
    return false
  }
}

/**
 * Valida URL de link de afiliado
 */
export function validateAffiliateUrl(url: string): boolean {
  try {
    const parsed = new URL(url)

    // Apenas HTTPS
    if (parsed.protocol !== 'https:') {
      return false
    }

    // Apenas domínios Shopee
    const allowedDomains = ['shope.ee', 'shopee.com.br', 'shopee.com']

    return allowedDomains.some(domain =>
      parsed.hostname === domain || parsed.hostname.endsWith('.' + domain)
    )
  } catch {
    return false
  }
}
