<template>
    <v-app-bar
        flat
        prominent
    >
        <div class='navbar'>
            <router-link to='/' class='logo'>
                <img src="../assets/animalstext.png" alt="Logo" class="logo" />
            </router-link>
            <div class='buttons'>
                <NavbarMenu title='Animal' :links='animalTypes'/>
                <NavbarMenu title='Location' :links='locations'/>
                <NavbarMenu title='Classification' :links='classifications'/>
                <router-link to="/search" style="text-decoration: none; color: inherit;">
                    <v-btn elevation='0' color="light-grey">
                        <v-icon left color="#6DB045">mdi-magnify</v-icon>
                        <span>Search</span>
                    </v-btn>
                </router-link>
            </div>
        </div>
    </v-app-bar>
</template>

<script>
    import NavbarMenu from "./NavbarMenu.vue"
    export default {
        name: 'Navbar',
        props: ['links','title'],
        data () {
            return {
                animalTypes: [{ text: 'Mammal', route: '/animals?type=Mammal' },
                              { text: 'Fish', route: '/animals?type=Fish' },
                              { text: 'Reptile', route: '/animals?type=Reptile' },
                              { text: 'Insect', route: '/animals?type=Insect' },
                              { text: 'Bird', route: '/animals?type=Bird' },
                              { text: 'All', route: '/animals' },],
                locations: [{ text: 'Africa', route: '/animals?location=Africa' },
                            { text: 'Europe', route: '/animals?location=Europe' },
                            { text: 'America', route: '/animals?location=America' },
                            { text: 'Asia', route: '/animals?location=Asia' },
                            { text: 'Antarctica', route: '/animals?location=Antarctica' },
                            { text: 'Oceania', route: '/animals?location=Oceania' },],
                classifications: [{ text: 'Kingdom', route: '/classification/Kingdom' },
                                  { text: 'Phylum', route: '/classification/Phylum' },
                                  { text: 'Class', route: '/classification/Classe' },
                                  { text: 'Order', route: '/classification/Order' },
                                  { text: 'Genus', route: '/classification/Genus' },
                                  { text: 'Family', route: '/classification/Family' },]
            }
        },
        components: {
            NavbarMenu
        }
    }

</script>

<style scoped>
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .logo {
        height: 100%;
        margin-top: 5px;
    }

    .buttons {
        width:50%;
        display: flex;
        justify-content: space-evenly;
    }
</style>