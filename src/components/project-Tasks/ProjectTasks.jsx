import React from 'react'
import './ProjectTasks.scss'

export default function ProjectTasks() {
    return (
        <div>
            <form className='tasks'>
                <label for='name'>Nom de la tâche</label>
                <input type="text" />
                <label for='description'>Description de la tâche</label>
                <input type="text" />
                <button className='primary-button'>Valider la tâche</button>
            </form>
        </div>
    )
}