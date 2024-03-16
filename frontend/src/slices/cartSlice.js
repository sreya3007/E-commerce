import { createSlice, createSelector } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart") ? JSON.parse
    (localStorage.getItem("cart")) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }; //to save the details in localstorage


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => { //send action to cart that'll using action payload that'll upddate the state
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            }
            else {
                state.cartItems = [...state.cartItems, item];//state is immutable so spreading it andf then adding the new item
            }
            return updateCart(state)
        },


        // export const selectCartItems = createSelector(
        //     (state) => state.cart.cartItems,
        //     (cartItems) => {
        //         // Add any necessary validation or transformation logic here
        //         if (!Array.isArray(cartItems)) {
        //             // If cartItems is not an array, return an empty array
        //             return [];
        //         },
        // return cartItems;
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },// here we need to reset state for when a user logs out so the next
        // user doesn't inherit the previous users cart and shipping
        resetCart: (state) => (state = initialState),

    },
});

export const { addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart, } = cartSlice.actions;
//exporting as a method it's a regular reducer function

export default cartSlice.reducer;
