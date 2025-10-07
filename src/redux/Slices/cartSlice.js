import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        add: (state, action) => {
            const item = action.payload;
            const existing = state.find((i) => i.id === item.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                state.push({ ...item, quantity: 1 });
            }
        },
        remove: (state, action) => {
            const id = action.payload;
            const existing = state.find((i) => i.id === id);
            if (existing && existing.quantity > 1) {
                existing.quantity -= 1;
                return state;
            }
            return state.filter((item) => item.id !== id);
        },
        setQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.find((i) => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart: () => [],
        setCart: (state, action) => {
            return action.payload;
        }
    }
});

export const { add, remove, setQuantity, clearCart, setCart } = CartSlice.actions;
export default CartSlice.reducer;