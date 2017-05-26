<template>
    <div class="TripPanel">
        <div class="header">
            <input class="name" placeholder="Name your trip" type="text" ref="name" v-model="title"/>
            <span class="lnr lnr-pencil" @click="$refs.name.focus()"></span>
        </div>
        <ul class="body">
            <li class="location" v-for="location in destinations">
                <div class="icon"><icon :fill="location.user.color"></icon></div>
                <div class="name">{{location.name}}</div>
            </li>
        </ul>
        <div class="footer map-link">
            <div class="back" @click="back">Back</div>
        </div>
    </div>
</template>


<script>
// JS Imports
// -- Vuex Helpers
import { mapState } from 'vuex'
// –– Components
import Icon from '../components/icon.vue'

import ws from '../ws.js'


export default {
    components: {
        'icon': Icon,
    },
    props: [ 'id' ],
    computed: {
        title: {
            get() {
                return this.$store.state.trip.title
            },
            set(title) {
                this.$store.dispatch('update_trip', {title})
            }
        },
        ...mapState({
            destinations: state => state.trip.destinations
        })
    },
    methods: {
        back() {
            // navigate to maps
            this.$router.push({name:'map'})
            this.$store.commit('reset_trip')
        }
    },
    mounted() {
        if(this.id) {
            this.$store.dispatch('get_trip', {id:this.id})
        }
        else {
            this.back()
        }
    },
    destroyed() {
        ws.rpc('deregister', {topic: [
            'trip/'+this.id,
            ...this.$store.state.trip.users.filter(user=>user.id!=this.$store.state.user.id).map(user=>'user/'+user.id)
        ]})
    }
}
</script>


<style>
.TripPanel {
    position: relative;
    width: 100%;
    height: 100%;
}

.TripPanel .header,
.TripPanel .footer {
    display: flex;
    align-items: center;
    width: 90%;
    height: 60px;
    margin: auto;

    line-height: 30px;
    font-size: 20px;
}

.TripPanel .header .name,
.TripPanel .header .lnr {
    display: block;
    height: 30px;
    border: none;
    border-bottom: 1px solid #69AEBB;
    box-sizing: border-box;
}

.TripPanel
.header .name {
    flex-grow: 1;
}

.TripPanel .header .name:focus,
.TripPanel .header .name:focus + .lnr {
    border-color: #F9D068;
}

.TripPanel
.header .name:focus + .lnr {
    color: #F9D068;
}

.TripPanel
.header .lnr:before {
    vertical-align: middle;
    cursor: pointer;
}

.TripPanel
.body {
    width: 100%;
    margin: 0;
    height: calc(100% - 60px*2);
    padding: 10px 0px;
    box-sizing: border-box;
    overflow: auto;
    list-style: none;
}

.TripPanel
.body
.location {
    display: flex;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;

    color: #000;
    border-bottom: 1px solid #F1F1F1;
    background: #FFF;

    line-height: 25px;
    vertical-align: middle;
}

.TripPanel
.body
.location:first-child {
    border-top: 1px solid #F1F1F1;
}

.TripPanel
.body
.location:hover {
    background-color: #E8F8FB;
}

.TripPanel
.body .location
.name {
    flex-grow: 1;
}

.TripPanel
.body .location
.icon {
    width: 40px;
    height: 25px;
}

.TripPanel
.footer .back {
    text-align: center;
    width: 100%;
    border: 2px solid #69AEBB;
    padding: 5px 10px;
    cursor: pointer;
}

.TripPanel
.footer .back:hover {
    background-color: #80CAD8;
    color: #FFF;
}

.TripPanel .footer .back[disabled],
.TripPanel .footer .back:hover[disabled] {
    background-color: #FFF;
    border-color: #CCC;
    color: #CCC;
    cursor: not-allowed;
}
</style>
