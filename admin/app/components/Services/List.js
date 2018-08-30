import React, { Component } from 'react';
import { Api } from "../../common/Api.js";
import axios from 'axios'

export default class ServicesList extends Component {
    constructor() {
        super();
        this.state = { list: [] };
    }
    componentDidMount() {
        axios.get(Api.services)
            .then(response => {
                this.setState({ list: response.data.data });
            });

    }
    add = () => {
        this.props.history.push('services/add');
    }

    edit = (id, obj) => () => {
        this.props.history.push({
            pathname: 'services/edit/' + id,
            state: { detail: obj }
        })
    }

    delete = (id) => () => {
        axios.delete(Api.services + id, {}).then(res => {
            this.setState({ retornoServer: res.data.msg });
            window.scrollTo(0, 0);
            if (res.data.success) {
                this.setState({ list: res.data.data });
                setTimeout(() => {
                    this.setState({ retornoServer: null });
                }, 1000);
            }
        });
    }

    listItem = () => {
        let div = [];

        this.state.list.forEach((item, index) => {
            div.push(
                <tr key={index}>
                    <td className="text-truncate text-left">{item.url}</td>
                    <td className="text-center">
                        <button type="button" className="btn btn-secondary" onClick={this.edit(item._id, item)}>Editar</button>
                        <button type="button" className="btn btn-danger" onClick={this.delete(item._id)}>Excluir</button>
                    </td>
                </tr>
            );
        });
        return div;
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-10 col-xs-12">
                        {this.state.retornoServer ? <div className="alert alert-dark" role="alert">
                            {this.state.retornoServer}
                        </div> : ''}
                        <h2>Services List</h2>
                        <div className="row">
                            <div className="col-sm text-right">
                                <button type="button" onClick={this.add} className="btn btn-secondary">Adicionar</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <table className="table table-hover table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th width="80%" className="text-center">URL</th>
                                            <th width="20%" className="text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.listItem()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        )
    }
}