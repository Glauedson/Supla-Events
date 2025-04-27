import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/login/login.jsx'
import Home from './pages/home/home.jsx'
import Admin from './pages/admin/admin.jsx'
import Register from './pages/register/register.jsx'
import Terms from './pages/terms/terms.jsx'
import Verifications from './pages/verifications/verification.jsx'
import './global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/accounts/login" element={<Login />} />
        <Route path="/accounts/register" element={<Register />} />
        <Route path="/accounts/terms" element={<Terms />} />
        <Route path="/accounts/verification" element={<Verifications />} />

        <Route path="/home" element={<Home />} />
        <Route path='/admin' element={<Admin />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </StrictMode>,
)
