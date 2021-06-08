from jjcli import *
import requests as reqs

types = ["mammals", "reptiles", "fish", "birds", "amphibians", "invertebrates", "insects"]

def get_animal_tipo(tipo):
    headers = {'User-Agent': 'PostmanRuntime/7.26.8'}
    resp = reqs.get('https://a-z-animals.com/animals/' + tipo, headers=headers) 
    resp.raise_for_status()
    c1 = findall(r'">Types of.*List of', resp.text)
    c2 = findall(r'">([A-Za-z ]*)<\/a>', c1[0])
    return c2

#c = get_animal_tipo("fish")   
#print(c)

def criaClassificacao(animal):
    headers = {'User-Agent': 'PostmanRuntime/7.26.8'}
    resp = reqs.get('https://a-z-animals.com/animals/' + animal, headers=headers) 
    resp.raise_for_status()
    c1 = findall(r'Aardvark Scientific Classification.*Aardvark Conservation Status<\/h2', resp.text)
    c2 = findall(r'([\sA-Za-z]*)<\/dt.*?([\sA-Za-z]*)<\/dd', c1[0])
    for key, value in c2:
        if key != "Scientific Name":
            s = f""":{animal.capitalize()} :has{key.replace(" ", "")} :{value.replace(" ", "_")};"""
            print(s)
        else:
            s = f""":{animal.capitalize()} :{key.replace(" ", "").lower()} '{value.replace(" ", "_")}';"""
            print(s)
    return c2

criaClassificacao("aardvark")
"""
for t in types:
    a = get_pag_tipo(t)
    print(c)
"""

