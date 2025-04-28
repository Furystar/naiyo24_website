from models import db, WebForm

def handle_web_submission(data):
    new_form = WebForm(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        company=data.get('company'),
        project_type=data['project_type'],
        budget=data['budget'],
        timeline=data['timeline'],
        requirements=data['requirements']
    )
    db.session.add(new_form)
    db.session.commit()
    return new_form.id