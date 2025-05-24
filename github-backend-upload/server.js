require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB prisijungta"))
  .catch(err => console.error("DB klaida:", err))

const { Schema, model } = mongoose
const User = model("User", new Schema({
  vardas: String,
  el_pastas: { type: String, unique: true },
  slaptazodis: String,
  padalinys: String,
  noriSos: Boolean,
  atsisakymai: { type: Number, default: 0 }
}))

app.post("/register", async (req, res) => {
  try {
    const { vardas, el_pastas, slaptazodis, padalinys, noriSos } = req.body
    const hash = await bcrypt.hash(slaptazodis, 10)
    await User.create({ vardas, el_pastas, slaptazodis: hash, padalinys, noriSos })
    res.send("OK")
  } catch (err) {
    res.status(400).json({ klaida: "Registracija nepavyko" })
  }
})

app.post("/login", async (req, res) => {
  try {
    const { el_pastas, slaptazodis } = req.body
    const user = await User.findOne({ el_pastas })
    if (!user) return res.status(404).send("Nerasta")

    const match = await bcrypt.compare(slaptazodis, user.slaptazodis)
    if (!match) return res.status(401).send("Blogas slaptažodis")

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token })
  } catch {
    res.status(500).send("Serverio klaida")
  }
})

app.get("/", (req, res) => {
  res.send("Veikia Mano Grafikas API 🚀")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log("Serveris paleistas per prievadą", PORT))