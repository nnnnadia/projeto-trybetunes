import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as HeadfonesIcon } from '../assets/icons/headphones.svg';
import '../css/Logo.css';

export default class Logo extends Component {
  render() {
    const { whiteLogo } = this.props;
    const whiteColor = whiteLogo ? 'white-logo' : '';
    return (
      <div className={ `container-column logo ai-end ${whiteColor}` }>
        <div className="container-row ai-end">
          <h3 className="trybe">trybe</h3>
          <HeadfonesIcon />
        </div>
        <h3 className="tunes">tunes</h3>
      </div>
    );
  }
}

Logo.propTypes = {
  whiteLogo: PropTypes.bool,
};

Logo.defaultProps = {
  whiteLogo: false,
};
