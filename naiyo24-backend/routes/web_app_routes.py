from flask import Blueprint, request, jsonify
from models import db, WebAppInquiry
from datetime import datetime

web_app_bp = Blueprint('web_app', __name__)

@web_app_bp.route('/api/web-app', methods=['POST'])
def submit_web_app_inquiry():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'web_type', 'budget', 'timeline', 'requirements']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new inquiry
        inquiry = WebAppInquiry(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            company=data.get('company', ''),
            app_type=data['web_type'],
            budget=data['budget'],
            timeline=data['timeline'],
            requirements=data['requirements']
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        # Prepare response data
        response_data = {
            'message': 'Web application inquiry submitted successfully!',
            'inquiry_id': inquiry.id,
            'submitted_at': inquiry.submitted_at.isoformat()
        }
        
        return jsonify(response_data), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@web_app_bp.route('/api/web-app/<int:inquiry_id>', methods=['GET'])
def get_web_app_inquiry(inquiry_id):
    inquiry = WebAppInquiry.query.get_or_404(inquiry_id)
    return jsonify({
        'id': inquiry.id,
        'name': inquiry.name,
        'email': inquiry.email,
        'phone': inquiry.phone,
        'company': inquiry.company,
        'app_type': inquiry.app_type,
        'budget': inquiry.budget,
        'timeline': inquiry.timeline,
        'requirements': inquiry.requirements,
        'submitted_at': inquiry.submitted_at.isoformat()
    })