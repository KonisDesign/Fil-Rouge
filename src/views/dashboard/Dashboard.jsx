import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import './Dashboard.scss'
import SideMain from '../../components/side-main/SideMain'
import Header from '../../components/header/Header'
import CreateButton from '../../components/create-button/CreateButton'
import ProjectsList from '../../components/projects-list/ProjectsList'
import ListCollabs from '../../components/list-collabs/ListCollabs'

export default function Dashboard() {
  const [displayComponentProject, setDisplayComponentProject] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayComponentProject(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleComposant = (boolean) => {
    setDisplayComponentProject(boolean);
    console.log(displayComponentProject)
  };

  return (
    <div className='dashboard'>
      <SideMain />
      <Header />
      <CreateButton />
      <div className='tab-main'>
        <div className="tab-projects">
          <button className='tab-button' onClick={() => toggleComposant(true)}>Projets</button>
          <span className={displayComponentProject ? 'isActive' : ''}></span>
        </div>
        <div className="tab-collabs">
          <button className='tab-button' onClick={() => toggleComposant(false)}>Collaborateurs</button>
          <span className={!displayComponentProject ? 'isActive' : ''}></span>
        </div>
      </div>
      <CSSTransition
        in={!displayComponentProject}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <ProjectsList />
      </CSSTransition>
      <CSSTransition
        in={displayComponentProject}
        timeout={1000}
        classNames="collabs"
        unmountOnExit
      >
        <ListCollabs />
      </CSSTransition>
    </div>
  )
}