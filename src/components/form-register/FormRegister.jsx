import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FormRegister.scss";
import ProfilePicture from "/src/assets/profile.webp";
import FormInputLogin from "../form-input-login/FormInputLogin";
import { useNavigate } from "react-router-dom";

export default function FormRegister() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  
  const handleRegister = async (event) => {
    event.preventDefault();
    // Récupération des valeurs des champs de formulaire
    const Lastname = document.querySelector(
      'input[name="lastname-input"]'
    ).value;
    const Firstname = document.querySelector(
      'input[name="firstname-input"]'
    ).value;
    const Email = document.querySelector('input[name="email-input"]').value;
    const Password = document.querySelector(
      'input[name="password-input"]'
    ).value;

    let formData = new FormData();
    formData.append("Lastname", Lastname);
    formData.append("Firstname", Firstname);
    formData.append("Email", Email);
    formData.append("Password", Password);
    formData.append("Job", "");
    formData.append("Projects", "");
    formData.append("Role", "user");
    formData.append("Url", "profile.webp");

    try {
      let object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      let json = JSON.stringify(object);

      const response = await fetch("http://localhost:5129/Users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/')
    } catch (error) {
      console.log(
        "There was a problem with the fetch operation: " + error.message
      );
    }
  };

  return (
    <FormInputLogin
      handleRegister={handleRegister}
      component="register"
      title="S'enregistrer"
      divTop={
        <div className="register-top">
          <div
            className="register-top-left"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              {...getRootProps()}
              className={`dropzone ${isActive ? "show-dropzone" : ""}`}
            >
              <input {...getInputProps()} />
              <i className="fa-solid fa-pencil"></i>
            </div>
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="profile picture"
              />
            ) : (
              <img src={ProfilePicture} alt="profile picture" />
            )}
          </div>
          <div className="register-top-right">
            <div className="lastname-register">
              <input type="text" name="lastname-input" />
              <label className="login-label">Nom</label>
            </div>
            <div className="firstname-register">
              <input type="text" name="firstname-input" />
              <label className="login-label">Prénom</label>
            </div>
          </div>
        </div>
      }
      divBottom={
        <div className="register-bottom">
          <div className="email-register">
            <input type="email" name="email-input" />
            <label className="login-label">Adresse Email</label>
          </div>
          <div className="password-register">
            <input type="password" name="password-input" />
            <label className="login-label">Mot de passe</label>
          </div>
        </div>
      }
      buttonText="M'inscrire"
    />
  );
}
