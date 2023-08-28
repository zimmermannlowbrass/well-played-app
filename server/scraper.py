#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen



def scraper(playground):
    site = f"https://www.nycgovparks.org/parks/{playground}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"}
    req = Request(site,headers=headers)
    page = urlopen(req).read()

    doc = BeautifulSoup(page, "html.parser")

    picture = doc.select('.featured_src')
    for pic in picture:
        print(pic['src'])


print(scraper("abc-playground"))
