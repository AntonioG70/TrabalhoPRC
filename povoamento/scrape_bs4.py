from jjcli import *
import pickle
import requests as reqs
from bs4 import BeautifulSoup

headers = {'User-Agent': 'PostmanRuntime/7.26.8'}

def get_animal_links(tipo):
    resp = reqs.get('https://a-z-animals.com/animals/' + tipo, headers=headers) 
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    cards = soup.find_all("div", class_="card")

    animal_links = []

    for card in cards:
        link = card.find('a')['href']
        img = card.find('img')['src']
        animal_links += [(link,img)]
    
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

    location_image = classes.find_all('img', class_="animal-location-map")[0]['src']
    locations = classes.find('img', class_="animal-location-map").previous_sibling.previous_sibling

    if locations:
        locs_list = list(map(lambda x: x.text, locations.find_all('li')))
        if len(locs_list) == 1:
            animal['World Location'] = locs_list[0]
        else:
            animal['World Location'] = locs_list

    animal['locationImage'] = location_image
    
    return animal

types = ["mammals", "reptiles", "fish", "birds", "amphibians", "insects"]

links = []
animals = {}

for t in types:
    type_links = get_animal_links(t)
    links += type_links
    for l in type_links:
        tipo = t.capitalize()[:-1]
        if tipo == 'Fis':
            tipo = 'Fish'
        animals[l[0]] = {'type': tipo, 'img': l[1]}

print("DONE LINKS (" + str(len(links)) + ")")

for pair in links:
    link = pair[0]
    print(link)
    animal = get_animal(link)
    if animal:
        animal['type'] = animals[link]['type']
        animal['img'] = animals[link]['img']
        animals[link] = animal
    else:
        del animals[link]

for animal in animals.values():
    if 'Prey' in animal.keys():
        preys = animal['Prey'].replace(' ','').split(',')
        preys = list(map(lambda x: x[:-1].lower(), preys))
        preys = list(filter(lambda p: 'https://a-z-animals.com/animals/'+ p +'/' in animals.keys(), preys))
        if len(preys) > 0:
            animal['Prey'] = preys
        else:
            del animal['Prey']

print(animals)

with open('animals.pkl', 'wb') as outfile:
    pickle.dump(animals, outfile)
