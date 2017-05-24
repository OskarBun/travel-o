<template>
    <div class="TripListPanel">
        <div class="search-bar">
            <input class="search-text" placeholder="Search or create a trip..." type="text" ref="search" v-model="search"/>
            <span class="lnr lnr-magnifier" @click="$refs.search.focus()"></span>
        </div>
        <ul class="search-results" v-if="results">
            <li class="trip" v-for="trip in results" @click="open_trip(trip.id)">
                <span class="name">{{trip.title}}</span>
            </li>
        </ul>
        <div class="no-results" v-else>
        </div>
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
        },
        open_trip(id) {
            // navigate to trip panel
            this.$router.push({ name: 'trip', params: { id } })
        }
    },
    watch: {
        trip_id(new_value) {
            if(new_value) {
                // navigate to trip panel
                this.$router.push({ name: 'trip', params: { id: new_value } })
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
    padding: 10px 0px;
    box-sizing: border-box;
    overflow: auto;
    list-style: none;
}


.TripListPanel
.search-results
.trip {
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;

    color: #000;
    border-bottom: 1px solid #F1F1F1;
    background: #FFF;
}

.TripListPanel
.search-results
.trip:first-child {
    border-top: 1px solid #F1F1F1;
}

.TripListPanel
.search-results
.trip:hover {
    background-color: #E8F8FB;
}

</style>
