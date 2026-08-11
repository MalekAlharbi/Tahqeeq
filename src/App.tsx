import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import Projects from './pages/Projects'
import Project from './pages/ProjectKanban'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'

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
          <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<Projects/>} />
            <Route path='/project/:id' element={<Project/>} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
