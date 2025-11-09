from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)

    def do_GET(self):
        if self.path.endswith('.js'):
            # Explicitly set content type for JavaScript files
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Serve the JavaScript file
            with open('.' + self.path, 'rb') as f:
                self.wfile.write(f.read())
            return
        
        # For non-JS files or when file doesn't exist
        if os.path.exists('.' + self.path) and os.path.isfile('.' + self.path):
            return super().do_GET()
        else:
            # Serve index.html for SPA routing
            self.path = '/index.html'
            return super().do_GET()

if __name__ == '__main__':
    server_address = ('', 3000)
    httpd = HTTPServer(server_address, SPAHandler)
    print('Server running on port 3000...')
    httpd.serve_forever()