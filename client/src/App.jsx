import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Public from './components/Public'
import Footer from "./components/Footer"
import { GolferContext } from "./context/GolferContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){
  const { token, logout } = useContext(GolferContext)
  return (
    <div className="app">
      {token && <Navbar logout={logout} token={token} />}
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/profile"/> : <Auth />}
        />
        <Route 
          path="/profile"
          element={<ProtectedRoute token={token} redirectTo="/">
            <Profile />
          </ProtectedRoute>}
        />
        <Route 
          path="/public"
          element={<ProtectedRoute token={token} redirtectTo="/">
            <Public />
          </ProtectedRoute>}
        />
        </Routes>
      <Footer />
    </div>
  )
}

export default App;