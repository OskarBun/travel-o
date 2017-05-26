<template>
    <div class="PlanPage">
        <div class="panel left-panel" :class="{closed:!show_left}">
            <div class="close close-left" @click="toggle_left">
                <div class="arrow arrow-right">«</div>
            </div>
            <div class="panel-content">
                <router-view class="view"></router-view>
            </div>
        </div>
        <div class="panel centre-panel">
            <map-panel></map-panel>
        </div>
        <div class="panel right-panel"  :class="{closed:!show_right}">
            <div class="close close-right" @click="toggle_right">
                <div class="arrow arrow-left">»</div>
            </div>
            <div class="panel-content">
                <component :is="action"></component>
                <!-- <destination-search-panel></destination-search-panel> -->
                <!-- <user-search-panel></user-search-panel> -->
            </div>
        </div>
    </div>
</template>

<script>
// JS
// –– Vuex Helpers
import { mapState } from 'vuex'

// –– Dependencies
import event_bus from '../event.js';

// –– Panels
import MapPanel from '../panels/map.vue';
import DestinationSearchPanel from '../panels/destination_search.vue';
import UserSearchPanel from '../panels/user_search.vue';



// resize sent to event bus for google maps
function smooth_resize(){
    setTimeout(() => {
        event_bus.$emit('map/resize')
    }, 500)
}

export default {
    components: {
        'map-panel': MapPanel,
        'destination-search-panel': DestinationSearchPanel,
        'user-search-panel': UserSearchPanel,
    },
    data() {
        return {
            show_left: true,
            show_right: true,
            action: 'destination-search-panel'
        }
    },
    computed: {
        ...mapState({
            user_id: state => state.user.id
        })
    },
    methods: {
        toggle_left() {
            this.show_left = !this.show_left
            smooth_resize()
        },
        toggle_right() {
            this.show_right = !this.show_right
            smooth_resize()
        },
        adding_user() {
            this.action = 'user-search-panel'
        },
        adding_destination() {
            this.action = 'destination-search-panel'
        }
    },
    created() {
        // redirect to sign in page
        if(!this.user_id) {
            this.$router.push({name:'map'})
        }
    },
    mounted() {
        event_bus.$on('show_add_user', this.adding_user)
        event_bus.$on('show_add_destination', this.adding_destination)
    }
}
</script>

<style>
    .PlanPage {
        display: flex;
        width: 100%;
        height: 100%;
        background: #FFF;
        box-sizing: border-box;
        border-top: 3px solid #F9D068;
    }

    .PlanPage
    .panel {
        position: relative;
        max-width: 100%;
        min-width: 350px;
        height: 100%;
        box-sizing: border-box;
        transition: all .5s;
    }
    .PlanPage .panel.centre-panel {
        background: #69AEBB;
        flex-grow: 1;
    }
    .PlanPage .panel.left-panel { border-right: 3px solid #F9D068; }
    .PlanPage .panel.right-panel { border-left: 3px solid #F9D068; }

    .PlanPage
    .panel.closed {
        width: 0px;
        min-width: 0px;
    }

    .PlanPage
    .panel .close {
        position: absolute;
        top: calc(50% - 50px/2);
        z-index: 1;

        display: flex;
        align-items: center;
        width: 50px;
        height: 50px;

        border: 3px solid #F9D068;
        border-radius: 50%;
        box-sizing: border-box;
        background: #FFF;

        text-align: center;
        cursor: pointer;

        transition: all .5s;
    }

    /* show hide on hover */
    .PlanPage .panel .close.close-right { left: 0 }
    .PlanPage .panel:hover .close.close-right { left: calc(-50px/2) }
    .PlanPage .panel .close.close-left { right: 0 }
    .PlanPage .panel:hover .close.close-left { right: calc(-50px/2)}


    .PlanPage
    .panel .close .arrow {
        width: 100%;
    }
    .PlanPage .panel .close .arrow.arrow-right { padding-left: 20px; }
    .PlanPage .panel .close .arrow.arrow-left { padding-right: 20px; }

    .PlanPage
    .panel .panel-content {
        position: absolute;
        top: 0; bottom: 0;
        left: 0; right: 0;
        overflow: hidden;
        z-index: 2;
        background: #FFF;
        overflow: hidden;
    }

    .PlanPage
    .panel .panel-content
    .view {
        min-width: 350px;
    }

</style>
