import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
    const { userInfo: { userName }, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h2>TrybeTunes</h2>
        {
          loading
            ? <Loading />
            : (
              <>
                <h3 data-testid="header-user-name">{ userName }</h3>
                <nav>
                  <Link to="/search" data-testid="link-to-search" />
                  <Link to="/favorites" data-testid="link-to-favorites" />
                  <Link to="/profile" data-testid="link-to-profile" />
                </nav>
              </>
            )
        }
      </header>
    );
  }
}
