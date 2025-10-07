import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/Slices/cartSlice";
import { NavLink } from "react-router-dom";

export default function Checkout() {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const totalAmount = cart.reduce((acc, curr) => acc + curr.price * (curr.quantity || 1), 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
  e.preventDefault();
  setSubmitted(true);
  dispatch(clearCart());
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully.</p>
          <NavLink to="/">
            <button className="bg-gradient-to-r from-green-600 to-green-400 px-8 py-3 rounded-xl text-white font-bold shadow hover:scale-105 transition-all">Back to Home</button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">Checkout</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            required
            className="border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={3}
          />
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-lg font-bold text-gray-700">Total Amount: <span className="text-green-700">${totalAmount}</span></p>
            <button type="submit" className="bg-gradient-to-r from-green-600 to-green-400 px-8 py-3 rounded-xl text-white font-bold shadow hover:scale-105 transition-all">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
}
