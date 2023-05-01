import './ProjectTasks.scss'

export default function ProjectTasks() {
    return (
        <div>
            <form className='tasks'>
                <label htmlFor='name'>Nom de la tâche</label>
                <input type="text" />
                <label htmlFor='description'>Description de la tâche</label>
                <input type="text" />
                <button className='primary-button'>Valider la tâche</button>
            </form>
        </div>
    )
}