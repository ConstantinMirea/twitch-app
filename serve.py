import http.server
import os
import mimetypes

PORT = 4200
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    
    def translate_path(self, path):
        # SPA fallback: always serve index.html for HTML requests
        if path != '/' and not os.path.exists(os.path.join(DIST_DIR, path.lstrip('/'))):
            path = '/index.html'
        return super().translate_path(path)

if __name__ == '__main__':
    os.chdir(DIST_DIR)
    with http.server.HTTPServer(('localhost', PORT), SPAHandler) as httpd:
        print(f'[OK] Dev server running at http://localhost:{PORT}')
        print(f'[OK] Serving from: {DIST_DIR}')
        httpd.serve_forever()