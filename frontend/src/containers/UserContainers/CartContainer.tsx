import CartBudget from '@/components/Cart/CartBudget'
import ProductCardResponsive from '@/components/Common/ProductCard/ProductCardHorizontal'
import { dummyProducts } from '@/sample data/discountedProducts'
import React from 'react'

const CartContainer = () => {
  return (
    <div className='px-4 flex flex-col lg:flex-row gap-6'>
      <ProductCardResponsive product={dummyProducts[0]} mode='cart'/>
      <CartBudget subtotal={100}/>
    </div>
  )
}

export default CartContainer
