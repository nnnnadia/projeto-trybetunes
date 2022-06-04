import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isFavorite: false,
    favLoading: true,
  };

  async componentDidMount() {
    const { trackObj: { trackId } } = this.props;
    const favTracks = await getFavoriteSongs();
    const isFavorite = favTracks.some((track) => track.trackId === trackId);
    if (isFavorite) this.setState({ isFavorite: true });
    this.setState({ favLoading: false });
  }

  handleInputChange = async ({ target }) => {
    this.setState({ favLoading: true });
    const { checked, name } = target;
    const { trackObj } = this.props;
    if (checked) {
      await addSong(trackObj);
    } else {
      await removeSong(trackObj);
    }
    this.setState({
      [name]: checked,
      favLoading: false,
    });
  }

  render() {
    const {
      props: {
        trackObj: {
          trackId,
          trackName,
          previewUrl,
        },
      },
      state: {
        isFavorite,
        favLoading,
      },
      handleInputChange,
    } = this;
    return (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {'O seu navegador não suporta o elemento '}
          <code>audio</code>
          .
        </audio>
        { favLoading
          ? <Loading />
          : (
            <label htmlFor="isFavorite">
              <input
                type="checkbox"
                name="isFavorite"
                checked={ isFavorite }
                onChange={ handleInputChange }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackObj: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};
