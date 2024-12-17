import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import User from "../../App/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../App/api/agent";
import router from "../../App/router/Routes";
import { toast } from "react-toastify";

export interface AccountState {
    user: User | null
}

export const initialState: AccountState = {
    user: null
}


/**
 * Sign in a user
 * @param {FieldValues} FieldValues data
 * @returns {User} User user
 */
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

/**
 * Fetch the current signed user
 * @returns {User} user
 */
export const setCurrentUser = createAsyncThunk<User>(
    'account/setCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setCurrentUser.rejected, (state) => {
                state.user = null;
                localStorage.removeItem('user');
                toast.error('Session expired - please login again');
                router.navigate('/login');
            })
            .addMatcher(isAnyOf(setSignIn.fulfilled, setCurrentUser.fulfilled), (state, action) => {
                state.user = action.payload;
            })
            .addMatcher(isAnyOf(setSignIn.rejected), (_, action) => {
                console.log(action.payload)
            })
    }
})

export const { signOut, setUser } = accountSlice.actions;
