from models import db, DesktopForm

def handle_desktop_submission(data):
    new_form = DesktopForm(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        os_platform=data['os_platform'],
        app_category=data['app_category'],
        requirements=data['requirements'],
        budget=data['budget'],
        timeline=data['timeline']
    )
    db.session.add(new_form)
    db.session.commit()
    return new_form.id