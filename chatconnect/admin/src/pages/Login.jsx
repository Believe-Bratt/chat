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
    <div className="min-h-screen flex items-center justify-center">
      <form className="space-y-3 p-6 rounded border" onSubmit={doLogin}>
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <input value={uid} onChange={(e) => setUid(e.target.value)} placeholder="Admin UID" className="border px-3 py-2 rounded w-64" />
        <input value={totp} onChange={(e) => setTotp(e.target.value)} placeholder="TOTP Code" className="border px-3 py-2 rounded w-64" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-black text-white rounded px-4 py-2">Login</button>
      </form>
    </div>
  )
}