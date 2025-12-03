import os
from groq import Groq

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

def detect_ai_text(text):
    """
    Detect if the given text is AI-generated using Groq.
    """
    if not text:
        return "No text provided"
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are an AI detector. Analyze the text and respond with only 'AI' if it appears AI-generated, or 'Human' if it appears human-written."},
                {"role": "user", "content": text}
            ],
            max_tokens=10
        )
        result = response.choices[0].message.content.strip()
        return result if result in ['AI', 'Human'] else 'Unknown'
    except Exception as e:
        return f"Error: {str(e)}"

def summarize_text(text):
    """
    Summarize the given text using Groq.
    """
    if not text:
        return "No text to summarize"
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "Summarize the following text in a concise manner."},
                {"role": "user", "content": text}
            ],
            max_tokens=100
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {str(e)}"

def rewrite_text(text):
    """
    Rewrite the given text using Groq.
    """
    if not text:
        return "No text to rewrite"
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "Rewrite the following text in a different way, keeping the meaning intact."},
                {"role": "user", "content": text}
            ],
            max_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {str(e)}"