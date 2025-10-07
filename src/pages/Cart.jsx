import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import CartItem from '../components/CartItem';

export default function Cart() {


  const {cart} = useSelector( (state) => state);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price * (curr.quantity || 1), 0));
  }, [cart]);

  return (
  <div className="w-full min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto py-10">
        <h1 className="text-5xl font-black text-center text-green-700 mb-2 tracking-wide drop-shadow-lg">Shopping Cart</h1>
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-green-600 font-bold">Cart</span>
          <span className="w-8 h-1 bg-green-400 rounded-full"></span>
          <span className="text-gray-400">Checkout</span>
          <span className="w-8 h-1 bg-gray-200 rounded-full"></span>
          <span className="text-gray-400">Done</span>
        </div>
        <hr className="mb-8 border-green-200" />
        {cart.length > 0 ? (
          <div className="flex lg:flex-row flex-col justify-center gap-10">
            {/* Cart Items Section */}
            <div className="flex flex-col lg:w-[60%] gap-8">
              {cart.map((item, index) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-2xl transition-all">
                  <img src={item.image} alt={item.title} className="w-32 h-32 object-contain rounded-lg border border-green-100" />
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-green-700">{item.title}</h2>
                    <p className="text-gray-600 text-sm">{item.description.substring(0, 80) + "..."}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-lg font-bold text-green-600">${item.price}</span>
                      <span className="text-gray-500">Qty: {item.quantity || 1}</span>
                    </div>
                  </div>
                </div>
              ))}
              <NavLink to="/Shop" className="self-center mt-4">
                <button className="bg-gradient-to-r from-green-500 to-green-400 px-8 py-2 rounded-xl text-white font-bold shadow hover:scale-105 transition-all">Continue Shopping</button>
              </NavLink>
            </div>
            {/* Summary Card Section */}
            <div className="flex flex-col justify-between lg:w-[40%]">
              <div className="rounded-2xl shadow-2xl p-8 bg-white/80 backdrop-blur-lg border border-green-200 flex flex-col gap-6">
                <p className="text-2xl font-semibold text-green-800 text-center">Order Summary</p>
                <p className="text-xl font-bold text-gray-700 text-center">Total Items: {cart.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}</p>
                <p className="text-2xl text-gray-600 font-bold text-center">Total Amount:<span className="font-bold text-green-700 text-2xl"> ${totalAmount}</span></p>
                <NavLink to="/Checkout">
                  <button className="bg-gradient-to-r from-green-600 to-green-400 px-10 py-3 rounded-xl text-white font-bold text-xl shadow-lg hover:scale-105 transition-all duration-300">Checkout Now</button>
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-8 py-16">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-green-400 mb-4 animate-bounce">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.5 18h9a2 2 0 001.85-2.7L17 13M7 13V6h10v7" />
            </svg>
            <h1 className="text-2xl text-green-700 font-extrabold">Your cart is empty!</h1>
            <p className="text-lg text-gray-600">Looks like you haven't added anything yet.</p>
            <NavLink to="/Shop">
              <button className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl text-white px-10 py-3 font-bold shadow-lg hover:scale-105 transition-all">SHOP NOW</button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
