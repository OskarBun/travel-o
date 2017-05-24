<template>
    <div class="TripPanel">
        <div class="header">
            <div class="title">{{title}}</div>
        </div>
        <ul class="body">
            <li class="location" v-for="location in locations">
                <span class="icon"><icon fill="#000"></icon></span>
                <span class="name">{{location.latlon}}</span>
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
            set(name) {
                this.$store.dispatch('update_trip', {title})
            }
        },
        ...mapState({
            locations: state => state.trip.locations
        })
    },
    methods: {
        back() {
            // navigate to maps
            this.$router.push({name:'map'})
        }
    },
    mounted() {
        if(this.id) {
            this.$store.dispatch('get_trip', {id:this.id})
        }
        else {
            this.back()
        }
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
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;

    color: #000;
    border-bottom: 1px solid #F1F1F1;
    background: #FFF;
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
.footer .back {
    text-align: center;
    width: 100%;
    border: 2px solid #69AEBB;
    pbacking: 5px 10px;
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
