import ContainerOverlay from '@/app/components/container-overlay'
import { PROJECT_NAME } from '@/config'
import CartSection from '@/app/sections/cart'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: `Cart | ${PROJECT_NAME}`
}

const CartPage = () => {
  return (
    <ContainerOverlay paddingVertical={5}>
        <CartSection />
    </ContainerOverlay>
  )
}

export default CartPage