import React, { Component } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import SearchBar from '../components/SearchBar/SearchBar'

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <SearchBar />
        <Main />
        <Footer />
      </>
    )
  }
}
