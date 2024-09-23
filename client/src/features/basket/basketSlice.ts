import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../App/models/basket";
import agent from "../../App/api/agent";

export interface BasketState {
    basket: Basket | null;
    status: string;
}

export const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addItemToBasketAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
    'basket/addItemToBasketAsync',
    async ({ productId, quantity = 1 }) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeItemFromBasketAsync = createAsyncThunk<void, { productId: number, quantity: number, operation?: string }>(
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToBasketAsync.pending, (state, action) => {
                state.status = 'pendingAddItem' + action.meta.arg.productId;
            })
            .addCase(addItemToBasketAsync.fulfilled, (state, action) => {
                state.basket = action.payload;
                state.status = 'idle';
            })
            .addCase(addItemToBasketAsync.rejected, (state) => {
                state.status = 'rejected';
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
            });
    },
})

export const { setBasket } = basketSlice.actions;