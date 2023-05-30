import React from 'react'
import './SideMain.scss'

export default function SideMain() {
    return (
        <div className='side-main'>
            <img className='profile-pic' src="/src/assets/profile.webp" alt='profile' />
            <h2>Bonjour Michel</h2>
            <div className='notifs-container'>
                <h4>Dernières notifications</h4>
                <div className='notif normal'>
                    <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
                </div>
                <div className='notif normal'>
                    <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
                </div>
                <div className='notif important'>
                    <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
                </div>
                <div className='notif other'>
                    <p>La tâche "Elementor" du projet "Wordpress" est terminée.</p>
                </div>
            </div>
            <footer>
                <p>&copy; Designed by Romain & Julien</p>
            </footer>
        </div>
    )
}