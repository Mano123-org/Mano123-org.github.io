// server.js
// Simple Express server for the Bug Bounty Training app.
// Handles serving the static frontend, saving bug reports to SQLite,
// and accepting screenshot uploads via Multer.

const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// ---------- Folders ----------
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// ---------- Database setup ----------
const db = new sqlite3.Database(path.join(__dirname, "reports.db"));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      severity TEXT NOT NULL,
      screenshot TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// ---------- Multer setup (screenshot uploads) ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error("Only image files are allowed"), ok);
  },
});

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(UPLOAD_DIR));

// ---------- API: submit a bug report ----------
app.post("/api/reports", upload.single("screenshot"), (req, res) => {
  const { title, description, severity } = req.body;

  if (!title || !description || !severity) {
    return res.status(400).json({ error: "Title, description, and severity are required." });
  }

  const screenshotPath = req.file ? "/uploads/" + req.file.filename : null;

  db.run(
    `INSERT INTO reports (title, description, severity, screenshot) VALUES (?, ?, ?, ?)`,
    [title, description, severity, screenshotPath],
    function (err) {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// ---------- API: list all bug reports ----------
app.get("/api/reports", (req, res) => {
  db.all(`SELECT * FROM reports ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Bug Bounty Training app running at http://localhost:${PORT}`);
});
