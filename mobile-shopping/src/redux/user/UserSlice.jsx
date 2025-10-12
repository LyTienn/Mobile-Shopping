import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    refreshToken: null,
    profile: null,
    isLoggedIn: false,
    loading: false,
    error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.profile = action.payload.user;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    fetchUserProfile: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchUserProfileFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Other actions
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.profile = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.token = action.payload.token;
  //       state.profile = action.payload.user;
  //       state.isLoggedIn = true;
  //     })
  //     .addCase(loginUser.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(fetchUserProfile.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchUserProfile.fulfilled, (state, action) => {
  //       state.profile = action.payload;
  //       state.isLoggedIn = true;
  //       state.loading = false;
  //     })
  //     .addCase(fetchUserProfile.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { 
  loginUser, 
  loginUserSuccess, 
  loginUserFailed,
  fetchUserProfile,
  fetchUserProfileSuccess,
  fetchUserProfileFailed, 
  setUser, 
  logout 
} = userSlice.actions;

export default userSlice.reducer;