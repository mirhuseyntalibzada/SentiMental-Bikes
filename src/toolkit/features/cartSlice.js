import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    product: [],
    orders: [],
    cartQuantity: 0,
    cartAmount: 0,
    productQuantity: 0,
    productAmount: 0
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
            state.cartAmount += item.price * item.quantity;
            state.cartQuantity += item.quantity;
        },
        addProductToCart: (state, action) => {
            const item = action.payload;
            const productItem = state.product.find(product => product.id === item.id);
            if (productItem) {
                productItem.quantity += item.quantity;
            } else {
                state.product.push({ ...item, quantity: item.quantity });
            }
            state.cartAmount += item.price * item.quantity;
            state.cartQuantity += item.quantity;
        },
        addToOrder: (state, action) => {
            if (!state.orders) {
                state.orders = [];
            }
            
            const orders = action.payload;
            orders.forEach(orderItem => {
                const productItem = state.orders.find(product => product.id === orderItem.id);
                if (productItem) {
                    productItem.quantity += orderItem.quantity;
                } else {
                    state.orders.push({ ...orderItem, quantityItem: orderItem.quantity });
                }
            });
        },        
        setOrdersToRedux: (state, action) => {
            state.orders = action.payload;
        },
        setCartToRedux: (state, action) => {
            const cart = action.payload;
            state.cart = cart;
            state.cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
            state.cartAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        setProductToRedux: (state, action) => {
            const product = action.payload;
            state.product = product;
            state.productQuantity = product.reduce((total, item) => total + item.quantity, 0);
            state.productAmount = product.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.cart.findIndex(product => product.id === itemId);
            if (itemIndex >= 0) {
                const item = state.cart[itemIndex];
                state.cartAmount -= item.price * item.quantity;
                state.cartQuantity -= item.quantity;
                state.cart.splice(itemIndex, 1);
            }
        },
        removeFromProduct: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.product.findIndex(product => product.id === itemId);
            if (itemIndex >= 0) {
                const item = state.product[itemIndex];
                state.productAmount -= item.price * item.quantity;
                state.productQuantity -= item.quantity;
                state.product.splice(itemIndex, 1);
            }
        },
        addWishlistToProduct: (state, action) => {
            const wishlist = action.payload;
            wishlist.forEach(wishlistItem => {
                const productItem = state.product.find(product => product.id === wishlistItem.id);
                if (productItem) {
                    productItem.quantity += wishlistItem.quantity;
                } else {
                    state.product.push({ ...wishlistItem, quantity: wishlistItem.quantity });
                }
                state.productAmount += wishlistItem.price * wishlistItem.quantity;
                state.productQuantity += wishlistItem.quantity;
            });
        },
        addWishlistItemToCart: (state, action) => {
            const item = action.payload;
            const productItem = state.product.find(product => product.id === item.id);
            if (productItem) {
                productItem.quantity += item.quantity;
            } else {
                state.product.push({ ...item, quantity: item.quantity });
            }
            state.cartAmount += item.price * item.quantity;
            state.cartQuantity += item.quantity;
        },
        emptyCart: (state) => {
            state.cart = []
            state.product = []
            state.cartAmount = 0
            state.cartQuantity = 0
            state.productAmount = 0
            state.productQuantity = 0
        }
    }
});

export const {
    addToCart, setCartToRedux, removeFromCart,
    addProductToCart, setProductToRedux, removeFromProduct,
    addWishlistToProduct, addWishlistItemToCart, addToOrder,
    setOrdersToRedux, emptyCart
} = cartSlice.actions;

export default cartSlice.reducer;
