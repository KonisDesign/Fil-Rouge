import React from 'react'
import Header from '../../components/header/Header'
import SideMain from '../../components/side-main/SideMain'
import './ProjectCreation.scss'

export default function ProjectCreation() {
    return (
        <div className='create-container'>
            <Header />
            <SideMain />
            <div className='creation'>
                <h1 className='titleCreation' >Création du projet</h1>
                <form action="" method='get'>
                    <label for='name'> Nom du projet</label>
                    <input type="text" />
                    <label for='description'>Description du projet</label>
                    <input type="text" className='description' />
                    <label for='photo'>Ajouter l'image du projet</label>
                    <input type="file" accept="image/png, image/jpeg" />
                </form>
                <div className='list' >
                    <ul>
                        <h2>Liste des membres</h2>
                        <a href="../members/Members.jsx">+ Ajouter des membres au projet</a>
                    </ul>
                    <ul>
                        <h2>Liste des tâches</h2>
                        <a href="../projectTasks/ProjectTasks.jsx">+ Ajouter une tâche</a>
                    </ul>
                </div>
                <button>Valider le projet</button>
            </div>
        </div>
    )
}