<template>
    <v-menu offset-y >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn elevation='0' tile v-bind="attrs" v-on="on" color="light-grey">
                        <v-icon left color="#6DB045">mdi-plus</v-icon>
                        <span>{{ title }}</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="link in links"
                        :key="link.text"
                        link
                        exact
                        :to='link.route'
                    >
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
</template>

<script>
    export default {
        name: 'NavbarMenu',
        props: ['links','title'],
    }

</script>
