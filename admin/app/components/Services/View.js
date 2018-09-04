import React, { Component } from 'react';
import { Api } from "../../common/Api.js";
import axios from 'axios'
import { TextArea } from '../../common/FormFields.js';

export default class ServicesView extends Component {
    constructor() {
        super();
        this.state = { request: { header: '' } };
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(Api.services + id, {})
            .then(response => {
                this.setState(response.data.data);
            });
    }


    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-xs-12">
                        <h2>Services View</h2>
                        <div className="row">
                            <div className="col-12">
                                <div className="card row">
                                    <div className="card-body">
                                        <TextArea
                                            required="true"
                                            className="form-control nIn"
                                            name="header"
                                            displayName="Header"
                                            rows="10"
                                            value={this.state.request.header} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card row">
                                    <div className="card-body">
                                        <TextArea
                                            required="true"
                                            className="form-control nIn"
                                            name="body"
                                            displayName="Body"
                                            rows="10"
                                            value={this.state.request.body} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}