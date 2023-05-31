import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Dashboard from './views/dashboard/Dashboard'
import Form from './views/form/Form'
import Project from './views/project/Project'
import CreateProject from './views/create-project/CreateProject'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/login' element={<Form />} />
          <Route path='/register' element={<Form />} />
          <Route path='/project/:id' element={<ProtectedRoute><Project /></ProtectedRoute>} />
          <Route path='/new' element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
