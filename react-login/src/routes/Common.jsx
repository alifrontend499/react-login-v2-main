import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

// COMPONENTS
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import MyAccount from '../components/MyAccount';
import { PrivateRoute } from './PrivateRoute';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" /> }></Route>
            <PrivateRoute path="/home" component={Home}></PrivateRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <PrivateRoute path="/my-account" component={MyAccount}></PrivateRoute>
            <Route component={MyAccount}></Route>
        </Switch>
    )
}
