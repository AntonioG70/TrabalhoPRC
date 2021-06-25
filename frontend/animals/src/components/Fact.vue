<template>
    <div class='fact' v-if="fact">
        <div>
            <strong>{{title}}:</strong> 
        </div>
        <div style="margin: 2px"/>
        <FactList :fact='fact' :link="link"/>
    </div>
</template>

<script>    
    import FactList from "./FactList.vue"

    export default {
        name: 'Fact',
        props: ['title','fact', 'link'],
        components : {
            FactList
        }
    }

</script>

<style scoped>
    .fact {
        display: flex;
        padding: 10px;
        margin: 10px;
        width: 25vw;
        border-bottom: 1px solid lightgray;
    }
</style>