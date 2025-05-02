from flask import Blueprint, request, jsonify
from models import db, MobileAppInquiry
from datetime import datetime

mobile_app_bp = Blueprint('mobile_app', __name__)

@mobile_app_bp.route('/api/mobile-app', methods=['POST'])
def submit_mobile_app_inquiry():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'app_type', 'platforms', 'budget', 'timeline', 'requirements']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new inquiry
        inquiry = MobileAppInquiry(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            company=data.get('company', ''),
            app_type=data['app_type'],
            platforms=data['platforms'],
            budget=data['budget'],
            timeline=data['timeline'],
            requirements=data['requirements']
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        # Prepare response data
        response_data = {
            'message': 'Mobile app inquiry submitted successfully!',
            'inquiry_id': inquiry.id,
            'submitted_at': inquiry.submitted_at.isoformat()
        }
        
        return jsonify(response_data), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@mobile_app_bp.route('/api/mobile-app/<int:inquiry_id>', methods=['GET'])
def get_mobile_app_inquiry(inquiry_id):
    inquiry = MobileAppInquiry.query.get_or_404(inquiry_id)
    return jsonify({
        'id': inquiry.id,
        'name': inquiry.name,
        'email': inquiry.email,
        'phone': inquiry.phone,
        'company': inquiry.company,
        'app_type': inquiry.app_type,
        'platforms': inquiry.platforms,
        'budget': inquiry.budget,
        'timeline': inquiry.timeline,
        'requirements': inquiry.requirements,
        'submitted_at': inquiry.submitted_at.isoformat()
    })