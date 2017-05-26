<template>
    <div class="DestinationSearchPanel">
        <div class="header">
            <input class="search-text" placeholder="Search somewhere to visit..." type="text" ref="search" v-model.lazy="search"/>
            <span class="lnr lnr-magnifier" @click="$refs.search.focus()"></span>
        </div>
        <ul class="body">
            <li class="destination" v-for="destination in results" @click="view_destination(destination)">
                <div class="name">{{destination.formatted_address}}</div>
                <div class="add" @click="add_to_trip(destination)" v-if="trip">
                    <span class="lnr lnr-plus-circle"></span>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
// JS Imports
// -- Vuex Helpers
import { mapState } from 'vuex'
import event_bus from '../event'


export default {
    computed: {
        search: {
            get() {
                return this.$store.state.destination.search.query
            },
            set(query) {
                if(query)
                this.$store.dispatch('search_destination', {query})
            }
        },
        ...mapState({
            results: state => state.destination.search.results,
            trip: state => state.trip.id
        })
    },
    methods: {
        view_destination(d){
            if(d.location_bounds)
            event_bus.$emit('map/bounds', {bounds: {
                east: d.location_bounds.northeast.lng,
                north: d.location_bounds.northeast.lat,
                south: d.location_bounds.southwest.lat,
                west: d.location_bounds.southwest.lng
            }})
            else
            event_bus.$emit('map/center', {center: d.location})
        },
        add_to_trip(d){
            this.$store.dispatch('add_destination', {
                lng: d.location.lng,
                lat: d.location.lat,
                name: d.formatted_address
            })
        }
    },
    watch: {
        results(newList){
            const top = newList[0];
            if(top){
                this.view_destination(top)
            }
        }
    }
}
</script>


<style>
.DestinationSearchPanel {
    position: relative;
    width: 100%;
    height: 100%;
}

.DestinationSearchPanel .header,
.DestinationSearchPanel .footer {
    display: flex;
    align-items: center;
    width: 90%;
    height: 60px;
    margin: auto;

    line-height: 30px;
    font-size: 20px;
}

.DestinationSearchPanel .header .search-text,
.DestinationSearchPanel .header .lnr {
    display: block;
    height: 30px;
    border: none;
    border-bottom: 1px solid #69AEBB;
    box-sizing: border-box;
}

.DestinationSearchPanel
.header .search-text {
    flex-grow: 1;
}

.DestinationSearchPanel .header .search-text:focus,
.DestinationSearchPanel .header .search-text:focus + .lnr {
    border-color: #F9D068;
}

.DestinationSearchPanel
.header .search-text:focus + .lnr {
    color: #F9D068;
}

.DestinationSearchPanel
.header .lnr:before {
    vertical-align: middle;
    cursor: pointer;
}

.DestinationSearchPanel
.body {
    width: 100%;
    margin: 0;
    height: calc(100% - 60px);
    padding: 10px 0px;
    box-sizing: border-box;
    overflow: auto;
    list-style: none;
}


.DestinationSearchPanel
.body
.destination {
    display: flex;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;

    color: #000;
    border-bottom: 1px solid #F1F1F1;
    background: #FFF;

    line-height: 20px;
    vertical-align: middle;
}

.DestinationSearchPanel
.body
.destination:first-child {
    border-top: 1px solid #F1F1F1;
}

.DestinationSearchPanel
.body
.destination:hover {
    background-color: #E8F8FB;
}

.DestinationSearchPanel
.body .destination
.name {
    flex-grow: 1;
}

.DestinationSearchPanel
.body .destination
.add {
    display: block;
    width: 50px;
    font-size: 18px;
    text-align: center;
}

.DestinationSearchPanel
.body .destination
.add:hover {
    color: #F9D068;
    font-weight: bold;
    cursor: pointer;
}

</style>
