import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState("a@g.com")
    const [password, setPassword] = useState("aa")
    const [loading, setLoading] = useState(false)
    const [validationError, setvalidationError] = useState('')
    const buttonRef = useRef(null)

    const handleUsernameChange = (ev) => {
        setEmail(ev.target.value)
    }
    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value)
    }
    const handleFormSubmit = (ev) => {
        ev.preventDefault()
        // disabling the login button
        buttonRef.current.classList.add('button-disabled')

        // enabling loading
        setLoading(true)

        // empty validations errors
        // setvalidationError("")

        // checking user login details
        axios.post('http://localhost:1000/api/user/login', {
            email: email,
            password: password
        }).then((res) => {            
            console.log(res)

            // disabling loading
            setLoading(false)

            // setting validations error
            if (res.data.validationError) {
                const validationError = res.data.validationError
                setvalidationError(validationError)
                setTimeout(() => {
                    setvalidationError("")
                    // enabling the login button
                    buttonRef.current.classList.remove('button-disabled')
                }, 3000);
                return
            }
        }).catch(err => {
            console.log(err)

            // enabling the login button
            buttonRef.current.classList.remove('button-disabled')

            // disabling loading
            setLoading(false)
        })
    }

    return (
        <div className="user-auth-wrapper login">
            <h2 className="auth-heading">Login</h2>
            <div className="form">
                {
                    (validationError && validationError.length) ?
                        <div className="forms-errors">
                            <p>{validationError}</p>
                        </div> : null
                }
                <form action="" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Enter Email</label>
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleUsernameChange} required />
                    </div>
                    <div className="form-group">
                        <label>Enter Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div className="d-flex align-items-center">
                        <button type="submit" ref={buttonRef} className="auth-submit-button">Login</button>
                        {
                            loading &&
                            <FontAwesomeIcon icon={faSpinner} spin style={{ marginLeft: 10 }} />
                        }
                    </div>

                </form>
                <p className="auth-add-info">
                    <span>If you don't have an Account, Click here to </span>
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}
