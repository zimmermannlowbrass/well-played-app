#!/usr/bin/env python3
# Python program to read
# json file
 
import json
 
# Opening JSON file
f = open('../DPR_Playgrounds_001.json')
 
# returns JSON object as
# a dictionary
data = json.load(f)
 
# Iterating through the json
# list
for playground in data:
    if playground['Prop_ID'][0] == 'M':
        print(playground['Name'])
 
# Closing file
f.close()