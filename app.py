import os
from flask import Flask

app = Flask(__name__, template_folder='templates', static_folder='static')

app.root_path = os.path.dirname(__file__)

from routes import *