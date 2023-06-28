#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Playground, CheckIn

# Views go here!

@app.route('/')
def index():
    return "Welcome to the WellPlayed App!"

@app.route('/playgrounds')
def playgrounds():
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

# For some reason I get an AttributeError of 'Playground' object has no attribute when I use to_dict()
# 
# @app.route('/playgrounds/<int:id>')
# def playground_by_id(id):
#     playground = Playground.query.filter(Playground.id == id).first()
#     response = make_response(jsonify(playground.to_dict()), 200)
#     response.headers['Content-Type'] = 'application/json'
#     return response


@app.route('/users')
def users():
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
    
@app.route('/users/<int:id>', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def user_by_id(id):
    user = User.query.filter(User.id == id).first()

    if request.method == 'GET':    
        user_dict = {
                "name": user.name,
                "rank": user.rank
            }
        response = make_response(
            jsonify(user_dict),
            200
        )
        return response
    
    elif request.method == 'POST':
        new_user = User(
            name=request.form.get("name"),
            rank=request.form.get("rank")
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
    
    elif request.method == 'DELETE':
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

