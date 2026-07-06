import os
import json
from pathlib import Path

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

# -------------------------------
# Local development
# -------------------------------
firebase_key_path = os.getenv("FIREBASE_KEY_PATH")

# -------------------------------
# Render deployment
# -------------------------------
firebase_credentials = os.getenv("FIREBASE_CREDENTIALS")

if firebase_credentials:
    cred_dict = json.loads(firebase_credentials)
    cred = credentials.Certificate(cred_dict)
else:
    key_path = BASE_DIR / firebase_key_path
    cred = credentials.Certificate(str(key_path))

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()