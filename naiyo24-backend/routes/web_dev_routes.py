from flask import Blueprint, request, jsonify
from models import db, WebDevelopmentInquiry
from datetime import datetime

web_dev_bp = Blueprint('web_dev', __name__)

@web_dev_bp.route('/api/web-development', methods=['POST'])
def submit_web_dev_inquiry():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'service_type', 'budget', 'timeline', 'requirements']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new inquiry
        inquiry = WebDevelopmentInquiry(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            company=data.get('company', ''),
            service_type=data['service_type'],
            budget=data['budget'],
            timeline=data['timeline'],
            requirements=data['requirements']
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        # Prepare response data
        response_data = {
            'message': 'Web development inquiry submitted successfully!',
            'inquiry_id': inquiry.id,
            'submitted_at': inquiry.submitted_at.isoformat()
        }
        
        return jsonify(response_data), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@web_dev_bp.route('/api/web-development/<int:inquiry_id>', methods=['GET'])
def get_web_dev_inquiry(inquiry_id):
    inquiry = WebDevelopmentInquiry.query.get_or_404(inquiry_id)
    return jsonify({
        'id': inquiry.id,
        'name': inquiry.name,
        'email': inquiry.email,
        'phone': inquiry.phone,
        'company': inquiry.company,
        'service_type': inquiry.service_type,
        'budget': inquiry.budget,
        'timeline': inquiry.timeline,
        'requirements': inquiry.requirements,
        'submitted_at': inquiry.submitted_at.isoformat()
    })