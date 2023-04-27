import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Dashboard from './views/dashboard/Dashboard'
import Form from './views/form/Form'
import Project from './views/project/Project'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Form />} />
          <Route path='/register' element={<Form />} />
          <Route path='/project/:id' element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
