import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../App/models/basket";
import agent from "../../App/api/agent";
import { getCookie } from "../../App/util/util";
import { store } from "../../App/store/configureStore";

export interface BasketState {
    basket: Basket | null;
    status: string;
}

export const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

/**
 * Fetch basket by using buyerId cookie
 * @returns Basket
 */
export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId') && !store.getState().account.user) return false;
        }
    }
)

/**
 * Adds item(s) to the basket
 * @param {number} productId - Product Id
 * @param {number} quantity - Product Quantity
 * @returns StatusCode201 or BadRequest
 */
export const addItemToBasketAsync = createAsyncThunk<Basket, {
    productId: number,
    quantity?: number
}>(
    'basket/addItemToBasketAsync',
    async ({ productId, quantity = 1 }) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

/**
 * Removes item(s) from the basket
 * @param {number} productId - Product Id
 * @param {number} quantity - Product Quantity
 * @param {string?} operation - e.g. "del", "rem" - helps to distinguish loading indicator
 * @returns StatusCode201 or BadRequest
 */
export const removeItemFromBasketAsync = createAsyncThunk<void, {
    productId: number,
    quantity: number,
    operation?: string
}>(
    'basket/removeItemFromBasketAsync',
    async ({ productId, quantity }) => {
        try {
            await agent.Basket.removeItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        removeBasket: (state) => {
            state.basket = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToBasketAsync.pending, (state, action) => {
                state.status = 'pendingAddItem' + action.meta.arg.productId;
            })
            .addCase(removeItemFromBasketAsync.pending, (state, action) => {
                state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.operation;
            })
            .addCase(removeItemFromBasketAsync.fulfilled, (state, action) => {
                const { productId, quantity } = action.meta.arg;
                const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

                if (itemIndex === -1 || itemIndex === undefined) return;

                state.basket!.items[itemIndex].quantity -= quantity;

                if (state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);

                state.status = 'idle';
            })
            .addCase(removeItemFromBasketAsync.rejected, (state) => {
                state.status = 'rejected';
            })
            .addMatcher(isAnyOf(addItemToBasketAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
                state.basket = action.payload;
                state.status = 'idle';
            })
            .addMatcher(isAnyOf(addItemToBasketAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
                state.status = 'rejected';
                console.log(action.payload);
            });
    },
})

export const { setBasket, removeBasket } = basketSlice.actions;