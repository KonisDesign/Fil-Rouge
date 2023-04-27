import React from 'react'
import FormLogin from '../../components/form-login/FormLogin'
import FormRegister from '../../components/form-register/FormRegister'
import ParticlesBackground from '../../components/particles-background/ParticlesBackground';
import './Form.scss'

export default function Register() {
  return (
      <div id="large-header" className="large-header">
          <ParticlesBackground />
        <div className="button-switch">
          S'inscrire
          <div className="switch-arrow">
            <i class="fa-solid fa-arrow-right"></i>
            <i class="fa-solid fa-arrow-left"></i>
          </div>
        </div>
        <FormLogin />
        <FormRegister />
      </div>
  )
}
