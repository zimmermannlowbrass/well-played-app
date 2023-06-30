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
api.add_resource(Home, '/')


class Playgrounds(Resource):
    def get(self):
        playgrounds = []
        for playground in Playground.query.all():
            pg_dict = {
                "id": playground.id,
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
                "id": user.id,
                "name": user.name,
                "age": user.age,
                "email": user.email,
                "password": user.password,
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
                age=data.get("age"),
                email=data.get("email"),
                password=data.get("password"),
                rank=data.get("rank")
            )
        db.session.add(new_user)
        db.session.commit()
        user_dict = {
                "name": new_user.name,
                "age": new_user.age,
                "email": new_user.email,
                "password": new_user.password,
                "rank": new_user.rank
            }
        response = make_response(
            jsonify(user_dict),
            201
        )
        return response
api.add_resource(Users, '/users')

class CheckIns(Resource):
    def get(self):
        checkins = []
        for checkin in CheckIn.query.all():
            checkin_dict = {
                "rating": checkin.rating,
                "user_id": checkin.user.id,
                "playground_id": checkin.playground.id,
                "comment": checkin.comment
            }
            checkins.append(checkin_dict)
        response = make_response(
            jsonify(checkins),
            200
        )
        return response    
api.add_resource(CheckIns, '/checkins')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()

        user_dict = {
                "id": user.id,
                "name": user.name,
                "age": user.age,
                "email": user.email,
                "password": user.password,
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
                "id": user.id,
                "name": user.name,
                "age": user.age,
                "email": user.email,
                "password": user.password,
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
