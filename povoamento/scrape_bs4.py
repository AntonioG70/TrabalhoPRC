from jjcli import *
import pickle
import requests as reqs
from bs4 import BeautifulSoup

headers = {'User-Agent': 'PostmanRuntime/7.26.8'}

def get_animal_links(tipo):
    resp = reqs.get('https://a-z-animals.com/animals/' + tipo, headers=headers) 
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    titles = soup.find_all("h5", class_="card-title")

    animal_links = []

    for title in titles:
        link = title.find('a')['href']
        animal_links += [link]
    
    return animal_links

def get_animal(animal):
    resp = reqs.get(animal, headers=headers) 
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    animal = {}
    boxes = soup.find_all('div', class_="row animal-facts-box")

    if not len(boxes) > 0:
        return None

    classes = boxes[0]
    info = boxes[1]

    for title in classes.find_all('dt'):
        animal[title.text] = title.next_sibling.text

    for title in info.find_all('dt'):
        sibling = title.next_sibling
        if len(sibling.find_all('li')) <= 1:
            animal[title.text] = sibling.text
        else:
            animal[title.text] = list(map(lambda x: x.text, sibling.find_all('li')))
    
    locations = classes.find('img', class_="animal-location-map").previous_sibling.previous_sibling
    if locations:
        locs_list = list(map(lambda x: x.text, locations.find_all('li')))
        if len(locs_list) == 1:
            animal['World Location'] = locs_list[0]
        else:
            animal['World Location'] = locs_list

    return animal

types = ["mammals", "reptiles", "fish", "birds", "amphibians", "insects"]

links = []
animals = {}

for t in types:
    links += get_animal_links(t)

print("DONE LINKS (" + str(len(links)) + ")")

for link in links:
    print(link)
    animal = get_animal(link)
    if animal:
        animals[link] = animal

print(animals)

with open('animals.pkl', 'wb') as outfile:
    pickle.dump(animals, outfile)
