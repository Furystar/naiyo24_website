from flask import Blueprint, request, jsonify
from models import db, DesktopAppInquiry
from datetime import datetime

desktop_app_bp = Blueprint('desktop_app', __name__)

@desktop_app_bp.route('/api/desktop-app', methods=['POST'])
def submit_desktop_app_inquiry():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'app_type', 'platforms', 'budget', 'requirements']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new inquiry
        inquiry = DesktopAppInquiry(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            company=data.get('company', ''),
            app_type=data['app_type'],
            platforms=data['platforms'],
            budget=data['budget'],
            requirements=data['requirements']
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        # Prepare response data
        response_data = {
            'message': 'Desktop app inquiry submitted successfully!',
            'inquiry_id': inquiry.id,
            'submitted_at': inquiry.submitted_at.isoformat()
        }
        
        return jsonify(response_data), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@desktop_app_bp.route('/api/desktop-app/<int:inquiry_id>', methods=['GET'])
def get_desktop_app_inquiry(inquiry_id):
    inquiry = DesktopAppInquiry.query.get_or_404(inquiry_id)
    return jsonify({
        'id': inquiry.id,
        'name': inquiry.name,
        'email': inquiry.email,
        'phone': inquiry.phone,
        'company': inquiry.company,
        'app_type': inquiry.app_type,
        'platforms': inquiry.platforms,
        'budget': inquiry.budget,
        'requirements': inquiry.requirements,
        'submitted_at': inquiry.submitted_at.isoformat()
    })