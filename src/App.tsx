import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          {/* Homepage */}
          <Route path='/' element={<Home />} />

          {/* Auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        {/* Main Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<>dashboard</>} />
          <Route path='/projects' element={<>projects</>} />
          <Route path='/tasks' element={<>tasks</>} />
          <Route path='/settings' element={<>settings</>} />
        </Route>
        


      </Routes>
    </BrowserRouter>
  )
}

export default App
