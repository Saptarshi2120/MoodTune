import cv2,time
import numpy as np
import torch
from PIL import Image
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from transformers import AutoModelForImageClassification, AutoImageProcessor, pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import torch.nn.functional as F
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import uvicorn
import io
import google.generativeai as genai
import os
# os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3" 

# Prevent object cleanup error
spotipy.Spotify.__del__ = lambda self: None
spotipy.oauth2.SpotifyAuthBase.__del__ = lambda self: None

# Spotify credentials
SPOTIFY_CLIENT_ID = "8f8d8c8d3df04f7aaea05ec10964fd9b"
SPOTIFY_CLIENT_SECRET = "ce2e00baeb9945de97a935906d5ceaa9"

# Configure Spotify
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET
))

# Gemini API setup
GEMINI_API_KEY = "AIzaSyCs84cKrL7QTIutVBHlmK4R9MIeP8wkrow"  # Replace with your actual Gemini key
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('gemini-1.5-flash')

# Load text emotion classifier
text_model_name = "michellejieli/emotion_text_classifier"
classifier = pipeline("text-classification", model=text_model_name)

# Load image emotion classifier
image_model_name = "dima806/facial_emotions_image_detection"
image_processor = AutoImageProcessor.from_pretrained(image_model_name, use_fast=True)
image_model = AutoModelForImageClassification.from_pretrained(image_model_name)

# hf_model_name = "google/flan-t5-small"
# hf_tokenizer = AutoTokenizer.from_pretrained(hf_model_name)
# hf_model = AutoModelForSeq2SeqLM.from_pretrained(hf_model_name)

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# image_model = image_model.to(device)
# hf_model = hf_model.to(device)

# Map emotion to fallback genre
emotion_to_genre = {
    "anger": "rock",
    "disgust": "metal",
    "fear": "ambient",
    "joy": "pop",
    "neutral": "classical",
    "sadness": "sad",
    "surprise": "rap"
}

app = FastAPI()

# Request models
class TextAnalysisRequest(BaseModel):
    text: str

class RecommendationRequest(BaseModel):
    text_emotion: str
    text_conf: float
    image_emotion: str
    image_conf: float

# Helper functions
# def generate_custom_search_prompt(emotion: str) -> str:
#     try:
#         prompt = (
#             f"Create a unique Spotify search query (song or playlist) for someone feeling '{emotion}'. "
#             f"Make it creative, short, and suitable for Spotify search."
#         )
#         inputs = hf_tokenizer(prompt, return_tensors="pt")
#         outputs = hf_model.generate(**inputs, max_new_tokens=30)
#         response = hf_tokenizer.decode(outputs[0], skip_special_tokens=True)
#         return response.strip().replace('"', '')
#     except Exception as e:
#         print(f"[HF Generation Error] {e}")
#         return emotion_to_genre.get(emotion.lower(), "classical")

def generate_custom_search_prompt(emotion: str) -> str:
    try:
        prompt = (
            f"Imagine you're helping someone who feels '{emotion}' find the perfect music on Spotify. "
            f"Write a short, natural search phrase they'd type—like a mix of mood and music style. "
            f"Just the search query. One line only. Keep it creative and real."
        )
        
        response = gemini_model.generate_content(prompt)

        if not response or not getattr(response, "text", None):
            raise ValueError("Gemini returned an empty or invalid response.")
        
        # Clean and return single-line query
        search_query = response.text.strip().replace('\n', ' ')
        return search_query

    except Exception as e:
        # Optional: log the error
        # print(f"[Gemini Generation Error] {e}")

        # Fallback default search queries
        default_queries = {
            "happy": "feel good pop hits",
            "sad": "songs to cry to",
            "angry": "intense rock anthems",
            "disgust": "gritty metal tracks",
            "relaxed": "soft acoustic chill",
            "excited": "party starter hits",
            "romantic": "romantic slow jams",
            "fear": "dark ambient soundscapes",
            "joy": "uplifting summer tunes",
            "neutral": "instrumental background",
            "surprise": "quirky indie beats",
            "bored": "lo-fi beats to study to",
            "sadness": "melancholic melodies",
        }
        
        return default_queries.get(emotion.lower(), "classical music")

    
def capture_image_bytes():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise Exception("Could not access webcam")
    ret, frame = cap.read()
    cap.release()
    if not ret:
        raise Exception("Failed to capture image")
    _, jpeg = cv2.imencode('.jpg', frame)
    return jpeg.tobytes()

def predict_emotions(image_bytes: bytes):
    result = {"Image Emotion": "No Emotion Detected", "Confidence": 0.0, "Error": None}
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        inputs = image_processor(img, return_tensors="pt")
        with torch.no_grad():
            outputs = image_model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        idx = logits.argmax(-1).item()
        emotion = image_model.config.id2label[idx].lower()
        confidence = probabilities[0, idx].item()
        result["Image Emotion"] = emotion
        result["Confidence"] = round(confidence * 100, 2)
    except Exception as e:
        result["Error"] = str(e)
    return result

# 1. Text analysis endpoint
@app.post("/text-analysis/")
async def analyze_text(request: TextAnalysisRequest):
    try:
        res = classifier(request.text)[0]
        return {"text_emotion": res["label"].lower(), "confidence": round(res["score"] * 100, 2)}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

# 2. Image analysis endpoint
@app.post("/image-analysis/")
async def analyze_image():
    try:
        img_bytes = capture_image_bytes()
        return predict_emotions(img_bytes)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

# 3. Recommendation endpoint
@app.post("/recommendation/")
async def get_recommendation(request: RecommendationRequest):
    try:
        if request.text_conf >= request.image_conf:
            final_emotion = request.text_emotion.lower()
            final_conf = request.text_conf
            source = "Text"
        else:
            final_emotion = request.image_emotion.lower()
            final_conf = request.image_conf
            source = "Image"

        query = generate_custom_search_prompt(final_emotion)
        print(query)
        tracks = sp.search(q=query, type="track", limit=5)["tracks"]["items"]
        songs = [{"name": t["name"], "artist": t["artists"][0]["name"], "url": t["external_urls"]["spotify"],
                  "album_image": t["album"]["images"][0]["url"] if t["album"]["images"] else None}
                 for t in tracks]
        pl = sp.search(q=f"{query} playlist", type="playlist", limit=1)["playlists"]["items"]
        playlist = None
        if pl:
            p = pl[0]
            playlist = {"name": p["name"], "url": p["external_urls"]["spotify"], "image": p["images"][0]["url"]}

        return {"final_emotion": {"label": final_emotion, "confidence": final_conf, "source": source},
                "query": query, "songs": songs, "playlist": playlist}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

# 4. Full pipeline endpoint
@app.post("/predict/")
async def predict_all(request: TextAnalysisRequest):
    try:
        # Text
        txt_res = classifier(request.text)[0]
        txt_em, txt_conf = txt_res["label"].lower(), round(txt_res["score"] * 100, 2)
        # Image
        img_bytes = capture_image_bytes()
        img_res = predict_emotions(img_bytes)
        img_em, img_conf = img_res["Image Emotion"], img_res["Confidence"]
        # Combine
        if txt_conf >= img_conf:
            final_em, final_conf, src = txt_em, txt_conf, "Text"
        else:
            final_em, final_conf, src = img_em, img_conf, "Image"
        query = generate_custom_search_prompt(final_em)
        tracks = sp.search(q=query, type="track", limit=5)["tracks"]["items"]
        songs = [{"name": t["name"], "artist": t["artists"][0]["name"], "url": t["external_urls"]["spotify"],
                  "album_image": t["album"]["images"][0]["url"] if t["album"]["images"] else None}
                 for t in tracks]
        pl = sp.search(q=f"{query} playlist", type="playlist", limit=1)["playlists"]["items"]
        playlist = None
        if pl:
            p = pl[0]
            playlist = {"name": p["name"], "url": p["external_urls"]["spotify"], "image": p["images"][0]["url"]}

        return JSONResponse({
            "text_emotion": {"label": txt_em, "confidence": txt_conf},
            "image_emotion": img_res,
            "final_emotion": {"label": final_em, "confidence": final_conf, "source": src},
            "songs": songs, "playlist": playlist
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run("appx:app", host="127.0.0.1", port=8000, reload=True)

