// method that fetches the state from local storage
export const loadState = () => {
  try {
    const state = localStorage.getItem("image-approval-app-state");
    if (state === null) {
      return undefined;
    }
    // state is in string format, parsing it to json
    return JSON.parse(state);
  } catch (err) {
    // state will undefined if nothing is found in local storage
    return undefined;
  }
};

// method that updates the state to local storage for persistence
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("image-approval-app-state", serializedState);
  } catch (err) {
    console.log("localstorage write error", err);
  }
};
