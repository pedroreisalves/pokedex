import React, { Component } from 'react'
import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar/SearchBar'

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <SearchBar />
      </>
    )
  }
}
