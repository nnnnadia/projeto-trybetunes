import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Albums from '../components/Albums';

export default class Search extends Component {
  state = {
    searchQueue: '',
    isSearchButtonDisabled: true,
    loading: false,
    searchResult: {
      searchedArtist: '',
      albumsReturned: [],
    },
  };

  handleSearchButton = async () => {
    const { searchQueue: currentSearch } = this.state;
    this.setState(({ searchResult }) => ({
      loading: true,
      searchResult: { ...searchResult, searchedArtist: currentSearch },
    }));
    const albumsList = await searchAlbumsAPI(currentSearch);
    this.setState(({ searchResult }) => ({
      loading: false,
      searchResult: { ...searchResult, albumsReturned: [...albumsList] },
      searchQueue: '',
    }));
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
        loading,
        searchResult: {
          searchedArtist,
          albumsReturned,
        },
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
        <Albums
          searchedArtist={ searchedArtist }
          albumsReturned={ albumsReturned }
        />
        { loading && <Loading /> }
      </div>
    );
  }
}
