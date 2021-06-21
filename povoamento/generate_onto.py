from rdflib import Graph, Literal, RDF, OWL, URIRef
import pickle
import re

# create a Graph
g = Graph()
g.bind('','http://www.semanticweb.org/antóniocarvalho/ontologies/animals#')

def new_ref(i):
    return URIRef('http://www.semanticweb.org/antóniocarvalho/ontologies/animals#' + i)

def check_add():
    return(0)

def add_animal(animal, info):
    animal_id = re.search(r'https://a-z-animals.com/animals/([\w-]*)/',animal).group(1)
    print(animal_id)
    print(info)
    g.add((new_ref(animal_id), RDF.type, new_ref('Animal')))
    g.add((new_ref(animal_id), RDF.type, OWL.NamedIndividual))
    if 'Kingdom' in info.keys():
        g.add((new_ref(animal_id), new_ref('hasKingdom'), new_ref(info['Kingdom'])))


with open('animals.pkl', 'rb') as infile:
    animals = pickle.load(infile)

for animal,info in animals.items():
    add_animal(animal,info)
    break

print(g.serialize(format="turtle").decode("utf-8"))