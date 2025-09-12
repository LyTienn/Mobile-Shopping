import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleLogin, getUserProfile } from '../../services/UserServices';

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await handleLogin(username, password);
      // const token = res.token;
      // const user = res.user || res;
      return {
        user: {
          id: res.id,
          username: res.username,
          email: res.email,
          firstName: res.firstName,
          lastName: res.lastName,
          gender: res.gender,
          image: res.image,
        },
        token: res.token, // Sửa lại đúng trường
      }; 
    } catch (err) {
      return rejectWithValue(
        err.message || "Lỗi đăng nhập"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, {getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const response = await getUserProfile(token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Không thể tải thông tin người dùng"
      );
    }
  }
);