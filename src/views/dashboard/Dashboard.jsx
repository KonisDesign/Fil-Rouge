import React from 'react'
import './Dashboard.scss'
import SideMain from '../../components/side-main/SideMain'
import Header from '../../components/header/Header'
import CreateButton from '../../components/create-button/CreateButton'
import ProjectsList from '../../components/projects-list/ProjectsList'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <SideMain />
      <Header />
      <CreateButton />
      <div className='tab-main'>
        <button className='tab-button'>Projets</button>
        <button className='tab-button'>Collaborateurs</button>
      </div>
      <ProjectsList />
    </div>
  )
}