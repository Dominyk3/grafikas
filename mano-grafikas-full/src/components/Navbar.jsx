import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-[#10403B] text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Mano grafikas</div>
      <div className="space-x-4">
        <Link to="/calendar" className="hover:underline">Kalendorius</Link>
        <Link to="/summary" className="hover:underline">Suvestinė</Link>
        <Link to="/sos" className="hover:underline">SOS</Link>
        <Link to="/dashboard" className="hover:underline">Vadovo skydelis</Link>
        <Link to="/login" onClick={() => localStorage.removeItem("token")} className="hover:underline">Atsijungti</Link>
      </div>
    </nav>
  )
}