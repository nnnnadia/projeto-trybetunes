import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchQueue: '',
    isSearchButtonDisabled: true,
  };

  handleSearchButton = () => {

  }

  verifySearchQueue = () => {
    const { searchQueue } = this.state;
    if (searchQueue.length > 1) {
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.verifySearchQueue());
  }

  render() {
    const {
      state: {
        searchQueue,
        isSearchButtonDisabled,
      },
      handleInputChange,
      handleSearchButton,
    } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="searchQueue"
          value={ searchQueue }
          onChange={ handleInputChange }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          onClick={ handleSearchButton }
          disabled={ isSearchButtonDisabled }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
