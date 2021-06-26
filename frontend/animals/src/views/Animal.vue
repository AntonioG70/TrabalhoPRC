<template>
  <div >
    <Navbar />
    <div class="page">
        <div class="animal-header">
            <div class="separator" />
            <img :src='animal.image' :alt='animal_id' class="animal-img"/>
            <div class="animal-name">
                <div class="title">
                    <v-icon left color="light-gray" x-large>mdi-chevron-right</v-icon>
                    <div> {{animal_id.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ') /* Remove hifens and capitalize */ }} </div>
                </div>
                <div class='text--secondary ml-12 fun-fact'>
                    {{animal.fact}}
                </div>
            </div>
        </div>
        <div class="facts">
            <div class='col'>
                <div class="separator" />
                <div class="facts-list">
                    <Fact title="Kingdom" :fact="animal.hasKingdom" link="/animals?Kingdom="/>
                    <Fact title="Phylum" :fact="animal.hasPhylum" link="/animals?Phylum="/>
                    <Fact title="Class" :fact="animal.hasClass" link="/animals?Class="/>
                    <Fact title="Order" :fact="animal.hasOrder" link="/animals?Order="/>
                    <Fact title="Genus" :fact="animal.hasGenus" link="/animals?Genus="/>
                    <Fact title="Family" :fact="animal.hasFamily" link="/animals?Family="/>
                    <Fact title="Scientific Name" :fact="animal.scientificname" />
                </div>
            </div>
            <div class='col'>
                <div class="separator" />
                <div>
                    <Fact title="Location" :fact="animal.livesIn" link="/animals?location=" />
                    <Fact title='Color' :fact="animal.colour"/>
                    <Fact title='Diet' :fact='animal.diet' />
                    <Fact title='Gestation Period' :fact='animal.gestationPeriod' />
                    <Fact title='Habitat' :fact='animal.habitat' />
                    <Fact title='Length' :fact='animal.length' />
                    <Fact title='Weight' :fact='animal.wheight' />
                    <Fact title='Life Span' :fact='animal.lifeSpan' />
                    <Fact title='Skin Type' :fact='animal.skinType' />
                    <Fact title='Wingspan' :fact='animal.wingSpan' />
                    <Fact title="Preys" :fact="animal.hasPrey" link="/animal/" />
                    <Fact title="Predators" :fact="animal.hasPredator" link="/animal/" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    import Fact from '../components/Fact.vue'
    import axios from 'axios'
    
    export default {
        name: 'Animal',
        data () {
            return {
            animal: {name: 'Dog', img:'https://i.imgur.com/ThWoXl7.jpg', funfact: "With the new v-slot syntax, nested activators such as those seen with a v-menu and v-tooltip attached to the same activator button, need a particular setup in order to function correctly."},
            animal_id: ""
            }
        },
        components: {
            Navbar,
            Fact,
        },
        mounted () {
            axios.get('http://localhost:7777/animals/' + this.$route.params.id)
            .then(dados => {
                this.animal=dados.data
                this.animal_id=this.$route.params.id
            })
            .catch(err => console.log(err))
        },
        watch: {
            "$route.params": {
            immediate: true,
                handler(n) {
                    this.animal_id = n.id
                    axios.get('http://localhost:7777/animals/' + n.id)
                    .then(dados => {
                        console.log('HERE')
                        console.log(dados.data)
                        this.animal = dados.data
                    })
                    .catch(err => console.log(err))
                }
            },
        }
    }

</script>

<style scoped>
    .page {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .animal-header {
        display: flex;
        align-items: center;
        width: 60vw;
        height: 200px;
        margin: 50px 0;
        background-color: rgb(243, 243, 243);
    }

    .separator {
        width: 0.5vw;
        height: 100%;
        background: linear-gradient(to left, #6DB045 20%, #8cc04d 100%);
    }

    .animal-img {
        height:200px;
        width:270px;
    }

    .animal-name {
        height: 100%;
    }

    .title{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 30px;
    }
    .fun-fact {
        width: 35vw !important;
    }

    .facts {
        width: 60vw;
        display: flex;
        justify-content: space-between;
        padding-bottom: 50px;
    }

    .col {
        flex-basis: 45%;
        box-sizing: border-box;
        display: flex;
        background-color: rgb(243, 243, 243);
    }

    .fact-list {
        display: flex;
        flex-direction: column;
    }
</style>
