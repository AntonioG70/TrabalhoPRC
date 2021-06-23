<template>
    <div class="background">
        <div class="logo-header">
            <v-expand-x-transition>
                <v-card class="logo" v-show="logoShow">
                    <v-img
                        :src="require('../assets/animals.png')"
                        contain
                        height="15vw"
                    />
                </v-card>
            </v-expand-x-transition>
        </div>
        <div class="buttons">
            <HomeMenu title='Animal' :links='animalTypes'/>
            <HomeMenu title='Locations' :links='locations'/>
            <HomeMenu title='Classification' :links='locations'/>
            <v-btn flat v-bind="attrs" v-on="on" color="white">
                <v-icon left color="black">mdi-magnify</v-icon>
                 <span>Advanced Search</span>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import HomeMenu from '../components/HomeMenu.vue'
    export default {
        name: 'Home',
        data () {
            return {
                logoShow: false,
                animalTypes: [{ text: 'Mammals', route: '/animals?type=Mammals' },
                              { text: 'Fish', route: '/animals?type=Fish' },
                              { text: 'Reptiles', route: '/animals?type=Reptiles' },
                              { text: 'Insects', route: '/animals?type=Insects' },
                              { text: 'Birds', route: '/animals?type=Birds' },],
                locations: [{ text: 'Africa', route: '/animals?location=Africa' },
                            { text: 'Europe', route: '/animals?location=Europe' },
                            { text: 'America', route: '/animals?location=America' },
                            { text: 'Asia', route: '/animals?location=Asia' },
                            { text: 'Antarctica', route: '/animals?location=Antarctica' },
                            { text: 'Oceania', route: '/animals?location=Oceania' },]
            } 
        },
        mounted () {
            setTimeout(() => this.logoShow = true, 500)
        },
        components: {
            HomeMenu
        }
    }

</script>

<style scoped>
    .background {
        background: linear-gradient(to right, #4d8030 20%, #9dd756 100%);
        width: 100vw;
        height: 100vh;
    }
    .logo {
        width: 40vw;
        height: 20vw;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 5px 5px 15px 3px rgba(0,0,0,0.65) !important;
    }

    .logo-header {
        width: 100vw;
        height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .buttons {
        width: 60vw;
        margin: 0vw 20vw;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        align-self: center;
    }

</style>
