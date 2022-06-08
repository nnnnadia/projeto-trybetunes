import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import { ReactComponent as PersonIcon } from '../assets/icons/person-circle.svg';

export default class Profile extends Component {
  state = {
    loading: true,
    userInfo: {
      image: '',
    },
  };

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      loading: false,
      userInfo,
    });
  }

  render() {
    const {
      loading,
      userInfo: {
        description,
        email,
        image,
        name,
      },
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header tab="profile" />
        { loading
          ? <h3 className="center-text"><Loading /></h3>
          : (
            <div className="profile-box">
              { image.length > 0
                ? <img alt="perfil" src={ image } data-testid="profile-image" />
                : <PersonIcon /> }
              <Link to="/profile/edit">
                <button type="button">
                  Editar perfil
                </button>
              </Link>
              <h4>Name</h4>
              <p>{ name }</p>
              <h4>E-mail</h4>
              <p>{ email }</p>
              <h4>Descrição</h4>
              <p>{ description }</p>
            </div>
          ) }
      </div>
    );
  }
}
