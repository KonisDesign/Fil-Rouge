import { useEffect, useState } from 'react'
import './FormLogin.scss'
import FormInputLogin from '../form-input-login/FormInputLogin'
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()


    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
        navigate('/')
      }
    })

    const handleLogin = async (event) => {
      event.preventDefault();
    
      try {
        const response = await fetch('http://localhost:5129/Users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            "Lastname": "",
            "Firstname": "",
            "Email" : email, 
            "Password" : password,
            "Job" : "",
            "Projects" : "",
            "Role": ""
          })
        });
    
        if (!response.ok) {
          const errorResponse = await response.json();
          setError(errorResponse.title);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        navigate('/')
      } catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
      }
    };
         
  

    return (
      <FormInputLogin
        handleLogin={handleLogin}
        component='login'
        title="Se connecter"
        divTop={
          <div className="email-login">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <label className='login-label'>Adresse Email</label>
          </div>
        }
        divBottom={
          <div className="password-login">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <label className='login-label'>Mot de passe</label>
          </div>
        }
        buttonText="Connexion"
        error={error} // Ajoutez cette ligne pour afficher les erreurs
      />
    );
    
}
