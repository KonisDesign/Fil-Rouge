import { useNavigate } from 'react-router-dom'
import './ProjectCard.scss'

export default function ProjectCard(props) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/project/" + props.id)
    }

    return (
        <div className='project-card' onClick={() => handleClick()}>
            <img className="project-image" src={props.url} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <div className='row'>
                <img src='/src/assets/profile.webp' />
                <img src='/src/assets/profile.webp' />
                <img src='/src/assets/profile.webp' />
                <img src='/src/assets/profile.webp' />
            </div>
        </div>
    )
}
