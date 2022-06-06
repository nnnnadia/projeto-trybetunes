import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from './Logo';
import '../css/Header.css';
import HeaderUser from './HeaderUser';

export default class Header extends Component {
  state = {
    userInfo: {
      userName: '',
    },
    loading: true,
  };

  async componentDidMount() {
    const currUser = await getUser();
    this.setState({
      userInfo: { userName: currUser.name },
      loading: false,
    });
  }

  render() {
    const {
      state: {
        userInfo: { userName },
        loading,
      },
      props: {
        tab,
      },
    } = this;
    return (
      <header data-testid="header-component">
        <div className="top-header-box container-row ai-center jc-spacebetween">
          <Logo whiteLogo />
          <HeaderUser loading={ loading } userName={ userName } />
        </div>
        <nav>
          <ul className="bot-header-box container-row">
            <li className={ tab === 'search' ? 'tab-on' : 'tab' }>
              {loading
                ? <Loading />
                : (
                  <Link to="/search" data-testid="link-to-search">
                    Pesquisa
                  </Link>)}
            </li>
            <li className={ tab === 'favorites' ? 'tab-on' : 'tab' }>
              {loading
                ? <Loading />
                : (
                  <Link to="/favorites" data-testid="link-to-favorites">
                    Favoritas
                  </Link>)}
            </li>
            <li className={ tab === 'profile' ? 'tab-on' : 'tab' }>
              {loading
                ? <Loading />
                : (
                  <Link to="/profile" data-testid="link-to-profile">
                    Perfil
                  </Link>)}
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  tab: PropTypes.string.isRequired,
};
