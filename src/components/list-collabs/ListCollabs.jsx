import './ListCollabs.scss'
import CollabsDetails from '../collabs-details/CollabsDetails'

export default function ListCollabs() {
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
    return (
        <div className={`collabs-container`}>
            <CollabsDetails infos={infos}></CollabsDetails>
        </div>
    )
}
