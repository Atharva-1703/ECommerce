import CartBudget from '@/components/Cart/CartBudget'
import ProductCardResponsive from '@/components/Common/ProductCard/ProductCardHorizontal'
import { dummyProducts } from '@/sample data/discountedProducts'
import React from 'react'

const CartContainer = () => {
  return (
    <div className='px-4'>
      <ProductCardResponsive product={dummyProducts[0]} mode='cart'/>
      <CartBudget/>
    </div>
  )
}

export default CartContainer
