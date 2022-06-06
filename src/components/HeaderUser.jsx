import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { ReactComponent as PersonIcon } from '../assets/icons/person-circle.svg';
import '../css/HeaderUser.css';

export default class HeaderUser extends Component {
  render() {
    const { loading, userName } = this.props;
    return (
      <div className="user-box container-row ai-center">
        <PersonIcon />
        <h3 className="user-name" data-testid="header-user-name">
          { loading ? <Loading /> : userName }
        </h3>
      </div>
    );
  }
}

HeaderUser.propTypes = {
  loading: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};
