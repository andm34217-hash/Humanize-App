import sys
import os

# Add the parent directory to the path so we can import the app
parent_dir = os.path.join(os.path.dirname(__file__), '..')
sys.path.insert(0, parent_dir)

from app import app

# Vercel expects the app to be named 'app'
application = app