import React from 'react'

export default props =>
    <div class="modal fade" id={props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{props.titulo}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {props.children}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" name="fechar"
                    data-dismiss="modal" onClick={props.excluir}>Fechar</button>
                <button type="button" class="btn btn-primary" name="salvar"
                    data-dismiss="modal" onClick={props.excluir}>Salvar mudanças</button>
            </div>
            </div>
        </div>
    </div>
