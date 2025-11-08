import http.server
import socketserver
import os
from pathlib import Path

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.public_dir = Path('public').absolute()
        super().__init__(*args, **kwargs)

    def translate_path(self, path):
        """Override to serve from the public directory"""
        # Remove query parameters and decode
        path = path.split('?', 1)[0]
        path = path.split('#', 1)[0]
        
        # Convert to filesystem path
        path = Path(self.public_dir) / path.lstrip('/')
        
        # If path doesn't exist or is a directory, use index.html
        if not path.exists() or path.is_dir():
            path = self.public_dir / 'index.html'
            print(f"Serving index.html from {path}")
        
        return str(path)

    def do_GET(self):
        """Handle GET requests"""
        print(f"Requested path: {self.path}")
        try:
            super().do_GET()
        except Exception as e:
            print(f"Error serving {self.path}: {str(e)}")
            # If there's an error, try serving index.html
            self.path = '/index.html'
            super().do_GET()

def run_server():
    ports = [8000, 8080, 3000, 3001, 5000]
    
    for PORT in ports:
        try:
            Handler = SPAHandler
            with socketserver.TCPServer(("", PORT), Handler) as httpd:
                print(f"Server running at http://localhost:{PORT}")
                print("Press Ctrl+C to stop the server")
                httpd.serve_forever()
                break
        except OSError as e:
            if PORT == ports[-1]:
                print(f"Could not find an available port. Error: {e}")
                return
            print(f"Port {PORT} is in use, trying next port...")
            continue
        except KeyboardInterrupt:
            print("\nShutting down the server...")
            httpd.shutdown()
            break
        except Exception as e:
            print(f"Error: {e}")
            break

if __name__ == '__main__':
    run_server()