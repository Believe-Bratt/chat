import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const NavItem = ({ to, label }) => (
    <Link to={to} className={`block px-4 py-2 rounded hover:bg-white/10 ${pathname === to ? 'bg-white/10 font-semibold' : ''}`}>{label}</Link>
  )
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-indigo-600 text-white rounded-2xl p-4 shadow">
          <div className="text-xl font-bold px-2 py-3">ChatConnect</div>
          <nav className="space-y-1">
            <NavItem to="/" label="Dashboard" />
            <NavItem to="/users" label="Users" />
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          {children}
        </main>
      </div>
    </div>
  )
}