import { useNavigate } from 'react-router-dom'
import './CreateButton.scss'

export default function CreateButton() {
  const navigate = useNavigate()

  const handleclick = () => {
    localStorage.clear()
    navigate('/new')
  }
  return (
    <button onClick={() => handleclick()} className='create-button'><i className="fa-solid fa-plus"></i></button>
  )
}
