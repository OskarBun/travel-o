<template>
    <div id="Main">
        <div class="main-header">
            <menu-panel></menu-panel>
        </div>
        <div class="main-content">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>


<script>
// JS Imports
// –– Panels
import MenuPanel from './panels/menu.vue'

// TEMPORARY DATA
// import user_json from './user.json'

// export vue definition
export default {
    name: 'app',
    components: {
        'menu-panel': MenuPanel
    },
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>


<style>
/* ---- Colours ---- */

/* Primary
   #69AEBB
*/

/* Secondary
   #FFDE8D
*/

/* Highlight
   #F9D068
*/


/* ---- General CSS ---- */

body {
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    overflow: hidden;

    font-family: 'Work Sans', sans-serif;
}

h1,h2,h3,h4,h5,.title {
    font-family: 'Quicksand', sans-serif;
    font-weight: 100;
    font-size: 40px;
    line-height: 50px;
}

input,
textarea {
    font-family: inherit;
}

input:focus,
textarea:focus {
    outline: none;
}

a {
    text-decoration: none;
    color: inherit;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #CCC;
  font-family: inherit;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #CCC;
  font-family: inherit;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #CCC;
  font-family: inherit;
}
:-moz-placeholder { /* Firefox 18- */
  color: #CCC;
  font-family: inherit;
}

.break {
    white-space: pre;
}

.centre {
    text-align: center;
}

.right {
    text-align: right;
}

#Main {
    width: 100%;
    height: 100%;
}

#Main .main-header  {
    width: 100%;
    height: 50px;

    background: #69AEBB;
    color: #FFF;
}

#Main .main-content {
    width: 100%;
    height: calc(100% - 50px);

    color: #69AEBB;
    background-color: #FFF;
    background-image:url('./assets/world_outline.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}


/* ---- Media Queries ---- */

/* Larger than mobile */
@media (min-width: 400px) {}

/* Larger than phablet */
@media (min-width: 550px) {}

/* Larger than tablet */
@media (min-width: 750px) {}

/* Larger than desktop */
@media (min-width: 1000px) {}

/* Larger than Desktop HD */
@media (min-width: 1200px) {}


/** ie10mobile.css **/
@-webkit-viewport {
    width: device-width;
}

@-moz-viewport {
    width: device-width;
}

@-ms-viewport {
    width: device-width;
}

@-o-viewport {
    width: device-width;
}

@viewport {
    width: device-width;
}


/* Transitions */

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
