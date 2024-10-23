import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../App/models/product";
import agent from "../../App/api/agent";
import { RootState } from "../../App/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchFiltersAsync = createAsyncThunk(
    'catalog/fetchFiltersAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.fetchFilters();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        status: 'idle',
        productsLoaded: false,
        filtersLoaded: false,
        brands: [],
        types: []
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'pendingFetchProducts';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                productsAdapter.setAll(state, action.payload);
                state.status = 'idle';
                state.productsLoaded = true;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.status = 'idle';
                console.log(action.payload);
            })
            .addCase(fetchProductAsync.pending, (state) => {
                state.status = 'pendingFetchProduct';
            })
            .addCase(fetchProductAsync.fulfilled, (state, action) => {
                productsAdapter.upsertOne(state, action.payload);
                state.status = 'idle';
                state.productsLoaded = true;
            })
            .addCase(fetchProductAsync.rejected, (state, action) => {
                state.status = 'idle';
                console.log(action);
            })
            .addCase(fetchFiltersAsync.pending, (state) => {
                state.status = 'pendingFetchFilters';
            })
            .addCase(fetchFiltersAsync.fulfilled, (state, action) => {
                state.brands = action.payload.brands;
                state.types = action.payload.types;
                state.filtersLoaded = true;
                state.status = 'idle';
            })
            .addCase(fetchFiltersAsync.rejected, (state, action) => {
                state.status = 'idle';
                console.log(action.payload);
            })
    }
})

export const productsSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);