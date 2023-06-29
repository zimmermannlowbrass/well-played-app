#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Playground, CheckIn

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
                password=(fake.user_name() + str(fake.random_int(min=10, max=99))),
                rank=randint(1,10),
            )
            users.append(user)

        hippo = ['Hippo Playground', 'Upper West Side', True, True]
        pier51 = ['Pier 51 Hudson River Park', 'West Village', True, True]
        heckscher = ['Heckscher Playground', 'Central Park South', True, True]
        chelsea = ['Chelsea Waterside Playground', 'Chelsea', False, True]
        evelyn = ['Evelyn\'s Playground', 'Union Square', True, True]
        madison = ['Madison Square Park Playground', 'Flatiron', False, True]
        garvey = ['Marcus Garvey Park Playground', 'Harlem', False, False]
        kempner = ['Margaret L. Kempner Playground', 'Central Park West', False, True]
        dianna = ['Diana Ross Playground', 'Central Park West', False, False]
        washington_square = ['Washington Square Park', 'Greenwich Village', True, True]
        ancient = ['Ancient Playground', 'Cental Park East', True, True]
        pier25 = ['Pier 25 Hudson River Park', 'Tribeca', True, True]
        example_playgrounds = [hippo, pier51, heckscher, chelsea, evelyn, madison, garvey, kempner, dianna, washington_square, ancient, pier25]

        playgrounds = []
        for n in range(len(example_playgrounds)):
            playground = Playground(name=example_playgrounds[n][0], neighborhood=example_playgrounds[n][1], has_restroom=example_playgrounds[n][2], has_water_feature=example_playgrounds[n][3])
            playgrounds.append(playground)

        checkins = []
        for n in range(100):
            checkin=CheckIn(rating=randint(1,5), user_id=randint(1,len(users)), playground_id=randint(1,len(example_playgrounds)))
            checkins.append(checkin)

        
        db.session.add_all(users)
        db.session.add_all(playgrounds)
        db.session.add_all(checkins)
        db.session.commit()
