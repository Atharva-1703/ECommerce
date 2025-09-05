import React from 'react'
import { dummyProducts } from '@/sample data/discountedProducts'
import ProductCardResponsive from '@/components/Common/ProductCard/ProductCardHorizontal'


const FavouritesContainer = () => {
  return (
    <div>
        <ProductCardResponsive  product={dummyProducts[0]} mode='favourites'/>
    </div>
  )
}

export default FavouritesContainer
