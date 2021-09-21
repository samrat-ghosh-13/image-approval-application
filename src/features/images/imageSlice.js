import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchImagesAsync())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchImagesAsync = createAsyncThunk(
  "images/fetchRandomImages",
  async () => {
    const { response } = await fetchImages();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// The `reducers` field lets us define reducers and generate associated actions
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImagesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedImages = { ...action.payload };
      });
  },
});

export const { approved, rejected } = imageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
export const getImages = (state) => state.images.fetchedImages;
export const getApprovedImages = (state) =>
  Object.values(state.images.approvedImages);

export default imageSlice.reducer;
