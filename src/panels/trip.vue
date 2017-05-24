<template>
    <div class="TripPanel">
        <div class="header">
            <div class="title">{{title}}</div>
        </div>
        <ul class="search-results">
            <li class="search-item" v-for="location in locations">
                <span class="icon"><icon fill="#000"></icon></span>
                <span class="name">{{location.latlon}}</span>
            </li>
        </ul>
        <div class="footer map-link">
            <router-link :to="{name:'map'}">Go to Map</router-link>
        </div>
    </div>
</template>


<script>
// JS Imports
// -- Vuex Helpers
import { mapState } from 'vuex'
// –– Components
import Icon from '../components/icon.vue'


export default {
    components: {
        'icon': Icon,
    },
    computed: {
        title: {
            get() {
                return this.$store.state.trip.title
            },
            set(name) {
                this.$store.dispatch('update_trip', {title})
            }
        },
        ...mapState({
            locations: state => state.trip.locations
        })
    }
}
</script>


<style>
.TripPanel {
    width: 100%;
    height: 100%;
}
</style>
