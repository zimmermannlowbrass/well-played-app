from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!

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

    def __repr__(self):
        return f'<User: {self.name}>'

class Playground(db.Model, SerializerMixin):
    __tablename__ = 'playgrounds'

    serialize_rules = ('-checkins.playground')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    neighborhood = db.Column(db.String)
    has_restroom = db.Column(db.Boolean)
    has_water_feature = db.Column(db.Boolean)

    checkins = db.relationship('CheckIn', backref='playground')

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

    def __repr__(self):
        return f'<Checkin: {self.rating}>'
