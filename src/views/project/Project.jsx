import SideMain from "../../components/side-main/SideMain";
import jwtDecode from "jwt-decode";
import Header from "../../components/header/Header";
import "./Project.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.Id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [getComment, setGetComment] = useState("");
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [getTasks, setGetTasks] = useState("");
  const [notifications, setNotifications] = useState([]);

  const [isFirstEffectDone, setIsFirstEffectDone] = useState(false);

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5129/Projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setSelectedImage(data.url);
        setDescription(data.description);
        //setComments(Object.values(data.comments));
        if (data.notifications === "") {
          setNotifications(["Aucune notification"]);
        } else {
          setNotifications(data.notifications.split(","));
        }
        if (data.tasks === "") {
          setTasks(["Aucune tâche"]);
        } else {
          setTasks(data.tasks.split(","));
        }
        setIsFirstEffectDone(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [datas, setData] = useState(null);
  useEffect(() => {
    if (isFirstEffectDone) {
      // only run this effect when the first effect is done
      try {
        fetch("http://localhost:5129/Users")
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch {
        console.log("non");
      }
    }
  }, [isFirstEffectDone]);

  useEffect(() => {
    if (datas) {
      checkIntoProject(datas);
    }
  }, [datas]);

  const checkIntoProject = (users) => {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].role === "admin" ||
        (users[i].projects.split(",").includes(id) &&
          users[i].id === Number(userId))
      ) {
        console.log("oui " + users[i].firstname);
        if (users[i].role === "admin" && users[i].id === Number(userId)) {
          console.log("admin");
          setAdmin(true);
        }

        return true;
      }
    }
    return false;
  };

  const titleChanged = (e) => {
    document.querySelector(".update-button").style.display = "block";
    setTitle(e.target.value);
  };

  const descriptionChanged = (e) => {
    document.querySelector(".update-button").style.display = "block";
    setDescription(e.target.value);
  };

  const saveProject = () => {
    document.querySelector(".update-button").style.display = "none";
    console.log(title);
    console.log(description);
  };

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
      const newComment = [...comments];
      newComment.push({
        author: "kimono",
        content: getComment,
      });
      setComments(newComment);
      setGetComment("");
    }
    document.querySelector(".comment-container").scrollTop =
      document.querySelector(".comment-container").scrollHeight;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.charCode === 13) {
      e.preventDefault();
      addComment();
    }
  };


  const addTask = () => {
    if (getTasks.trim()) {
      const newTask = [...tasks];
      newTask.push(getTasks);
      setTasks(newTask);
      setGetTasks("");
    }
    document.querySelector(".comment-container").scrollTop =
      document.querySelector(".comment-container").scrollHeight;
  };

  const handleKeyPressTask = (e) => {
    if (e.key === "Enter" || e.charCode === 13) {
      e.preventDefault();
      addTask();
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5129/Projects/${id}`, {
        method: "DELETE",
      });

      navigate("/");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return datas ? (
    <div className="project-container">
      <Header />
      <SideMain />
      {admin ? (
        <button className="update-button" onClick={() => saveProject()}>
          Mettre à jour
        </button>
      ) : null}
      <div className="project-description">
        <div className="infos">
          <input
            type="text"
            value={title}
            className="title"
            onChange={(e) => titleChanged(e)}
            disabled={!admin}
          />
          <textarea
            defaultValue={description}
            className="description"
            autoComplete="off"
            spellCheck="false"
            rows="7"
            onChange={(e) => descriptionChanged(e)}
            disabled={!admin}
          />
        </div>
        {admin ? <div className="image-container" {...getRootProps()}>
          <input type="file" ref={imageProjectButton} {...getInputProps()} />
          <button
            className="image-button"
            onClick={() => chooseFile()}
            disabled={!admin}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="image-project" />
            ) : (
              <img src="/src/assets/projet1.png" alt="image du projet" />
            )}
          </button>
        </div> 
        : 
        <div className="image-container">
          <button
            className="image-button"
            onClick={() => chooseFile()}
            disabled={!admin}
          >
            {selectedImage ? (
              <img className="non-opacity" src={selectedImage} alt="image-project" />
            ) : (
              <img className="non-opacity" src="/src/assets/projet1.png" alt="image du projet" />
            )}
          </button>
        </div>}
      </div>
      <div className="members-container">
        {!admin ? null : (
          <img src="/src/assets/add.png" alt="photo de profil d'un membre" />
        )}
        {datas.map((user, userIndex) => {
          return user.projects.split(",").map((project) => {
            if (project == id) {
              return (
                <img
                  key={userIndex}
                  src={"/src/assets/" + user.url}
                  alt={user.firstname}
                />
              );
            }
            return null;
          });
        })}
      </div>
      <div className="work-container">
        <div className="work">
          <h2>Tâches</h2>
          {tasks.map((task, index) => (
            <div key={index} className="item task">
              {task}
            </div>
          ))}
          {!admin ? null : (
            <div className="actions">
              <input
                id="input-comment"
                type="text"
                placeholder="Ajouter une tâche..."
                onKeyDown={handleKeyPressTask}
                value={getTasks}
                onChange={(e) => setGetTasks(e.target.value)}
              />
              <button className="send-button" onClick={() => addTask()}>
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            </div>
          )}
        </div>
        <div className="work">
          <h2>Notification du projet</h2>
          {notifications.map((notification, index) => (
            <div key={index} className="item notif">
              {notification}
            </div>
          ))}
        </div>
        <div className="work">
          <h2>Commentaires</h2>
          <div className="comment-container">
            {comments.map((comment, index) => (
              <div key={index} className="item comment">
                {comment.content}
              </div>
            ))}
          </div>
          <div className="actions">
            <input
              id="input-comment"
              type="text"
              placeholder="Écrivez quelque chose..."
              onKeyDown={handleKeyPress}
              value={getComment}
              onChange={(e) => setGetComment(e.target.value)}
            />
            <button className="send-button" onClick={() => addComment()}>
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      {!admin ? null : (
        <div className="delete-project-div">
          <button onClick={() => handleDelete()} className="delete-project">
            Supprimer le projet {title}
          </button>
        </div>
      )}
    </div>
  ) : (
    <div>nique</div>
  );
}
