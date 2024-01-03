import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from '../roles/index'

const initialState = {
    loginStatus: true,
    username: 'alok20',
    email : 'aloksinghbais02ins@gmail.com',
    fullName : 'Alok Singh',
    role : ROLES.PARTICIPANT,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        setUsername: (state,action) => {
            state.username = action.payload;
        },
        setLoginStatus: (state,action) => {
            state.loginStatus = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setEmail: (state,action) => {
            state.email = action.payload;
        },
        setFullName: (state,action) => {
            state.fullName = action.payload;
        },
    }

});

export const { setUsername, setLoginStatus, setRole, setEmail, setFullName } = authSlice.actions;

export default authSlice.reducer;