import React, { Component } from 'react'

export class Input extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.displayName}</label>
                <input
                    id={this.props.name}
                    name={this.props.name}
                    required={this.props.required}
                    type={this.props.type}
                    onChange={this.props.onChange}
                    className={this.props.className}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                />
            </div>
        )
    }
}

export class TextArea extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.displayName}</label>
                <textarea
                    className="form-control"
                    id={this.props.name}
                    name={this.props.name}
                    required={this.props.required}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder}
                    rows={this.props.rows} value={this.props.value}></textarea>
            </div>
        )
    }
}

export class DropBox extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.displayName}</label>
                <select
                    className="form-control"
                    id={this.props.name}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    value={this.props.value}
                >
                    {this.props.options.map((item, index) => {
                        return (<option key={index} value={item}>{item}</option>)
                    })}
                </select>
            </div>
        )
    }
}