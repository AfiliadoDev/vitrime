import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/products'

// GET - Lista todos os produtos
export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

// POST - Adiciona novo produto (requer autenticação)
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, image, affiliateLink, category, images } = body

    const result = await addProduct({
      name,
      description,
      image,
      images,
      affiliateLink,
      category,
      createdAt: new Date().toISOString()
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro ao adicionar produto:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao adicionar produto' },
      { status: 500 }
    )
  }
}

// PUT - Atualiza produto (requer autenticação)
export async function PUT(request: NextRequest) {
  try {
    // Verifica autenticação
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, name, description, image, affiliateLink, category, images, createdAt } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do produto é obrigatório' },
        { status: 400 }
      )
    }

    const result = await updateProduct(id, {
      name,
      description,
      image,
      images,
      affiliateLink,
      category,
      createdAt
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

// DELETE - Remove produto (requer autenticação)
export async function DELETE(request: NextRequest) {
  try {
    // Verifica autenticação
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do produto é obrigatório' },
        { status: 400 }
      )
    }

    const result = await deleteProduct(parseInt(id))

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar produto' },
      { status: 500 }
    )
  }
}
