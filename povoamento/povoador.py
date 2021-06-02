from jjcli import *
import requests as reqs

types = ["Mammals", "Reptiles", "Fish", "Birds", "Amphibians", "Invertebrates", "Insects"]

def get_pag_tipo(id):
    idLow = id.lower()
    headers = {'User-Agent': 'PostmanRuntime/7.26.8'}
    resp = reqs.get('https://a-z-animals.com/animals/' + idLow, headers=headers) 
    resp.raise_for_status()
    return resp.text

c = get_pag_tipo("mammals")   

c1 = findall(r'">Types of.*List of', c)
c2 = findall(r'">([A-Za-z ]*)<\/a>', c1[0])
print(c2)

"""
for t in types:
    a = get_pag_tipo(t)
    print(c)
"""