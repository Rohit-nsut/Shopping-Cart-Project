import React from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { remove } from '../redux/Slices/cartSlice';



export default function CartItem({item}) {

  // const {cart} = useSelector( (state) => state);
  const dispatch = useDispatch();

  function removeFromCart () {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  }

  return (

      <div className='flex w-full py-10 gap-14 items-center px-5 border-b-2 border-gray-700'>

        <div className='h-56 w-72'>
          <img src={item.image} alt="item" loading='lazy' className='w-full h-full' />
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-gray-800 text-xl font-bold'> {item.title} </h1>
          <p className='text-lg text-gray-600'> {item.description.substring(0,82)+"..."} </p>
          <div className='flex justify-between items-center'>
            <p className='text-2xl font-bold text-green-600'> ${item.price} </p>
            <div onClick={removeFromCart} className='bg-red-300 rounded-full p-2 cursor-pointer hover:bg-red-400 hover:scale-110 transition-all duration-500'><MdDelete  className='w-5 h-5 text-red-800 hover:text-white' /></div>
          </div>
        </div>

      </div>

  )
}