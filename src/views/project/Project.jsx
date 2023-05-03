import SideMain from '../../components/side-main/SideMain'
import Header from '../../components/header/Header'
import './Project.scss'

export default function Project() {
  const commentary = [
    {
      autor: "Camerlynck Romain",
      content: "Wah mais c'est trop beau !"
    },
    {
      autor: "Devos Julien",
      content: "Ah mais c'est énorme !"
    },
    {
      autor: "Kalilou",
      content: " !"
    }
  ]

  return (
    <div className='project-container'>
      <Header />
      <SideMain />
      <div className='project-description'>
        <div className='infos'>
          <input type='text' value="Netflix" className='title' />
          <textarea className='description' autoComplete='off' spellCheck="false" rows="7">Netflix est une entreprise multinationale américaine créée à Scotts Valley en 1997 par Reed Hastings et Marc Randolph appartenant au secteur d'activité des industries créatives.</textarea>
        </div>
        <img src="/src/assets/projet1.png" alt="image du projet" />
      </div>
      <div className='members-container'>
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
        <img src="/src/assets/profile.webp" alt="photo de profil d'un membre" />
      </div>
      <div className='work-container'>
        <div className='work'>
          <h2>Tâches</h2>
          <div className='item task'>Faire l'UML</div>
          <div className='item task'>Faire Le frontend en react</div>
          <div className='item task'>Faire le backend en nodejs</div>
        </div>
        <div className='work'>
          <h2>Notification du projet</h2>
          <div className='item notif'>Faire l'UML</div>
          <div className='item notif'>Faire Le frontend en react</div>
          <div className='item notif'>Faire le backend en nodejs</div>
        </div>
        <div className='work'>
          <h2>Commentaires</h2>
          <div className="comment-container">
            <div className='item comment'>Faire l'UML</div>
            <div className='item comment'>Faire Le frontend en react</div>
            <div className='item comment'>Faire le backend en nodejs</div>
          </div>
          <div className='actions'>
            <input type="text" placeholder="Écrivez quelque chose..." />
            <button className='send-button'><i className="fa-regular fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
      <div className="delete-project-div">
        <button className='delete-project'>Supprimer le projet Netflix</button>
      </div>
    </div>
  )
}
