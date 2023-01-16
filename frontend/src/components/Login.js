import React, { useState, useCallback } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './Login.css';

function Login({ isLoggedIn, onLogin }) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value })
    }, [userData]);

    const submitChange = useCallback( (event) => {
        event.preventDefault()
        try {
            onLogin(userData.email, userData.password)
        } catch (err) {
            console.log('Error')
        }
    }, [onLogin, userData])

    if (isLoggedIn) {
        return (<Redirect to="/" />)
    }

    return (
        <div className="page">
            <div className="login">
                <h1 className="login_title">Вход</h1>
                <form className="login_form">
                    <input
                        className="login_input login_email-input"
                        placeholder='Email'
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={userData.email}></input>
                    <input
                        className="login_input login_password-input"
                        id="password"
                        type="password"
                        name="password"
                        placeholder='Пароль'
                        onChange={handleChange}
                        value={userData.password}></input>

                </form>
                <button className="login_button"
                    type="submit"
                    onClick={submitChange}>Войти</button>
            </div>
        </div>
    )
}

export default withRouter(Login);