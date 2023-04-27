import React from 'react'
import './Header.scss'

export default function Header() {
  return (
    <div className='header'>
      <h1>Tableau de bord</h1>
      <div className='header-actions'>
        <button className='icon-button'><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
      </div>
    </div>
  )
}
