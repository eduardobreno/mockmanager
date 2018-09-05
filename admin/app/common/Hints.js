import React, { Component } from 'react'

export class Hints extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {this.props.variables ?
                    <div className="card">
                        <div className="card-body">
                            <ul>
                                <li>
                                    body = body do request
                                </li>
                                <li>
                                    args[0] = variavel que guarda o *** na URL (somente um CPF)
                                </li>
                                <li>
                                    urlParams = variavel que as queryString da url
                                </li>
                                <li>
                                    req = variavel da requisição recebida
                                </li>
                                <li>
                                    res = variavel do response
                                </li>
                                <li>
                                    response = body do response
                                </li>
                                <li>
                                    __PDF__ = Arquivo PDF para download
                                </li>
                                <li>
                                    ignoreResponse:bool = variavel caso queira ignorar a resposta padrão e enviar a própria utilizando (res.status(statusResponse).send(response))
                                </li>
                            </ul>
                        </div>
                    </div>
                    :
                    <div className="card">
                        <div className="card-body">
                            <ul>
                                <li>
                                    JSON de resposta, pode ser vazio
                                </li>
                            </ul>
                        </div>
                    </div>}
            </div>
        )
    }
}