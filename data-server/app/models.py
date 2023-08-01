# app/models.py
from app import db

class WeatherData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<WeatherData {self.id}>'
