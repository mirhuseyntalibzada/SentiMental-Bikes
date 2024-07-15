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
        },
        setCartToRedux: (state, action) => {
            const cart = action.payload;
            state.cart = cart;
            state.cartTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
            state.cartTotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.cart.findIndex(product => product.id === itemId);
            if (itemIndex >= 0) {
                const item = state.cart[itemIndex];
                state.cartTotalAmount -= item.price * item.quantity;
                state.cartTotalQuantity -= item.quantity;
                state.cart.splice(itemIndex, 1);
            }
        }
    }
});

export const { addToCart, setCartToRedux, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;