import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import favoriteService from "./favoriteService";

const initialState = {
  favorites: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Fetch Favorites
export const getFavorites = createAsyncThunk(
  "favorite/getFavorites",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.jwtToken;
      if (!token) throw new Error("Missing authentication token!");
      return await favoriteService.getFavorite(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add Favorite
export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (bookId, thunkAPI) => {
    try {
      return await favoriteService.setFavorite(bookId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete Favorite
export const deleteFavorite = createAsyncThunk(
  "favorite/deleteFavorite",
  async (bookId, thunkAPI) => {
    try {
      return await favoriteService.deleteFavorite(bookId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favorites = action.payload.favorites;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload.favorite);
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((fav) => fav.book._id !== action.meta.arg);
      });
  },
});

export const { reset } = favoriteSlice.actions;
export default favoriteSlice.reducer;