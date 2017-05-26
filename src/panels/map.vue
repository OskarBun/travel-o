<template>
    <div class="MapPanel">
        <gmap-map
        :center="center"
        @center_changed="update_center"
        :zoom="10"
        class="gmap"
        ref="map"
        :options="{styles}"
        >
        <gmap-marker
        v-for="(m,i) in markers"
        :position="m.position"
        @click="center=m.position"
        :key="i"
        :icon="m.icon"
        ></gmap-marker>
        <gmap-polyline
        :path="path"
        :options="line_options"
        ></gmap-polyline>
    </gmap-map>
</div>
</template>

<script>
// JS Imports
// –– Vue / Vuex
import Vue from 'vue'
import {mapState} from 'vuex'

// –– Dependencies
import * as VueGoogleMaps from 'vue2-google-maps'
import event_bus from '../event.js'
import styles from '../assets/google_maps_theme.json'

// –– Assets
import flag from '!raw-loader!../assets/markers/centre/map_marker_small.svg'


//  colorise flag
function colored_icon(color){
    return "data:image/svg+xml," + encodeURIComponent(flag.split("#fff").join(color))
}

// Load google maps into Vue
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCrVVmnCNhwjYFiH5IbxOAsZMu1aNzp0ms'
    }
});

// Google Maps loaded callback
VueGoogleMaps.loaded.then(()=>{
    //
})

export default {
    data () {
        return {
            center: {lat: 51.4545, lng: -2.5879},
            styles
        }
    },
    computed: {
        path(){
            return this.markers.map(m=>m.position)
        },
        line_options(){
            return {
                geodesic: true,
                strokeWeight: 1,
                strokeColor: this.$store.state.user.color
            }
        },
        ...mapState({
            markers: state => state.trip.destinations.map((d)=>{
                return {
                    position: {lat: d.lat, lng: d.lng},
                    icon: colored_icon(d.user.color)
                }
            })
        })
    },
    methods: {
        update_center(center) {
            this.center = {
                lat: center.lat(),
                lng: center.lng()
            }
        }
    },
    watch: {
        markers(newList, oldList){
            if(newList.length === oldList.length) return;
            if(google && newList.length > 0){
                let rb = null
                newList.forEach(d=>{
                    if(rb===null){
                        rb = new google.maps.LatLngBounds(d.position, d.position)
                    } else {
                        rb.extend(d.position)
                    }
                })
                this.$refs.map.fitBounds(rb)
            }
        }
    },
    mounted() {
        const map = this.$refs.map
        event_bus.$on('map/resize', ()=>{
            Vue.$gmapDefaultResizeBus.$emit('resize')
        })
        event_bus.$on('map/bounds', ({bounds})=>{
            map.fitBounds(bounds)
        })
        event_bus.$on('map/center', function({center}){
            this.center = center
        }.bind(this))
    },
    destroyed() {
        this.$store.commit("reset_trip")
    }
}
</script>


<style>
.MapPanel {
    width: 100%;
    height: 100%;
}

.MapPanel
.gmap {
    width: 100%;
    height: 100%;
}

.MapPanel
.marker {
    width: 50px;
    height: 50px;
}
</style>
