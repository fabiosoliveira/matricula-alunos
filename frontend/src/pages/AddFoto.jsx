import React from 'react'

import URL from '../util/URL'

const selecao = 'Selecione a foto'

export default class AddFoto extends React.Component {
    
    state = {
        src: `${URL}/fotos/${this.props.match.params.id}.jpg`,
        inputText: selecao
    }

    handleChange(event) {
        this.setState({ inputText: event.target.value })
    }

    componentDidMount(){
        const hidden = document.querySelector('input[type=hidden]')
        const file = document.querySelector('input[type=file]')
        
        const formdata = new FormData()
        formdata.append(hidden.name, hidden.value)
        formdata.append(file.name, file.files[0])

        const link = `${URL}/upload`;

        const options = {
            method: 'POST',
            body: formdata
        }

        fetch(link, options)
            .then(resp => resp.text())
            .then(data => {
                this.setState({
                    src: `${URL}/fotos/${data}`,
                    inputText: selecao
                })
        });
    }
    

    render() {
        
        return (
            <div className='container'>
                <div className="row">
                    <h3>{this.props.match.params.id}</h3>
                    <input type='hidden' name='id' value={this.props.match.params.id} />
                </div>
                <div className="row">
                    <div className="custom-file col">
                        <input type="file" className="custom-file-input" name="foto" 
                            onChange={e => this.handleChange(e)} />
                        <label className="custom-file-label" htmlFor="customFile">
                            {this.state.inputText}
                        </label>
                    </div>
                    <div className="col">
                        <button onClick={e => this.componentDidMount(e)} className="btn btn-primary btn-foto">Enviar</button>
                    </div>
                </div>
                <div className="row">
                    <img id='imagem' height="144" width="176" src={this.state.src} alt="foto" />
                </div>
            </div>
        )
    }
}