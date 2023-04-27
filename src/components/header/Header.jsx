import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.scss'

export default function Header() {

  const navigate = useNavigate()

  const handleClickLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const handleClickHome = () => {
    navigate('/')
  }

  return (
    <div className='header'>
      <h1>Tableau de bord</h1>
      <div className='header-actions'>
        <button className='icon-button' onClick={() => handleClickHome()}><i class="fa-regular fa-folder-open"></i></button>
        <button className='icon-button' onClick={() => handleClickLogout()}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
      </div>
    </div>
  )
}
