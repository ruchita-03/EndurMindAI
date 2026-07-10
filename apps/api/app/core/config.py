from dotenv import load_dotenv
import os

load_dotenv()

APP_NAME = os.getenv("APP_NAME")

DATABASE_URL = os.getenv("DATABASE_URL")

UPLOAD_DIR = os.getenv("UPLOAD_DIR")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")