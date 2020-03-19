import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkUser } from '../services/user.service'

const isAuthentcated = checkUser();
console.log(checkUser());

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthentcated ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)
