import sys
import os

# Add the parent directory to the path so we can import the app
sys.path.insert(0, os.path.dirname(__file__) + '/..')

from app import app

# Vercel expects the app to be named 'app'
application = app