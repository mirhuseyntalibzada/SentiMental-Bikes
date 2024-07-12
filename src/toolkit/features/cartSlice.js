import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const productItem = state.cart.find(product => product.id === item.id);
            if (productItem) {
                productItem.quantity += item.quantity;
            } else {
                state.cart.push({ ...item, quantity: item.quantity });
            }
            state.cartTotalAmount += item.price * item.quantity;
            state.cartTotalQuantity += item.quantity;
        }
    }
});

export const { addToCart, setCartToRedux } = cartSlice.actions;

export default cartSlice.reducer;
