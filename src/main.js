// JS Imports
// –– Vue
import Vue from 'vue'
// –– Vue Router
import VueRouter from 'vue-router'
// -- Vuex Store
import store from './store/store';

// –– Root Vue Template
import App from './app.vue'

// –– Pages
import HomePage from './pages/home.vue'
import MapPage from './pages/map.vue'
import ProfilePage from './pages/profile.vue'

Vue.config.productionTip = false;

// Vue Configs
// –– Vue Router
Vue.use(VueRouter)

// setup and start app
function begin() {
    // setup route options
    const router = new VueRouter({
        routes: [
            {
                path: '',
                component: HomePage,
                name: 'home',
                props: false
            },
            {
                path: '/map',
                component: MapPage,
                name: 'map',
                props: false
            },
            {
                path: '/user/:id?',
                component: ProfilePage,
                name: 'user',
                props: true
            }
        ]
    })

    // begin render
    new Vue({
        el: '#Main',
        store,
        router,
        render: h => h(App)
    })
}

// delay start of app to make loading spinner less jarring
setTimeout(begin, 2500)
