import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Dashboard from './views/dashboard/Dashboard'
import Form from './views/form/Form'
import Project from './views/project/Project'
import CreateProject from './views/create-project/CreateProject'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Form />} />
          <Route path='/register' element={<Form />} />
          <Route path='/project/:id' element={<Project />} />
          <Route path='/new' element={<CreateProject />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
