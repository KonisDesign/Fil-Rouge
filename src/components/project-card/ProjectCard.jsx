import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProjectCard.scss'

export default function ProjectCard() {

    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate("/project/" + id)
    }

    return (
        <div className='project-card' onClick={() => handleClick("54555")}>
            <img className="project-image" src='src/assets/projet1.png' />
            <h3>Netflix</h3>
            <p>Netflix est une entreprise multinationale américaine créée à
                Scotts Valley en 1997 par Reed Hastings et Marc Randolph appartenant
                au secteur d'activité des industries créatives.</p>
            <div className='row'>
                <img src='/src/assets/profile.webp' />
                <img src='/src/assets/profile.webp' />
                <img src='/src/assets/profile.webp' />
                <img src='/src/assets/profile.webp' />
            </div>
        </div>
    )
}
