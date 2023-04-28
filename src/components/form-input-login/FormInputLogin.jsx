import React from 'react'
import './FormInputLogin.scss'
import { useNavigate } from 'react-router-dom'

export default function FormInputLogin({ component, title, divTop, divBottom, buttonText }) {

    const navigate = useNavigate()

    const handleclick = () => {
        navigate('/')
    }
    return (
        <form className={`${component}-container`}>
            {title ? <h1>{title}</h1> : null}
            <div className="div-top">
                {divTop}
            </div>
            <div className="div-bottom">
                {divBottom}
            </div>
            {buttonText ? (
                <div onClick={() => handleclick()} className={`primary-button button-${component}`}>{buttonText}</div>
            ) : null}
        </form>
    )
}
