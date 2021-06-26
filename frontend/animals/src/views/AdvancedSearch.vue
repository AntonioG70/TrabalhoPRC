<template>
  <div >
    <Navbar />
    <div class="page">
        <br/>
        <span style="font-size: 48px">Search</span>
        <div class="input-box">
            <div class="separator" />
            <input v-model="name" placeholder="Insert Name..." class="input">
        </div>
        <div class="input-box">
            <div class="separator" />
            <input v-model="classification" placeholder="Insert Classification..." class="input">
        </div>
        <div class="input-box">
            <div class="separator" />
            <input v-model="type" placeholder="Insert Type..." class="input">
        </div>
        <div class="input-box">
            <div class="separator" />
            <input v-model="location" placeholder="Insert Location..." class="input">
        </div>
        <v-btn elevation='1' tile class="button" color="rgb(240, 240, 240" @click="search">
            <v-icon left color="#6DB045">mdi-magnify</v-icon>
            <span>Search</span>
        </v-btn>
    </div>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    
    export default {
        name: 'AdvancedSearch',
        data () {
            return {
                name: "",
                classification: "",
                type: "",
                location: "",
            }
        },
        components: {
            Navbar,
        },
        methods: {
            search: function () {
                let query = ""
                if(this.name) query += "name="+ this.name   
                if(this.classification){
                    if(query) query += '&'
                    query += "classification="+ this.classification  
                }
                if(this.type){
                    if(query) query += '&'
                    query += "type="+ this.type  
                } 
                if(this.location){
                    if(query) query += '&'
                    query += "location="+ this.location  
                }  

                if(query) query = '?' + query

                this.$router.push('/animals' + encodeURI(query))
            }
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

    .input {
        background-color: rgb(243, 243, 243);
        padding: 20px;
        width: 27vw
    }

    .input-box {
        display: flex;
        flex-direction: row;
        height: 50px;
        margin: 15px;
    }

    .separator {
        width: 0.5vw;
        height: 100%;
        background: linear-gradient(to left, #6DB045 20%, #8cc04d 100%);
    }

    .button {
        width: 10vw;
        height: 50px !important;
        margin: 20px;
    }

</style>
