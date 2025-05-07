import psycopg2
from psycopg2.extras import RealDictCursor

try:
    conn = psycopg2.connect(
        host="localhost",
        database="emotion_db",
        user="postgres",
        password="1234",
        port=5432,
        cursor_factory=RealDictCursor
    )
    cursor = conn.cursor()
    print("🟢 Connected to PostgreSQL database.")
except Exception as e:
    print("🔴 Error connecting to the database:", e)
