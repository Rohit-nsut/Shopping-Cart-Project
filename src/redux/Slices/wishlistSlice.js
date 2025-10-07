import { createSlice } from "@reduxjs/toolkit";

export const WishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            const item = action.payload;
            if (!state.find((i) => i.id === item.id)) {
                state.push(item);
            }
        },
        removeFromWishlist: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        setWishlist: (state, action) => {
            return action.payload;
        },
        clearWishlist: () => [],
    },
});

export const { addToWishlist, removeFromWishlist, setWishlist, clearWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
