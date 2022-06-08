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

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs,
    });
  }

  updateFavoriteSongs = (trackId) => {
    const { favoriteSongs } = this.state;
    const updatedFavoriteSongs = favoriteSongs
      .filter((track) => track.trackId !== trackId);
    this.setState({ favoriteSongs: updatedFavoriteSongs });
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
