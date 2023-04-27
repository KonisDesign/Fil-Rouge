import React, { useState } from 'react'
import FormLogin from '../../components/form-login/FormLogin'
import FormRegister from '../../components/form-register/FormRegister'
import ParticlesBackground from '../../components/particles-background/ParticlesBackground';
import './Form.scss'

export default function Register() {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!display);
  }
  return (
    <div id="large-header" className="large-header">
      <ParticlesBackground />
      <div className="button-switch" onClick={toggleDisplay}>
        {toggleDisplay ? 'S\'inscrire' : 'Se connecter'}
        <div className="switch-arrow">
          <i className="fa-solid fa-arrow-right"></i>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      </div>
      {!display && <FormLogin />}
      {display && <FormRegister />}
    </div>
  )
}
