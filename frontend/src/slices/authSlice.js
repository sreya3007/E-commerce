import { createSlice } from '@reduxjs/toolkit';
//slice to just save user data into local storage and remove them

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));//It basically carries a payload of information from the application to the store. It only tells us what has happened.
            //converting the action.payload object into a JSON string representation. This string can then be stored in localStorage.
        },
        logout: (state, action) => {
            state.userInfo = null;
            // NOTE: here we need to also remove the cart from storage so the next
            // logged in user doesn't inherit the previous users cart and shipping
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

//this is not a child of apislices so need to add them independently to the store