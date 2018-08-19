import React from 'react'
import FormUser from '../component/FormUser'

import URL from '../util/URL'

export default class Cadastro extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            aluno: { }
        }
    }

    handleClick(event) {
        event.preventDefault()
        if (!this.state.aluno.nome) 
            return alert("Campo nome obrigatório")

        const options = {
            method: 'POST',
            body: new URLSearchParams(this.state.aluno)
        }

        fetch(`${URL}/alunos`, options)
            .then(resp => resp.json())
            .then(aluno => {
                console.log(aluno)
                alert(`Nome: ${aluno.nome}`)
            })
        
        this.setState({aluno: {}})
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;

        let aluno = this.state.aluno
        aluno[name] = value
        this.setState(aluno)
      }

    render() {
        return (
            <section className='container'>
                <FormUser 
                    handleChange={this.handleChange.bind(this)} 
                    aluno={this.state.aluno} 
                    click={this.handleClick.bind(this)} />
            </section>
            )
    }
}
