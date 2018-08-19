import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Cadastro from '../pages/Cadastro'
import Listar from '../pages/Listar'
import Editar from '../pages/Editar'
import AddFoto from '../pages/AddFoto'
import Imprimir from '../pages/Imprimir'
import Home from '../pages/Home'


export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cadastro" component={Cadastro} />
        <Route exact path="/listar" component={Listar} />
        <Route path="/listar/:search" component={Listar} />
        <Route path="/editar/:id" component={Editar} />
        <Route path="/imprimir/:id" component={Imprimir} />
        <Route path="/addfoto/:id" component={AddFoto} />
        <Redirect from="*" to="/" />
    </Switch>
 