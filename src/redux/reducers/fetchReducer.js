import { SET_POKEMONS, MORE_QTD, RESET_QTD, SET_TOTAL, SET_TYPES } from "../actions";

const INITIAL_STATE = {
  pokemons: [],
  types: [],
  qtd: 9,
  total: 0,
}

const fetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TYPES:
    return { ...state, types: [...action.payload] };
  case MORE_QTD:
    return { ...state, qtd: state.length + 6 };
  case RESET_QTD:
    return { ...state, qtd: 9 };
  case SET_TOTAL:
    return { ...state, total: action.payload }
  case SET_POKEMONS:
    return { ...state, pokemons: [...action.payload] }
  default:
    return state;
  }
}

export default fetchReducer;