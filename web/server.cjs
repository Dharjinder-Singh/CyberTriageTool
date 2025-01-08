const {spawn} = require('child_process');
const express = require("express")

const app = express();
app.use(express.json());

app.post('/run-python', (req, res) => {
  const pythonScript = "app.py"
  const pythonProcess = spawn('python', [pythonScript]);
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.resolve(__dirname)); // Save to root folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage });

// Endpoint to handle file upload
// app.post("/upload", upload.single("file"), (req, res) => {
//   try {
//     res.status(200).json({ message: "File uploaded successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: "Error uploading file" });
//   }
// });



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));