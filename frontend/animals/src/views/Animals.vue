<template>
  <div >
    <Navbar />
    <v-list class='animal-list'>
        <v-list-item
            v-for="animal in animals"
            :key="animal.name"
        >
            <router-link :to='"animal/" + animal.name' style="text-decoration: none; color: inherit;">
                <div class="animal-box">
                    <div class="separator">
                    </div>
                    <img :src='animal.img' :alt='animal.text' class="animal-img"/>
                    <div class="animal-name text-md-body-1">
                        <v-icon left color="light-gray">mdi-arrow-top-right</v-icon>
                        {{animal.name}}
                    </div>
                </div>
             </router-link>
        </v-list-item>
    </v-list>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    
    export default {
        name: 'Animals',
        data () {
            return {
            animals: [{name: 'Dog', img:'https://i.imgur.com/ThWoXl7.jpg'},
                      {name: 'Cat', img:'https://i.imgur.com/Q6pAkWl.png'},
                      {name: 'Hamster', img:'https://i.imgur.com/xBntSnV.jpeg'},
                      {name: 'Elephant', img:'https://i.imgur.com/L3B21wl.jpeg'},
                      {name: 'Cat', img:'https://i.imgur.com/Q6pAkWl.png'},]
            }
        },
        components: {
            Navbar,
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
</style>
