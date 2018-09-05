import React, { Component } from 'react';
import { Api } from "../../common/Api.js";
import axios from 'axios'
import { Input, TextArea, DropBox } from '../../common/FormFields.js';
import { Hints } from '../../common/Hints.js';

export default class ServicesAdd extends Component {
    constructor() {
        super();
        this.inputsRequest = {
            isOn: 'On',
            statusResponse: '',
            bodyResponse: ''
        };
        this.state = {
            retornoServer: null,
            response: [
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
        this.form.checkValidity()
        this.setState(serviceObj, () => {
            axios.post(Api.services, this.state).then(res => {
                this.setState({ retornoServer: res.data.msg });
                window.scrollTo(0, 0);
                if (res.data.success) {
                    setTimeout(() => {
                        this.props.history.goBack();
                    }, 1000);
                }
            });
        });
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleRequestChange = (idx) => (evt) => {
        const newReq = this.state.response.map((reqs, sidx) => {
            if (evt.target.name == "isOn" && evt.target.value == "On") {
                reqs.isOn = "Off";
            }
            if (idx !== sidx) return reqs;
            let obj = {};
            obj[evt.target.name] = evt.target.value;
            let re = Object.assign({}, reqs, obj);
            return re;
        });
        this.setState({ response: newReq });
    }

    handleAddReq = () => {
        let newIn = Object.assign({}, this.inputsRequest);
        newIn.isOn = "Off";
        this.setState({
            response: this.state.response.concat([newIn])
        });
    }

    handleRemoveShareholder = (idx) => () => {
        this.setState({
            response: this.state.response.filter((s, sidx) => idx !== sidx)
        });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-xs-12">
                        {this.state.retornoServer ? <div className="alert alert-dark" role="alert">
                            {this.state.retornoServer}
                        </div> : ''}
                        <h2>Services Add</h2>
                        <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card row">
                                        <div className="card-body">
                                            <Input
                                                required="true"
                                                className="form-control nIn"
                                                type="text"
                                                name="url"
                                                displayName="URL"
                                                placeholder="URL serviço"
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="card row">
                                        <div className="card-body">
                                            <TextArea
                                                required="true"
                                                className="form-control nIn"
                                                name="description"
                                                displayName="Descrição"
                                                placeholder="Descrição de onde é usado esse serviço"
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 noPadding">
                                    {this.state.response.map((shareholder, idx) => (
                                        <div key={idx} className="card" >
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-3 col-xs-1">
                                                        <DropBox
                                                            name="isOn"
                                                            displayName={"Response #" + (idx + 1)}
                                                            options={["On", "Off"]}
                                                            onChange={this.handleRequestChange(idx)}
                                                            value={shareholder.isOn}
                                                        />
                                                    </div>
                                                    <div className="col-2 offset-1 btnRmDanger">
                                                        {idx > 0 ?
                                                            <button type="button" onClick={this.handleRemoveShareholder(idx)} className="btn btn-danger btn-sm "> - </button>
                                                            : ''}

                                                    </div>
                                                    <div className="col-3">
                                                        <Input
                                                            required="true"
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
                                                            name="bodyResponse"
                                                            displayName="Body"
                                                            placeholder="Body"
                                                            onChange={this.handleRequestChange(idx)}
                                                            rows="10"
                                                            value={shareholder.bodyResponse}
                                                        />
                                                        <Hints />
                                                    </div>

                                                    <div className="col-6">
                                                        <TextArea
                                                            name="scriptBefore"
                                                            displayName="Script before send"
                                                            placeholder="JS code"
                                                            onChange={this.handleRequestChange(idx)}
                                                            rows="10"
                                                            value={shareholder.scriptBefore}
                                                        />
                                                        <Hints variables />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="button" onClick={this.handleAddReq} className="btn btn-secondary btn-sm">+</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}