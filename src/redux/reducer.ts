import { combineReducers } from "redux";
import { ADD_FIRST_LOAD, LOADING_LOAD } from "./action";
const initialState = {
  allStudents: [],
  oneStudent: {},
};

const allStudentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FIRST_LOAD:
      return { ...state, allStudents: payload };
    case LOADING_LOAD:
      return { ...state, allStudents: [...state.allStudents, ...payload] };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  allReducer: allStudentReducer,
});
