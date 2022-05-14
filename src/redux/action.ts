import axios from "axios";
// constants
export const ADD_FIRST_LOAD = "ADD_FIRST_LOAD";
export const LOADING_LOAD = "LOADING_LOAD";

// action creators
export const addFirstLoad = (data: any) => {
  return {
    type: ADD_FIRST_LOAD,
    payload: data,
  };
};

export const loadingLoad = (data: any) => {
  return {
    type: LOADING_LOAD,
    payload: data,
  };
};

export const addingFirst = () => (dispatch) => {
  axios.get("http://localhost:5050/students?_page=1&_limit=20").then((res) => {
    dispatch(addFirstLoad(res.data));
  });
};

export const addingAllData = (page: number) => (dispatch) => {
  axios
    .get(`http://localhost:5050/students?_page=${page}&_limit=20`)
    .then((res) => {
      dispatch(loadingLoad(res.data));
    });
};
