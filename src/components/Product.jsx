import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { add , remove } from '../redux/Slices/cartSlice';

export default function Product({post}) {

  const {cart} = useSelector( (state) => state);

  const dispatch = useDispatch();


  // function clickHandler (id) {
  //   cart.some( (p) => p.id === id) ? addToCart() : removeFromCart();
  // }

  function addToCart () {
    dispatch(add(post));
    toast.success("Item added to Cart");
  }

  function removeFromCart () {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  }


  return (
    <div className=' group w-[17rem] px-3 py-2 rounded-lg shadow-[0_1px_10px_1px_rgba(0,0,0,0.3)] hover:scale-110 transition-all hover:shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)]  duration-500'>
      <div className='flex flex-col justify-between h-full items-center '>
        <h1 className='w-44 text-lg text-gray-700 font-bold mt-2'>{post.title.substring(0,15)+"..."}</h1>
        <p className=' w-44 text-[10px] text-gray-400  pt-4 pb-2'>{post.description.substring(0,71)+"..."}</p>
        <div className='h-[180px]'>
          <img src={post.image} alt="item" loading='lazy' className='h-full w-full object-contain' />
        </div>
        <div className='flex justify-between w-full pb-2 pt-8'>
          <p className='text-green-600 font-bold text-lg object-'>${post.price}</p>

          {
            cart.some( (p) => p.id === post.id) ? 
            (<button className='border-2 border-black py-1 px-3 rounded-l-full rounded-r-full text-xs text-gray-800 font-semibold group-hover:bg-gray-700 group-hover:text-pink-500 group-hover:text-sm transition-all group-hover:duration-500 ' onClick={removeFromCart}>REMOVE ITEM</button>)
            :
            (
              <button className='border-2 border-black py-1 px-3 rounded-l-full rounded-r-full text-xs text-gray-800 font-semibold group-hover:bg-gray-700 group-hover:text-pink-500 group-hover:text-sm transition-all group-hover:duration-500 ' onClick={addToCart}>ADD TO CART</button>
            )
          }

          {/* <button className='border-2 border-black py-1 px-3 rounded-l-full rounded-r-full text-xs text-gray-800 font-semibold group-hover:bg-gray-700 group-hover:text-pink-500 group-hover:text-sm transition-all group-hover:duration-500 ' >{ cart.some( (p) => p.id === post.id) ? <p>REMOVE ITEM</p> : <p>ADD TO CART</p> } </button> */}
        </div>
      </div>
    </div>
  )
}
