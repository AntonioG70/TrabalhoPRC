<template>
    <div v-if="Array.isArray(fact)">
        <span v-for="(f,index) in fact" :key="f" >
            <router-link v-if="link" :to="link + f" >
                {{f}}
            </router-link>
            <span v-else>
                {{f}}
            </span>
            <span v-if="index != fact.length-1">
                ,
            </span>
        </span>
    </div>
    <div v-else>
        <router-link v-if="link" :to="link + fact" >
            {{fact}}
        </router-link>
        <div v-else>
            {{fact}}
        </div>
    </div>
</template>

<script>    
    export default {
        name: 'Fact',
        props: ['fact', 'link']
    }

</script>

<style scoped>
    a {
        text-decoration: none;
        color: #6DB045 !important;
    }

    a:hover {
        color: #3f6628 !important;
    }
    
</style>