import {
  SET_DATA, SET_TOTAL, SET_TYPES, SET_CURRENT_TYPE, SET_INPUT_VALUE,
} from "../actions";

const INITIAL_STATE = {
  data: [],
  types: [],
  input: '',
  currentType: 'all',
  total: 0,
}

const fetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TYPES:
    return { ...state, types: [...action.payload] };
  case SET_TOTAL:
    return { ...state, total: action.payload };
  case SET_DATA:
    return { ...state, data: [...action.payload] };
  case SET_CURRENT_TYPE:
    return { ...state, currentType: action.payload };
  case SET_INPUT_VALUE:
    return { ...state, input: action.payload }
  default:
    return state;
  }
}

export default fetchReducer;