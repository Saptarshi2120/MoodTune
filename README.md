# 🎧 MoodTune – Emotion-Based Music Recommender

MoodTune is a real-time, AI-powered music recommendation system that personalizes playlists based on the user’s emotional and sentimental state. It combines text analysis (emotion + sentiment), LLM-powered queries, and the Spotify API to deliver tracks that match how you're feeling.

![MoodTune Workflow](./assets/Moodtune-Flowchart.png)

---

## 🚀 Features

- 🔐 **Secure Gmail OAuth** login for user authentication  
- 🧠 **Emotion + Sentiment Analysis** using NLP models (e.g., BERT, TextBlob)  
- 📊 **Mood Matrix** generation with weighted scoring (7×3 matrix)  
- 💡 **LLM-based Prompting** via Gemini for context-aware Spotify queries  
- 🎵 **Spotify API Integration** for fetching tracks and metadata  
- 🗃️ **PostgreSQL Database** for scalable song metadata and user info storage  
- 💻 **Modern React Frontend** with album art, audio previews, and personalized playlists  

---

## 🛠️ Project Structure

```
MoodTune/
├── frontend/                  # React frontend for UI and playlist display
├── emotion-song-backend/      # FastAPI backend (OAuth, emotion/sentiment analysis, playlist logic)
│   └── server.py
├── main.py                   # Secondary FastAPI app (advanced LLM or services)
├── postgres/                 # PostgreSQL database schema and migration scripts
└── assets/                   # Images and assets (e.g., workflow diagram)
```

---

## 🧪 How It Works (Workflow Summary)

1. **Login via Gmail OAuth**  
   Secure user authentication and session management.

2. **User Input**  
   User answers mood-related questions and specifies song language preferences.

3. **Backend Processing**  
   FastAPI backend performs NLP emotion and sentiment analysis on input data.  
   Generates a weighted 7×3 Mood Matrix.

4. **Query Generation**  
   Gemini LLM crafts a context-aware prompt aligned with the user’s mood.  
   Spotify API is queried using this prompt to fetch matching tracks.

5. **Database Storage**  
   Songs, moods, and user info are stored in PostgreSQL for persistence and scalability.

6. **Frontend Delivery**  
   React dashboard displays personalized playlists with album art and audio previews.

---

## 🖥️ Getting Started: How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Saptarshi2120/MoodTune.git
cd MoodTune
```

### 2. Run the Frontend (React)

```bash
cd frontend
npm install
npm start
```

- The frontend UI will be available at: [http://localhost:3000](http://localhost:3000)

---

### 3. Run the Backend API (Emotion & Spotify Handling)

Open a new terminal:

```bash
cd MoodTune/emotion-song-backend
uvicorn server:app --reload
```

- The backend server will run at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 4. Run the Additional Backend (LLM-related Services)

Open another terminal:

```bash
cd MoodTune
uvicorn main:app --host 127.0.0.1 --port 9000 --reload
```

- Secondary backend available at: [http://127.0.0.1:9000](http://127.0.0.1:9000)

---

## ✅ Requirements

- Node.js (for React frontend)  
- Python 3.8+  
- FastAPI  
- Uvicorn  
- PostgreSQL  
- TextBlob or BERT-based transformer models  
- Gemini LLM access (or mock for local development)  
- Spotify API credentials  

---

## 📬 Contact

Made with ❤️ by Saptarshi2120  
For issues or suggestions, feel free to open an issue on the GitHub repository.
