import SideMain from '../../components/side-main/SideMain'
import Header from '../../components/header/Header'
import './Project.scss'
import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Project() {
  const [title, setTitle] = useState("Netflix")
  const [description, setDescription] = useState("Netflix est une entreprise multinationale américaine créée à Scotts Valley en 1997 par Reed Hastings et Marc Randolph appartenant au secteur d'activité des industries créatives.")
  const [selectedImage, setSelectedImage] = useState(null);
  const [getComment, setGetComment] = useState('');
  const [comments, setComments] = useState([{
    autor: "Camerlynck Romain",
    content: "Wah mais c'est trop beau !"
  },
  {
    autor: "Devos Julien",
    content: "Ah mais c'est énorme !"
  },
  {
    autor: "Marong Kalilou",
    content: "On est trop fort à avoir fait ça !"
  }]);

  const titleChanged = (e) => {
    document.querySelector(".update-button").style.display = "block"
    setTitle(e.target.value)
  }

  const descriptionChanged = (e) => {
    document.querySelector(".update-button").style.display = "block"
    setDescription(e.target.value)
  }

  const saveProject = () => {
    document.querySelector(".update-button").style.display = "none"
    console.log(title)
    console.log(description)
  }

  const imageProjectButton = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const chooseFile = () => {
    if (imageProjectButton.current) {
      imageProjectButton.current.click();
    }
  };

  const addComment = () => {
    if (getComment.trim()) {
      const newComment = [...comments]
      newComment.push({
        author: "kimono",
        content: getComment
      })
      setComments(newComment);
      setGetComment('');
    }
    document.querySelector(".comment-container").scrollTop = document.querySelector(".comment-container").scrollHeight
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.charCode === 13) {
      e.preventDefault();
      addComment();
    }
  };

  return (
    <div className='project-container'>
      <Header />
      <SideMain />
      <button className='update-button' onClick={() => saveProject()}>Mettre à jour</button>
      <div className='project-description'>
        <div className='infos'>
          <input type='text' value={title} className='title' onChange={(e) => titleChanged(e)} />
          <textarea defaultValue={description} className='description' autoComplete='off' spellCheck="false" rows="7" onChange={(e) => descriptionChanged(e)} />
        </div>
        <div className="image-container" {...getRootProps()}>
          <input type="file" ref={imageProjectButton} {...getInputProps()} />
          <button className="image-button" onClick={() => chooseFile()}>
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="image-project"
              />
            ) : (
              <img src="/src/assets/projet1.png" alt="image du projet" />
            )}
          </button>
        </div>
      </div>
      <div className='members-container'>
        <img src="/src/assets/add.png" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
      </div>
      <div className='work-container'>
        <div className='work'>
          <h2>Tâches</h2>
          <div className='item task'>Faire l'UML</div>
          <div className='item task'>Faire Le frontend en react</div>
          <div className='item task'>Faire le backend en nodejs</div>
        </div>
        <div className='work'>
          <h2>Notification du projet</h2>
          <div className='item notif'>Faire l'UML</div>
          <div className='item notif'>Faire Le frontend en react</div>
          <div className='item notif'>Faire le backend en nodejs</div>
        </div>
        <div className='work'>
          <h2>Commentaires</h2>
          <div className="comment-container">
            {comments.map((comment) => (
              <div key={comment.id} className="item comment">{comment.content}</div>
            )
            )}
          </div>
          <div className='actions'>
            <input id='input-comment' type="text" placeholder="Écrivez quelque chose..." onKeyDown={handleKeyPress} value={getComment} onChange={(e) => setGetComment(e.target.value)} />
            <button className='send-button' onClick={() => addComment()}>
              <i className="fa-regular fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
      <div className="delete-project-div">
        <button className='delete-project'>Supprimer le projet Netflix</button>
      </div>
    </div>
  )
}
