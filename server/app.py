#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Playground, CheckIn

# Views go here!

class Home(Resource):

    def get(self):
        response_dict = {
            "message": "Welcome to Well Played!"
        }
        reponse = make_response(
            response_dict,
            200
        )
        return reponse
api.add_resource(Home, '/home')

@app.route('/')
def index():
    return "Welcome to the WellPlayed App!"

class Playgrounds(Resource):
    def get(self):
        playgrounds = []
        for playground in Playground.query.all():
            pg_dict = {
                "name": playground.name,
                "neighborhood": playground.neighborhood,
                "has_restroom": playground.has_restroom,
                "has_water_feature": playground.has_water_feature
            }
            playgrounds.append(pg_dict)
        response = make_response(
            jsonify(playgrounds),
            200
        )
        return response
api.add_resource(Playgrounds, '/playgrounds')

class Users(Resource):
    def get(self):
        users = []
        for user in User.query.all():
            user_dict = {
                "name": user.name,
                "rank": user.rank
            }
            users.append(user_dict)
        response = make_response(
            jsonify(users),
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        new_user = User(
                name=data.get("name"),
                rank=data.get("rank")
            )
        db.session.add(new_user)
        db.session.commit()
        user_dict = {
                "name": new_user.name,
                "rank": new_user.rank
            }
        response = make_response(
            jsonify(user_dict),
            201
        )
        return response

api.add_resource(Users, '/users')
    
class UserByID(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()

        user_dict = {
                "name": user.name,
                "rank": user.rank
            }
        response = make_response(
            jsonify(user_dict),
            200
        )
        return response
        
       
        
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        for attr in request.form:
            setattr(user, attr, request.form.get(attr))
        db.session.add(user)
        db.session.commit()
        user_dict = {
                "name": user.name,
                "rank": user.rank
            }
        response = make_response(
            jsonify(user_dict),
            200
        )
        return response

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        db.session.delete(user)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "User deleted."    
        }

        response = make_response(
            response_body,
            200
        )
        return response
        
api.add_resource(UserByID, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

 

# For some reason I get an AttributeError of 'Playground' object has no attribute when I use to_dict()
# 
# @app.route('/playgrounds/<int:id>')
# def playground_by_id(id):
#     playground = Playground.query.filter(Playground.id == id).first()
#     response = make_response(jsonify(playground.to_dict()), 200)
#     response.headers['Content-Type'] = 'application/json'
#     return response
