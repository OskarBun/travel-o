<template>
    <div class="TripListPanel">
        <div class="search-bar">
            <input class="search-text" placeholder="Search or create a trip..." type="text" ref="search" v-model="search"/>
            <span class="lnr lnr-magnifier" @click="$refs.search.focus()"></span>
        </div>
        <ul class="search-results">
            <li class="search-item" v-for="trip in results">
                <span class="lnr lnr-pushpin"></span>
                <span class="name">{{trip.title}}</span>
            </li>
        </ul>
        <div class="add-bar">
            <div class="add" @click="new_trip" :disabled="!search">Plan a new trip.</div>
        </div>
    </div>
</template>


<script>
// JS Imports
// -- Vuex Helpers
import { mapState } from 'vuex'


export default {
    computed: {
        search: {
            get() {
                return this.$store.state.trip.search.query
            },
            set(query) {
                this.$store.dispatch('search_trips', {query})
            }
        },
        ...mapState({
            results: state => state.trip.search.results,
            trip_id: state => state.trip.id,
            user_id: state => state.user.id
        })
    },
    methods: {
        new_trip() {
            if(this.search) {
                // create a new trip
                this.$store.dispatch("new_trip", {title:this.search})
            }
        }
    },
    watch: {
        trip_id(new_value) {
            if(new_value) {
                // navigate to trip panel
                this.$router.push({ name: 'trip', params: { id: new_value }})
            }
        }
    },
    mounted() {
        if(!this.user_id) {
            // navigate to login
            this.$router.push({name:'user'})
        }

        // this should trigger a search by default with no value
        // this will load all the users trips
        this.search = null
    }
}
</script>


<style>
.TripListPanel {
    position: relative;
    width: 100%;
    height: 100%;
}

.TripListPanel .search-bar,
.TripListPanel .add-bar {
    display: flex;
    align-items: center;
    width: 90%;
    height: 60px;
    margin: auto;

    line-height: 30px;
    font-size: 20px;
}

.TripListPanel .search-bar .search-text,
.TripListPanel .search-bar .lnr {
    display: block;
    height: 30px;
    border: none;
    border-bottom: 1px solid #69AEBB;
    box-sizing: border-box;
}

.TripListPanel
.search-bar .search-text {
    flex-grow: 1;
}

.TripListPanel .search-bar .search-text:focus,
.TripListPanel .search-bar .search-text:focus + .lnr {
    border-color: #F9D068;
}

.TripListPanel
.search-bar .search-text:focus + .lnr {
    color: #F9D068;
}

.TripListPanel
.search-bar .lnr:before {
    vertical-align: middle;
    cursor: pointer;
}

.TripListPanel
.add-bar .add {
    text-align: center;
    width: 100%;
    border: 2px solid #69AEBB;
    padding: 5px 10px;
    cursor: pointer;
}

.TripListPanel
.add-bar .add:hover {
    background-color: #80CAD8;
    color: #FFF;
}

.TripListPanel .add-bar .add[disabled],
.TripListPanel .add-bar .add:hover[disabled] {
    background-color: #FFF;
    border-color: #CCC;
    color: #CCC;
    cursor: not-allowed;
}

.TripListPanel
.search-results {
    width: 100%;
    margin: 0;
    height: calc(100% - 60px*2);
}


</style>
