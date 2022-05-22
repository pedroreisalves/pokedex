import React, { Component } from 'react';
import pokemonLogo from '../../images/pokemon-logo.png';
import styles from "./Header.module.css";

export default class Header extends Component {
  render() {
    return (
      <div className={ styles.innitialContainer }>
        <div className={ styles.explore }>
          <i class="fa-solid fa-down-long"></i>
          <p>explore</p>
        </div>
        <header>
          <img src={ pokemonLogo } alt='pokemon-logo' />
          <p>developed by <span>pedro reis</span></p>
        </header>
        <div className={ styles.phrasesContainer }>
          <h1>Who is that Pokémon?</h1>
          <p>The perfect guide for those who want to hunt Pokémons around the world.</p>
        </div>
      </div>
    )
  }
}
