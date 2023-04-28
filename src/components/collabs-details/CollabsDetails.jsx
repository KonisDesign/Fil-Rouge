import React from 'react'
import './CollabsDetails.scss'

export default function CollabsDetails(props) {
    return (
        <>
            {props.infos.map((info) => (
                <div key={info.name} className="collab-details-container">
                    <div className="collab-picture">
                        <img src={info.imageUrl} alt="" />
                    </div>
                    <div className='infos'>
                        <div className="collab-status">
                            <h2>{info.name.toUpperCase()} {info.firstname}</h2>
                            <h4>{info.job}</h4>
                        </div>
                        <div className="collab-projects">
                            <h5>Travaille sur :</h5>
                            <div className="collab-projects-list">
                                {info.projects.map((project) => (
                                    <h6 key={project}>{project}</h6>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
