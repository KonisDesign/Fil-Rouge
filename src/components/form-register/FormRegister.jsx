import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import './FormRegister.scss'
import ProfilePicture from '/src/assets/profile.webp'

export default function FormRegister() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  return (
    <form className="register-container">
      <h1>S'enregistrer</h1>
      <div className="register-top">
        <div className="register-top-left"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div {...getRootProps()} className={`dropzone ${isActive ? 'show-dropzone' : ''}`}>
            <input {...getInputProps()} />
            <i className="fa-solid fa-pencil"></i>
          </div>
          <img src={ProfilePicture} alt="" />
        </div>
        <div className="register-top-right">
          <div className="lastname-register">
            <input type="email" name="" id="" />
            <label className='login-label' htmlFor="">Nom</label>
          </div>
          <div className="firstname-register">
            <input type="email" name="" id="" />
            <label className='login-label' htmlFor="">Prénom</label>
          </div>
        </div>
      </div>
      <div className="email-register">
        <input type="email" name="" id="" />
        <label className='login-label' htmlFor="">Adresse Email</label>
      </div>
      <div className="password-register">
        <input type="password" name="" id="" />
        <label className='login-label' htmlFor="">Mot de passe</label>
      </div>
      <div className="primary-button button-register">M'inscrire</div>
    </form>
  )
}
