from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from db import conn, cursor
import json
import uvicorn
import httpx
from io import BytesIO
from PIL import Image
import httpx, json, io
from fastapi import FastAPI, Form, UploadFile, File
from PIL import Image
import json
import httpx
import os
import psycopg2
from uuid import uuid4

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "🌟 MoodTune API is Running"}

@app.post("/api/store-user")
def store_user(user: dict):
    try:
        # Using dummy data for the user details
        dummy_email = "anonymous@example114.com"
        dummy_auth0_id = "dummy-auth0-id11"
        dummy_name = "Anonymous114"
        dummy_picture = "https://example.com/default-profi11le.jpg"

        # Store user information with dummy values
        cursor.execute("""
            INSERT INTO users (name, email, picture, auth0_id)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        """, (dummy_name, dummy_email, dummy_picture, dummy_auth0_id))
        
        data = cursor.fetchone()
        conn.commit()
        
        if data:
            return {"message": "User inserted", "user": data}
        else:
            return {"message": "User already exists"}
    
    except Exception as e:
        return {"error": f"Error saving user: {str(e)}"}

@app.get("/api/data")
def get_responses():
    try:
        cursor.execute("SELECT * FROM responses;")
        data = cursor.fetchall()
        return data
    except Exception as e:
        return {"error": f"Error fetching responses: {str(e)}"}

@app.get("/api/songs")
def get_songs():
    try:
        cursor.execute("SELECT * FROM song_data;")
        data = cursor.fetchall()
        return data
    except Exception as e:
        return {"error": f"Error fetching songs: {str(e)}"}

@app.post("/api/submit")
async def submit_data(
    answers: str = Form(...),
    image: UploadFile = File(...)
):
    try:
        print("📩 Incoming POST request")

        # 1. Parse answers
        try:
            parsed_answers = json.loads(answers)
        except json.JSONDecodeError as e:
            print("❌ JSON parse error:", e)
            return {"error": "Invalid JSON in 'answers'"}

        print("✅ Parsed answers:", parsed_answers)

        # 2. Extract specific answers
        ans_1 = parsed_answers.get("How has your day been so far?")
        ans_2 = parsed_answers.get("What's the one emoji that best describes your mood?")
        ans_3 = parsed_answers.get("What's your current mindset like?")
        language = parsed_answers.get("What is your preferred language for songs?")
        combined_text = f"{ans_1} {ans_2} {ans_3} {language}"
        print("📝 Combined text:", combined_text)

        # 3. Save image to disk
        UPLOAD_FOLDER = "uploads"
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        file_ext = os.path.splitext(image.filename)[-1]
        filename = f"webcam_{uuid4().hex}{file_ext}"
        image_path = os.path.abspath(os.path.join(UPLOAD_FOLDER, filename))  # changed to absolute path

        with open(image_path, "wb") as f:
            content = await image.read()
            f.write(content)

        print("📸 Image saved to:", image_path)

        # 4. Send to prediction API
        async with httpx.AsyncClient() as client:
            url = "http://127.0.0.1:9000/predict/"
            data = {
                "email": "anonymous@11e45874x11ample.com",
                "text": combined_text,
                "image_path": image_path
            }

            print(f"📡 Sending data to prediction API at {url}")
            print("📦 Payload:", data)

            response = await client.post(url, data=data)

            if response.status_code == 200:
                prediction_data = response.json()
                print("✅ Prediction API response:", prediction_data)
            else:
                print("❌ Error from prediction API:", response.status_code, response.text)
                return {"error": "Error from prediction API"}

        # 5. Store in DB
        query = """
            INSERT INTO mood_detection 
            (email, name, picture, auth0_id, ans_1, ans_2, ans_3, language, captured_image)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *;
        """
        values = (
            "anonymous@11e45874x11111ample.com",
            "AnonymousU11s1441411111er",
            "https://example.com/d11efa1u1lt-4pro4411fi11le.jpg",
            "dummy-aut11441111h4011-id",
            ans_1,
            ans_2,
            ans_3,
            language,
            image_path
        )

        print("📤 Inserting into DB:", values)
        cursor.execute(query, values)
        data = cursor.fetchone()
        conn.commit()
        print("✅ Data inserted into database:", data)

        return {"message": "Data stored successfully", "db_entry": data}

    except Exception as e:
        print("❌ Exception occurred:", str(e))
        return {"error": f"Unexpected error: {str(e)}"}

    except Exception as e:
        print("❌ Exception:", str(e))
        return {"error": f"Unexpected error: {str(e)}"}
    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
