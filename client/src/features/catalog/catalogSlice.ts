import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../App/models/product";
import agent from "../../App/api/agent";
import { RootState } from "../../App/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async () => {
        try {
            return await agent.Catalog.list();
        } catch (error) {
            console.log(error);
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        status: 'idle',
        productsLoaded: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'pendingFetchProducts'
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                productsAdapter.setAll(state, action.payload);
                state.status = 'idle';
                state.productsLoaded = true;
            })
            .addCase(fetchProductsAsync.rejected, (state) => {
                state.status = 'rejected';
            });
    }
})

export const productsSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);