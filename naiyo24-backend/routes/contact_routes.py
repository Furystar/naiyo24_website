from flask import Blueprint, request, jsonify
from models import db, ContactInquiry
from datetime import datetime
import re

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/api/contact', methods=['POST'])
def submit_contact_inquiry():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'service_interest', 'message']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate email format
        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Create new inquiry
        inquiry = ContactInquiry(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone', ''),
            service_interest=data['service_interest'],
            message=data['message']
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        # Prepare response data
        response_data = {
            'message': 'Contact inquiry submitted successfully!',
            'inquiry_id': inquiry.id,
            'submitted_at': inquiry.submitted_at.isoformat()
        }
        
        return jsonify(response_data), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@contact_bp.route('/api/contact/<int:inquiry_id>', methods=['GET'])
def get_contact_inquiry(inquiry_id):
    inquiry = ContactInquiry.query.get_or_404(inquiry_id)
    return jsonify({
        'id': inquiry.id,
        'name': inquiry.name,
        'email': inquiry.email,
        'phone': inquiry.phone,
        'service_interest': inquiry.service_interest,
        'message': inquiry.message,
        'submitted_at': inquiry.submitted_at.isoformat()
    })