import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    userInfo: {
      name: '',
    },
    isLoginButtonDisabled: true,
    loading: false,
    isLogged: false,
  };

  verifyUserInfo = () => {
    const { userInfo: { name } } = this.state;
    const userNameMaxLength = 3;
    if (name.length >= userNameMaxLength) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  }

  handleLoginButton = async () => {
    const { userInfo } = this.state;
    this.setState({ loading: true });
    await createUser(userInfo);
    this.setState({ isLogged: true });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ userInfo: { [name]: value } },
      () => this.verifyUserInfo());
  }

  render() {
    const {
      state: {
        userInfo: { name },
        isLoginButtonDisabled,
        loading,
        isLogged,
      },
      handleInputChange,
      handleLoginButton,
    } = this;
    if (isLogged) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        {
          loading
            ? (
              <Loading />
            )
            : (
              <>
                <h2>Login</h2>
                <input
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ handleInputChange }
                  data-testid="login-name-input"
                />
                <button
                  type="button"
                  onClick={ handleLoginButton }
                  disabled={ isLoginButtonDisabled }
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </>
            )
        }
      </div>
    );
  }
}