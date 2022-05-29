import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchData, fetchTypes } from '../../redux/actions';
import icon from '../../images/icon-poke-red.svg';
import styles from './Main.module.css';

class Main extends Component {
  constructor() {
    super();
    this.state = { qtd: 9, search: '', }
  }

  componentDidMount() {
    const { fetchDataAction, fetchTypesAction } = this.props;
    fetchDataAction();
    fetchTypesAction();
  }

  seeMorePokemons = () => this.setState((prev) => ({ qtd: prev.qtd + 6 }), () => {
    const { qtd } = this.state;
    const { input, currentType, fetchDataAction } = this.props;
    fetchDataAction(currentType, input, qtd);
  })

  resolveId = (id) => {
    let newId = String(id);
    let zero = '';
    if (newId.length >= 3) return newId;
    for (let i = 0; i < 3 - newId.length; i += 1) {
      zero = '0' + zero;
    }
    return zero + newId;
  }

  searchByQuery = () => {
    const { currentType, fetchDataAction } = this.props;
    const { search } = this.state;
    fetchDataAction(currentType, search);
    this.setState({ search: '', qtd: 9 });
  }

  capitalizeFirstLetter = (string) => {
    let palavras = string.split(" ");
    for (let i = 0; i < palavras.length; i += 1) {
      palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
    }
    return palavras.join(" ");
  }

  render() {
    const { total, types, fetchDataAction, data, currentType } = this.props;
    const { qtd, search } = this.state;
    return (
      <>
        <div className={ styles.searchBar }>
          <div>
            <h1>Select your Pokémon</h1>
          </div>
          <div>
            <label htmlFor="search">
              <input
                value={ search }
                type="text"
                onChange={ ({ target }) => this.setState({ [target.id]: target.value }) }
                onKeyUp={ ({ key }) => (key === 'Enter' && search.length) && this.searchByQuery() }
                id="search"
                placeholder="Search a name"
              />
              <button
                onClick={ this.searchByQuery }
                disabled={ !search.length }
              ><i className="fa-solid fa-magnifying-glass"></i></button>
            </label>
          </div>
        </div>
        <div className={ styles.main }>
          <div className={ styles.typesContainer }>
              <div
                className={ `${styles.typeContainer} ${currentType === 'all' ? styles.selectedType : ''}` }
                onClick={ () => fetchDataAction('all') }
              >
                <div
                  style={{
                    backgroundImage: `url(/pokemon-types/all.svg`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '20px',
                    height: '20px',
                    marginRight: '17.75px',
                    marginLeft: '7.25px',
                  }}
                />
                <p>All</p>
              </div>
              {
                types.map((type, index) => (
                  <div
                    key={ index }
                    className={ `${styles.typeContainer} ${currentType === type ? styles.selectedType : ''}` }
                    onClick={ () => { this.setState({ qtd: 9 }, () => fetchDataAction(type)) } }
                  >
                    <div
                      style={{
                        backgroundImage: `url(/pokemon-types/${type}.svg`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: '35px',
                        height: '35px',
                        marginRight: '10px',
                      }}
                    />
                    <p>{this.capitalizeFirstLetter(type)}</p>
                  </div>
                ))
              }
          </div>
          <div className={ styles.mainInfo }>
            <div className={ styles.totalContainer }>
              <div>
                <img src={ icon } alt="poke-icon" />
                <h3>{ total } Pokémons</h3>
              </div>
              <div className={ styles.selectTypeContainer }>
                <select
                  name="typeSelect"
                  id="typeSelect"
                  onChange={ ({ target }) => { this.setState({ qtd: 9 }, () => fetchDataAction(target.value)) } }
                >
                  <option value="all">All</option>
                  {
                    types.map((type, index) => (
                      <option
                        key={ index }
                        value={ type }
                      >
                        {this.capitalizeFirstLetter(type)}
                      </option>
                    ))
                  }
                </select>
            </div>
            </div>
            <div className={ styles.pokemonsContainer }>
              {
                data.map((pokemon) => (
                  <div className={ styles.pokemonContainer } key={ pokemon.id }>
                    <img
                      src={ `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.resolveId(pokemon.id)}.png` }
                      alt={ pokemon.name }
                    />
                    <div>
                      <div>
                        <p>#{ this.resolveId(pokemon.id) }</p>
                        <h3>{ this.capitalizeFirstLetter(pokemon.name.replace(/-/g, " ")) }</h3>
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(/pokemon-types/${pokemon.types[0].type.name}.svg`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          width: '30px',
                          height: '30px',
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className={ styles.seeMoreContainer }>
              {
                (qtd < total)
                  && (
                    <button
                      type="button"
                      onClick={ this.seeMorePokemons }
                    >
                      See more
                    </button>
                  )
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

Main.propTypes = {
  fetchDataAction: propTypes.func.isRequired,
  fetchTypesAction: propTypes.func.isRequired,
  data: propTypes.arrayOf(propTypes.shape({})).isRequired,
  total: propTypes.number.isRequired,
  types: propTypes.arrayOf(propTypes.string).isRequired,
  currentType: propTypes.string.isRequired,
  input: propTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.fetchReducer.data,
  total: state.fetchReducer.total,
  types: state.fetchReducer.types,
  currentType: state.fetchReducer.currentType,
  input: state.fetchReducer.input,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDataAction: (type, query, qtd) => dispatch(fetchData(type, query, qtd)),
  fetchTypesAction: () => dispatch(fetchTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)