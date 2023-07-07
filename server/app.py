#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Playground, CheckIn


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

class Login(Resource):

    def get(self):
        response_dict = {
            "message": "Welcome to Logins!"
        }
        reponse = make_response(
            response_dict,
            200
        )
        return reponse
    

    def post(self):

        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter(
            User.email == email
        ).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                user_dict =  {
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
            return {'error': 'Incorrect password. Double check and try again!'}, 401

        return {'error': 'Unauthorized Email. Double check and try again!'}, 401

        if not user:
            return {"Message" : "User cannot be found"}, 401
        session['user_id'] = user.id
        user_dict =  {
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

class Logout(Resource):

    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204


class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return {
                "id": user.id,
                "name": user.name,
                "age": user.age,
                "email": user.email,
                "password": user.password,
                "rank": user.rank
            }, 200


class Playgrounds(Resource):
    def get(self):
        playgrounds = []
        for playground in Playground.query.all():
            pg_dict = {
                "id": playground.id,
                "image": playground.image,
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
    
    def post(self):
        data = request.get_json()
        new_playground = Playground(
                name=data.get("name"),
                image=data.get("image"),
                neighborhood=data.get("neighborhood"),
                has_restroom=data.get("has_restroom"),
                has_water_feature=data.get("has_water_feature")
            )
        db.session.add(new_playground)
        db.session.commit()
        newpg_dict = {
                "image": new_playground.image,
                "name": new_playground.name,
                "neighborhood": new_playground.neighborhood,
                "has_restroom": new_playground.has_restroom,
                "has_water_feature": new_playground.has_water_feature
            }

        response = make_response(
            jsonify(newpg_dict),
            201
        )
        return response
    

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
        new_user.password_hash = new_user.password
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
    

class CheckIns(Resource):
    def get(self):
        checkins = []
        for checkin in CheckIn.query.all():
            checkin_dict = {
                "id": checkin.id,
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
    
    def post(self):
        data = request.get_json()
        new_checkin = CheckIn(
                rating=data.get("rating"),
                comment=data.get("comment"),
                playground_id=data.get("playground_id"),
                user_id=data.get("user_id")
            )
        db.session.add(new_checkin)
        db.session.commit()
        user_dict = {
                "rating": new_checkin.rating,
                "comment": new_checkin.comment,
                "playground_id": new_checkin.playground_id,
                "user_id": new_checkin.user_id
            }
        response = make_response(
            jsonify(user_dict),
            201
        )
        return response
    
class CheckInByID(Resource):
    def get(self, id):
        checkin = CheckIn.query.filter(CheckIn.id == id).first()
        checkin_dict = {
                "id": checkin.id,
                "rating": checkin.rating,
                "user_id": checkin.user.id,
                "playground_id": checkin.playground.id,
                "comment": checkin.comment
            }
        response = make_response(
            jsonify(checkin_dict),
            200
        )
        return response
    
    def patch(self, id):
        data = request.get_json()
        checkin = CheckIn.query.filter(CheckIn.id == id).first()
        for attr in data:
            setattr(checkin, attr, data[attr])
        db.session.add(checkin)
        db.session.commit()
        checkin_dict = {
                "id": checkin.id,
                "rating": checkin.rating,
                "user_id": checkin.user.id,
                "playground_id": checkin.playground.id,
                "comment": checkin.comment
            }
        response = make_response(
            jsonify(checkin_dict),
            200
        )
        return response

    def delete(self, id):
        checkin = CheckIn.query.filter(CheckIn.id == id).first()
        db.session.delete(checkin)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response

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
        data = request.get_json()
        user = User.query.filter(User.id == id).first()
        for attr in data:
            setattr(user, attr, data[attr])
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

api.add_resource(Home, '/')
api.add_resource(Login, '/logins')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Playgrounds, '/playgrounds')
api.add_resource(CheckIns, '/checkins')
api.add_resource(CheckInByID, '/checkins/<int:id>')




# @app.route('/playgrounds/<int:id>')
# def playground_by_id(id):
#     playground = Playground.query.filter(Playground.id == id).first()
#     response = make_response(jsonify(playground.to_dict()), 200)
#     response.headers['Content-Type'] = 'application/json'
#     return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)

 

# For some reason I get an AttributeError of 'Playground' object has no attribute when I use to_dict()
# 