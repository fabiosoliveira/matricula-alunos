// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/js/dist/modal'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'
import Nav from '../pages/Nav'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Nav />
            <Routes />
        </div>
    </BrowserRouter>
