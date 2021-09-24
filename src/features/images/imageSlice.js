// redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// api config
import { fetchImages } from "./imageApi";

// using fetchedImages as an object because the api returns one item at a time
// using approvedImages, rejectedImages as on object with the key as the id so
// that the entries are unique on the state updates.
const initialState = {
  fetchedImages: {},
  approvedImages: {},
  rejectedImages: {},
  loading: false,
};

/**
 * @name fetchImagesAsync
 * @description The function below is called a thunk and allows us to perform async logic.
 * It can be dispatched like a regular action: `dispatch(fetchImagesAsync())`. This
 * will call the thunk with the `dispatch` function as the first argument. Async
 * code can then be executed and other actions can be dispatched. Thunks are
 * typically used to make async requests.
 * @returns random api response when fulfilled or error data in case of any errors
 */
export const fetchImagesAsync = createAsyncThunk(
  "images/fetchRandomImages",
  async (_, { rejectWithValue }) => {
    try {
      const { response } = await fetchImages();
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);

/**
 * @name imageSlice
 * @description The `reducers` field lets us define reducers and generate associated actions
 * Redux Toolkit allows us to write "mutating" logic in reducers. It
 * doesn't actually mutate the state because it uses the Immer library,
 * which detects changes to a "draft state" and produces a brand new
 * immutable state based off those changes
 * @returns returns none explicitly, we have to export the following new state, actions, reducers that are below
 */
export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    approved: (state, action) => {
      state.loading = true;
      state.approvedImages = {
        ...state.approvedImages,
        [action.payload.id]: action.payload,
      };
    },
    rejected: (state, action) => {
      state.loading = true;
      state.rejectedImages = {
        ...state.rejectedImages,
        [action.payload.id]: action.payload,
      };
    },
    updateImage: (state, action) => {
      // state.fetchedImages = initialState.fetchedImages;
      state.fetchedImages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImagesAsync.fulfilled, (state, action) => {
        state.fetchedImages = { ...action.payload };
        state.loading = false;
      })
      .addCase(fetchImagesAsync.rejected, (state) => {
        state.fetchedImages = initialState.fetchedImages;
        state.loading = false;
        alert("Unable to fetch images from Unsplash, please try again later!");
      });
  },
});

// exports the actions
export const { approved, rejected, updateImage } = imageSlice.actions;

// selectors and they allow us to select a value from the state.
// getImages is used to fetch the current image from the state
export const getImages = (state) => state.images.fetchedImages;

// getApprovedImages is used to fetch the approved images
export const getApprovedImages = (state) =>
  Object.values(state.images.approvedImages);

// getRejectedImages is used to fetch the rejected images
export const getRejectedImages = (state) => state.images.rejectedImages;

// getLoadingState is used to fetch the loading state
export const getLoadingState = (state) => state.images.loading;

// exports the reducer that can be used to manage the state
export default imageSlice.reducer;
