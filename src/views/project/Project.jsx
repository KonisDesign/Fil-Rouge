import SideMain from '../../components/side-main/SideMain'
import Header from '../../components/header/Header'
import './Project.scss'
import { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from 'react-router-dom';

export default function Project() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [getComment, setGetComment] = useState('');
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:5129/Projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setSelectedImage(data.url);
        setDescription(data.description);
        //setComments(Object.values(data.comments));
        setTasks(data.tasks.split(","));
        setNotifications(data.notifications.split(","));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  

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

  const handleDelete = async () => {
    try {
        await fetch(`http://localhost:5129/Projects/${id}`, {
            method: 'DELETE',
        });
        
        navigate('/')

        // Logic to handle successful delete.
        // For example, you might want to redirect the user to a different page.
    } catch (error) {
        console.error('Failed to delete project:', error);
    }
}


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
                src={selectedImage}
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
          {tasks.map((task, index) => (
              <div key={index} className="item task">{task}</div>
            )
            )}
        </div>
        <div className='work'>
          <h2>Notification du projet</h2>
          {notifications.map((notification, index) => (
              <div key={index} className="item notif">{notification}</div>
            )
            )}
        </div>
        <div className='work'>
          <h2>Commentaires</h2>
          <div className="comment-container">
            {comments.map((comment, index) => (
              <div key={index} className="item comment">{comment.content}</div>
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
        <button onClick={() => handleDelete()} className='delete-project'>Supprimer le projet {title}</button>
      </div>
    </div>
  )
}
