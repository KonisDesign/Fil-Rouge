import React from 'react'
import './ProjectsList.scss'
import ProjectCard from '../project-card/ProjectCard'

export default function ProjectsList(props) {
    return (
        <div className={`projects-container ${props.addClass ? 'projects-enter' : 'projects-exit'}`}>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    )
}