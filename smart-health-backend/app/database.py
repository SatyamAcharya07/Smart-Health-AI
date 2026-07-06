import os
from pathlib import Path

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore

# smart-health-backend/
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env
load_dotenv(BASE_DIR / ".env")

key_name = os.getenv("FIREBASE_KEY_PATH")


key_path = BASE_DIR / key_name

cred = credentials.Certificate(str(key_path))

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()