import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState("ali@gmail.com")
    const [password, setPassword] = useState("123456")
    const buttonRef = useRef(null)

    const handleUsernameChange = (ev) => {
        setEmail(ev.target.value)
    }
    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value)
    }
    const handleFormSubmit = (ev) => {
        ev.preventDefault()        
        buttonRef.current.classList.add('button-disabled')
        // if (email !== '' && password !== '') {
        //     console.log(`Email: ${email} Password: ${password}`);
        // }
    }

    return (
        <div className="user-auth-wrapper login">
            <h2 className="auth-heading">Login</h2>
            <div className="form">
                <form action="" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Enter Email</label>
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleUsernameChange} required />
                    </div>
                    <div className="form-group">
                        <label>Enter Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <button type="submit" ref={buttonRef} className="auth-submit-button">Login</button>
                </form>
                <p className="auth-add-info">
                    <span>If you don't have an Account, Click here to </span>
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}
