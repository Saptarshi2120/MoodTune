// server.js

// const express = require('express');
// const cors = require('cors');
// const pool = require('./db');
// const app = express();

// Middleware
// app.use(cors());
// app.use(express.json());

// Get all data (example route)

const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the database connection from db.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data

// Multer configuration for handling file uploads (images) - Changed for bytea
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });



// Submit responses and image
app.post('/api/submit', upload.single('image'), async (req, res) => {
  try {
    console.log("📥 Incoming POST request to /api/submit");
    console.log("Request Files:", req.file); // Log the file details
    console.log("Request Body:", req.body);

    const answers = JSON.parse(req.body.answers); // Parse the answers from the form data

    if (!answers) {
      console.error("🚫 No answers received in request body");
      return res.status(400).json({ error: "No answers provided" });
    }

    console.log("✅ Received answers:", answers);

    let imageData = null;
    if (req.file) {
      imageData = req.file.buffer; // Store the image data as a Buffer
      console.log("✅ Image Data:", imageData ? imageData.slice(0, 20) + '...' : 'No image data'); // Log first 20 bytes
    }



    const values = [
      answers["How has your day been so far?"],
      answers["What's the one emoji that best describes your mood?"],
      answers["What's your current mindset like?"],
      answers["What is your preferred language for songs?"],
      imageData, //  This is the image data in Buffer format
    ];

    console.log("📦 Prepared values for DB insert:", values);

    //  Insert the data into the database
    const result = await pool.query(
      `INSERT INTO mood_detection (ans_1, ans_2, ans_3, language, captured_image)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values
    );

    console.log("✅ Successfully inserted into DB:", result.rows[0]);
    res.status(201).json({ message: "Data stored successfully", data: result.rows[0] });

  } catch (err) {
    console.error("❌ Error processing data:", err.message);
    res.status(500).json({ error: "Error saving data" });
  }
});



// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);

});