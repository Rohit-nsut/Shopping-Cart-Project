import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { add , remove } from '../redux/Slices/cartSlice';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/Slices/wishlistSlice';

export default function Product({post}) {

  const { cart, wishlist } = useSelector((state) => state);
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


  function handleWishlist() {
    if (wishlist.some((w) => w.id === post.id)) {
      dispatch(removeFromWishlist(post.id));
      toast.error("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(post));
      toast.success("Added to Wishlist");
    }
  }

  // Prevent modal open on button click
  function handleCardClick(e) {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.closest('button')
    ) {
      return;
    }
    if (typeof window.openModal === 'function') {
      window.openModal(post);
    }
    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('openProductModal', { detail: post }));
    }
  }

  return (
    <div
      className="group w-full sm:w-[17rem] px-3 py-2 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full items-center"
      style={{
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
      onClick={handleCardClick}
    >
      <h1 className="w-full text-lg font-bold mt-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x">{post.title.substring(0,15)+"..."}</h1>
      <p className="w-full text-[10px] text-gray-500 pt-4 pb-2 text-center">{post.description.substring(0,71)+"..."}</p>
      <div className="h-[180px] w-full flex items-center justify-center">
        <img src={post.image} alt="item" loading='lazy' className="h-full w-full object-contain drop-shadow-lg" />
      </div>
      <div className="flex justify-between w-full pb-2 pt-8 items-center">
        <p className="text-pink-500 font-bold text-lg">${post.price}</p>
        {cart.some((p) => p.id === post.id) ? (
          <button
            className="border-2 border-purple-400 py-1 px-3 rounded-full text-xs text-purple-700 font-semibold bg-white bg-opacity-60 hover:bg-purple-100 transition-all"
            onClick={e => { e.stopPropagation(); removeFromCart(); }}
          >REMOVE</button>
        ) : (
          <button
            className="border-2 border-blue-400 py-1 px-3 rounded-full text-xs text-blue-700 font-semibold bg-white bg-opacity-60 hover:bg-blue-100 transition-all"
            onClick={e => { e.stopPropagation(); addToCart(); }}
          >ADD</button>
        )}
        <button
          className={`ml-2 border-2 border-pink-500 py-1 px-2 rounded-full text-xs font-semibold transition-all ${wishlist.some((w) => w.id === post.id) ? 'bg-pink-500 text-white' : 'text-pink-500 hover:bg-pink-100'}`}
          onClick={e => { e.stopPropagation(); handleWishlist(); }}
        >
          {wishlist.some((w) => w.id === post.id) ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}
