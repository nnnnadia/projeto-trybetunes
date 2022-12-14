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
    this.setState({
      isFavorite,
      favLoading: false,
    });
  }

  handleInputChange = async ({ target }) => {
    this.setState({ favLoading: true });
    const { checked, name } = target;
    const { trackObj, handleRemoveFavorite } = this.props;
    if (checked) {
      await addSong(trackObj);
      this.setState({
        [name]: checked,
        favLoading: false,
      });
    } else {
      await removeSong(trackObj);
      this.setState({
        [name]: checked,
        favLoading: false,
      });
      handleRemoveFavorite(trackObj.trackId);
    }
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
                id="isFavorite"
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
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  handleRemoveFavorite: PropTypes.func,
};

MusicCard.defaultProps = {
  handleRemoveFavorite: () => {},
};
