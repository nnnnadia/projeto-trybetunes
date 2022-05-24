import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

export default class Albums extends Component {
  render() {
    const { searchedArtist, albumsReturned } = this.props;
    if (searchedArtist === '') return null;
    return (
      <div>
        { albumsReturned.length > 0 ? (
          <div>
            <h3>
              {`Resultado de álbuns de: ${searchedArtist}`}
            </h3>
            { albumsReturned.map((album) => (
              <AlbumCard key={ album.collectionId } album={ album } />
            ))}
          </div>
        ) : (
          <h3>
            Nenhum álbum foi encontrado
          </h3>
        )}
      </div>
    );
  }
}

Albums.propTypes = {
  searchedArtist: PropTypes.string,
  albumsReturned: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  })),
};

Albums.defaultProps = {
  searchedArtist: '',
  albumsReturned: [],
};
