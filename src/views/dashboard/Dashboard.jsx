import React from 'react'
import './Dashboard.scss'
import SideMain from '../../components/side-main/SideMain'
import Header from '../../components/header/Header'
import CreateButton from '../../components/create-button/CreateButton'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <SideMain />
      <Header />
      <CreateButton />
    </div>
  )
}
