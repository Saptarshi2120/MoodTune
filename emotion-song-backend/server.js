
// // server.js

// server.js

// const express = require('express');
// const cors = require('cors');
// const pool = require('./db');
// const app = express();


// // Middleware
// app.use(cors());
// app.use(express.json());

// // Get all data (example route)
// app.get('/api/data', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM responses');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('❌ Error fetching data:', err);
//     res.status(500).json({ error: 'Server error while fetching data' });
//   }
// });

// // Submit responses
// app.post('/api/submit', async (req, res) => {
//   try {
//     console.log("📥 Incoming POST request to /api/submit");

//     const { answers } = req.body;

//     if (!answers) {
//       console.error("🚫 No answers received in request body");
//       return res.status(400).json({ error: "No answers provided" });
//     }

//     console.log("✅ Received answers:", answers);

//     const values = [
//       answers["How has your day been so far?"],
//       answers["What's the one emoji that best describes your mood?"],
//       answers["What's your current mindset like?"],
//       answers["What is your preferred language for songs?"],
//     ];

//     console.log("📦 Prepared values for DB insert:", values);

//     const result = await pool.query(
//       `INSERT INTO mood_detection (ans_1, ans_2, ans_3, language)
//        VALUES ($1, $2, $3, $4) RETURNING *`,
//       values
//     );

//     console.log("✅ Successfully inserted into DB:", result.rows[0]);

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("❌ Error inserting to DB:", err.message);
//     res.status(500).json({ error: "Error saving answers" });
//   }
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

// Middleware
// app.use(cors());
// app.use(express.json());

// Get all data (example route)


// const express = require('express');
// const cors = require('cors');
// const pool = require('./db'); // Import the database connection from db.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const { auth } = require('express-oauth2-jwt-bearer');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // To handle form data

// // Multer configuration for handling file uploads (images) - Changed for bytea
// const storage = multer.memoryStorage(); // Store the image in memory
// const upload = multer({ storage: storage });



// // Submit responses and image
// app.post('/api/submit', upload.single('image'), async (req, res) => {

// // Auth0 Config
// const jwtCheck = auth({
//   audience: 'https://moodtune-api', // ✅ Correct audience
//   issuerBaseURL: 'https://moodtune.us.auth0.com/', // ✅ Correct your Auth0 domain
//   tokenSigningAlg: 'RS256',
// });

// // ➡️ Route: Store user data (Public - NO jwtCheck here)
// app.post('/api/store-user', async (req, res) => {
//   try {
//     console.log("📥 Incoming POST request to /api/store-user");

//     const { name, email, picture, sub } = req.body;

//     if (!name || !email || !picture || !sub) {
//       console.error("🚫 Missing fields in request body");
//       return res.status(400).json({ error: "Name, Email, Picture, and Auth0 ID (sub) are required" });
//     }

//     console.log("✅ Received user data:", { name, email, picture, sub });

//     const result = await pool.query(
//       `INSERT INTO users (name, email, picture, auth0_id)
//        VALUES ($1, $2, $3, $4)
//        ON CONFLICT (email) DO NOTHING
//        RETURNING *`,
//       [name, email, picture, sub]
//     );

//     if (result.rows.length > 0) {
//       console.log("✅ Successfully inserted user:", result.rows[0]);
//       res.status(201).json({ message: "User inserted", user: result.rows[0] });
//     } else {
//       console.log("ℹ️ User already exists");
//       res.status(200).json({ message: "User already exists" });
//     }
//   } catch (err) {
//     console.error("❌ Error inserting user to DB:", err.message);
//     res.status(500).json({ error: "Error saving user" });
//   }
// });

// // ➡️ Route: Get all mood detection responses (Public)
// app.get('/api/data', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM responses');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('❌ Error fetching responses:', err.message);
//     res.status(500).json({ error: 'Server error while fetching responses' });
//   }
// });

// // ➡️ Route: Submit mood detection answers (Public)
// app.post('/api/submit', async (req, res) => {
//   try {
//     console.log("📥 Incoming POST request to /api/submit");
//     console.log("Request Files:", req.file); // Log the file details
//     console.log("Request Body:", req.body);

//     const answers = JSON.parse(req.body.answers); // Parse the answers from the form data

//     if (!answers) {
//       console.error("🚫 No answers received in request body");
//       return res.status(400).json({ error: "No answers provided" });
//     }

//     console.log("✅ Received answers:", answers);

//     let imageData = null;
//     if (req.file) {
//       imageData = req.file.buffer; // Store the image data as a Buffer
//       console.log("✅ Image Data:", imageData ? imageData.slice(0, 20) + '...' : 'No image data'); // Log first 20 bytes
//     }



//     const values = [
//       answers["How has your day been so far?"],
//       answers["What's the one emoji that best describes your mood?"],
//       answers["What's your current mindset like?"],
//       answers["What is your preferred language for songs?"],
//       imageData, //  This is the image data in Buffer format
//     ];

//     console.log("📦 Prepared values for DB insert:", values);

//     //  Insert the data into the database
//     const result = await pool.query(
//       `INSERT INTO mood_detection (ans_1, ans_2, ans_3, language, captured_image)
//        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       `INSERT INTO mood_detection (ans_1, ans_2, ans_3, language)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       values
//     );

//     console.log("✅ Successfully inserted into DB:", result.rows[0]);
//     res.status(201).json({ message: "Data stored successfully", data: result.rows[0] });
//     console.log("✅ Successfully inserted mood answers:", result.rows[0]);

//   } catch (err) {
//     console.error("❌ Error processing data:", err.message);
//     res.status(500).json({ error: "Error saving data" });
//     console.error("❌ Error inserting answers to DB:", err.message);
//     res.status(500).json({ error: "Error saving answers" });
//   }
// });



// // ➡️ Route: Get all songs (Public)
// app.get('/api/songs', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM song_data');
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Error fetching songs:", err.message);
//     res.status(500).json({ error: "Error fetching songs" });
//   }
// });

// // ➡️ Example of a protected route (for future if you need)
// app.get('/api/protected-data', jwtCheck, async (req, res) => {
//   try {
//     res.json({ message: "🔒 This is protected data, accessed only by logged-in users" });
//   } catch (err) {
//     console.error("❌ Error fetching protected data:", err.message);
//     res.status(500).json({ error: "Error fetching protected data" });
//   }
// });

// // ➡️ Default route
// app.get('/', (req, res) => {
//   res.send('🌟 MoodTune API is Running');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);

// });

const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the database connection from db.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { auth } = require('express-oauth2-jwt-bearer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data

// Multer configuration for handling file uploads (images) - Changed for bytea
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });

// Auth0 Config
const jwtCheck = auth({
    audience: 'https://moodtune-api', // ✅ Correct audience
    issuerBaseURL: 'https://moodtune.us.auth0.com/', // ✅ Correct your Auth0 domain
    tokenSigningAlg: 'RS256',
});

// ➡️ Route: Store user data (Public - NO jwtCheck here)
app.post('/api/store-user', async (req, res) => {
    try {
        console.log("📥 Incoming POST request to /api/store-user");

        const { name, email, picture, sub } = req.body;

        if (!name || !email || !picture || !sub) {
            console.error("🚫 Missing fields in request body");
            return res.status(400).json({ error: "Name, Email, Picture, and Auth0 ID (sub) are required" });
        }

        console.log("✅ Received user data:", { name, email, picture, sub });

        const result = await pool.query(
            `INSERT INTO users (name, email, picture, auth0_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) DO NOTHING
            RETURNING *`,
            [name, email, picture, sub]
        );

        if (result.rows.length > 0) {
            console.log("✅ Successfully inserted user:", result.rows[0]);
            res.status(201).json({ message: "User inserted", user: result.rows[0] });
        } else {
            console.log("ℹ️ User already exists");
            res.status(200).json({ message: "User already exists" });
        }
    } catch (err) {
        console.error("❌ Error inserting user to DB:", err.message);
        res.status(500).json({ error: "Error saving user" });
    }
});

// ➡️ Route: Get all mood detection responses (Public)
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM responses');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Error fetching responses:', err.message);
        res.status(500).json({ error: 'Server error while fetching responses' });
    }
});

// ➡️ Route: Submit mood detection answers (Public)
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
        ];

        let query;
        if (imageData) {
            query = `
                INSERT INTO mood_detection (ans_1, ans_2, ans_3, language, captured_image)
                VALUES ($1, $2, $3, $4, $5) RETURNING *
            `;
            values.push(imageData);
        } else {
            query = `
                INSERT INTO mood_detection (ans_1, ans_2, ans_3, language)
                VALUES ($1, $2, $3, $4) RETURNING *
            `;
        }

        console.log("📦 Prepared values for DB insert:", values);
        console.log("📝 Executing Query:", query);

        const result = await pool.query(query, values);

        console.log("✅ Successfully inserted into DB:", result.rows[0]);
        res.status(201).json({ message: "Data stored successfully", data: result.rows[0] });

    } catch (err) {
        console.error("❌ Error processing data:", err.message);
        res.status(500).json({ error: "Error saving data" });
    }
});

// ➡️ Route: Get all songs (Public)
app.get('/api/songs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM song_data');
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error fetching songs:", err.message);
        res.status(500).json({ error: "Error fetching songs" });
    }
});

// ➡️ Example of a protected route (for future if you need)
app.get('/api/protected-data', jwtCheck, async (req, res) => {
    try {
        res.json({ message: "🔒 This is protected data, accessed only by logged-in users" });
    } catch (err) {
        console.error("❌ Error fetching protected data:", err.message);
        res.status(500).json({ error: "Error fetching protected data" });
    }
});

// ➡️ Default route
app.get('/', (req, res) => {
    res.send('🌟 MoodTune API is Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});


