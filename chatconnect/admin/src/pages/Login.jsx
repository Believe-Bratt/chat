import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [uid, setUid] = useState('')
  const [totp, setTotp] = useState('')
  const [error, setError] = useState('')

  const doLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('/api/admin/login', { uid, totp })
      localStorage.setItem('admin_token', res.data.token)
      window.location.href = '/'
    } catch (e) {
      setError('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <form className="space-y-4 p-8 rounded-2xl border bg-white/80 backdrop-blur shadow w-full max-w-sm" onSubmit={doLogin}>
        <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
        <input value={uid} onChange={(e) => setUid(e.target.value)} placeholder="Admin UID" className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <input value={totp} onChange={(e) => setTotp(e.target.value)} placeholder="TOTP Code" className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white rounded px-4 py-2 w-full">Login</button>
      </form>
    </div>
  )
}