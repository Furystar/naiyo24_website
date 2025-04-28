from models import db, Contact

def handle_contact_submission(data):
    new_contact = Contact(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        service_type=data['service_type'],
        message=data['message']
    )
    db.session.add(new_contact)
    db.session.commit()
    return new_contact.id   