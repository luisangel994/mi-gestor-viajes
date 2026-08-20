import sys
import os

# Añadir la carpeta del proyecto al PATH
project_folder = os.path.dirname(os.path.abspath(__file__))
if project_folder not in sys.path:
    sys.path.insert(0, project_folder)

from main import app
from a2wsgi import ASGIMiddleware

# Adaptador WSGI para PythonAnywhere
application = ASGIMiddleware(app)
