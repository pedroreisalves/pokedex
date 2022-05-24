// action creator

export const SET_DATA = 'SET_DATA';
export const setData = (payload) => ({
  type: SET_DATA,
  payload,
});

export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const setInputValue = (payload) => ({
  type: SET_INPUT_VALUE,
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

export const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';
export const setCurrentType = (payload) => ({
  type: SET_CURRENT_TYPE,
  payload,
});

// helpers

const fetchPokemons = async (results, qtd) => {
  let pokemons = [];
  for (let i = 0; i < qtd; i += 1) {
    const requestPokemon = await fetch(results[i].url);
    const jsonPokemon = await requestPokemon.json();
    pokemons = [...pokemons, jsonPokemon];
  }
  return pokemons;
}

// thunk

export const fetchData = (type = 'all', query = '', qtd = 9) => async (dispatch) => {
  let results = [];
  if (type === 'all') {
    const requestData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=898&offset=0`);
    const jsonData = await requestData.json();
    results = jsonData.results;
  } else {
    const requestData = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
    const jsonData = await requestData.json();
    results = jsonData.pokemon.map((pokemon) => pokemon.pokemon);
  }
  results = results.filter((pokemon) => {
    const splice = pokemon.url.slice(pokemon.url.indexOf('pokemon')).replace(/\D/gim, '');
    return pokemon.name.includes(query) && splice <= 898;
  });
  let pokemons = await fetchPokemons(results, qtd > results.length ? results.length : qtd);
  dispatch(setInputValue(query));
  dispatch(setCurrentType(type));
  dispatch(setTotal(results.length));
  dispatch(setData(pokemons));
}

export const fetchTypes = () => async (dispatch) => {
  const requestTypes = await fetch('https://pokeapi.co/api/v2/type');
  const jsonTypes = await requestTypes.json();
  const { results } = jsonTypes;
  const types = results.map((item) => item.name);
  types.splice(types.length - 2, types.length - 1)
  dispatch(setTypes(types));
}
