# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import psycopg2
# from psycopg2 import sql
# import os
# from dotenv import load_dotenv
# from datetime import datetime

# # Load environment variables
# load_dotenv()

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Database configuration
# DB_CONFIG = {
#     'dbname': os.getenv('DB_NAME', 'naiyo24'),
#     'user': os.getenv('DB_USER', 'postgres'),
#     'password': os.getenv('DB_PASSWORD', 'yourpassword'),
#     'host': os.getenv('DB_HOST', 'localhost'),
#     'port': os.getenv('DB_PORT', '5432')
# }

# # Service categories mapping
# SERVICE_CATEGORIES = {
#     'ecommerce': 'E-commerce Websites',
#     'corporate': 'Corporate Websites',
#     'news': 'News & Magazine',
#     'educational': 'Educational Websites',
#     'hospitality': 'Hospitality Websites',
#     'restaurant': 'Restaurant Websites',
#     'healthcare': 'Healthcare Websites',
#     'real-estate': 'Real Estate Websites',
#     'automotive': 'Automotive Websites',
#     'fashion': 'Fashion Websites',
#     'entertainment': 'Entertainment Websites',
#     'fitness': 'Fitness Websites',
#     'portfolio': 'Portfolio Websites',
#     'community': 'Community Websites',
#     'mobile': 'Mobile Apps',
#     'desktop': 'Desktop Apps',
#     'web': 'Web Applications',
#     'custom': 'Custom Software'
# }

# # Contact form service types
# CONTACT_SERVICES = {
#     'web': 'Website Development',
#     'app': 'Mobile App Development',
#     'marketing': 'Digital Marketing',
#     'other': 'Other'
# }

# def get_db_connection():
#     conn = psycopg2.connect(**DB_CONFIG)
#     return conn

# @app.route('/api/submit-service-request', methods=['POST'])
# def submit_service_request():
#     data = request.json
    
#     # Validate required fields
#     required_fields = ['service_type', 'name', 'email', 'phone', 'budget', 'timeline', 'requirements']
#     for field in required_fields:
#         if field not in data or not data[field]:
#             return jsonify({'error': f'Missing required field: {field}'}), 400
    
#     # Verify service type is valid
#     if data['service_type'] not in SERVICE_CATEGORIES:
#         return jsonify({'error': 'Invalid service type'}), 400
    
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor()
        
#         # Insert the service inquiry
#         query = sql.SQL("""
#             INSERT INTO service_inquiries (
#                 service_type, name, email, phone, company, 
#                 budget, timeline, requirements, ip_address, user_agent
#             ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#             RETURNING id, created_at
#         """)
        
#         cursor.execute(query, (
#             data['service_type'],
#             data['name'],
#             data['email'],
#             data['phone'],
#             data.get('company', ''),
#             data['budget'],
#             data['timeline'],
#             data['requirements'],
#             request.remote_addr,
#             request.headers.get('User-Agent', '')
#         ))
        
#         result = cursor.fetchone()
#         inquiry_id = result[0]
#         created_at = result[1]
#         conn.commit()
        
#         return jsonify({
#             'message': 'Service request submitted successfully',
#             'inquiry_id': inquiry_id,
#             'service_name': SERVICE_CATEGORIES[data['service_type']],
#             'created_at': created_at.isoformat()
#         }), 201
        
#     except Exception as e:
#         if 'conn' in locals():
#             conn.rollback()
#         return jsonify({'error': str(e)}), 500
#     finally:
#         if 'conn' in locals():
#             conn.close()

# @app.route('/api/submit-contact-form', methods=['POST'])
# def submit_contact_form():
#     data = request.json
    
#     # Validate required fields
#     required_fields = ['name', 'email', 'service_type', 'message']
#     for field in required_fields:
#         if field not in data or not data[field]:
#             return jsonify({'error': f'Missing required field: {field}'}), 400
    
#     # Verify service type is valid
#     if data['service_type'] not in CONTACT_SERVICES:
#         return jsonify({'error': 'Invalid service type'}), 400
    
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor()
        
#         # Insert the contact submission
#         query = sql.SQL("""
#             INSERT INTO contact_submissions (
#                 name, email, phone, service_type, message,
#                 ip_address, user_agent
#             ) VALUES (%s, %s, %s, %s, %s, %s, %s)
#             RETURNING id, created_at
#         """)
        
#         cursor.execute(query, (
#             data['name'],
#             data['email'],
#             data.get('phone', ''),
#             data['service_type'],
#             data['message'],
#             request.remote_addr,
#             request.headers.get('User-Agent', '')
#         ))
        
#         result = cursor.fetchone()
#         submission_id = result[0]
#         created_at = result[1]
#         conn.commit()
        
#         return jsonify({
#             'message': 'Contact form submitted successfully',
#             'submission_id': submission_id,
#             'service_name': CONTACT_SERVICES[data['service_type']],
#             'created_at': created_at.isoformat()
#         }), 201
        
#     except Exception as e:
#         if 'conn' in locals():
#             conn.rollback()
#         return jsonify({'error': str(e)}), 500
#     finally:
#         if 'conn' in locals():
#             conn.close()

# @app.route('/api/service-categories', methods=['GET'])
# def get_service_categories():
#     return jsonify(SERVICE_CATEGORIES)

# @app.route('/api/contact-services', methods=['GET'])
# def get_contact_services():
#     return jsonify(CONTACT_SERVICES)

# if __name__ == '__main__':
#     app.run(debug=True)