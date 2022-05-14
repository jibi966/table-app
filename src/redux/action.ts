import axios from "axios";

// constants
export const ADD_FIRST_LOAD = "ADD_FIRST_LOAD";
export const LOADING_LOAD = "LOADING_LOAD";
export const DEBOUNCE_LOAD = "DEBOUNCE_LOAD";
export const ADD_AFTER_SEARCH = "ADD_AFTER_SEARCH";
export const SET_ONE_DATA = "SET_ONE_DATA";
export const UNSET_ONE_DATA = "UNSET_ONE_DATA";
// action creators

// action for the first load
const addFirstLoad = (data: any) => {
  return {
    type: ADD_FIRST_LOAD,
    payload: data,
  };
};

// action for the scrolling load
const loadingLoad = (data: any, value: boolean) => {
  return {
    type: LOADING_LOAD,
    payload: data,
    loading: value,
  };
};

// action for debouncing
const debounceSearch = (data: any) => {
  return {
    type: DEBOUNCE_LOAD,
    payload: data,
  };
};

// action for network calling for all data after user clearing the search bar
const addAfterSearch = (data: any) => {
  return {
    type: ADD_AFTER_SEARCH,
    payload: data,
  };
};

// for setting single data

const setSingle = (data: any) => {
  return {
    type: SET_ONE_DATA,
    payload: data,
  };
};
// for unsetting the data

export const unSetSingle = () => {
  return {
    type: UNSET_ONE_DATA,
  };
};

// dispatching function from react on first load
export const addingFirst = () => (dispatch) => {
  axios
    .get("http://localhost:5050/students?_page=1&_limit=20")
    .then((res) => {
      dispatch(addFirstLoad(res.data));
    })
    .catch(() => {
      alert("Server Error");
    });
};

// dispatching function from react on scrolling
export const addingAllData = (page: number) => (dispatch) => {
  axios
    .get(`http://localhost:5050/students?_page=${page}&_limit=20`)
    .then((res) => {
      // loader handling
      let value: boolean;
      // if the total length of the data is less than 20 or 0 loading is false
      if (res.data.length === 0 || res.data.length < 20) {
        value = false;
      } else {
        value = true;
      }
      dispatch(loadingLoad(res.data, value));
    })
    .catch(() => {
      alert("Server Error");
    });
};

// dispatching function for debouncing
export const debouncingData = (debouncedValue) => (dispatch) => {
  axios
    .get(`http://localhost:5050/students?q=${debouncedValue}`)
    .then((res) => {
      dispatch(debounceSearch(res.data));
    })
    .catch(() => {
      alert("Server Error");
    });
};

// adding all the items in the table after user clear the search bar
export const addingAllAfterSearch = () => (dispatch) => {
  axios
    .get("http://localhost:5050/students")
    .then((res) => {
      dispatch(addAfterSearch(res.data));
    })
    .catch(() => {
      alert("Server Error");
    });
};

// setting up single item description

export const gettingSingleItem = (id) => (dispatch) => {
  axios
    .get(`http://localhost:5050/students/${id}`)
    .then((res) => {
      dispatch(setSingle(res.data));
    })
    .catch(() => {
      alert("Server Error");
    });
};
