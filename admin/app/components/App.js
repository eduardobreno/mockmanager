import React, { Component } from 'react';
import Header from './Header';
import Router from '../common/Router';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="jumbotron" >
          <Router />
        </div>
      </div>
    );
  }
}
