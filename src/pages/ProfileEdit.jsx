import React, { Component } from 'react';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header tab="profile" />
        <h2>Profile Edit</h2>
      </div>
    );
  }
}
