import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Calendar from "./pages/Calendar.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import SOS from "./pages/SOS.jsx"
import Summary from "./pages/Summary.jsx"
import Navbar from "./components/Navbar.jsx"

export default function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("token")
    if (saved) setToken(saved)
  }, [])

  const isAuthenticated = !!token

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Toaster />
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sos" element={<SOS />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="*" element={<Navigate to="/calendar" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  )
}