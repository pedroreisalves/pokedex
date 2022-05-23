import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchPokemons, fetchTypes } from '../../redux/actions';
import icon from '../../images/icon-poke-red.svg';
import styles from './Main.module.css';

class Main extends Component {
  componentDidMount() {
    const { fetchPokemonsAction, qtd, fetchTypesAction } = this.props;
    fetchPokemonsAction(qtd);
    fetchTypesAction();
  }

  resolveId = (id) => {
    let newId = String(id);
    let zero = '';
    if (newId.length >= 3) return newId;
    for (let i = 0; i < 3 - newId.length; i += 1) {
      zero = '0' + zero;
    }
    return zero + newId;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { pokemons, total, types } = this.props;
    return (
      <div className={ styles.main }>
        <div className={ styles.typesContainer }>
            {
              types.map((type, index) => (
                <div key={ index } className={ styles.typeContainer }>
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
            <img src={ icon } alt="poke-icon" />
            <h3>{ total } Pokémons</h3>
          </div>
          <div className={ styles.pokemonsContainer }>
            {
              pokemons.map((pokemon) => (
                <div className={ styles.pokemonContainer } key={ pokemon.id }>
                  <img
                    src={ `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.resolveId(pokemon.id)}.png` }
                    alt={ pokemon.name }
                  />
                  <div>
                    <p>#{ this.resolveId(pokemon.id) }</p>
                    <h3>{ this.capitalizeFirstLetter(pokemon.name) }</h3>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  fetchPokemonsAction: propTypes.func.isRequired,
  fetchTypesAction: propTypes.func.isRequired,
  pokemons: propTypes.arrayOf(propTypes.shape({})).isRequired,
  types: propTypes.arrayOf(propTypes.string).isRequired,
  qtd: propTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  qtd: state.fetchReducer.qtd,
  pokemons: state.fetchReducer.pokemons,
  total: state.fetchReducer.total,
  types: state.fetchReducer.types,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPokemonsAction: (qtd) => dispatch(fetchPokemons(qtd)),
  fetchTypesAction: () => dispatch(fetchTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)