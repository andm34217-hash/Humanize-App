def detect_ai_text(text):
    # Placeholder: simple heuristic
    if 'artificial intelligence' in text.lower() or 'ai' in text.lower():
        return 'AI-generated'
    else:
        return 'Human-written'

def summarize_text(text):
    # Placeholder: return first 100 chars as summary
    return f"Summary: {text[:100]}..."

def rewrite_text(text):
    # Placeholder: reverse the text
    return f"Rewritten: {text[::-1]}"