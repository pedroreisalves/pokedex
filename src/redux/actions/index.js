// action creator

export const MORE_QTD = 'MORE_QTD';
export const moreQtd = () => ({
  type: MORE_QTD,
});

export const RESET_QTD = 'RESET_QTD';
export const resetQtd = () => ({
  type: RESET_QTD,
});

export const SET_POKEMONS = 'SET_POKEMONS';
export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});

export const SET_TOTAL = 'SET_TOTAL';
export const setTotal = (payload) => ({
  type: SET_TOTAL,
  payload,
});

export const SET_TYPES = 'SET_TYPES';
export const setTypes = (payload) => ({
  type: SET_TYPES,
  payload,
});

// thunk

export const fetchPokemons = (qtd) => async (dispatch) => {
  let pokemons = [];
  const requestData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${qtd}&offset=0`);
  const jsonData = await requestData.json();
  const { results, count } = jsonData;
  dispatch(setTotal(count));
  for (let i = 0; i < results.length; i += 1) {
    const requestPokemon = await fetch(results[i].url);
    const jsonPokemon = await requestPokemon.json();
    pokemons = [...pokemons, jsonPokemon];
  }
  dispatch(setPokemons(pokemons));
}

export const fetchTypes = () => async (dispatch) => {
  const requestTypes = await fetch('https://pokeapi.co/api/v2/type');
  const jsonTypes = await requestTypes.json();
  const { results } = jsonTypes;
  const types = results.map((item) => item.name);
  types.splice(types.length - 2, types.length - 1)
  dispatch(setTypes(types));
}
