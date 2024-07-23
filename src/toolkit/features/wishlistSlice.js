import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: [],
    wishlistTotalQuantity: 0,
    wishlistTotalAmount: 0
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const item = action.payload
            const wishlistItem = state.wishlist.find(product => product.id === item.id)
            if (wishlistItem) {
                wishlistItem.quantity += item.quantity
            } else {
                state.wishlist.push({ ...item, quantity: item.quantity })
            }
            state.wishlistTotalAmount += item.quantity * item.price
            state.wishlistTotalQuantity += item.quantity
        },
        setWishlistToRedux: (state, action) => {
            const wishlist = action.payload
            state.wishlist = wishlist
            state.wishlistTotalQuantity = wishlist.reduce((total, item) => total + item.quantity, 0)
            state.wishlistTotalAmount = wishlist.reduce((total, item) => total + item.quantity * item.price, 0)
        },
        removeFromWishlist: (state, action) => {
            const itemId = action.payload
            const itemIndex = state.wishlist.findIndex(product => product.id === itemId)
            if (itemIndex >= 0) {
                const item = state.wishlist[itemIndex]
                state.wishlistTotalQuantity -= item.quantity
                state.wishlistTotalAmount -= item.quantity * item.price
                state.wishlist.splice(itemIndex, 1)
            }
        }
    }
})

export const { addToWishlist, setWishlistToRedux, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer