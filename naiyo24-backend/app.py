from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db
from routes.web_dev_routes import web_dev_bp
from routes.mobile_app_routes import mobile_app_bp
from routes.web_app_routes import web_app_bp
from routes.desktop_app_routes import desktop_app_bp
from routes.contact_routes import contact_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for all routes
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost", "http://127.0.0.1:5500"],  # Add your frontend domains
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(web_dev_bp)
    app.register_blueprint(mobile_app_bp)
    app.register_blueprint(web_app_bp)
    app.register_blueprint(desktop_app_bp)
    app.register_blueprint(contact_bp)
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy'}), 200
    
    # Error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad request'}), 400
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
        
    app.run(debug=True)