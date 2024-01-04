
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
const LOGIN_ACTION = 'LOGIN_ACTION';
const VOTING_ACTION = 'VOTING_ACTION';
export const loginAction = createAsyncThunk(
    LOGIN_ACTION,
    //payload, thunkAPI
    async (payload) => {
        return await axios.post("/account/signin", payload);
    }
);

export const votingAction = createAsyncThunk(
    VOTING_ACTION,
    //payload, thunkAPI
    async (payload) => {
        return await axios.post("/rating/create", payload);
    }
);
