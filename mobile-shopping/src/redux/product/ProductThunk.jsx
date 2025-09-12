import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProduct, fetchDetailProduct } from "../../services/ProductServices";

// Lấy tất cả sản phẩm
export const fetchAllProductsThunk = createAsyncThunk(
  "product/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllProduct();
      return response.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Lỗi fetchAll");
    }
  }
);

export const fetchDetailProductThunk = createAsyncThunk(
  "product/fetchDetail",
  async (id, thunkAPI) => {
    try {
      const response = await fetchDetailProduct(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Lỗi fetchDetail"
      );
    }
  }
);