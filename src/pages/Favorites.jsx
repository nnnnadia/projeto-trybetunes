import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    loading: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.updateFavoriteSongs();
  }

  updateFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs,
    });
  }

  render() {
    const {
      state: {
        loading,
        favoriteSongs,
      },
      updateFavoriteSongs,
    } = this;
    return (
      <div data-testid="page-favorites">
        <Header tab="favorites" />
        <h2>Favorites</h2>
        { loading
          ? <Loading />
          : favoriteSongs.map((trackObj) => (
            <MusicCard
              key={ trackObj.trackId }
              trackObj={ trackObj }
              handleRemoveFavorite={ updateFavoriteSongs }
            />
          ))}
      </div>
    );
  }
}
