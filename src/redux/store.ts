import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";
import thunk from "redux-thunk";

// thunk is used to check if anty function is present in the action
const middleware = [thunk];
// store with devtools
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
