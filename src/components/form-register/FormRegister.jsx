import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FormRegister.scss";
import FormInputLogin from "../form-input-login/FormInputLogin";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../../MySqlDotNetCoreBackend/public/profile.webp";

export default function FormRegister() {
  const [Lastname, setLastname] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Job, setJob] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    console.log(acceptedFiles[0].name);
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

    handleUpload();

    let formData = new FormData();
    formData.append("Lastname", Lastname);
    formData.append("Firstname", Firstname);
    formData.append("Email", Email);
    formData.append("Password", Password);
    formData.append("Job", Job);
    formData.append("Projects", "");
    formData.append("Role", "user");
    if (selectedImage) {
      formData.append("Url", selectedImage.name);
    } else {
      formData.append("Url", "profile.webp");
    }

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

      navigate("/");
    } catch (error) {
      console.log(
        "There was a problem with the fetch operation: " + error.message
      );
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);

    fetch("http://localhost:5129/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Réponse du serveur :", response);
        // Gérer la réponse du serveur
      })
      .catch((error) => {
        console.log("Erreur lors de la requête :", error);
        // Gérer les erreurs
      });
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
              <img src={ProfilePic} alt="profile picture" />
            )}
          </div>
          <div className="register-top-right">
            <div className="lastname-register">
              <input
                type="text"
                name="lastname-input"
                value={Lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label
                className="login-label"
                style={
                  Lastname != ""
                    ? { top: "10px", left: "5px", fontSize: "14px" }
                    : null
                }
              >
                Nom
              </label>
            </div>
            <div className="firstname-register">
              <input
                type="text"
                name="firstname-input"
                value={Firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label
                className="login-label"
                style={
                  Firstname != ""
                    ? { top: "10px", left: "5px", fontSize: "14px" }
                    : null
                }
              >
                Prénom
              </label>
            </div>
          </div>
        </div>
      }
      divBottom={
        <div className="register-bottom">
          <div className="job-register">
            <input
              type="text"
              name="job-input"
              onChange={(e) => setJob(e.target.value)}
            />
            <label
              className="login-label"
              style={
                Job != ""
                  ? { top: "10px", left: "5px", fontSize: "14px" }
                  : null
              }
            >
              Poste occupé
            </label>
          </div>
          <div className="email-register">
            <input
              type="email"
              name="email-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="login-label"
              style={
                Email != ""
                  ? { top: "10px", left: "5px", fontSize: "14px" }
                  : null
              }
            >
              Adresse Email
            </label>
          </div>
          <div className="password-register">
            <input
              type="password"
              name="password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              className="login-label"
              style={
                Password != ""
                  ? { top: "10px", left: "5px", fontSize: "14px" }
                  : null
              }
            >
              Mot de passe
            </label>
          </div>
        </div>
      }
      buttonText="M'inscrire"
    />
  );
}
