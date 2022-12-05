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
    permission: false,
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
            state.permission = false;
        },
        verifyPermission: (state) => {
            state.permission = true;
        },
        unverifyPermission: (state) => {
            state.permission = false;
        },
    },
});

export const {
    authenticateUser,
    unauthenticateUser,
    verifyPermission,
    unverifyPermission,
} = authSlice.actions;

export default authSlice.reducer;
