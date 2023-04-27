import React from 'react'
import './Members.scss'
import ProfilePicture from '../../../public/assets/profile.webp'

export default function Members() {
    return (
        <div>
            <h1>Membres disponibles</h1>
            <div>
                <ul>
                    <li>
                        <img src="../assets/photoProfil.png" alt="photo d'un membre" />
                        {ProfilePicture} Membre 1 <a href=""> + </a>
                    </li>
                    <li>
                        <img src="../assets/photoProfil.png" alt="photo d'un membre" />
                        {ProfilePicture} Membre 2 <a href=""> + </a>
                    </li>
                    <li>
                        <img src="../assets/photoProfil.png" alt="photo d'un membre" />
                        {ProfilePicture} Membre 3 <a href="">  </a>
                    </li>
                    <li>
                        <img src="../assets/photoProfil.png" alt="photo d'un membre" />
                        {ProfilePicture} Membre 4 <a href=""> + </a>
                    </li>
                </ul>
                <button className='primary-button'>Valider les membres</button>
            </div>
        </div>
    )
}