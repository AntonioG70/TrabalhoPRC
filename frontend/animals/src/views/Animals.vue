<template>
  <div >
    <Navbar />
    <v-list class='animal-list' v-if="animals != null && animals.length > 0">
        <v-list-item
            v-for="animal in animals"
            :key="animal.name"
        >
            <router-link :to='"/animal/" + animal.name' style="text-decoration: none; color: inherit;">
                <div class="animal-box">
                    <div class="separator">
                    </div>
                    <img :src='animal.img' :alt='animal.text' class="animal-img"/>
                    <div class="animal-name text-md-body-1">
                        <v-icon left color="light-gray">mdi-arrow-top-right</v-icon>
                        {{animal.name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ') /* Remove hifens and capitalize */ }}
                    </div>
                </div>
             </router-link>
        </v-list-item>
    </v-list>
    <div class='animal-list info-result' v-else>
        <div v-if="animals == null">
            Loading...
        </div>
        <div v-else>
            No animals found...
        </div>
    </div>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    import axios from 'axios'
    
    export default {
        name: 'Animals',
        data () {
            return {
            animals: null,
            query_string: ""
            }
        },
        components: {
            Navbar,
        },
        watch: {
            "$route.fullPath": {
            immediate: true,
                handler(n) {
                    let markIndex = n.indexOf('?')
                    let query_string = ""
                    if(markIndex > 0) query_string = n.slice(markIndex)
                    this.query_string = query_string
                    this.animals = null
                }
            },
            "query_string":{
                immediate: true,
                handler(n) {
                    axios.get('http://localhost:7777/animals' + n)
                    .then(dados => {
                        if(this.$route.query.name){
                            dados.data = dados.data.filter(elem => {
                                let nome = elem.name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')
                                let regex = new RegExp(this.$route.query.name.toLowerCase())
                                return regex.test(nome.toLowerCase())
                            })
                        }
                        this.animals= dados.data
                    })
                    .catch(err => console.log(err))
                }   
            }
        }
    }

</script>

<style scoped>
    .animal-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        height: 100%
    }

    .animal-img {
        width: 9.5vw;
        height: 100px;
    }

    .animal-box {
        width: 50vw;
        display: flex;
        align-items: center;
        height: 100px;
        background-color: rgb(243, 243, 243);
        margin: 20px 0;
    }

    .animal-box:hover {
        filter: brightness(90%);
        cursor: pointer
    }

    .separator {
        width: 0.5vw;
        height: 100%;
        background: linear-gradient(to left, #6DB045 20%, #8cc04d 100%);
    }

    .animal-name {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .info-result {
        font-size: 32px;
        margin-top: 50px;
    }
</style>
