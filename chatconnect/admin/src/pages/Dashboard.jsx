import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout.jsx'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    axios.get('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setStats(r.data))
      .catch(() => {})
  }, [])

  return (
    <Layout>
      {!stats ? (
        <div className="p-6">Loading...</div>
      ) : (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white shadow border">
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow border">
              <div className="text-sm text-gray-500">Active Users</div>
              <div className="text-3xl font-bold">{stats.activeUsers}</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow border">
              <div className="text-sm text-gray-500">Messages (7d)</div>
              <div className="text-3xl font-bold">{stats.messagesLast7.reduce((a,b)=>a+b.count,0)}</div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow border">
            <h2 className="text-xl font-semibold mb-2">Messages last 7 days</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {stats.messagesLast7.map((d) => (
                <li key={d._id} className="p-3 rounded-lg bg-gray-50 border text-sm flex items-center justify-between">
                  <span>{d._id}</span>
                  <span className="font-semibold">{d.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}