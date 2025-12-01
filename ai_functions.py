import requests
import os

# Set your Groq API key
GROQ_API_KEY = os.getenv('GROQ_API_KEY')

def call_groq(prompt):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [{"role": "user", "content": prompt}]
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code} - {response.text}"

def detect_ai(text):
    prompt = f"Estimate the percentage (0-100) that this text was written by a human. Return only the number. Text: {text}"
    result = call_groq(prompt)
    try:
        percentage = int(result.strip())
        return {"percentage": percentage}
    except:
        return {"error": "Unable to detect human percentage"}

def summarize_text(text):
    prompt = f"Summarize the following text in a concise way: {text}"
    summary = call_groq(prompt)
    return {"summary": summary}

def rewrite_text(text):
    prompt = f"Rewrite the following text in a more natural, human-like way: {text}"
    rewritten = call_groq(prompt)
    return {"rewritten": rewritten}