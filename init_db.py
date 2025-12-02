#!/usr/bin/env python3
"""
Database initialization script for Humanize
Run this script to create the database tables
"""

from app import app, db

def init_database():
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("Database initialized successfully!")

if __name__ == "__main__":
    init_database()