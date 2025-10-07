import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/cartSlice";




import WishlistReducer from "./Slices/wishlistSlice";

// Load cart and wishlist from localStorage
function loadCart() {
    try {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}
function loadWishlist() {
    try {
        const data = localStorage.getItem('wishlist');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
        wishlist: WishlistReducer,
    },
    preloadedState: {
        cart: loadCart(),
        wishlist: loadWishlist(),
    },
});

// Save cart and wishlist to localStorage on change
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
});

export { store };