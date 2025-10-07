import React from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { remove } from '../redux/Slices/cartSlice';



export default function CartItem({item}) {

  // const {cart} = useSelector( (state) => state);
  const dispatch = useDispatch();

  function removeFromCart() {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  }

  function handleQuantityChange(e) {
    const qty = Math.max(1, Number(e.target.value));
    dispatch({ type: "cart/setQuantity", payload: { id: item.id, quantity: qty } });
  }

  return (
    <div className='flex w-full gap-8 py-8 sm:flex-row flex-col lg:py-10 lg:gap-14 items-center lg:px-5 border-b-2 border-gray-700'>
      <div className='sm:h-56 sm:w-72 h-96 w-80'>
        <img src={item.image} alt="item" loading='lazy' className='w-full h-full' />
      </div>
      <div className='flex flex-col sm:gap-4 px-8 sm:px-0'>
        <h1 className='text-gray-800 text-xl font-bold'> {item.title} </h1>
        <p className='text-lg text-gray-600'> {item.description.substring(0,82)+"..."} </p>
        <div className='flex justify-between items-center gap-4'>
          <p className='text-2xl font-bold text-green-600'> ${item.price} </p>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              min='1'
              value={item.quantity || 1}
              onChange={handleQuantityChange}
              className='w-16 px-2 py-1 border rounded-lg text-center'
            />
            <span className='text-gray-600'>Qty</span>
          </div>
          <div onClick={removeFromCart} className='bg-red-300 rounded-full p-2 cursor-pointer hover:bg-red-400 hover:scale-110 transition-all duration-500'><MdDelete className='w-5 h-5 text-red-800 hover:text-white' /></div>
        </div>
      </div>
    </div>
  )
}