import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: true,
    userInfo: {},
  };

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      loading: false,
      userInfo,
    });
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header tab="profile" />
        { loading
          ? <h3 className="center-text"><Loading /></h3>
          : null }
      </div>
    );
  }
}
