import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import CollabsDetails from "../../components/collabs-details/CollabsDetails";
import "./CreateProject.scss";

export default function CreateProject() {

  //const [selectedIds, setSelectedIds] = useState([]);

  const navigate = useNavigate()

  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [task, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("https://www.grapheine.com/wp-content/uploads/2015/09/nouveau-logo-google-2015.jpg");
  const [collabs, setCollabs] = useState([]);

  const addTask = (value) => {
    const newTask = [...task];
    newTask.unshift(value);
    setTask(newTask);
    document.querySelector("#myinput").value = "";
  };

  const deleteTask = (id) => {
    const newTask = [...task];
    newTask.splice(id, 1);
    setTask(newTask);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask(document.getElementById("myinput").value);
    }
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

  const [datas, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5129/Users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const postProject = async (event) => {
    event.preventDefault();
    
      try {

        const response = await fetch('http://localhost:5129/Projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            "Title": title,
            "Description": description,
            "Url" : url, 
            "Tasks" : task.join(),
            "Notifications" : "",
            "Comments" : ""
          })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        navigate('/')
      } catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
      }
  }

  return step === 6 ? (
    <div className="create-project">
      <i onClick={() => navigate("/")} className="svg-cross fa-regular fa-circle-xmark"></i>
      <div className="column">
        <h1>Le projet a bien été crée</h1>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
        <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
      </svg>
      <button className="primary-button" onClick={(event) => postProject(event)}>Retourner à l'accueil</button>
      </div>
    </div>
  ) : step === 5 ? (
    <div className="create-project">
      <i onClick={() => navigate("/")} className="svg-cross fa-regular fa-circle-xmark"></i>
      <button type="submit" className="prev-button" onClick={() => setStep(4)}>
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <div className="step">
        <div className="actions">
          <input
            id="myinput"
            type="text"
            placeholder="Écrivez une tâche"
            onKeyUp={handleKeyPress}
          />
          <button
            onClick={() => addTask(document.getElementById("myinput").value)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="tasks-container">
          {task.map((item, index) => (
            <div key={index} className="item">
              <p>- {item}</p>
              <button onClick={() => deleteTask(index)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="next-button" onClick={() => setStep(6)}>
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  ) : step === 4 ? (
    <div className="create-project">
      <i onClick={() => navigate("/")} className="svg-cross fa-regular fa-circle-xmark"></i>
      <button type="submit" className="prev-button" onClick={() => setStep(3)}>
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <div className="step">
        <CollabsDetails data={datas} canAddClass={true} /* selectedIds={selectedIds} setSelectedIds={setSelectedIds} *//>
      </div>
      <button type="submit" className="next-button" onClick={() => setStep(5)}>
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  ) : step === 3 ? (
    <div className="create-project">
      <i onClick={() => navigate("/")} className="svg-cross fa-regular fa-circle-xmark"></i>
      <button type="submit" className="prev-button" onClick={() => setStep(2)}>
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <div className="step" {...getRootProps()}>
        <input type="file" ref={imageProjectButton} {...getInputProps()} />
        <button className="image-button" onClick={() => chooseFile()}>
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="image-project"
              style={{ opacity: 1 }}
            />
          ) : (
            <img src="/src/assets/image-icon.png" alt="image-project" />
          )}
        </button>
      </div>
      <button type="submit" className="next-button" onClick={() => setStep(4)}>
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  ) : step === 2 ? (
    <div className="create-project">
      <i onClick={() => navigate("/")} className="svg-cross fa-regular fa-circle-xmark"></i>
      <button type="submit" className="prev-button" onClick={() => setStep(1)}>
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <div className="step">
        <textarea placeholder="Description" required  onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <button type="submit" className="next-button" onClick={() => setStep(3)}>
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  ) : (
    <div className="create-project">
      <i onClick={() => navigate("/")} className="svg-cross fa-regular fa-circle-xmark"></i>
      <div className="step">
        <input type="text" placeholder="Titre" required onChange={(e) => setTitle(e.target.value)}/>
        <span></span>
      </div>
      <button type="submit" className="next-button" onClick={() => setStep(2)}>
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  );
}
