import sys
import os

# Add backend directory to path so `app` package resolves correctly
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.main import app  # noqa: F401 — Vercel picks up `app` as the ASGI handler
