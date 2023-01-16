import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import './Header.css';



function Header(props) {
    const {pathname} = useLocation();
    return (
        <header className="header page__header" >
            <img
                className="header__logo"
                src={logo}
                alt="Логотип"
            />
            {pathname === '/sign-up' && <Link className='header__entrance-link' to='/sign-in'>Войти</Link>}
            {pathname === '/sign-in' && <Link className='header__entrance-link' to='/sign-up'>Регистрация</Link>}
            {pathname === '/' && <div className="header-nav">
                <span className="user_email">{props.userEmail}</span>
                <button className="logout_btn" onClick={props.onLogout}>Выйти</button>
            </div>}

        </header>
    )
}

export default Header