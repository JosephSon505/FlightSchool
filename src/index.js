import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Notfound from './view/page/Notfound'
import SignIn from './view/page/Signin'
import SignUp from './view/page/Signup'
import Home from './view/page/Home'

import 'bootstrap/dist/css/bootstrap.css' 

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))