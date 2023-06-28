from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    rank = db.Column(db.Integer)

    checkins = db.relationship('CheckIn', backref='user')

    def __repr__(self):
        return f'<User: {self.name}>'

class Playground(db.Model):
    __tablename__ = 'playgrounds'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    checkins = db.relationship('CheckIn', backref='playground')

    def __repr__(self):
        return f'<Playground: {self.name}>'

class CheckIn(db.Model):
    __tablename__ = 'checkins'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    playground_id = db.Column(db.Integer, db.ForeignKey('playgrounds.id'))

    def __repr__(self):
        return f'<Checkin: {self.rating}>'
