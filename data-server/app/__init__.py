from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# create the Flask app
app = Flask(__name__)

# configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

# create the database tables
from app.models import WeatherData
app.app_context().push()
db.create_all()

# import the routes
from app.routes import main_bp
app.register_blueprint(main_bp)