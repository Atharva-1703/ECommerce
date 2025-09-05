import React from 'react'

const CartBudget = () => {
  return (
    <div className='fixed bottom-0 right-0 flex flex-row w-full border-t z-50 bg-white justify-between p-2'>
        <span className='text-lg font-semibold'>Total Cart Cost</span>
      <button className='bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition hover:scale-105 w-32'>Buy All</button>
    </div>
  )
}

export default CartBudget
