from models import db, MobileForm

def handle_mobile_submission(data):
    new_form = MobileForm(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        platform=data['platform'],
        app_type=data['app_type'],
        features=data.get('features'),
        budget=data['budget'],
        timeline=data['timeline']
    )
    db.session.add(new_form)
    db.session.commit()
    return new_form.id