import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import { ReactComponent as PersonIcon } from '../assets/icons/person-circle.svg';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userInfo: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
      isSaveButtonDisabled: true,
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      loading: false,
      userInfo,
    }, () => this.verifyUserInfo());
  }

  verifyUserInfo = () => {
    const {
      userInfo: {
        description,
        email,
        image,
        name,
      },
    } = this.state;
    const emailRegexp = /\S+@\S+\.\S+/i;
    if (description.length > 0
      && image.length > 0
      && name.length > 0
      && emailRegexp.test(email)) this.setState({ isSaveButtonDisabled: false });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prev) => ({
      userInfo: { ...prev.userInfo, [name]: value },
    }), () => this.verifyUserInfo());
  }

  updateUserInfo = async () => {
    const {
      state: { userInfo },
      props: { history },
    } = this;
    this.setState({ loading: true });
    await updateUser(userInfo);
    history.push('/profile');
  }

  render() {
    const {
      state: {
        loading,
        userInfo: {
          description,
          email,
          image,
          name,
        },
        isSaveButtonDisabled,
      },
      handleInputChange,
      updateUserInfo,
    } = this;
    return (
      <div data-testid="page-profile-edit">
        <Header tab="profile" />
        { loading
          ? <h3 className="center-text"><Loading /></h3>
          : (
            <div className="profile-box">
              { image.length > 0
                ? <img alt="perfil" src={ image } data-testid="profile-image" />
                : <PersonIcon /> }
              <input
                type="text"
                name="image"
                value={ image }
                onChange={ handleInputChange }
                data-testid="edit-input-image"
              />
              <h4>Name</h4>
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ handleInputChange }
                data-testid="edit-input-name"
              />
              <h4>E-mail</h4>
              <input
                type="text"
                name="email"
                value={ email }
                onChange={ handleInputChange }
                data-testid="edit-input-email"
              />
              <h4>Descrição</h4>
              <input
                type="text"
                name="description"
                value={ description }
                onChange={ handleInputChange }
                data-testid="edit-input-description"
              />
              <button
                type="button"
                onClick={ updateUserInfo }
                disabled={ isSaveButtonDisabled }
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </div>
          ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
