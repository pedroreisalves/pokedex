import React, { Component } from 'react';
import styles from './SearchBar.module.css';

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state= { search: '' }
  }

  render() {
    return (
      <div className={ styles.searchBar }>
        <h1>Select your Pokémon</h1>
        <div>
          <label htmlFor={ styles.search }>
            <input
              type="text"
              onChange={ ({ target }) => this.setState({ [target.id]: target.value }) }
              id="search"
              placeholder="Search a name or id"
            />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
          </label>
        </div>
      </div>
    )
  }
}
