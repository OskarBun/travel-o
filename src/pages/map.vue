<template>
    <div class="MapPage">
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
                hello
            </div>
        </div>
    </div>
</template>

<script>
import mapPanel from '../panels/map.vue';
import event_bus from '../event.js';


function smooth_resize(){
    setTimeout(() => {
        event_bus.$emit('resize map')
    }, 100);
    setTimeout(() => {
        event_bus.$emit('resize map')
    }, 280);
    setTimeout(() => {
        event_bus.$emit('resize map')
    }, 500);
}

export default {
    components: {
        mapPanel
    },
    data() {
        return {
            show_left: true,
            show_right: false
        }
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
    }
}
</script>

<style>
    .MapPage {
        display: flex;
        width: 100%;
        height: 100%;
        background: #FFF;
        box-sizing: border-box;
        border-top: 3px solid #F9D068;
    }

    .MapPage
    .panel {
        position: relative;
        max-width: 100%;
        min-width: 350px;
        height: 100%;
        box-sizing: border-box;
        transition: all .5s;
    }
    .MapPage .panel.centre-panel {
        background: #69AEBB;
        flex-grow: 1;
    }
    .MapPage .panel.left-panel { border-right: 3px solid #F9D068; }
    .MapPage .panel.right-panel { border-left: 3px solid #F9D068; }

    .MapPage
    .panel.closed {
        width: 0px;
        min-width: 0px;
    }

    .MapPage
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
    .MapPage .panel .close.close-right { left: 0 }
    .MapPage .panel:hover .close.close-right { left: calc(-50px/2) }
    .MapPage .panel .close.close-left { right: 0 }
    .MapPage .panel:hover .close.close-left { right: calc(-50px/2)}


    .MapPage
    .panel .close .arrow {
        width: 100%;
    }
    .MapPage .panel .close .arrow.arrow-right { padding-left: 20px; }
    .MapPage .panel .close .arrow.arrow-left { padding-right: 20px; }

    .MapPage
    .panel .panel-content {
        position: absolute;
        top: 0; bottom: 0;
        left: 0; right: 0;
        overflow: hidden;
        z-index: 2;
        background: #FFF;
        overflow: hidden;
    }

    .MapPage
    .panel .panel-content
    .view {
        min-width: 350px;
    }

</style>
