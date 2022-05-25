import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    loading: true,
    albumInfo: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumInfo = await getMusics(id);
    this.setState({
      loading: false,
      albumInfo: [...albumInfo],
    });
  }

  render() {
    const { loading, albumInfo } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              <h2 data-testid="album-name">{albumInfo[0].collectionName}</h2>
              <h3 data-testid="artist-name">{albumInfo[0].artistName}</h3>
              {albumInfo.filter((track) => track.trackId)
                .map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    trackName={ track.trackName }
                    previewUrl={ track.previewUrl }
                  />))}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
