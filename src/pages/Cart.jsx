import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import CartItem from '../components/CartItem';

export default function Cart() {


  const {cart} = useSelector( (state) => state);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect( () => {
    setTotalAmount( cart.reduce( (acc, curr) => acc + curr.price,0));
  }, [cart]);

  return (
    <div className='flex w-full items-center justify-center min-h-[80vh]'>

      {
        cart.length > 0 ?   
        (<div className='flex lg:flex-row flex-col py-4 sm:py-0  justify-center  max-w-6xl lg:px-2 lg:gap-20'>

          <div className='flex flex-col lg:mx-0 mx-14 lg:w-[55%] my-8 gap-10 lg:gap-0 lg:my-0'>
            {
              cart.map( (item,index) => (<CartItem key={item.id} item={item} itemIndex={index} />))

            }
          </div>

          <div className='flex flex-col justify-between mx-20 sm:mx-14 sm:my-5 lg:mx-0  lg:my-24'>
          
            <div>
              <p className='text-2xl font-semibold text-green-800'>YOUR CART</p>
              <h1 className='text-5xl font-bold text-green-700'>SUMMARY</h1>
              <p className='text-xl font-bold text-gray-700 mt-7'>Total Items: {cart.length}</p>
            </div>
    
            <div className='flex justify-between flex-col gap-5 w-full'>
              <p className='text-2xl text-gray-600 font-bold'>Total Amount:<span className='font-bold text-black text-2xl'> ${totalAmount}</span></p>
              <NavLink>
                <button className='bg-green-700 lg:px-24 px-16 py-2 sm:px-12 sm:py-3 xl:px-36 rounded-lg text-white font-bold text-xl'>Checkout Now</button>
              </NavLink>
            </div>
            
          </div>

        </div>


        ):
        (<div className='h-full flex flex-col justify-center items-center gap-5'>
          <h1 className='text-xl text-gray-600 font-bold'>Your cart is empty!</h1>
          <NavLink to="/">
            <button className='bg-green-600 rounded-lg text-white px-10 py-3 font-bold'>SHOP NOW</button>
          </NavLink>
        </div>
        )
      }

    </div>
  )
}
