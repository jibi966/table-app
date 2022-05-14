import { combineReducers } from "redux";
import {
  ADD_FIRST_LOAD,
  LOADING_LOAD,
  DEBOUNCE_LOAD,
  ADD_AFTER_SEARCH,
} from "./action";
const initialState = {
  allStudents: [],
  oneStudent: {},
  load: true,
};

const allStudentReducer = (
  state = initialState,
  { type, payload, loading }
) => {
  switch (type) {
    case ADD_FIRST_LOAD:
      return { ...state, allStudents: payload };
    case LOADING_LOAD:
      return {
        ...state,
        allStudents: [...state.allStudents, ...payload],
        load: loading,
      };
    case DEBOUNCE_LOAD:
      return { allStudents: payload };
    case ADD_AFTER_SEARCH:
      return { allStudents: payload };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  allReducer: allStudentReducer,
});
