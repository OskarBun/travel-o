<template>
    <div class="LocationSearchPanel">
        <div class="header">
            <input class="search-text" placeholder="Search for somewhere to visit..." type="text" ref="search" v-model="search"/>
            <span class="lnr lnr-magnifier" @click="$refs.search.focus()"></span>
        </div>
        <ul class="body">
            <li class="location" v-for="location in results">
                <span class="name">{{location.name}}</span>
            </li>
        </ul>
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
                return this.$store.state.location.search.query
            },
            set(query) {
                this.$store.dispatch('search_location', {query})
            }
        },
        ...mapState({
            results: state => state.location.search.results,
            trip_id: state => state.trip.id,
            user_id: state => state.user.id
        })
    },
}
</script>


<style>
.LocationSearchPanel {
    position: relative;
    width: 100%;
    height: 100%;
}

.LocationSearchPanel .header,
.LocationSearchPanel .footer {
    display: flex;
    align-items: center;
    width: 90%;
    height: 60px;
    margin: auto;

    line-height: 30px;
    font-size: 20px;
}

.LocationSearchPanel .header .search-text,
.LocationSearchPanel .header .lnr {
    display: block;
    height: 30px;
    border: none;
    border-bottom: 1px solid #69AEBB;
    box-sizing: border-box;
}

.LocationSearchPanel
.header .search-text {
    flex-grow: 1;
}

.LocationSearchPanel .header .search-text:focus,
.LocationSearchPanel .header .search-text:focus + .lnr {
    border-color: #F9D068;
}

.LocationSearchPanel
.header .search-text:focus + .lnr {
    color: #F9D068;
}

.LocationSearchPanel
.header .lnr:before {
    vertical-align: middle;
    cursor: pointer;
}

.LocationSearchPanel
.body {
    width: 100%;
    margin: 0;
    height: calc(100% - 60px);
    padding: 10px 0px;
    box-sizing: border-box;
    overflow: auto;
    list-style: none;
}


.LocationSearchPanel
.body
.location {
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;

    color: #000;
    border-bottom: 1px solid #F1F1F1;
    background: #FFF;
}

.LocationSearchPanel
.body
.location:first-child {
    border-top: 1px solid #F1F1F1;
}

.LocationSearchPanel
.body
.location:hover {
    background-color: #E8F8FB;
}

</style>
