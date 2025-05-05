# routes/contact_routes.py
from flask import Blueprint, request, jsonify
from models import db, ContactInquiry

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
        
        return jsonify({
            'message': 'Contact inquiry submitted successfully!',
            'inquiry_id': inquiry.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500