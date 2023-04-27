import React from 'react'
import './FormLogin.scss'

export default function Form() {
  return (
      <form className="login-container">
        <h1>Se connecter</h1>
        <div className="email-login">
          <input type="email" name="" id="" />
          <label className='login-label' htmlFor="">Adresse Email</label>
        </div>
        <div className="password-login">
          <input type="password" name="" id="" />
          <label className='login-label' htmlFor="">Mot de passe</label>
        </div>
        <div className="primary-button button-login">Connexion</div>
      </form>
  )
}
