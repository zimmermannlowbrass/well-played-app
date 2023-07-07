#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Playground, CheckIn
from config import bcrypt

fake = Faker()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        User.query.delete()
        Playground.query.delete()
        CheckIn.query.delete()

        users = []
        for n in range(20):
            user = User(
                name=fake.name(),
                age=fake.random_int(min=18, max=50),
                email=fake.email(),
                password=(fake.user_name().title() + str(fake.random_int(min=1000, max=9999))),
                rank=randint(1,10),
            )
            user.password_hash = user.password
            users.append(user)

        hippo = ['Hippo Playground', "https://tinybeans.com/wp-content/uploads/2019/04/hippo-playground-.jpg?w=640", 'Upper West Side', True, True]
        pier51 = ['Pier 51 Hudson River Park', "https://tinybeans.com/wp-content/uploads/2015/04/hudsonpark2.jpg?w=640", 'West Village', True, True]
        heckscher = ['Heckscher Playground', "https://tinybeans.com/wp-content/uploads/2021/05/9718611492_de2fbb781d_h.jpg?w=640", 'Central Park South', True, True]
        chelsea = ['Chelsea Waterside Playground', "https://tinybeans.com/wp-content/uploads/2019/06/amy-n-yelp-chelsea-park-.jpeg?w=640", 'Chelsea', False, True]
        evelyn = ['Evelyn\'s Playground', "https://tinybeans.com/wp-content/uploads/2018/05/teena-y-yelp-union-square-.jpg?w=640", 'Union Square', True, True]
        madison = ['Madison Square Park Playground', "https://tinybeans.com/wp-content/uploads/2016/07/madison-sqaure-park-malcolm-pinkney-e1494968345750.jpg?w=605", 'Flatiron', False, True]
        garvey = ['Marcus Garvey Park Playground', "https://www.harlemworldmagazine.com/wp-content/uploads/2019/05/marcus-garvey-park-paint-4.jpg", 'Harlem', False, False]
        kempner = ['Margaret L. Kempner Playground', "https://tinybeans.com/wp-content/uploads/2021/05/vincent-l-yelp-kempner-.jpeg?w=640", 'Central Park West', False, True]
        dianna = ['Diana Ross Playground', "https://kikiandlalaland.files.wordpress.com/2011/09/0041.jpg", 'Central Park West', False, False]
        washington_square = ['Washington Square Park', "https://tinybeans.com/wp-content/uploads/2016/07/wash-square-park.jpg?w=605", 'Greenwich Village', True, True]
        ancient = ['Ancient Playground', "https://tinybeans.com/wp-content/uploads/2021/05/vincent-l-yelp-ancient-play-.jpeg?w=640", 'Cental Park East', True, True]
        pier25 = ['Pier 25 Hudson River Park', "https://tinybeans.com/wp-content/uploads/2015/04/pier62playground1.jpg?w=640", 'Tribeca', True, True]
        example_playgrounds = [hippo, pier51, heckscher, chelsea, evelyn, madison, garvey, kempner, dianna, washington_square, ancient, pier25]

        playgrounds = []
        for n in range(len(example_playgrounds)):
            playground = Playground(name=example_playgrounds[n][0], image=example_playgrounds[n][1], neighborhood=example_playgrounds[n][2], has_restroom=example_playgrounds[n][3], has_water_feature=example_playgrounds[n][4])
            playgrounds.append(playground)

        checkins = []
        for n in range(50):
            checkin=CheckIn(
                rating=randint(1,5), 
                user=rc(users), 
                playground=rc(playgrounds),
                comment=fake.text(max_nb_chars=200)
            )
            checkins.append(checkin)

        
        db.session.add_all(users)
        db.session.add_all(playgrounds)
        db.session.add_all(checkins)
        db.session.commit()
