from flask import url_for
from flask_mail import Message
from app import mail
import os

def send_confirmation_email(user):
    """Send email confirmation to user"""
    token = user.generate_confirmation_token()

    confirm_url = url_for('confirm_email', token=token, _external=True)

    html = f"""
    <html>
    <body>
        <h2>Welcome to Humanize!</h2>
        <p>Hi {user.name},</p>
        <p>Thank you for signing up for Humanize. To complete your registration, please click the link below to confirm your email address:</p>
        <p><a href="{confirm_url}" style="background-color: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Your Account</a></p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
        <br>
        <p>Best regards,<br>The Humanize Team</p>
    </body>
    </html>
    """

    text = f"""
    Welcome to Humanize!

    Hi {user.name},

    Thank you for signing up for Humanize. To complete your registration, please visit the following link to confirm your email address:

    {confirm_url}

    If you didn't create an account, you can safely ignore this email.

    This link will expire in 24 hours.

    Best regards,
    The Humanize Team
    """

    msg = Message(
        subject='Confirm Your Humanize Account',
        recipients=[user.email],
        html=html,
        body=text
    )

    try:
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False