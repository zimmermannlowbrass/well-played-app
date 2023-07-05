from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

# ADD VALIDATIONS TO BACK END

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-checkins.user')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    email =db.Column(db.String)
    password = db.Column(db.String)
    rank = db.Column(db.Integer)

    checkins = db.relationship('CheckIn', backref='user')

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            if '.' not in address:
                raise ValueError("Failed simple email validation")
        return address
    
    @validates('age', 'rank')
    def validate_integers(self, key, integer):
        if type(integer) != int:
            raise ValueError(f'{key} must be an integer.')
        if (key == 'rank'):
            if (integer < 1 or integer > 10):
                raise ValueError(f'{key} must be between 1 and 10.')
        return integer
    
    @validates('name')
    def validate_name(self, key, string):
        if (type(string) != str):
            raise ValueError(f'{key} must be a string.')
        return string
    
    @validates('password')
    def validate_password(self, key, password):
        if (len(password) < 8):
            raise ValueError('Passwords must be at least 8 characters in length.')
        if (password == password.lower()):
            raise ValueError('Passwords must have at least one uppercase letter.')
        if (password == password.upper()):
            raise ValueError('Passwords must have at least one lowercase letter.')
        has_digit = any(char.isdigit() for char in password)
        if not has_digit:
            raise ValueError('Password must contain at least one number.')
        return password
            

    def __repr__(self):
        return f'<User: {self.name}>'

class Playground(db.Model, SerializerMixin):
    __tablename__ = 'playgrounds'

    serialize_rules = ('-checkins.playground')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    neighborhood = db.Column(db.String)
    has_restroom = db.Column(db.Boolean)
    has_water_feature = db.Column(db.Boolean)

    checkins = db.relationship('CheckIn', backref='playground')

    @validates('name', 'neighborhood')
    def validate_name(self, key, string):
        if type(string) != str:
            raise ValueError(f'{key} must be a string.')
        return string
    
    @validates('image')
    def validate_image(self, key, url):
        if '.' not in url:
            raise ValueError('Must be a real URL.')
        return url
    
    @validates('has_restroom', 'has_water_feature')
    def validate_boolean(self, key, boolean):
        if (type(boolean) != bool):
            raise ValueError(f'{key} must be a True or a False.')
        return boolean

    def __repr__(self):
        return f'<Playground: {self.name}>'

class CheckIn(db.Model, SerializerMixin):
    __tablename__ = 'checkins'

    serialize_rules = ('-user.checkins', '-playground.checkins')

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    playground_id = db.Column(db.Integer, db.ForeignKey('playgrounds.id'))

    @validates('rating')
    def validate_integers(self, key, integer):
        if type(integer) != int:
            raise ValueError('Rating must be an integer.')
        if (integer < 1 or integer > 5):
            raise ValueError('Rating must be between 1 and 5.')
        return integer
    
    @validates('comment')
    def validate_length(self, key, string):
        if len(string) >= 250:
            raise ValueError("Post content must be less than or equal to 250 characters long.")
        return string
    def __repr__(self):
        return f'<Checkin: {self.rating}>'
