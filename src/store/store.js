import { configureStore } from "@reduxjs/toolkit";

// reducer
import imageReducer from "../features/images/imageSlice";

// persist from local storage
import { loadState, saveState } from "../utils/localStorage";

// throttle
import { throttle } from "../utils/utils";

// reducer
const reducer = { images: imageReducer };

// pre loaded state from state
const preloadedState = loadState();

// creating the store with configure store by
// passing the reducer
// passing the preloaded state that we fetch from localstorage
export const store = configureStore({
  reducer,
  preloadedState,
});

// subscribing the store to publish changes to local storage whenever state updates
store.subscribe(() => {
  // setting value in local storage is expensive so using throttle function to reduce the overhead
  // in case of fast state changes
  throttle(saveState(store.getState(), 1000));
});
