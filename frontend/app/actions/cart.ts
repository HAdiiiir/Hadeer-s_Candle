// app/actions/cart.ts
'use server'

import { getCookie, setCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export async function getCart() {
  const cart = getCookie('cart', { cookies })
  return cart ? JSON.parse(cart) : []
}

export async function addToCart(item: any) {
  const currentCart = await getCart()
  // Add your cart logic here
  const newCart = [...currentCart, item]
  setCookie('cart', JSON.stringify(newCart), { cookies })
  return newCart
}