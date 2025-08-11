import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './tailwind.css'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Users from './pages/Users.jsx'

function App() {
  const token = localStorage.getItem('admin_token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/users" element={token ? <Users /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)