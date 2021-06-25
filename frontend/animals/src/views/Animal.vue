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
                <div class="separator" />
                <div class="facts-list">
                    <Fact title="Kingdom" fact="Animalia" link="/animals?Kingdom=Animalia"/>
                    <Fact title="Phylum" fact="Chordata" link="/animals?Phylum=Chordata"/>
                    <Fact title="Class" fact="Mammalia" link="/animals?Class=Mammalia"/>
                    <Fact title="Order" fact="Tubulidentata" link="/animals?Order=Tubulidentata"/>
                    <Fact title="Genus" fact="Orycteropus" link="/animals?Genus=Orycteropus"/>
                    <Fact title="Family" fact="Orycteropodidae" link="/animals?Family=Orycteropodidae"/>
                    <Fact title="Scientific Name" fact="Orycteropus afer" />
                </div>
            </div>
            <div class='col'>
                <div class="separator" />
                <div>
                    <Fact title='Color' :fact="['Colour','simba','boba']"/>
                    <Fact title='Diet' fact='Diet' />
                    <Fact title='Gestation Period' fact='Gestation Period' />
                    <Fact title='Habitat' fact='Habitat' />
                    <Fact title='Length' fact='Length' />
                    <Fact title='Weight' fact='Wheight' />
                    <Fact title='Life Span' fact='Lifespan' />
                    <Fact title='Skin Type' fact='Skin Type' />
                    <Fact title='Wingspan' fact='Wingspan' />      
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    import Fact from '../components/Fact.vue'
    
    export default {
        name: 'Animal',
        data () {
            return {
            animal: {name: 'Dog', img:'https://i.imgur.com/ThWoXl7.jpg', funfact: "With the new v-slot syntax, nested activators such as those seen with a v-menu and v-tooltip attached to the same activator button, need a particular setup in order to function correctly."}
            }
        },
        components: {
            Navbar,
            Fact,
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
        display: flex;
        justify-content: space-between;
        padding-bottom: 50px;
    }

    .col {
        flex-basis: 45%;
        box-sizing: border-box;
        display: flex;
        background-color: rgb(243, 243, 243);
    }

    .fact-list {
        display: flex;
        flex-direction: column;
    }
</style>
