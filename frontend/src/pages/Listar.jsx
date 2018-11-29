
import React from 'react'
import { Link } from 'react-router-dom'

import URL from '../util/URL'
import ModalExcluir from  '../component/ModalExcluir'

const LIMIT = 15

export default class Listar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lista: [{}],
            status: 0,
            pages: [],
            page: 1,
            totalPage: 0,
            excluir: ""
        }
    }
    
    componentDidMount(){
        let query = 'nome=1&data_nascimento=1&cor=1&sexo=1&contato=1&documento_SUS=1&tipo=1&serie=1&turma=1'
        query += `&limit=${LIMIT}&page=${this.state.page}`

        let url
        if (this.props.match.params.search) {
            url = `${URL}/alunos/nome/${this.props.match.params.search}?${query}`
            console.log(this.props.match.params.search)
        } else {
            url = `${URL}/alunos?${query}`;
        }
        
        fetch(url)
            .then((response) => response.json()
                .then((data) => {
                    this.setState({ lista: data })
                })
            ).catch(
            error => console.log(error)
            );
        
        if (this.props.match.params.search) {
            url = `${URL}/alunos/quantidade?campo=nome&search=${this.props.match.params.search}`
            console.log(this.props.match.params.search)
        } else {
            url = `${URL}/alunos/quantidade`;
        }

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                const totalPage = Math.ceil(data.quantidade / LIMIT)

                let pages = []

                for (let i = 1; i <= totalPage; i++) {
                    pages.push(i)   
                }
                this.setState({ pages, totalPage })
            })
    }

    changePage(event, page) {
        if (page > this.state.totalPage || page < 1 || page === this.state.page) return
        this.setState({ page, status: 1 })
        event.preventDefault()
    }

    renderPagination() {
        return (
            <nav aria-label="paginação" className="fixed-bottom">
                <ul className="pagination pagination-sm justify-content-center">
                    <li className={this.state.page <= 1 ? 'page-item disabled' : 'page-item'} 
                        onClick={e => this.changePage(e, this.state.page - 1)}>
                        <a className="page-link" href="#">Previous</a>
                    </li>
                    {this.state.pages.map((element) => (
                        <li className={this.state.page === element ? 'page-item active' : 'page-item'} 
                            onClick={e => this.changePage(e, element)}>
                            <a className="page-link" href="#">{element}</a>
                        </li>
                    ))}
                    <li className={this.state.page >= this.state.totalPage ? 'page-item disabled' : 'page-item'} 
                        onClick={e => this.changePage(e, this.state.page + 1)}>
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        )
    }

    excluir(event){
        event.preventDefault()

        if (event.target.name === "salvar"){
            const param = this.state.excluir.split("/").pop()
            const URL_TO_FETCH = `${URL}/alunos/${param}`

            fetch(URL_TO_FETCH , { method: 'delete' })
                .then(resp => resp.json())
                .then(data => { 
                   const lista = this.getUpdateList(data)
                   this.setState({ lista })
                })
                .catch(function(err) { 
                    console.error(err)
            })
        }
        this.setState({ excluir: '' })
    }

    getUpdateList(obj) {
        return this.state.lista.filter(u => u._id !== obj.id)
    }

    prepararParaExcluir(event){
        event.preventDefault()
        this.setState({ excluir: event.target.href})
    }

    render() {

        if (this.props.match.params.search !== this.state.status){
            this.setState({status: this.props.match.params.search})
            this.componentDidMount()
        }
        
        return (
            <section className='container'>

            <ModalExcluir id="modalExcluir" titulo="Confirmar Exclusão" 
                excluir={e => this.excluir(e)}>
                Este contato está prestes a ser excluido    
            </ModalExcluir>

            <table onLoad={this.componentDidMount.bind(this)} className="table table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">D. Nasci.</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Contato</th>
                    <th scope="col">Documento SUS</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.lista.map((element, index) => (
                        <tr key={index}>
                            <td>{element.nome}</td>
                            <td>{element.data_nascimento}</td>
                            <td>{element.cor}</td>
                            <td>{element.sexo}</td>
                            <td>{element.contato}</td>
                            <td>{element.documento_SUS}</td>
                            <td>{element.tipo === 'EIXO'? 
                                `EIXO ${element.serie} ${element.turma}`:
                                `${element.serie}ª SÉRIE ${element.turma}`}</td>
                            <td><Link to={`/editar/${element._id}`}>edit.</Link>|
                                <a href={`/excluir/${element._id}`} data-toggle="modal" data-target="#modalExcluir"
                                    onClick={e => this.prepararParaExcluir(e)}>
                                    excluir
                                </a>|
                                <Link to={`/addfoto/${element._id}`}>foto</Link>|
                                <Link to={`/imprimir/${element._id}`}>impr.</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {this.renderPagination()}
            </section>
            )
    }
}