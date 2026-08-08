import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import Projects from './pages/Projects'
import Project from './pages/ProjectKanban'

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
            <Route path='/dashboard' element={<>dashboarddashboarddashboarddashboarddashboarddashboarddashboarddashboarddashboarddashboarddashboarddashboarddashboarddashboard</>} />
            <Route path='/projects' element={<Projects/>} />
            <Route path='/project/:id' element={<Project/>} />
            <Route path='/tasks' element={<>tasks</>} />
            <Route path='/settings' element={<>settings</>} />
          </Route>
        </Route>



      </Routes>
    </BrowserRouter>
  )
}

export default App
