import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout.jsx'

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
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="rounded-2xl bg-white shadow border overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr><th className="p-3">UID</th><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Online</th><th className="p-3"></th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.uid} className="border-t">
                  <td className="p-3 font-mono text-xs">{u.uid}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.phoneNumber}</td>
                  <td className="p-3">{u.online ? 'Yes' : 'No'}</td>
                  <td className="p-3"><button onClick={() => ban(u.uid)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg">Ban</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}