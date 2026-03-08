const express = require("express")
const path = require("path")
const multer = require("multer")
const cors = require("cors")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000;

const uploadDir = "uploads"
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
})
const upload = multer({ storage })

app.use(cors({ origin: "http://localhost:3002" }))


app.post("/upload", upload.single("file"), (req,res) => {
  console.log(req.file)
  res.json({ message: "File uploaded successfully!" })
})


app.use(express.static(path.join(__dirname, "frontend/build")))



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))