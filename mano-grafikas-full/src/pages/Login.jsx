import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function Login({ setToken }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/prisijungimas", {
        el_pastas: email,
        slaptazodis: password,
      })
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      toast.success("Prisijungta sėkmingai")
    } catch (err) {
      toast.error("Neteisingi prisijungimo duomenys")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#127369]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-[#10403B] mb-4">Prisijungimas</h2>
        <input
          type="email"
          placeholder="El. paštas"
          className="w-full mb-3 p-2 rounded border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          className="w-full mb-4 p-2 rounded border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#10403B] text-white py-2 rounded hover:bg-[#127369]"
        >
          Prisijungti
        </button>
      </form>
    </div>
  )
}