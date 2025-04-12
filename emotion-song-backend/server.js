// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get all data (example route)
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM responses');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching data:', err);
    res.status(500).json({ error: 'Server error while fetching data' });
  }
});

// Submit responses
app.post('/api/submit', async (req, res) => {
  try {
    console.log("📥 Incoming POST request to /api/submit");

    const { answers } = req.body;

    if (!answers) {
      console.error("🚫 No answers received in request body");
      return res.status(400).json({ error: "No answers provided" });
    }

    console.log("✅ Received answers:", answers);

    const values = [
      answers["How has your day been so far?"],
      answers["What's the one emoji that best describes your mood?"],
      answers["What's your current mindset like?"],
      answers["What is your preferred language for songs?"],
    ];

    console.log("📦 Prepared values for DB insert:", values);

    const result = await pool.query(
      `INSERT INTO mood_detection (ans_1, ans_2, ans_3, language)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      values
    );

    console.log("✅ Successfully inserted into DB:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting to DB:", err.message);
    res.status(500).json({ error: "Error saving answers" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
