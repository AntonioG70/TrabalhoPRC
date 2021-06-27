from rdflib import Graph, Literal, RDF, OWL, URIRef
import pickle
import re

# create a Graph
g = Graph()
g.bind('','http://www.semanticweb.org/antóniocarvalho/ontologies/animals#')
g.bind('owl','http://www.w3.org/2002/07/owl#')

def new_ref(i):
    return URIRef('http://www.semanticweb.org/antóniocarvalho/ontologies/animals#' + i)

def add_object_properties(animal,info):
    g.add((new_ref(animal), RDF.type, new_ref(info['type'])))
    g.add((new_ref(animal), RDF.type, OWL.NamedIndividual))
    for pair in op:
        if pair[1] in info:
            if isinstance(info[pair[1]], list):
                for val in info[pair[1]]:
                    g.add((new_ref(animal), new_ref(pair[0]), new_ref(val)))
            else:
                g.add((new_ref(animal), new_ref(pair[0]), new_ref(info[pair[1]])))

def add_data_properties(animal,info):
    for pair in dp:
        if pair[1] in info:
            if isinstance(info[pair[1]], list):
                for val in info[pair[1]]:
                    g.add((new_ref(animal), new_ref(pair[0]), Literal(val)))
            else:
                g.add((new_ref(animal), new_ref(pair[0]), Literal(info[pair[1]])))


def add_animal(animal, info):
    animal_id = re.search(r'https://a-z-animals.com/animals/([\w-]*)/',animal).group(1)
    add_object_properties(animal_id,info)
    add_data_properties(animal_id,info)


with open('animals.pkl', 'rb') as infile:
    animals = pickle.load(infile)

animals.pop('https://a-z-animals.com/animals/quetzal/')
animals.pop('https://a-z-animals.com/animals/dragonfish/')
animals.pop('https://a-z-animals.com/animals/sharp-tailed-snake/')
animals.pop('https://a-z-animals.com/animals/westiepoo/')
animals.pop('https://a-z-animals.com/animals/mink/')
animals.pop('https://a-z-animals.com/animals/giant-schnoodle/')

op = []
dp = []

op.append(('hasKingdom','Kingdom'))
op.append(('hasPhylum','Phylum'))
op.append(('hasClasse','Class'))
op.append(('hasOrder','Order'))
op.append(('hasFamily','Family'))
op.append(('hasGenus','Genus'))
op.append(('livesIn','World Location'))
op.append(('hasPrey','Prey'))
# op.append(('hasPredator','Predator'))

dp.append(('colour','Colour'))
dp.append(('diet','Diet'))
dp.append(('fact','Fun Fact'))
dp.append(('gestationPeriod','Gestation Period'))
dp.append(('habitat','Habitat'))
dp.append(('length','Length'))
dp.append(('weight','Wheight'))
dp.append(('lifeSpan','Lifespan'))
dp.append(('scientificname','Scientific Name'))
dp.append(('skinType','Skin Type'))
dp.append(('wingSpan','Wingspan'))
dp.append(('image','img'))
dp.append(('locationImage', 'locationImage'))


for animal,info in animals.items():
    print(animal)
    add_animal(animal,info)



turtle = g.serialize(format="turtle").decode("utf-8")
print(turtle)

with open("individuals.ttl", "w") as text_file:
    text_file.write(turtle)