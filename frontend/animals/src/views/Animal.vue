<template>
<div>
    <Navbar />
    <div class="page" v-if="loading == false && animal.hasKingdom != null">
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
                    <Fact title="Class" :fact="animal.hasClasse" link="/animals?Classe="/>
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
        <div class="map-box" v-if="animal.locationImage && ! mapError">
            <div class="separator" />
            <div>
                <div class="map-title"> World Location: </div>
                <div class="map-content">
                    <img :src="animal.locationImage" alt=Map class="map" @error="mapError = true" @load="mapError = false"/>
                </div>
            </div>
        </div>
    </div>
    <div class="page info-result" v-else>
        <div v-if="loading == true">
            Loading...
        </div>
        <div v-else>
            Animal not found...
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
                animal: null,
                animal_id: "",
                loading: true,
                mapError: false,
            }
        },
        components: {
            Navbar,
            Fact,
        },
        mounted () {
            axios.get('http://localhost:7777/animals/' + this.$route.params.id)
            .then(dados => {
                if(dados.data == {})
                    this.error = true;
                this.animal = dados.data
                this.animal_id=this.$route.params.id
                this.loading = false
                this.mapError=false
            })
            .catch(err => { this.loading = false; console.log(err); } )
        },
        watch: {
            "$route.params": {
            immediate: true,
                handler(n) {
                    this.mapError=true
                    this.animal_id = n.id
                    axios.get('http://localhost:7777/animals/' + n.id)
                    .then(dados => {
                        if(dados.data == {})
                            this.error = true;
                        this.animal = dados.data
                        this.loading = false
                        this.mapError=false
                    })
                    .catch(err => { this.loading = false; console.log(err); } )
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

    .map-box {
        display: flex;
        background-color: rgb(243, 243, 243);
        width: 60vw;
        margin-bottom: 70px;
        height: 500px;
    }
    
    .map-title {
        display: flex;
        align-items: center;
        height: 12%;
        margin: 0 20px;
        font-size:24px;
    }

    .map-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width:59.5vw;
        height:88%;
    }

    .map {
        border-radius: 50%;
        padding-bottom: 20px;
    }

    .info-result {
        font-size: 32px;
        margin-top: 50px;
    }

</style>
