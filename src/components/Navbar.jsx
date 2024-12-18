import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function Navbar() {

  const {cart} = useSelector( (state) => state);

  return (
    <div className='bg-slate-900 w-screen mx-auto'>
      
      <nav className='max-w-6xl mx-auto flex justify-between py-3 items-center'>

        <NavLink to="/">
          <img src='https://codehelp-shopping-cart.netlify.app/logo.png' alt="logo" loading='lazy' width="170" height="170" />
        </NavLink>

        <div className='flex gap-6 justify-between items-center relative'>
          <h1 className='text-white text-xl font-medium hover:text-green-400'><NavLink to="/">Home</NavLink></h1>
          {
            cart.length > 0 ?
              (<div className='rounded-[100%] bg-green-500 text-white absolute -right-2 text-xs w-5 h-5 flex justify-center items-center -top-2 font-bold animate-bounce'>{cart.length}</div>) :
              (<div className=' absolute'></div>)
          }
          <NavLink to="/Cart"><FaShoppingCart className='text-white text-2xl hover:text-green-400' /></NavLink>
        </div>

      </nav>

    </div>
  )
}
