# Merged Project Structure Plan

## Overview
Merge all files from the current `app` directory and the `api` directory into a single flat directory structure. The `api` directory contains only `app.py`, which is a Flask application similar to the existing `app.py` in the `app` directory. Resolve import issues by adjusting relative imports and paths to work within the single directory.

## Final Directory Structure
All files will reside in the root directory (formerly `app`). No subdirectories beyond standard ones like `templates` and `.github` (assuming "flat" means no unnecessary nesting, but keeping organizational subdirs).

- `__init__.py`
- `.env`
- `ai_functions.py`
- `app.py` (original Flask app, unchanged)
- `api_app.py` (renamed and adjusted from `../api/app.py`)
- `calculators.py`
- `.github/` (kept as subdirectory for GitHub Actions/workflows)
- `templates/` (kept as subdirectory for Flask templates)
  - `base.html`
  - `dashboard.html`
  - `index.html`
  - `instrumente.html`
  - `pricing.html`
  - `signup.html`

## File Renames/Merges
- Move `../api/app.py` to `./api_app.py` to avoid conflict with existing `app.py`.
- No other renames or merges needed, as there are no conflicting filenames.

## Adjusted Contents for Key Files

### `api_app.py` (formerly `../api/app.py`)
Adjust imports and paths to remove relative references, as all files are now in the same directory.

```python
from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv

# Removed: sys.path.insert and relative imports
from ai_functions import detect_ai_text, summarize_text, rewrite_text
from calculators import calculate

load_dotenv()  # Changed from load_dotenv('../app/.env')

app = Flask(__name__, template_folder='templates', static_folder='static')  # Changed from '../app/templates' and '../app/static'

# Routes remain the same (identical to app.py)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/instrumente')
def instrumente():
    return render_template('instrumente.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/api/detect_ai', methods=['POST'])
def detect_ai():
    data = request.get_json()
    text = data.get('text', '')
    result = detect_ai_text(text)
    return jsonify({'result': result})

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')
    result = summarize_text(text)
    return jsonify({'result': result})

@app.route('/api/rewrite', methods=['POST'])
def rewrite():
    data = request.get_json()
    text = data.get('text', '')
    result = rewrite_text(text)
    return jsonify({'result': result})

@app.route('/api/calculate', methods=['POST'])
def calculate_api():
    data = request.get_json()
    calc_type = data.get('type')
    params = data.get('params', {})
    result = calculate(calc_type, params)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)  # Added for standalone execution
```

### `app.py`
No changes needed, as it already uses correct relative paths within the directory.

## Running the Flask Apps
- `app.py`: Run with `python app.py` (serves on default port 5000).
- `api_app.py`: Run with `python api_app.py` (serves on default port 5000; may need to change port if running both simultaneously to avoid conflicts, e.g., add `app.run(debug=True, port=5001)`).

Both apps have identical routes, so if running both, ensure different ports or merge routes if intended to be combined.

## Additional Notes
- Ensure `.env` contains necessary environment variables.
- If `static` directory is needed, create it and add static files.
- Test imports and routes after merging to confirm no issues.