import React from 'react';
import logo from '../img/logo.png';

const Header = (props) => {
    return (
        <div id="header">
            <img id="logo" src={logo} alt="Flashcards Logo" />
            {props.user ? <button id="logoutButton" onClick={props.logout}>Log Out</button> : null}
        </div>
    );
};

export default Header;