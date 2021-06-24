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
                <NavbarMenu title='Location' :links='animalTypes'/>
                <NavbarMenu title='Classification' :links='animalTypes'/>
                <v-btn elevation='0' tile v-bind="attrs" v-on="on" color="light-grey">
                    <v-icon left color="#6DB045">mdi-magnify</v-icon>
                    <span>Search</span>
                </v-btn>
            </div>
        </div>
    </v-app-bar>
</template>

<script>
    import NavbarMenu from "./NavbarMenu.vue"
    export default {
        name: 'Navbar',
        props: ['links','title'],
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