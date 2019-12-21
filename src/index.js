import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './view/page/App'
import Users from './view/page/Users'
import Contact from './view/page/Contact'
import Notfound from './view/page/Notfound'

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <NavLink exact activeClassName="active" to="/">
                        Home
          </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/users">
                        Users
          </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/contact">
                        Contact
          </NavLink>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/users/:id" component={Users} />
                <Route path="/contact" component={Contact} />
                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))