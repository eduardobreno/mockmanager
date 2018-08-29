import React, { Component } from 'react';
import { Api } from "../../common/Api.js";
import axios from 'axios'

export default class ServicesList extends Component {
    constructor() {
        super();
        this.state = { list: [] };
    }
    componentDidMount() {
        console.log(Api.services);

        axios.get(Api.services)
            .then(response => {
                this.setState({ list: response.data });
            });

    }
    add = () => {
        window.location.assign("services/add");
    }

    listItem = (item) => {
        let div = [];

        this.state.list.forEach((item, index) => {
            div.push(
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.url}</td>
                    <td>Ações</td>
                </tr>
            );
        });

        return div;
    }

    render() {
        return (
            <div>
                <h2>
                    Services List
                </h2>
                <div className="row">
                    <div className="col-sm text-right">
                        <button type="button" onClick={this.add} className="btn btn-primary">Adicionar</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <table className="table table-hover table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">URL</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.listItem()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )
    }
}