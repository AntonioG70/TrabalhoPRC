<template>
  <div >
    <Navbar />
    <v-list class='classification-list'>
        <span style="font-size: 48px">{{classification}}</span>
        <v-list-item
            v-for="c in classifications"
            :key="c"
        >
            <router-link :to='"/animals/?" + classification + "=" + c' style="text-decoration: none; color: inherit;">
                <div class="classification-box">
                    <div class="separator">
                    </div>
                    <div class="classification-name text-lg-body-1">
                        <v-icon left color="light-gray">mdi-magnify</v-icon>
                        {{c}}
                    </div>
                </div>
             </router-link>
        </v-list-item>
    </v-list>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    
    export default {
        name: 'Classifications',
        data () {
            return {
            classifications: ["pamba","pemba","pimba","pomba","pumba"],
            classification: this.$route.params.id
            }
        },
        components: {
            Navbar,
        },
        watch: {
            "$route.params": {
            immediate: true,
                handler(n) {
                    this.classification = n.id
                }
            }
        }
        
    }

</script>

<style scoped>
    .classification-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        height: 100%
    }

    .classification-box {
        width: 50vw;
        display: flex;
        align-items: center;
        height: 100px;
        background-color: rgb(243, 243, 243);
        margin: 20px 0;
    }

    .classification-box:hover {
        filter: brightness(90%);
        cursor: pointer
    }

    .separator {
        width: 0.5vw;
        height: 100%;
        background: linear-gradient(to left, #6DB045 20%, #8cc04d 100%);
    }

    .classification-name {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
</style>
