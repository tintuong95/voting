import { createSlice } from '@reduxjs/toolkit';
import { loginAction, votingAction } from './authAction';



const initialState = {
    isLoggedIn: false,
    username: null,
    id: null,
    test: "test4",
    show: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        evtLogout: (state) => {
            state.username = null;
            state.isLoggedIn = false

        },

        statusLoggingFalse: (state) => {
            state.error.logging = false;
        },

        signInSuccess: (state, { type, payload }) => {

            state.username = payload?.username;
            state.id = payload?.id
            state.isLoggedIn = true
        },
        signOutAction: (state, { type, payload }) => {

            state.username = null;
            state.id = null;
            state.isLoggedIn = false
        },
        setShowResult: (state, { type, payload }) => {
            state.show = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            const user = action.payload.data;
            state.username = user?.username;
            state.id = user?.id
            state.isLoggedIn = true
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.username = null;
            state.id = null;
            state.isLoggedIn = false
        })

        //rating
        builder.addCase(votingAction.fulfilled, (state, action) => {
            return true
        })
        builder.addCase(votingAction.rejected, (state, action) => {

            return false
        })

    },
});

// Action creators are generated for each case reducer function
export const { evtLogout, statusLoggingFalse, signInSuccess, setShowResult, signOutAction } = authSlice.actions;

export default authSlice.reducer;