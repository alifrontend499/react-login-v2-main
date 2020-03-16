import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="menu">
            <ul className="list-inline navbar d-flex flex-wrap">
                {/* <li className="nav-item">
                    <NavLink to='/home' activeClassName="opened">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/my-account' activeClassName="opened">My Account</NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink to='/login' activeClassName="opened">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/register' activeClassName="opened">Register</NavLink>
                </li>
            </ul>
        </nav>
    )
}
