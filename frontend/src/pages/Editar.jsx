import React from 'react'
import FormUser from '../component/FormUser'

import URL from '../util/URL'

export default class Editar extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            aluno: {} ,
            alterado: {} ,
            id: this.props.match.params.id,
        }
    }

    handleClick(event) {
        event.preventDefault()
        if (!(this.state.alterado.nome === undefined)) {
            if (!this.state.alterado.nome) 
                return alert("Campo nome obrigatório")    
        }
        
        let estaAlterado = false
        let aluno = Object.assign({}, this.state.alterado)
        let objeto = Object.assign(this.state.aluno, this.state.alterado)
        let array = Object.entries(objeto)
        array.map(([campo, valor]) => {
            if (valor === this.state.alterado[campo]) {
                aluno[campo] = valor
                estaAlterado = true
            }
        })

        if (!estaAlterado) return
        delete aluno._id

        const options = {
            method: 'PUT',
            body: new URLSearchParams(aluno)
        }

        fetch(`${URL}/alunos/${this.state.id}`, options)
        .then(resp => resp.json())
        .then(aluno => {
            console.log(aluno)
            alert("registr alterado com sucesso!")
            this.props.history.push("/listar")
        })
    }

    componentDidMount(){
        if(!this.state.id) return
        let url = `${URL}/alunos/${this.state.id}`
        fetch(url)
            .then((response) => response.json()
                .then((data) => {
                    console.log(data)
                    this.setState({aluno: data })
                })
            ).catch(
            error => console.log(error)
            );
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let aluno = this.state.aluno
        aluno[name] = value
        this.setState(aluno)

        let alterado = this.state.alterado
        alterado[name] = value
        this.setState(alterado)
      }

    render() {
        return (
            <section className='container'>
                <FormUser 
                    handleChange={this.handleChange.bind(this)} 
                    carregar={this.componentDidMount.bind(this)} 
                    aluno={this.state.aluno} 
                    click={this.handleClick.bind(this)} />
            </section>
            )
    }
}
