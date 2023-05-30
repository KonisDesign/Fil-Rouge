import './FormInputLogin.scss'

export default function FormInputLogin({handleRegister ,component, title, divTop, divBottom, buttonText }) {
    return (
        <form onSubmit={handleRegister} className={`${component}-container`}>
            {title ? <h1>{title}</h1> : null}
            <div className="div-top">
                {divTop}
            </div>
            <div className="div-bottom">
                {divBottom}
            </div>
            {buttonText ? (
                <button type='submit' className={`primary-button button-${component}`}>{buttonText}</button>
            ) : null}
        </form>
    )
}
