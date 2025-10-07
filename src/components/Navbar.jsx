import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function Navbar() {

  const {cart, wishlist} = useSelector((state) => state);

  return (
  <div className="w-screen mx-auto bg-black shadow-lg">
      <nav className="max-w-6xl xl:mx-auto mx-4 sm:mx-8 flex justify-between py-4 items-center">

        <NavLink to="/" className="flex items-center">
          <span className="inline-block p-2 rounded-xl bg-teal-50 border-2 border-teal-200 drop-shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-12 h-12">
              <circle cx="16" cy="16" r="16" fill="#14b8a6" />
              <path d="M10 10h12l-1.5 8.5a2 2 0 0 1-2 1.5h-5a2 2 0 0 1-2-1.5L10 10zm0 0V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="13" cy="24" r="2" fill="#fff" />
              <circle cx="19" cy="24" r="2" fill="#fff" />
            </svg>
          </span>
        </NavLink>

              <div className="flex gap-8 justify-between items-center relative">
                <h1 className="text-white text-xl font-bold hover:text-green-400 transition-all"><NavLink to="/">Home</NavLink></h1>
                <h1 className="text-white text-xl font-bold hover:text-green-400 transition-all"><NavLink to="/Shop">Shop</NavLink></h1>
                <NavLink to="/Wishlist">
                  <FaHeart className="text-white text-2xl hover:text-green-400 transition-all drop-shadow" />
                </NavLink>
                {cart.length > 0 ? (
                  <div className="rounded-full bg-green-500 text-white absolute -right-2 text-xs w-5 h-5 flex justify-center items-center -top-2 font-bold animate-bounce shadow-lg">{cart.length}</div>
                ) : (<div className="absolute"></div>)}
                <NavLink to="/Cart"><FaShoppingCart className="text-white text-2xl hover:text-green-400 transition-all drop-shadow" /></NavLink>
              </div>

      </nav>

    </div>
  )
}
