import React from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "@fire-ui/fire-ui/FireUI.min";
import "@fire-ui/fire-ui/FireUI.min.css";
import Home from "./Components/index.jsx";
import Register from "./Components/register.jsx";
import Login from "./Components/login.jsx";
import Logout from "./Components/logout.jsx";

const App = () => (
    <Router>
        <Switch>
            <Route exact path = "/" component = {Home} />
            <Route path = "/register" component = {Register} />
            <Route path = "/login" component = {Login} />
            <Route path = "/logout" component = {Logout} />
        </Switch>
    </Router>
)

export default App;