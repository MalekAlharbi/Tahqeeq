import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<MainLayout/>}>
          {/* Homepage */}
          <Route path='/' element={<>sssssss</>} />

          {/* Auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        
        

        {/* Main Pages */}
        <Route path='/dashboard' element={<></>} />
        <Route path='/projects' element={<></>} />
        <Route path='/tasks' element={<></>} />
        <Route path='/settings' element={<></>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
