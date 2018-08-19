import './Imprimir.css'
import React from 'react'

import URL from '../util/URL'

export default class Lista extends React.Component {
    constructor(props) {
        super(props)
        this.calculaIdade = this.calculaIdade.bind(this)
        this.state = {
            aluno: {}
        }
    }
    
    componentDidMount(){
        let url = `${URL}/alunos/${this.props.match.params.id}`
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

    calculaIdade(data_nascimento){
        let nascimento = new Date(data_nascimento)
        let hoje = new Date()
        return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);
    }

    render() {
        return (
            <div onLoad={this.componentDidMount.bind(this)} className="media imprimir container" >
                <img className="align-self-start mr-3" 
                src={`${URL}/fotos/${this.props.match.params.id}.jpg`} 
                height="144" width="176"
                alt="Foto" />
                <div className="media-body">
                    <h3 className="mt-0">Dados do aluno</h3>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <b>NOME:</b> {this.state.aluno.nome}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>D. NASCIMENTO:</b> {this.state.aluno.data_nascimento}
                            </div>
                            <div className="col-md">
                                <b>IDADE:</b> {this.calculaIdade(this.state.aluno.data_nascimento)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>SEXO:</b> {this.state.aluno.sexo}
                            </div>
                            <div className="col-md">
                                <b>COR:</b> {this.state.aluno.cor}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>ENDEREÇO:</b> {this.state.aluno.endereço}
                            </div>
                            <div className="col-md">
                                <b>BAIRRO:</b> {this.state.aluno.bairro}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>CEP:</b> {this.state.aluno.CEP}
                            </div>
                            <div className="col-md">
                                <b>MUNICÍPIO:</b> {this.state.aluno.cidade}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>CPF:</b> {this.state.aluno.número_CPF}
                            </div>
                            <div className="col-md">
                                <b>RG:</b> {this.state.aluno.número_RG}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>D. EXPEDIÇÃO:</b> {this.state.aluno.data_de_expedição}
                            </div>
                            <div className="col-md">
                                <b>ÓRGÃO EMISSOR:</b> {this.state.aluno.órgão_emissor}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>CONTATO:</b> {this.state.aluno.contato}
                            </div>
                            <div className="col-md">
                                <b>CARTÃO SUS:</b> {this.state.aluno.documento_SUS}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>CERTIDÃO NASCIMENTO:</b> {this.state.aluno.número_certidão_de_nascimento}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>TERMO:</b> {this.state.aluno.termo}
                            </div>
                            <div className="col-md">
                                <b>FOLHA:</b> {this.state.aluno.folha}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>LIVRO:</b> {this.state.aluno.livro}
                            </div>
                            <div className="col-md">
                                <b>D. EMISSÃO:</b> {this.state.aluno.data_de_emissão}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>PAI:</b> {this.state.aluno.nome_do_pai}
                            </div>
                            <div className="col-md">
                                <b>RG/CPF:</b> {this.state.aluno.RG_CPF_do_pai}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>MÃE:</b> {this.state.aluno.nome_da_mãe}
                            </div>
                            <div className="col-md">
                                <b>RG/CPF:</b> {this.state.aluno.RG_CPF_da_mãe}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>TURNO:</b> {this.state.aluno.turno}
                            </div>
                            <div className="col-md">
                                <b>TURMA:</b> {this.state.aluno.tipo === 'EIXO'? 
                                                `EIXO ${this.state.aluno.serie} ${this.state.aluno.turma}`:
                                                `${this.state.aluno.serie}ª SÉRIE ${this.state.aluno.turma}`}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>UTILIZA TRANSPORTE ESCOLAR:</b> 
                                {this.state.aluno.transporte_escolar?'SIM':'NÃO'}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>ALGUMA NECESSIDADE ESPECIAL?:</b> 
                                {this.state.aluno.necessidade_especial?this.state.aluno.necessidade_especial:'NÃO'}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>FAZ TRATAMENTO ESPECIALIZADO?:</b> 
                                {this.state.aluno.tratamento_especializado?this.state.aluno.tratamento_especializado:'NÃO'}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>TEM ALGUM TIPO DE ALERGIA?:</b> 
                                {this.state.aluno.tem_algum_tipo_de_alergia?this.state.aluno.tem_algum_tipo_de_alergia:'NÃO'}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>UTILIZA ALGUM REMÉDIO CONTÍNUO?:</b> 
                                {this.state.aluno.utiliza_algum_remedio_continuo?this.state.aluno.utiliza_algum_remedio_continuo:'NÃO'}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <b>EM CASO DE PASSAR MAL NA ESCOLA, QUAL PROCEDIMENTO A SER TOMADO?:</b> 
                                <br /> {this.state.aluno.procedimento_escolar}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}