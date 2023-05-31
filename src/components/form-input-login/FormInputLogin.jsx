import React from 'react';
import './FormInputLogin.scss';

export default function FormInputLogin({handleRegister, handleLogin, component, title, divTop, divBottom, buttonText, error }) {
    return (
        <form onSubmit={component === "register" ? handleRegister : handleLogin} className={`${component}-container`}>
            {title ? <h1>{title}</h1> : null}
            <div className="div-top">
                {divTop}
            </div>
            <div className="div-bottom">
                {divBottom}
            </div>
            {buttonText ? (
                <button type='submit' className={`primary-button button-${component}`}>{buttonText}</button>
            ) : null}
            {error && <p className="error-message">{error}</p>} {/* Ajoutez cette ligne pour afficher les erreurs */}
        </form>
    )
}
