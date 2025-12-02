from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import uuid

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    confirmed = db.Column(db.Boolean, default=False)
    confirmation_token = db.Column(db.String(100), unique=True)
    token_expires = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_confirmation_token(self):
        self.confirmation_token = str(uuid.uuid4())
        self.token_expires = datetime.utcnow() + timedelta(hours=24)
        return self.confirmation_token

    def confirm_token(self, token):
        if self.confirmation_token == token and self.token_expires > datetime.utcnow():
            self.confirmed = True
            self.confirmation_token = None
            self.token_expires = None
            return True
        return False

    def is_token_expired(self):
        return self.token_expires and self.token_expires < datetime.utcnow()