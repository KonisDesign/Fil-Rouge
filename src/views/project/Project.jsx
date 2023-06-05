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
  const [imageUpload, setImageUpload] = useState(null);
  const [getComment, setGetComment] = useState("");
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [getTasks, setGetTasks] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [collabs, setCollabs] = useState([]);

  const [isFirstEffectDone, setIsFirstEffectDone] = useState(false);

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5129/Projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setSelectedImage(data.url);
        setDescription(data.description);
        setComments(data.comments.split(","));
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
        console.log("je suis dans le projet");
        console.log(users[i].id, "users[i].id");
        console.log(users[i].email, "users[i].id");
        console.log(Number(userId), "userId");
        if (users[i].role === "admin" && users[i].id === Number(userId)) {
          console.log("je suis admin");
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

  const imageProjectButton = useRef(null);

  const updateRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setImageUpload(acceptedFiles[0]);
    setSelectedImage(acceptedFiles[0].name);
    updateRef.current.click();

    //document.querySelector(".update-button").style.display = "block";
  }, []);

  useEffect(() => {
    if (imageUpload) {
      updateRef.current.click();
    }
  }, [imageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const chooseFile = () => {
    if (imageProjectButton.current) {
      imageProjectButton.current.click();
    }
  };

  const addComment = (e, comment) => {
    e.preventDefault();
    console.log(comment);
    if (getComment.trim()) {
      const newComment = [...comments, comment];
      setComments(newComment);
      console.log(newComment);
      setGetComment("");
    }
    updateRef.current.click();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.charCode === 13) {
      e.preventDefault();
      addComment(e, getComment);
    }
  };

  const addTask = () => {
    if (getTasks.trim()) {
      const newTask = [...tasks];
      newTask.push(getTasks);
      setTasks(newTask);
      setGetTasks("");
    }
    document.querySelector(".update-button").style.display = "block";
  };

  const handleKeyPressTask = (e) => {
    if (e.key === "Enter" || e.charCode === 13) {
      e.preventDefault();
      addTask();
    }
  };

  const [displayComponent, setDisplayComponent] = useState(false);
  const displayCollabs = () => {
    setDisplayComponent(!displayComponent);
  };

  const addCollabs = async (event, user) => {
    event.preventDefault();

    if (collabs.includes(user)) {
      const newCollabs = [...collabs];
      const index = newCollabs.indexOf(user);
      newCollabs.splice(index, 1);
      setCollabs(newCollabs);
    } else {
      const newCollabs = [...collabs, user];
      setCollabs(newCollabs);
    }

    let formData = new FormData();
    datas.forEach((u) => {
      if (u.id === user) {
        formData.append("Id", u.id);
        formData.append("Lastname", u.lastname);
        formData.append("Firstname", u.firstname);
        formData.append("Email", u.email);
        formData.append("Password", localStorage.getItem("pass"));
        formData.append("Job", u.job);
        const projects = u.projects.split(",");
        const projectIndex = projects.indexOf(id);
        if (projectIndex !== -1) {
          projects.splice(projectIndex, 1);
          formData.append("Projects", projects.join(","));
        } else {
          formData.append("Projects", u.projects + "," + id);
        }
        formData.append("Role", u.role);
        formData.append("Url", u.url);
      }
    });

    try {
      let object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      let json = JSON.stringify(object);

      const response = await fetch(`http://localhost:5129/Users/${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      location.reload();
    } catch (error) {
      console.log(
        "There was a problem with the fetch operation: " + error.message
      );
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    // Récupération des valeurs des champs de formulaire
    const Title = document.querySelector('input[name="title-input"]').value;
    const Description = document.querySelector(
      'textarea[name="description-input"]'
    ).value;

    handleUpload();

    // Maintenant, nous utilisons les valeurs que nous venons de récupérer plutôt que des valeurs codées en dur.
    let formData = new FormData();
    formData.append("Id", id);
    formData.append("Title", Title);
    formData.append("Description", Description);
    formData.append("Url", selectedImage);
    formData.append("Tasks", tasks.join(","));
    formData.append("Notifications", notifications.join(","));
    formData.append("Comments", comments.join(",") + "," + getComment); // Les commentaires sont un tableau d'objets, nous devons donc le convertir en chaîne avant de l'ajouter.

    // Je n'ai pas changé ceci parce que vous avez dit de ne pas toucher au FormData.
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + typeof pair[1] + " " + pair[1]);
    }

    let object = {};
    formData.forEach((value, key) => {
      // Ici, je m'assure que la première lettre de chaque clé est en majuscule
      let upperCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      object[upperCaseKey] = value;
    });
    console.log(id, object, JSON.stringify(object));

    try {
      const response = await fetch(`http://localhost:5129/Projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object), // Nous envoyons l'objet converti en JSON
      });

      if (!response.ok) {
        const message = await response.text();
        console.log(message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: ",
        error.message,
        "Stack Trace: ",
        error.stack
      );
    }

    document.querySelector(".update-button").style.display = "none";
    location.reload();
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", imageUpload);

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

  return datas ? (
    <div className="project-container">
      <Header />
      <SideMain />
      <button
        ref={updateRef}
        className="update-button"
        onClick={(event) => handleUpdate(event)}
      >
        Mettre à jour
      </button>
      <div className="project-description">
        <div className="infos">
          <input
            type="text"
            name="title-input"
            value={title}
            className="title"
            onChange={(e) => titleChanged(e)}
            disabled={!admin}
          />
          <textarea
            name="description-input"
            defaultValue={description}
            className="description"
            autoComplete="off"
            spellCheck="false"
            rows="7"
            onChange={(e) => descriptionChanged(e)}
            disabled={!admin}
          />
        </div>
        {admin ? (
          <div className="image-container" {...getRootProps()}>
            <input type="file" ref={imageProjectButton} {...getInputProps()} />
            <button
              className="image-button"
              onClick={() => chooseFile()}
              disabled={!admin}
            >
              {selectedImage ? (
                <img
                  src={
                    "../../../MySqlDotNetCoreBackend/public/" + selectedImage
                  }
                  alt="image-project"
                />
              ) : (
                <img src="/src/assets/projet1.png" alt="image du projet" />
              )}
            </button>
          </div>
        ) : (
          <div className="image-container">
            <button
              className="image-button"
              onClick={() => chooseFile()}
              disabled={!admin}
            >
              {selectedImage ? (
                <img
                  className="non-opacity"
                  src={
                    "../../../MySqlDotNetCoreBackend/public/" + selectedImage
                  }
                  alt="image-project"
                />
              ) : (
                <img
                  className="non-opacity"
                  src="/src/assets/projet1.png"
                  alt="image du projet"
                />
              )}
            </button>
          </div>
        )}
      </div>
      <div className="members-container">
        {!admin ? null : (
          <>
            {displayComponent
              ? datas.map((user) => {
                  if (user.projects.split(",").includes(id)) {
                    return null;
                  } else {
                    return (
                      <img
                        key={user.id}
                        src={
                          "../../../MySqlDotNetCoreBackend/public/" + user.url
                        }
                        style={{ filter: "grayscale(90%)", cursor: "pointer" }}
                        onClick={(event) => addCollabs(event, user.id)}
                      />
                    );
                  }
                })
              : null}
            <img
              onClick={() => displayCollabs()}
              src="/src/assets/add.png"
              alt="photo de profil d'un membre"
              style={{ cursor: "pointer" }}
            />
          </>
        )}

        {datas.map((user) => {
          return user.projects.split(",").map((project) => {
            if (project == id) {
              return (
                <img
                  key={user.id}
                  src={"../../../MySqlDotNetCoreBackend/public/" + user.url}
                  alt={user.firstname}
                  onClick={admin ? (event) => addCollabs(event, user.id) : null}
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
            {comments.map((comment, index) =>
              comment !== "" ? (
                <div key={index} className="item comment">
                  {comment}
                </div>
              ) : null
            )}
          </div>

          <div className="actions">
            <input
              id="input-comment"
              type="text"
              placeholder="Écrivez quelque chose..."
              onKeyDown={(e) => handleKeyPress(e)}
              value={getComment}
              onChange={(e) => setGetComment(e.target.value)}
            />
            <button
              className="send-button"
              onClick={(e) => addComment(e, getComment)}
            >
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
    <div>Non trouvé</div>
  );
}
