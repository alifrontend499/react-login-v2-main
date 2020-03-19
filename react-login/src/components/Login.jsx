import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { login, saveUser, checkUser } from '../services/user.service'

export default function Login() {
    const [email, setEmail] = useState("ali2@gmail.com")
    const [password, setPassword] = useState("123456")
    const [loading, setLoading] = useState(false)
    const [formMsg, setFormMsg] = useState('')
    const [msgType, setMsgType] = useState('')
    const buttonRef = useRef(null)

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value)
    }
    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value)
    }
    const handleFormSubmit = (ev) => {
        ev.preventDefault()
        console.log(checkUser());
        // disabling the login button
        buttonRef.current.classList.add('button-disabled')

        // enabling loading
        setLoading(true)

        // checking user login details
        login(email, password).then((res) => {
            console.log(res.data)

            // disabling loading
            setLoading(false)

            if(res.data) {
                const user = res.data
                // setting Success message
                setMsgType("success")
                setFormMsg("Login successfull")
                setTimeout(() => {
                    // empty the values
                    setMsgType("")
                    setFormMsg("")
                    // enabling the login button
                    buttonRef.current.classList.remove('button-disabled')
                    // saving the user to localStorage
                    saveUser(user)
                }, 1000);
            }

        }).catch(err => {
            if (err.response) {
                const errorResponse = err.response.data
                // console.log(errorResponse)
                // setting Error Type
                setMsgType(`error ${errorResponse.msgType}`)
                // setting Form Error
                setFormMsg(errorResponse.errorMessage)

                setTimeout(() => {
                    // empty the values
                    setMsgType("")
                    setFormMsg("")
                    // enabling the login button
                    buttonRef.current.classList.remove('button-disabled')
                }, 5000);
            }
            // disabling loading
            setLoading(false)
        })
    }

    return (
        <div className="user-auth-wrapper login">
            <h2 className="auth-heading">Login</h2>
            <div className="form">
                {
                    (formMsg && formMsg.length) ?
                        <div className={`forms-message ${(msgType && msgType.length ? msgType : '')}`}>
                            <p>{formMsg}</p>
                        </div> : null
                }
                <form action="" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Enter Email</label>
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} required />
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
