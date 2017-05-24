<template>
    <div class="MapPanel">
        <gmap-map
        :center="center"
        @center_changed="updateCenter"
        :zoom="10"
        class="gmap"
        ref="map"
        >
        <gmap-marker
        v-for="(m,i) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
        ></gmap-marker>
    </gmap-map>
</div>
</template>

<script>
/////////////////////////////////////////
// New in 0.4.0
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import event_bus from '../event.js'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCrVVmnCNhwjYFiH5IbxOAsZMu1aNzp0ms'
        // libraries: 'places', //// If you need to use place input
    }
});

export default {
    data () {
        return {
            center: {lat: 51.4545, lng: -2.5879},
            markers: [{
                position: {lat: 10.0, lng: 10.0}
            }, {
                position: {lat: 11.0, lng: 11.0}
            }]
        }
    },
    methods: {
        updateCenter(center) {
            this.center = {
                lat: center.lat(),
                lng: center.lng()
            }
        }
    },
    mounted() {
        event_bus.$on('resize map', ()=>{
            Vue.$gmapDefaultResizeBus.$emit('resize')
        })
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
</style>
