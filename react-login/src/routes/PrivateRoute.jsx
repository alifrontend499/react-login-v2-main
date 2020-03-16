import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthentcated = false;

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthentcated ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)
