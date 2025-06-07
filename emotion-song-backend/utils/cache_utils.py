# utils/cache_utils.py

import json
from utils.redis_client import redis_client

def get_cached_data(key: str):
    cached_value = redis_client.get(key)
    if cached_value:
        try:
            return json.loads(cached_value)
        except json.JSONDecodeError:
            return None
    return None

def set_cached_data(key: str, value, expire_seconds=300):
    redis_client.setex(key, expire_seconds, json.dumps(value))
