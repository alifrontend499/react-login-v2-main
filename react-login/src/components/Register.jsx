import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { register } from '../services/user.service'

export default function Register() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [formMsg, setFormMsg] = useState('')
    const [msgType, setMsgType] = useState('')
    const buttonRef = useRef(null)

    const handleFirstNameChange = (ev) => {
        setFirstName(ev.target.value)
    }
    const handleLastNameChange = (ev) => {
        setLastName(ev.target.value)
    }
    const handleEmailChange = (ev) => {
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

        register(firstName, lastName, email, password).then(res => {
            console.log(res.data)

            // disabling loading
            setLoading(false)

            // enabling the login button
            buttonRef.current.classList.remove('button-disabled')
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
        <div className="user-auth-wrapper register">
            <h2 className="auth-heading">Register</h2>
            <div className="form">
                {
                    (formMsg && formMsg.length) ?
                        <div className={`forms-message ${(msgType && msgType.length ? msgType : '')}`}>
                            <p>{formMsg}</p>
                        </div> : null
                }
                <form action="" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Enter First Name</label>
                        <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} required />
                    </div>
                    <div className="form-group">
                        <label>Enter Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
                    </div>
                    <div className="form-group">
                        <label>Enter Email</label>
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Enter Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div className="d-flex align-items-center">
                        <button type="submit" ref={buttonRef} className="auth-submit-button">register</button>
                        {
                            loading &&
                            <FontAwesomeIcon icon={faSpinner} spin style={{ marginLeft: 10 }} />
                        }
                    </div>
                </form>
                <p className="auth-add-info">
                    <span>If you already have an Account, Click here to </span>
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}
