import { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CollabsDetails from '../../components/collabs-details/CollabsDetails';
import './CreateProject.scss';

export default function CreateProject() {
    const [step, setStep] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [task, setTask] = useState([])

    const addTask = (value) => {
        const newTask = [...task]
        newTask.unshift(value)
        setTask(newTask)
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
        accept: 'image/*',
    });

    const chooseFile = () => {
        if (imageProjectButton.current) {
            imageProjectButton.current.click();
        }
    };

    const infos = [
        {
            imageUrl: 'src/assets/profile.webp',
            name: 'Devos',
            firstname: 'Julien',
            job: 'Développeur expert Front-End React',
            projects: [
                'Netflix', 'Spotify', 'OVH'
            ]
        },
        {
            imageUrl: 'src/assets/profile.webp',
            name: 'Camerlynck',
            firstname: 'Romain',
            job: 'Demi-Dieu développeur Front-End Vue.js',
            projects: [
                'Youtube', 'Twitch', 'Google', 'GPT-5'
            ]
        },
        {
            imageUrl: 'src/assets/profile.webp',
            name: 'Marong',
            firstname: 'Kalilou',
            job: 'Le meilleur développeur Javascript',
            projects: [
                'Spotify', 'Twitch', 'Amazon'
            ]
        },
        {
            imageUrl: 'src/assets/profile.webp',
            name: 'Musk',
            firstname: 'Elon',
            job: 'Stagiaire en reconversion',
            projects: [
                'Machine à café', 'Imprimante', 'Porte-dossier'
            ]
        }
    ]

    return step === 5 ? (
        <div className='create-project'>
            <button type='submit' className='prev-button' onClick={() => setStep(4)}>
                <i className='fa-solid fa-arrow-left-long'></i>
            </button>
            <div className='step'>
                <div className='actions'>
                    <input id='myinput' type="text" placeholder='Écrivez une tâche' onKeyUp={handleKeyPress} />
                    <button onClick={() => addTask(document.getElementById("myinput").value)}><i className="fa-solid fa-plus"></i></button>
                </div>
                <div className='tasks-container'>
                    {task.map((item, index) => (
                        <div key={index} className='item'>
                            <p>- {item}</p>
                            <button><i className="fa-regular fa-trash-can"></i></button>
                        </div>
                    ))}
                </div>
            </div>
            <button type='submit' className='next-button' onClick={() => setStep(5)}>
                <i className='fa-solid fa-arrow-right-long'></i>
            </button>
        </div>
    ) : step === 4 ? (
        <div className='create-project'>
            <button type='submit' className='prev-button' onClick={() => setStep(3)}>
                <i className='fa-solid fa-arrow-left-long'></i>
            </button>
            <div className='step'>
                <CollabsDetails infos={infos} />
            </div>
            <button type='submit' className='next-button' onClick={() => setStep(5)}>
                <i className='fa-solid fa-arrow-right-long'></i>
            </button>
        </div>
    ) : step === 3 ? (
        <div className='create-project'>
            <button type='submit' className='prev-button' onClick={() => setStep(2)}>
                <i className='fa-solid fa-arrow-left-long'></i>
            </button>
            <div className='step' {...getRootProps()}>
                <input type='file' ref={imageProjectButton} {...getInputProps()} />
                <button className='image-button' onClick={() => chooseFile()}>
                    {selectedImage ? (
                        <img src={URL.createObjectURL(selectedImage)} alt='image-project' style={{ opacity: 1 }} />
                    ) : (
                        <img src='/src/assets/image-icon.png' alt='image-project' />
                    )}
                </button>
            </div>
            <button type='submit' className='next-button' onClick={() => setStep(4)}>
                <i className='fa-solid fa-arrow-right-long'></i>
            </button>
        </div>
    ) : step === 2 ? (
        <div className='create-project'>
            <button type='submit' className='prev-button' onClick={() => setStep(1)}>
                <i className='fa-solid fa-arrow-left-long'></i>
            </button>
            <div className='step'>
                <textarea placeholder='Description' required />
            </div>
            <button type='submit' className='next-button' onClick={() => setStep(3)}>
                <i className='fa-solid fa-arrow-right-long'></i>
            </button>
        </div>
    ) : (
        <div className='create-project'>
            <div className='step'>
                <input type='text' placeholder='Titre' required />
                <span></span>
            </div>
            <button type='submit' className='next-button' onClick={() => setStep(2)}>
                <i className='fa-solid fa-arrow-right-long'></i>
            </button>
        </div>
    );
}
