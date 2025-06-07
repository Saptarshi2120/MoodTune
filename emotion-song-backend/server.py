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
            INSERT INTO user_emotions (name, email, picture, auth0_id)
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

# @app.get("/api/songs")
# def get_songs():
#     try:
#         cursor.execute("SELECT * FROM song_data;")
#         data = cursor.fetchall()
#         return data
#     except Exception as e:
#         return {"error": f"Error fetching songs: {str(e)}"}

# @app.post("/api/submit")
# async def submit_data(
#     answers: str = Form(...),
#     image: UploadFile = File(...)
# ):
#     try:
#         print("📩 Incoming POST request")

#         # 1. Parse answers
#         try:
#             parsed_answers = json.loads(answers)
#         except json.JSONDecodeError as e:
#             print("❌ JSON parse error:", e)
#             return {"error": "Invalid JSON in 'answers'"}

#         print("✅ Parsed answers:", parsed_answers)

#         # 2. Extract specific answers
#         ans_1 = parsed_answers.get("How has your day been so far?")
#         ans_2 = parsed_answers.get("What's the one emoji that best describes your mood?")
#         ans_3 = parsed_answers.get("What's your current mindset like?")
#         language = parsed_answers.get("What is your preferred language for songs?")
#         combined_text = f"{ans_1} {ans_2} {ans_3} {language}"
#         print("📝 Combined text:", combined_text)

#         # 3. Save image to disk
#         UPLOAD_FOLDER = "uploads"
#         os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#         file_ext = os.path.splitext(image.filename)[-1]
#         filename = f"webcam_{uuid4().hex}{file_ext}"
#         image_path = os.path.abspath(os.path.join(UPLOAD_FOLDER, filename))  # changed to absolute path

#         with open(image_path, "wb") as f:
#             content = await image.read()
#             f.write(content)

#         print("📸 Image saved to:", image_path)

#         # 4. Send to prediction API
#         async with httpx.AsyncClient() as client:
#             url = "http://127.0.0.1:9000/predict/"
#             data = {
#                 "email": "anonymous@11e45874x155ample.com",
#                 "text": combined_text,
#                 "image_path": image_path
#             }

#             print(f"📡 Sending data to prediction API at {url}")
#             print("📦 Payload:", data)

#             response = await client.post(url, data=data)

#             if response.status_code == 200:
#                 prediction_data = response.json()
#                 print("✅ Prediction API response:", prediction_data)
#             else:
#                 print("❌ Error from prediction API:", response.status_code, response.text)
#                 return {"error": "Error from prediction API"}

#         # 5. Store in DB
#         query = """
#             INSERT INTO mood_detection 
#             (email, name, picture, auth0_id, ans_1, ans_2, ans_3, language, captured_image)
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
#             RETURNING *;
#         """
#         values = (
#             "anonymous@1211e45874x1111ample.com",
#             "AnonymousU11s14414111er",
#             "https://example.com/d11efa1u1lt-4pro4411f1le.jpg",
#             "dummy-aut114111h4011-id",
#             ans_1,
#             ans_2,
#             ans_3,
#             language,
#             image_path
#         )

#         print("📤 Inserting into DB:", values)
#         cursor.execute(query, values)
#         data = cursor.fetchone()
#         conn.commit()
#         print("✅ Data inserted into database:", data)

#         return {"message": "Data stored successfully", "db_entry": data}

#     except Exception as e:
#         print("❌ Exception occurred:", str(e))
#         return {"error": f"Unexpected error: {str(e)}"}

#     except Exception as e:
#         print("❌ Exception:", str(e))
#         return {"error": f"Unexpected error: {str(e)}"}

@app.post("/api/submit")
async def submit_data(
    answers: str = Form(...),
    # image: UploadFile = File(...)
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
        ans_1 = parsed_answers.get("What's your current mood like?")
        ans_2 = parsed_answers.get("How energized do you feel right now?")
        ans_3 = parsed_answers.get("What thoughts are most influencing your mind at the moment?")
        language = parsed_answers.get("What is your preferred language for songs?")
        combined_text = f"{ans_1} {ans_2} {ans_3} {language}"
        print("📝 Combined text:", combined_text)

        # 3. Save image to disk
        # UPLOAD_FOLDER = "uploads"
        # os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        # file_ext = os.path.splitext(image.filename)[-1]
        # filename = f"webcam_{uuid4().hex}{file_ext}"
        # image_path = os.path.abspath(os.path.join(UPLOAD_FOLDER, filename))  # changed to absolute path

        # with open(image_path, "wb") as f:
        #     content = await image.read()
        #     f.write(content)

        # print("📸 Image saved to:", image_path)

        # 4. Send to prediction API
        async with httpx.AsyncClient() as client:
            url = "http://127.0.0.1:9000/predict/"
            data = {
                "email": "anonymous@11e45874x157ample.com",
                "text": combined_text,
                "lang":language,
                # "image_path": image_path
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
            "anonymous@1211e45874x11111ample.com",
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

@app.get("/api/last-playlist-link")
def get_last_playlist_link():
    try:
        print("🎵 Fetching latest playlist link...")
        cursor.execute("""
            SELECT playlist_link 
            FROM user_emotions 
            ORDER BY timestamp DESC 
            LIMIT 1;
        """)
        result = cursor.fetchone()

        if not result:
            print("⚠️ No playlist link found.")
            return {"message": "No playlist link found."}

        print("✅ Latest playlist link fetched:", result["playlist_link"])
        return {"playlist_link": result["playlist_link"]}

    except Exception as e:
        print("❌ Error fetching playlist link:", e)
        return {"error": f"Error fetching playlist link: {str(e)}"}

# @app.post("/api/submit")
# async def submit_data(
#     answers: str = Form(None),
#     image: UploadFile = File(None),
# name: str = Form(None),
# email: str = Form(None),
# picture: str = Form(None),
# auth0_id: str = Form(None)
# ):
#     try:
#         print("📩 Incoming POST request")

     

#         # ✅ CASE 1: Basic User Info Only
#         if all([name, email, picture, auth0_id]) and not answers and not image:
#             print("📌 Storing only user info")

#             insert_user_query = """
#                 INSERT INTO mood_detection (email, name, picture, auth0_id)
#                 VALUES (%s, %s, %s, %s)
#                 ON CONFLICT (email) DO NOTHING
#                 RETURNING *;
#             """
#             cursor.execute(insert_user_query, (email, name, picture, auth0_id))
#             user_row = cursor.fetchone()
#             conn.commit()

#             return {"message": "User info stored", "user": user_row}

#         # ✅ CASE 2: Full submission with answers + image
#         if answers and image:
#             print("📌 Full submission with answers and image")

#             try:
#                 parsed_answers = json.loads(answers)
#             except json.JSONDecodeError as e:
#                 print("❌ JSON parse error:", e)
#                 return {"error": "Invalid JSON in 'answers'"}

#             ans_1 = parsed_answers.get("How has your day been so far?")
#             ans_2 = parsed_answers.get("What's the one emoji that best describes your mood?")
#             ans_3 = parsed_answers.get("What's your current mindset like?")
#             language = parsed_answers.get("What is your preferred language for songs?")
#             combined_text = f"{ans_1} {ans_2} {ans_3} {language}"

#             # Save uploaded image to local disk
#             UPLOAD_FOLDER = "uploads"
#             os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#             file_ext = os.path.splitext(image.filename)[-1]
#             filename = f"webcam_{uuid4().hex}{file_ext}"
#             image_path = os.path.abspath(os.path.join(UPLOAD_FOLDER, filename))

#             with open(image_path, "wb") as f:
#                 content = await image.read()
#                 f.write(content)

#             # Send data to prediction API
#             async with httpx.AsyncClient() as client:
#                 response = await client.post("http://127.0.0.1:9000/predict/", data={
#                     "email": email,
#                     "text": combined_text,
#                     "image_path": image_path
#                 })

#                 if response.status_code != 200:
#                     print(f"Response Code: {response.status_code}")
#                     print(f"Response Content: {response.text}")
#                     return {"error": "Error from prediction API"}

#                 prediction_data = response.json()

#             # Insert or update full data in database
#             insert_full_query = """
#                 INSERT INTO mood_detection
#                 (email, name, picture, auth0_id, ans_1, ans_2, ans_3, language, captured_image)
#                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
#                 ON CONFLICT (email) DO UPDATE SET
#                     name = EXCLUDED.name,
#                     picture = EXCLUDED.picture,
#                     auth0_id = EXCLUDED.auth0_id,
#                     ans_1 = EXCLUDED.ans_1,
#                     ans_2 = EXCLUDED.ans_2,
#                     ans_3 = EXCLUDED.ans_3,
#                     language = EXCLUDED.language,
#                     captured_image = EXCLUDED.captured_image
#                 RETURNING *;
#             """
#             values = (email, name, picture, auth0_id, ans_1, ans_2, ans_3, language, image_path)

#             cursor.execute(insert_full_query, values)
#             final_row = cursor.fetchone()
#             conn.commit()

#             return {"message": "Full submission stored", "db_entry": final_row}

#         # ❗ If request doesn't match either of the two cases
#         return {"error": "Invalid input: expected either user info or full submission"}

#     except Exception as e:
#         print("❌ Exception occurred:", str(e))
#         return {"error": f"Unexpected error: {str(e)}"}

#     finally:
#         try:
#             cursor.close()
#             conn.close()
#         except:
#             pass  # Safe close




    
# @app.get("/api/user-emotions/{email}")
# def get_user_emotions(email: str):
    try:
        print("🔄 Starting process to fetch user emotions...")
        
        query = """
            SELECT 
                song_1_name, song_1_link, song_1_image,
                song_2_name, song_2_link, song_2_image,
                song_3_name, song_3_link, song_3_image,
                song_4_name, song_4_link, song_4_image,
                song_5_name, song_5_link, song_5_image,
                playlist_name, playlist_link, playlist_image
            FROM user_emotions
            WHERE email = %s
            ORDER BY timestamp DESC
            LIMIT 1;
        """
        
        print("✅ SQL query prepared.")
        
        cursor.execute(query, (email,))
        print("✅ Query executed.")

        row = cursor.fetchone()
        print("✅ Data fetched from DB.")
        print("🔎 Row content:", row)
        print("🔎 Row length:", len(row))
        

        if not row:
            print("⚠️ No data found for this email.")
            return {"message": "No data found for this email."}

        print("✅ Formatting response...")
        
        response = {
        "songs": [
            {
                "name": row["song_1_name"],
                "link": row["song_1_link"],
                "image": row["song_1_image"]
            },
            {
                "name": row["song_2_name"],
                "link": row["song_2_link"],
                "image": row["song_2_image"]
            },
            {
                "name": row["song_3_name"],
                "link": row["song_3_link"],
                "image": row["song_3_image"]
            },
            {
                "name": row["song_4_name"],
                "link": row["song_4_link"],
                "image": row["song_4_image"]
            },
            {
                "name": row["song_5_name"],
                "link": row["song_5_link"],
                "image": row["song_5_image"]
            }
        ],
        "playlist": {
            "name": row["playlist_name"],
            "link": row["playlist_link"],
            "image": row["playlist_image"]
        }
    }


        print("✅ Response ready.",response)
        return response

    except Exception as e:
        print("❌ Exception occurred:", e)
        conn.rollback()
        return {"error": f"Error fetching user emotions: {str(e)}"}
@app.get("/api/user-emotions/{email}")
def get_user_emotions(email: str):
    try:
        print("🔄 Starting process to fetch user emotions...")

        query = """
            SELECT 
                song_1_name, song_1_link, song_1_image,
                song_2_name, song_2_link, song_2_image,
                song_3_name, song_3_link, song_3_image,
                song_4_name, song_4_link, song_4_image,
                song_5_name, song_5_link, song_5_image,
                playlist_name, playlist_link, playlist_image,
                text_emotion
            FROM user_emotions
            WHERE email = %s
            ORDER BY timestamp DESC
            LIMIT 1;
        """

        print("✅ SQL query prepared.")
        cursor.execute(query, (email,))
        print("✅ Query executed.")

        row = cursor.fetchone()
        print("✅ Data fetched from DB.")
        print("🔎 Row content:", row)
        print("🔎 Row length:", len(row))

        if not row:
            print("⚠️ No data found for this email.")
            return {"message": "No data found for this email."}

        print("✅ Formatting response...")

        response = {
           "songs": [
            {
                "name": row["song_1_name"],
                "link": row["song_1_link"],
                "image": row["song_1_image"]
            },
            {
                "name": row["song_2_name"],
                "link": row["song_2_link"],
                "image": row["song_2_image"]
            },
            {
                "name": row["song_3_name"],
                "link": row["song_3_link"],
                "image": row["song_3_image"]
            },
            {
                "name": row["song_4_name"],
                "link": row["song_4_link"],
                "image": row["song_4_image"]
            },
            {
                "name": row["song_5_name"],
                "link": row["song_5_link"],
                "image": row["song_5_image"]
            }
        ],
        "playlist": {
            "name": row["playlist_name"],
            "link": row["playlist_link"],
            "image": row["playlist_image"]
        },
            "text_emotion": row["text_emotion"]  # ✅ Include text emotion here
        }

        print("✅ Response ready.", response)
        return response

    except Exception as e:
        print("❌ Exception occurred:", e)
        conn.rollback()
        return {"error": f"Error fetching user emotions: {str(e)}"}
    

@app.get("/api/last-playlist-link")
def get_last_playlist_link():
    try:
        print("🎵 Fetching latest playlist link...")
        cursor.execute("""
            SELECT playlist_link 
            FROM user_emotions 
            ORDER BY timestamp DESC 
            LIMIT 1;
        """)
        result = cursor.fetchone()

        if not result:
            print("⚠ No playlist link found.")
            return {"message": "No playlist link found."}

        print("✅ Latest playlist link fetched:", result["playlist_link"])
        return {"playlist_link": result["playlist_link"]}

    except Exception as e:
        print("❌ Error fetching playlist link:", e)
        return {"error": f"Error fetching playlist link: {str(e)}"}

import re

def parse_duration(duration_str):
    """Convert 'MM:SS' string to total seconds. Returns 0 if invalid."""
    if not duration_str or not re.match(r'^\d+:\d+$', duration_str):
        return 0
    minutes, seconds = map(int, duration_str.split(":"))
    return minutes * 60 + seconds

def format_seconds_to_hhmmss(total_seconds):
    """Convert seconds to 'HH:MM:SS' format."""
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

@app.get("/api/song-durations-summary/{email}")
def get_song_durations_summary(email: str):
    try:
        print(f"🔍 Fetching song durations for user: {email}")

        # 1. Fetch all song durations
        cursor.execute("""
            SELECT 
                song_1_duration, song_2_duration, song_3_duration, 
                song_4_duration, song_5_duration
            FROM user_emotions
            WHERE email = %s;
        """, (email,))
        all_entries = cursor.fetchall()

        total_duration_all = 0
        for row in all_entries:
            durations = [parse_duration(row[col]) for col in row]
            total_duration_all += sum(durations)

        print(f"🎧 Total duration from ALL entries: {total_duration_all} seconds")

        # 2. Fetch last entry durations
        cursor.execute("""
            SELECT 
                song_1_duration, song_2_duration, song_3_duration, 
                song_4_duration, song_5_duration
            FROM user_emotions
            WHERE email = %s
            ORDER BY timestamp DESC
            LIMIT 1;
        """, (email,))
        latest = cursor.fetchone()
        total_duration_last = sum([parse_duration(latest[col]) for col in latest]) if latest else 0

        print(f"🎶 Total duration from LAST entry: {total_duration_last} seconds")

        return {
            "email": email,
            "total_duration_all_entries": {
                "seconds": total_duration_all,
                "formatted": format_seconds_to_hhmmss(total_duration_all)
            },
            "total_duration_last_entry": {
                "seconds": total_duration_last,
                "formatted": format_seconds_to_hhmmss(total_duration_last)
            }
        }

    except Exception as e:
        print("❌ Error:", e)
        conn.rollback()
        return {"error": f"Error fetching durations: {str(e)}"}

@app.get("/api/last-songs-with-durations/{email}")
def get_last_songs_with_durations(email: str):
    try:
        print(f"🎵 Fetching last songs & durations for user: {email}")

        # Updated query with corrected column names
        cursor.execute("""
            SELECT 
                song_1_name, song_2_name, song_3_name, song_4_name, song_5_name,
                song_1_duration, song_2_duration, song_3_duration, song_4_duration, song_5_duration
            FROM user_emotions
            WHERE email = %s
            ORDER BY timestamp DESC
            LIMIT 1;
        """, (email,))

        last_entry = cursor.fetchone()
        if not last_entry:
            return {
                "email": email,
                "songs": [],
                "message": "No data found."
            }

        # Extract song names and durations with updated keys
        song_names = [
            last_entry["song_1_name"], last_entry["song_2_name"], last_entry["song_3_name"],
            last_entry["song_4_name"], last_entry["song_5_name"]
        ]

        song_durations = [
            last_entry["song_1_duration"], last_entry["song_2_duration"], last_entry["song_3_duration"],
            last_entry["song_4_duration"], last_entry["song_5_duration"]
        ]

        # Combine names and durations
        songs_with_durations = [
            {"name": name, "duration": duration}
            for name, duration in zip(song_names, song_durations)
        ]

        print(f"✅ Songs with durations: {songs_with_durations}")
        return {
            "email": email,
            "songs": songs_with_durations
        }

    except Exception as e:
        print("❌ Error:", e)
        conn.rollback()
        return {"error": f"Error fetching last songs with durations: {str(e)}"}


from collections import Counter

@app.get("/api/emotions/{email}")
def get_all_final_emotions(email: str):
    try:
        print(f"🔍 Fetching final_emotion values for user: {email}")

        cursor.execute("""
            SELECT final_emotion 
            FROM user_emotions 
            WHERE email = %s
            ORDER BY timestamp ASC;
        """, (email,))

        rows = cursor.fetchall()
        #print(f"🧾 Raw rows from DB: {rows}")

        final_emotions = [row["final_emotion"] for row in rows if row["final_emotion"] is not None]
        #print(f"✅ Final emotions extracted: {final_emotions}")

        # ✅ Count occurrences of each emotion
        emotion_counts = dict(Counter(final_emotions))
        print(f"📊 Emotion counts: {emotion_counts}")

        return {
            "email": email,
            "final_emotions": final_emotions,
            "emotion_counts": emotion_counts
        }

    except Exception as e:
        print("❌ Error fetching emotions:", e)
        conn.rollback()
        return {"error": f"Error fetching emotions: {str(e)}"}


@app.get("/api/weekly-listening-minutes/{email}")
def get_weekly_listening_time(email: str):
    try:
        print(f"📈 Fetching weekly listening time for {email}...")

        query = """
            SELECT 
                TO_CHAR(timestamp, 'Dy') AS day,
                SUM( 
                    COALESCE(split_part(song_1_duration, ':', 1)::int * 60 + split_part(song_1_duration, ':', 2)::int, 0) +
                    COALESCE(split_part(song_2_duration, ':', 1)::int * 60 + split_part(song_2_duration, ':', 2)::int, 0) +
                    COALESCE(split_part(song_3_duration, ':', 1)::int * 60 + split_part(song_3_duration, ':', 2)::int, 0) +
                    COALESCE(split_part(song_4_duration, ':', 1)::int * 60 + split_part(song_4_duration, ':', 2)::int, 0) +
                    COALESCE(split_part(song_5_duration, ':', 1)::int * 60 + split_part(song_5_duration, ':', 2)::int, 0)
                ) / 60.0 AS minutes
            FROM user_emotions
            WHERE email = %s
              AND timestamp >= CURRENT_DATE - INTERVAL '6 days'
            GROUP BY day
            ORDER BY MIN(timestamp);
        """

        cursor.execute(query, (email,))
        rows = cursor.fetchall()

        # ✅ Convert DB result to dict { "Mon": minutes, ... }
        data_map = {row["day"]: round(row["minutes"], 2) for row in rows}

        # ✅ Define all 7 days (ensure consistent order for graph)
        week_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        result = [{"day": day, "minutes": data_map.get(day, 0)} for day in week_days]

        print("✅ Final weekly data with padding:", result)
        return result

    except Exception as e:
        print("❌ Error fetching weekly listening time:", e)
        conn.rollback()
        return {"error": f"Error fetching weekly listening time: {str(e)}"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

