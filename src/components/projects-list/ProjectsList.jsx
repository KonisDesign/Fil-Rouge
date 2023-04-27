import React from 'react'
import './ProjectsList.scss'
import ProjectCard from '../project-card/ProjectCard'

export default function ProjectsList() {
    return (
        <div className='projects-container'>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    )
}