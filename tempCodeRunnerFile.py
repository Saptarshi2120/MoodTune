@app.post("/predict/")
async def predict_all(email: str = Form(...), text: str = Form(...), image_path: str = Form(...)):
    db = SessionLocal()  # Initialize your DB session
    print("🔄 Database session started.")

    try:
        # Step 1: Handle image processing
        print(f"📂 Received image path: {image_path}")
        with open(image_path, "rb") as f:
            image_bytes = f.read()

        SAVE_FOLDER = "predict_uploads"
        os.makedirs(SAVE_FOLDER, exist_ok=True)
        save_path = os.path.join(SAVE_FOLDER, os.path.basename(image_path))
        print(f"📁 Saving image to: {save_path}")

        with open(image_path, "rb") as src_file, open(save_path, "wb") as dst_file:
            image_bytes = src_file.read()
            dst_file.write(image_bytes)

        print("✅ Image successfully saved.")

        # Step 2: Load and process image
        with open(save_path, "rb") as f:
            processed_image_bytes = f.read()

        # Step 3: Predict emotion from image
        print("🔍 Predicting emotion from image...")
        img_emotion, img_confidence = predict_image_emotion(processed_image_bytes)
        print(f"🖼️ Image Emotion: {img_emotion} ({img_confidence}%)")

        # Step 4: Predict emotion from text
        print("🧠 Predicting emotion from text...")
        text_result = text_classifier(text)[0]
        text_emotion = text_result['label'].lower()
        text_confidence = round(text_result['score'] * 100, 2)
        print(f"📝 Text Emotion: {text_emotion} ({text_confidence}%)")

        # Step 5: Decide final emotion
        final_emotion = text_emotion if text_confidence >= img_confidence else img_emotion
        print(f"🎯 Final Emotion: {final_emotion}")

        # Step 6: Spotify Search for Songs
        query = generate_spotify_search_query(final_emotion)
        spotify = get_spotify_client()
        print(f"🎵 Searching Spotify for emotion: {final_emotion} → Query: {query}")
        search_results = spotify.search(q=query, type="track", limit=5)
        tracks = search_results.get('tracks', {}).get('items', [])

        # Step 7: Format songs
        songs = [{
            "name": t.get("name"),
            "artist": t["artists"][0].get("name"),
            "url": t.get("external_urls", {}).get("spotify"),
            "album_image": t.get("album", {}).get("images", [{}])[0].get("url"),
            "duration": format_duration(t.get("duration_ms", 0))
        } for t in tracks]
        print(f"🎧 Top 5 Songs Found: {[s['name'] for s in songs]}")

        # Step 8: Search for Playlist
        playlist_search = spotify.search(q=f"{query} playlist", type="playlist", limit=1)
        playlists = playlist_search.get('playlists', {}).get('items', [])
        playlist = None
        if playlists:
            p = playlists[0]
            playlist = {
                "name": p.get("name"),
                "url": p.get("external_urls", {}).get("spotify"),
                "image": p.get("images", [{}])[0].get("url")
            }
            print(f"📚 Playlist Found: {playlist['name']}")
        else:
            print("📚 No playlist found.")

        # Step 9: Save to database
        print("💾 Saving prediction result to the database...")
        entry = UserEmotion(
            email=email,
            combined_text=text,
            text_emotion=text_emotion,
            image_emotion=img_emotion,
            final_emotion=final_emotion,
            song_1_name=songs[0].get("name"),
            song_1_artist=songs[0].get("artist"),
            song_1_link=songs[0].get("url"),
            song_1_duration=songs[0].get("duration"),
            song_1_image=songs[0].get("album_image"),
            song_2_name=songs[1].get("name"),
            song_2_artist=songs[1].get("artist"),
            song_2_link=songs[1].get("url"),
            song_2_duration=songs[1].get("duration"),
            song_2_image=songs[1].get("album_image"),
            song_3_name=songs[2].get("name"),
            song_3_artist=songs[2].get("artist"),
            song_3_link=songs[2].get("url"),
            song_3_duration=songs[2].get("duration"),
            song_3_image=songs[2].get("album_image"),
            song_4_name=songs[3].get("name"),
            song_4_artist=songs[3].get("artist"),
            song_4_link=songs[3].get("url"),
            song_4_duration=songs[3].get("duration"),
            song_4_image=songs[3].get("album_image"),
            song_5_name=songs[4].get("name"),
            song_5_artist=songs[4].get("artist"),
            song_5_link=songs[4].get("url"),
            song_5_duration=songs[4].get("duration"),
            song_5_image=songs[4].get("album_image"),
            playlist_name=playlist.get("name") if playlist else None,
            playlist_link=playlist.get("url") if playlist else None,
            playlist_image=playlist.get("image") if playlist else None
        )

        db.add(entry)
        db.commit()
        db.refresh(entry)
        print("✅ Data saved to DB successfully.")

        return {
            "status": "success",
            "final_emotion": final_emotion,
            "songs": songs,
            "playlist": playlist
        }

    except Exception as e:
        db.rollback()
        print(f"❌ Error: {str(e)}")
        return JSONResponse(status_code=500, content={"message": f"Error: {str(e)}"})
    finally:
        db.close()
        print("🔚 Database session closed.")