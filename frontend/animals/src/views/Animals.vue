<template>
  <div >
    <Navbar />
    <v-list class='animal-list'>
        <v-list-item
            v-for="animal in animals"
            :key="animal.text"
        >
             <div class="animal-box">
                <div class="separator">
                </div>
                <img :src='animal.img' :alt='animal.text' class="animal-img"/>
                <div class="animal-name">
                    {{animal.name}}
                </div>
             </div>
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
                      {name: 'Cat', img:'https://i.imgur.com/Q6pAkWl.png'},],
            thing : `<v-list-item-avatar rounded='0'>
                        <v-img :src="animal.img"/>
                    </v-list-item-avatar>
                    <v-list-item-title>{{ animal.name }}</v-list-item-title>'`
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

    .separator {
        width: 0.5vw;
        height: 100%;
        background-color: #6DB045;
    }

    .animal-name {
        height: 100%;
    }
</style>
