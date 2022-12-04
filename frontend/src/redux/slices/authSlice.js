import { createSlice } from "@reduxjs/toolkit";

const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth && JSON.parse(isAuth) === true) {
        return true;
    }
    return false;
};

const initialState = {
    isAuth: userAuthFromLocalStorage(),
    type: { type: "user" },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticateUser: (state, action) => {
            state.isAuth = true;
            state.type = action.payload;
        },
        unauthenticateUser: (state) => {
            state.isAuth = false;
            state.type = null;
        },
    },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;

export default authSlice.reducer;
