import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/Slices/wishlistSlice";
import { add } from "../redux/Slices/cartSlice";
import { toast } from "react-hot-toast";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  function handleRemove(id) {
    dispatch(removeFromWishlist(id));
    toast.error("Item removed from Wishlist");
  }

  function handleAddToCart(item) {
    dispatch(add(item));
    toast.success("Item added to Cart");
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 pb-12 flex flex-col">
      <div className="max-w-6xl xl:mx-auto mx-4 my-12 flex-1">
        <h1
          className="text-5xl font-black mb-8 text-center text-gray-900 relative"
          style={{
            textShadow: '2px 2px 0 #fff, 4px 4px 0 #e0e7ff, 6px 6px 0 #f472b6',
            WebkitTextStroke: '2px #a78bfa',
            letterSpacing: '2px',
          }}
        >
          <span className="inline-block px-4 py-2 rounded-xl bg-white bg-opacity-60 border-4 border-purple-300 shadow-xl">My Wishlist</span>
        </h1>
        {wishlist.length === 0 ? (
          <p className="text-center text-purple-600 text-xl font-semibold">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-stretch min-h-[300px]">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-between h-full p-6 rounded-2xl shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <img src={item.image} alt={item.title} className="h-32 w-32 object-contain mb-4 drop-shadow-lg" />
                <h2 className="text-lg font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x">{item.title}</h2>
                <p className="text-gray-700 text-sm mb-2 text-center">{item.description.substring(0, 60) + "..."}</p>
                <p className="text-pink-500 font-bold mb-2 text-lg">${item.price}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center items-center w-full">
                  <button
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-xl font-bold shadow hover:scale-105 transition-all w-full sm:w-auto"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
