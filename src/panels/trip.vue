<template>
    <div class="TripPanel">
        <ul class="search-results">
            <li class="search-item" v-for="location in locations">
                <span class="icon"><icon fill="#000"></icon></span>
                <span class="name">{{location.latlon}}</span>
            </li>
        </ul>
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
        name: {
            get() {
                return this.$store.state.trip.name
            },
            set(name) {
                this.$store.dispatch('update_trip', {name})
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
