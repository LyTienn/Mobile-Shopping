import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        allProducts: [],
        detailProduct: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchAllProductStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAllProductSuccess: (state, action) => {
            state.loading = false;
            state.allProducts = action.payload;
        },
        fetchAllProductFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchDetailProductStart: (state, action) => {
            state.loading = true;
            state.error = null;
            state.detailProduct = null;
        },
        fetchDetailProductSuccess: (state, action) => {
            state.loading = false;
            state.detailProduct = action.payload;
        },
        fetchDetailProductFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearProductDetail: (state) => {
            state.detailProduct = null;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchAllProductsThunk.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.allProducts = action.payload;
    //         })
    //         .addCase(fetchAllProductsThunk.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload;
    //         })

    //         .addCase(fetchDetailProductThunk.pending, (state) => {
    //             state.loading = true;
    //             state.detailProduct = null;
    //         })
    //         .addCase(fetchDetailProductThunk.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.detailProduct = action.payload;
    //         })
    //         .addCase(fetchDetailProductThunk.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const {
    fetchAllProductStart,
    fetchAllProductSuccess,
    fetchAllProductFailed,
    fetchDetailProductStart,
    fetchDetailProductSuccess,
    fetchDetailProductFailed, 
    clearProductDetail 
} = productSlice.actions;

export default productSlice.reducer;