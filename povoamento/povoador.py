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
    animal = animal.replace("-", "")
    
    class1 = findall(animal + r' Scientific Classification.*' + animal +  r' Conservation Status<\/h2', resp.text)
    class2 = findall(r'([\sA-Za-z]*)<\/dt.*?([\sA-Za-z]*)<\/dd', class1[0])
    print(class2)

    facts1 = findall(animal + r' Facts.*' + animal + r' Physical Characteristics', resp.text)
    facts2 = findall(r'([\sA-Za-z()]*)<\/dt.*?([A-Za-z\s,!?0-9]*)<\/[a-z]*>', facts1[0])
    print(facts2)

    carac1 = findall(animal + r' Physical Characteristics.*' + animal +  r' Images', resp.text)
    color = findall(r'([A-Za-z\s,!?0-9]*)<\/li]*>', carac1[0])
    carac2 = findall(r'([\sA-Za-z()]*)<\/dt.*?([A-Za-z\s,!?0-9\-().]*)<\/[a-z]*>', carac1[0])[1:]

    location = findall(animal + r' Locations.*' + animal + r' Locations', resp.text)
    location2 = findall(r'([A-Za-z -]*)<\/a', location[0])
    print(location2)
    for c in color:
        carac2.append(('Colour', c))

    print(carac2)

    
    for key, value in class2:
        if key != "Scientific Name":
            s = f""":{animal.capitalize()} :has{key.replace(" ", "")} :{value.replace(" ", "_")};"""
            #print(s)
        else:
            s = f""":{animal.capitalize()} :{key.replace(" ", "").lower()} '{value.replace(" ", "_")}';"""
            #print(s)


    return class2
#print(get_animal_tipo("mammals"))
criaClassificacao("Bumble-bee")
"""
for t in types:
    a = get_pag_tipo(t)
    print(c)
"""

