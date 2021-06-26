<template>
  <div >
    <Navbar />
    <div class="page">
        <input v-model="name" placeholder="Insert Name...">
    </div>
  </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    
    export default {
        name: 'AdvancedSearch',
        data () {
            return {
                name: ""
            }
        },
        components: {
            Navbar,
        },
    }

</script>

<style scoped>
    .page {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>
