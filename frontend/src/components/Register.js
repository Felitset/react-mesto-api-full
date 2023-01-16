import React, { useState, useCallback } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import './Register.css';

function Register({ isLoggedIn, onRegister }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }, [formData]);

    const submitChange = useCallback((event) => {
        event.preventDefault()
        onRegister(formData.email, formData.password)
    }, [onRegister, formData])

    if (isLoggedIn) {
        return (<Redirect to="/" />)
    }

    return (
        <div className="page">
            <div className="register">
                <h1 className="register_title">Регистрация</h1>
                <form className="register_form" onSubmit={submitChange}>
                    <input
                        className="register_input register_email-input"
                        id="email"
                        type="email"
                        name="email"
                        placeholder='Email'
                        onChange={handleChange}
                        value={formData.email}></input>
                    <input
                        className="register_input register_password-input"
                        id="password"
                        type="password"
                        name="password"
                        placeholder='Пароль'
                        onChange={handleChange}
                        value={formData.password}></input>

                </form>
                <button className="register_button" type="submit" onClick={submitChange}>Зарегистрироваться</button>
                <Link to={'/sign-in'} className="register_to-login_link">Уже зарегистрированы? Войти</Link>
            </div>

        </div>
    )
}

export default withRouter(Register)