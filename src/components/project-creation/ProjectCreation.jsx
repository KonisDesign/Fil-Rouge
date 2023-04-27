import React from 'react'
import './ProjectCreation.scss'

export default function ProjectCreation() {
    return (
        <div>
            <h1>Création du projet</h1>
            <form action="" method='get' className="creation">
                <label htmlFor='name'> Nom du projet</label>
                <input type="text" />
                <label htmlFor='description' className='description' >Description du projet</label>
                <input type="text" />
                <label htmlFor='photo'>Ajouter l'image du projet</label>
                <input action='get' type="file" accept="image/png, image/jpeg" />
                <ul>
                    <h2>Liste des membres</h2>
                    <a href="../members/Members.jsx">+ Ajouter des membres au projet</a>
                </ul>
                <ul>
                    <h2>Liste des tâches</h2>
                    <a href="../projectTasks/ProjectTasks.jsx">+ Ajouter une tâche</a>
                </ul>
                <button className='primary-button'>Valider le projet</button>
            </form>
        </div>
    )
}