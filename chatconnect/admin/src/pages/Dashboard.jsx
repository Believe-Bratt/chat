import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    axios.get('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setStats(r.data))
      .catch(() => {})
  }, [])

  if (!stats) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded">Total Users: {stats.totalUsers}</div>
        <div className="p-4 bg-gray-100 rounded">Active Users: {stats.activeUsers}</div>
      </div>
      <div>
        <h2 className="text-xl font-medium mb-2">Messages (last 7 days)</h2>
        <ul className="list-disc pl-6">
          {stats.messagesLast7.map((d) => (
            <li key={d._id}>{d._id}: {d.count}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}