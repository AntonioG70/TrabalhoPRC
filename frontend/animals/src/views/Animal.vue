<template>
  <div >
    <Navbar />
    <div class="page">
        <div class="animal-header">
            <div class="separator" />
            <img :src='animal.img' :alt='animal.name' class="animal-img"/>
            <div class="animal-name">
                <div class="title">
                    <v-icon left color="light-gray" x-large>mdi-chevron-right</v-icon>
                    <div> {{animal.name}} </div>
                </div>
                <div class='text--secondary ml-12 fun-fact'>
                    {{animal.funfact}}
                </div>
            </div>
        </div>
        <div class="facts">
            <div class='col'>
            </div>
            <div class='col'>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    
    export default {
        name: 'Animal',
        data () {
            return {
            animal: {name: 'Dog', img:'https://i.imgur.com/ThWoXl7.jpg', funfact: "With the new v-slot syntax, nested activators such as those seen with a v-menu and v-tooltip attached to the same activator button, need a particular setup in order to function correctly."}
            }
        },
        components: {
            Navbar,
        }
    }

</script>

<style scoped>
    .page {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .animal-header {
        display: flex;
        align-items: center;
        width: 60vw;
        height: 200px;
        margin: 50px 0;
        background-color: rgb(243, 243, 243);
    }

    .separator {
        width: 0.5vw;
        height: 100%;
        background: linear-gradient(to left, #6DB045 20%, #8cc04d 100%);
    }

    .animal-img {
        height:200px;
        width:270px;
    }

    .animal-name {
        height: 100%;
    }

    .title{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 30px;
    }
    .fun-fact {
        width: 35vw !important;
    }

    .facts {
        width: 60vw;
        border: 2px solid blue
    }
</style>
