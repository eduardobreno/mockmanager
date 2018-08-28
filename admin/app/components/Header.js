import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <NavLink className="navbar-brand" to="/admin" activeClassName="active" >Mock Manager</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="services" activeClassName="active" >Serviços</NavLink>
            </li>
          </ul> */}

        </div>
      </nav>
    )
  }
}