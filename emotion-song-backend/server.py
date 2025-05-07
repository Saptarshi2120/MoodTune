from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from db import conn, cursor
import json
import uvicorn
import httpx
from io import BytesIO

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
    image: UploadFile = File(None)
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

        # 2. Extract answers
        ans_1 = parsed_answers.get("How has your day been so far?")
        ans_2 = parsed_answers.get("What's the one emoji that best describes your mood?")
        ans_3 = parsed_answers.get("What's your current mindset like?")
        language = parsed_answers.get("What is your preferred language for songs?")

        print("📝 Extracted Answers:", ans_1, ans_2, ans_3, language)

        # 3. Read image as raw bytes (if exists)
        image_data = await image.read() if image else None

        async with httpx.AsyncClient() as client:
            url = "http://127.0.0.1:9000/predict/"
            
            # Combine answers into one string for the text parameter
            combined_text = ans_1 + " " + ans_2 + " " + ans_3 + " " + language
            
            # Prepare files and data to be sent to the prediction API
            params = {
            "email": "anonymous@exha44mpled.com",
            "text": combined_text
            }
            response = await client.post(url, params=params)

            if response.status_code == 200:
                prediction_data = response.json()
                print("✅ Prediction API response:", prediction_data)
            else:
                print("❌ Error from prediction API:", response.status_code, response.text)
                return {"error": "Error from prediction API"}

        if image_data:
            print("🖼️ Image uploaded, size:", len(image_data), "bytes")
            print("🔍 Image data (first 20 bytes):", image_data[:20])
            print("📦 Image data type:", type(image_data))
        else:
            print("📭 No image uploaded")

        # 4. Dummy user info (can be replaced with actual user data)
        dummy_email = "anonymous@exha44mpled.com"
        dummy_auth0_id = "dummy-aut44h0-id"
        dummy_name = "AnonymousUs44er"
        dummy_picture = "https://example.com/defa44ult-profile.jpg"

        # 5. Insert into database (store the response from prediction API)
        query = """
            INSERT INTO mood_detection 
            (email, name, picture, auth0_id, ans_1, ans_2, ans_3, language, captured_image)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *;
        """
        values = (
            dummy_email,
            dummy_name,
            dummy_picture,
            dummy_auth0_id,
            ans_1,
            ans_2,
            ans_3,
            language,
            image_data
        )

        print("📤 Executing query with values:", values)
        cursor.execute(query, values)
        data = cursor.fetchone()
        conn.commit()

        print("✅ Data inserted successfully:", data)
        return {"message": "Data stored successfully"}

    except Exception as e:
        print("❌ Error during insert:", str(e))
        return {"error": f"Error saving data: {str(e)}"}

    
# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
