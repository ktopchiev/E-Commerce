import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import User from "../../App/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../App/api/agent";

export interface AccountState {
    user: User | null
}

export const initialState: AccountState = {
    user: null
}

export const setSignIn = createAsyncThunk<User, FieldValues>(
    'account/setSignIn',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const setCurrentUser = createAsyncThunk<User>(
    'account/setCurrentUser',
    async (_, thunkAPI) => {
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(setSignIn.fulfilled, setCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        })
    }
})
