<template>
    <v-menu offset-y top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">
                        <v-icon left color="black">mdi-plus</v-icon>
                        <span>{{ title }}</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="link in links"
                        :key="link.text"
                        link
                        :to='link.route'
                    >
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
</template>

<script>
    export default {
        name: 'HomeMenu',
        props: ['links','title'],
    }

</script>