import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

client_id = "8f8d8c8d3df04f7aaea05ec10964fd9b"
client_secret = "ce2e00baeb9945de97a935906d5ceaa9"

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))

import psycopg2

conn = psycopg2.connect(
    dbname="mood",
    user="postgres",
    password="2002",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# 👉 Fetch only the last row (based on highest ID)
cursor.execute("SELECT id, song_1, song_2, song_3, song_4 FROM song_data ORDER BY id DESC LIMIT 1")
rows = cursor.fetchall()

def get_duration(song_name):
    try:
        result = sp.search(q=song_name, limit=1)
        if result['tracks']['items']:
            return result['tracks']['items'][0]['duration_ms']
        else:
            print(f"⚠️ No result for '{song_name}'")
            return None
    except Exception as e:
        print(f"❌ Error for '{song_name}':", e)
        return None

# 🔄 Only update the last row
for row in rows:
    id, s1, s2, s3, s4 = row
    print(f"\n🔍 Processing only the last row — ID {id}")

    d1 = get_duration(s1)
    d2 = get_duration(s2)
    d3 = get_duration(s3)
    d4 = get_duration(s4)

    cursor.execute("""
        UPDATE song_data SET 
            time_song_1 = %s,
            time_song_2 = %s,
            time_song_3 = %s,
            time_song_4 = %s
        WHERE id = %s
    """, (
        f'{d1 // 60000} minutes {d1 % 60000 // 1000} seconds' if d1 else None,
        f'{d2 // 60000} minutes {d2 % 60000 // 1000} seconds' if d2 else None,
        f'{d3 // 60000} minutes {d3 % 60000 // 1000} seconds' if d3 else None,
        f'{d4 // 60000} minutes {d4 % 60000 // 1000} seconds' if d4 else None,
        id
    ))

conn.commit()
print("\n✅ Last row song durations updated!")

cursor.close()
conn.close()
