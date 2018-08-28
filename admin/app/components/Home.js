import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Home extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        console.log();

    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink to="admin/services" activeClassName="active" >Services List</NavLink>
                    </li>
                    <li>
                        <NavLink to="admin/services/add" activeClassName="active" >Services Add</NavLink>
                    </li>
                </ul>
            </div >
        )
    }
}