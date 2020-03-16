import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <div className="user-auth-wrapper register">
            <h2 className="auth-heading">Register</h2>
            <div className="form">
                <div className="form-group">
                    <label>Enter First Name</label>
                    <input type="text" className="form-control" placeholder="First Name" />
                </div>
                <div className="form-group">
                    <label>Enter Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <label>Enter Email</label>
                    <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>Enter Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button className="auth-submit-button">register</button>
                <p className="auth-add-info">
                    <span>If you already have an Account, Click here to </span>
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}
