import React, { Component } from 'react';
import { Api } from "../../common/Api.js";
import axios from 'axios'
import { Input, TextArea, DropBox } from '../../common/FormFields.js';

export default class ServicesAdd extends Component {
    constructor() {
        super();
        this.requestType = ["POST", "GET", "PUT", "DELETE"];
        this.inputsRequest = {
            isOn: 'On',
            method: 'POST',
            statusResponse: '',
            bodyResponse: '',
            headerResponse: ''
        };
        this.state = {
            request: [
                this.inputsRequest
            ]
        }
    }
    componentDidMount() { }

    handleSubmit = (evt) => {
        evt.preventDefault();
        let serviceObj = {};
        [].forEach.call(this.form.querySelectorAll(".nIn"), (item => {
            serviceObj[item.name] = item.value;
        }));
        this.setState(serviceObj, () => {
            axios.post(Api.services, this.state).then(res => {
                console.log("res ", res)
            });
        });
    }

    handleRequestChange = (idx) => (evt) => {
        const newShareholders = this.state.request.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            let obj = {};
            obj[evt.target.name] = evt.target.value;
            let re = Object.assign({}, shareholder, obj);
            return re;
            // return { ...shareholder, name: evt.target.value };
        });

        this.setState({ request: newShareholders });
    }

    handleAddShareholder = () => {
        this.setState({
            request: this.state.request.concat([this.inputsRequest])
        });
    }

    handleRemoveShareholder = (idx) => () => {
        this.setState({
            request: this.state.request.filter((s, sidx) => idx !== sidx)
        });
    }

    render() {
        return (
            <div>
                <h2>
                    Services Add
                </h2>
                <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card row">
                                <div className="card-body">
                                    <Input className="form-control nIn" type="text" name="name" displayName="Name" placeholder="Nome do serviço" onChange={this.handleChange} />
                                    <Input className="form-control nIn" type="text" name="url" displayName="URL" placeholder="URL serviço" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.request.map((shareholder, idx) => (
                        <div key={idx} className="card row">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-2">
                                        <DropBox
                                            name="isOn"
                                            displayName="Ligado"
                                            options={["On", "Off"]}
                                            onChange={this.handleRequestChange(idx)}
                                            value={shareholder.isOn}
                                        />
                                    </div>
                                    <div className="col-2 btnRmDanger">
                                        {idx > 0 ?
                                            <button type="button" onClick={this.handleRemoveShareholder(idx)} className="btn btn-danger btn-sm "> - </button>
                                            : ''}

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <DropBox
                                            name="method"
                                            displayName="Method"
                                            options={this.requestType}
                                            onChange={this.handleRequestChange(idx)}
                                            value={shareholder.method}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Input
                                            type="number"
                                            className="form-control"
                                            name="statusResponse"
                                            displayName="Status Response"
                                            placeholder="Status"
                                            onChange={this.handleRequestChange(idx)}
                                            value={shareholder.statusResponse}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <TextArea
                                            name="headerResponse"
                                            displayName="Header"
                                            placeholder="Header"
                                            onChange={this.handleRequestChange(idx)}
                                            value={shareholder.headerResponse}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextArea
                                            name="bodyResponse"
                                            displayName="Body"
                                            placeholder="Body"
                                            onChange={this.handleRequestChange(idx)}
                                            value={shareholder.bodyResponse}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-12">
                            <button type="button" onClick={this.handleAddShareholder} className="btn btn-secondary btn-sm">Add</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form >
            </div >
        )
    }
}