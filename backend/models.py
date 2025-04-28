from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class FormSubmission(db.Model):
    """Base model for common fields"""
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    submission_date = db.Column(db.DateTime, default=datetime.utcnow)
    ip_address = db.Column(db.String(45))
    status = db.Column(db.String(20), default='new')

class ContactForm(FormSubmission):
    __tablename__ = 'contact_submissions'
    service_type = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)
    marketing_consent = db.Column(db.Boolean, default=False)

class WebDevForm(FormSubmission):
    __tablename__ = 'web_dev_submissions'
    company = db.Column(db.String(100))
    project_type = db.Column(db.String(50), nullable=False)  # ecommerce, corporate, etc.
    budget_range = db.Column(db.String(50), nullable=False)  # 10-25k, 25-50k, etc.
    timeline = db.Column(db.String(50), nullable=False)      # 1-3 months, 3-6 months
    requirements = db.Column(db.Text, nullable=False)
    reference_urls = db.Column(db.Text)  # comma-separated URLs

class MobileAppForm(FormSubmission):
    __tablename__ = 'mobile_app_submissions'
    platform = db.Column(db.String(50), nullable=False)  # ios, android, cross
    app_category = db.Column(db.String(50), nullable=False)  # business, game, etc.
    features = db.Column(db.Text)
    budget_range = db.Column(db.String(50), nullable=False)
    timeline = db.Column(db.String(50), nullable=False)
    has_design = db.Column(db.Boolean, default=False)

class DesktopAppForm(FormSubmission):
    __tablename__ = 'desktop_app_submissions'
    target_os = db.Column(db.String(50), nullable=False)  # windows, mac, linux, cross
    app_category = db.Column(db.String(50), nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    budget_range = db.Column(db.String(50), nullable=False)
    timeline = db.Column(db.String(50), nullable=False)
    integration_needs = db.Column(db.Text)  # APIs, databases, etc.