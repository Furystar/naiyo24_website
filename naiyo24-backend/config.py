import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', '05d357d6c49caec218b67d41a80a029d54f915a037ac09ce5ac395911d920faf')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:admin@localhost/naiyo24_forms')
    SQLALCHEMY_TRACK_MODIFICATIONS = False