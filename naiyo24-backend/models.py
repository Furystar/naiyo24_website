import inspect
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class WebDevelopmentInquiry(db.Model):
    __tablename__ = 'web_development_inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    company = db.Column(db.String(100))
    service_type = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.String(50), nullable=False)
    timeline = db.Column(db.String(50), nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

class MobileAppInquiry(db.Model):
    __tablename__ = 'mobile_app_inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    company = db.Column(db.String(100))
    app_type = db.Column(db.String(50), nullable=False)
    platforms = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.String(50), nullable=False)
    timeline = db.Column(db.String(50), nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'app_type': self.app_type,
            'platforms': self.platforms,
            'budget': self.budget,
            'timeline': self.timeline,
            'requirements': self.requirements,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }

class WebAppInquiry(db.Model):
    __tablename__ = 'web_app_inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    company = db.Column(db.String(100))
    app_type = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.String(50), nullable=False)
    timeline = db.Column(db.String(50), nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'app_type': self.app_type,
            'budget': self.budget,
            'timeline': self.timeline,
            'requirements': self.requirements,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }

class DesktopAppInquiry(db.Model):
    __tablename__ = 'desktop_app_inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    company = db.Column(db.String(100))
    app_type = db.Column(db.String(50), nullable=False)
    platforms = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.String(50), nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'app_type': self.app_type,
            'platforms': self.platforms,
            'budget': self.budget,
            'requirements': self.requirements,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }

class ContactInquiry(db.Model):
    __tablename__ = 'contact_inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    service_interest = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'service_interest': self.service_interest,
            'message': self.message,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }