from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db
from routes.contact_routes import handle_contact_submission
from routes.web_routes import handle_web_submission
from routes.mobile_routes import handle_mobile_submission
from routes.desktop_routes import handle_desktop_submission

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    db.init_app(app)

    @app.route('/api/submit-contact', methods=['POST'])
    def submit_contact():
        data = request.get_json()
        try:
            submission_id = handle_contact_submission(data)
            return jsonify({
                'status': 'success',
                'submission_id': submission_id
            }), 201
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 400

    @app.route('/api/submit-web', methods=['POST'])
    def submit_web():
        data = request.get_json()
        try:
            submission_id = handle_web_submission(data)
            return jsonify({
                'status': 'success',
                'submission_id': submission_id
            }), 201
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 400

    @app.route('/api/submit-mobile', methods=['POST'])
    def submit_mobile():
        data = request.get_json()
        try:
            submission_id = handle_mobile_submission(data)
            return jsonify({
                'status': 'success',
                'submission_id': submission_id
            }), 201
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 400

    @app.route('/api/submit-desktop', methods=['POST'])
    def submit_desktop():
        data = request.get_json()
        try:
            submission_id = handle_desktop_submission(data)
            return jsonify({
                'status': 'success',
                'submission_id': submission_id
            }), 201
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 400

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)