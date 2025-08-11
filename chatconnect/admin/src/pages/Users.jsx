import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Users() {
  const [users, setUsers] = useState([])
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setUsers(r.data.users || []))
      .catch(() => {})
  }, [])

  const ban = async (uid) => {
    await axios.post(`/api/admin/users/${uid}/ban`, {}, { headers: { Authorization: `Bearer ${token}` } })
    alert('Banned')
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <table className="min-w-full text-left">
        <thead>
          <tr><th className="p-2">UID</th><th className="p-2">Name</th><th className="p-2">Phone</th><th className="p-2">Online</th><th></th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.uid} className="border-t">
              <td className="p-2">{u.uid}</td>
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.phoneNumber}</td>
              <td className="p-2">{u.online ? 'Yes' : 'No'}</td>
              <td className="p-2"><button onClick={() => ban(u.uid)} className="px-3 py-1 bg-red-600 text-white rounded">Ban</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}