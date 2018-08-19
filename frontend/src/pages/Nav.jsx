import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.state = { search:'' }
    }

    handleChange(event) {
        event.target.value = event.target.value.toUpperCase()
        this.setState({ [event.target.name]: event.target.value })
      }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand"  to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link"  to="/cadastro">Cadastrar
                                <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/listar">Listar</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" onChange={this.handleChange} 
                                name='search' placeholder="Buscar aluno" />
                            <Link className="btn btn-outline-success my-2 my-sm-0" to={`/listar/${this.state.search}`}>Buscar</Link>
                        </form>
                    </div>
                </nav>
            </div>
                )
            }
}