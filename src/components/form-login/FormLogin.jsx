import React from 'react'
import './FormLogin.scss'
import FormInputLogin from '../form-input-login/FormInputLogin'
export default function Form() {
  return (
    <FormInputLogin
      component='login'
      title="Se connecter"
      divTop={
        <div className="email-login">
          <input type="email" name="email-input" />
          <label className='login-label'>Adresse Email</label>
        </div>
      }
      divBottom={
        <div className="password-login">
          <input type="password" name="password-input" />
          <label className='login-label'>Mot de passe</label>
        </div>
      }
      buttonText="Connexion"
    />
  )
}
