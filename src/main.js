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
import ReportPage from './pages/report.vue'
import TestPage from './pages/test.vue'

// –– Panels
import TripListPanel from './panels/trip_list.vue'
import TripPanel from './panels/trip.vue'


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
                props: false,
                children: [
                    {
                        path: '',
                        name: 'map',
                        component: TripListPanel,
                        props: false,
                    },
                    {
                        path: 'trip/:id',
                        name: 'trip',
                        component: TripPanel,
                        props: true,
                    }
                ]
            },
            {
                path: '/user/:id?',
                component: ProfilePage,
                name: 'user',
                props: true
            },
            {
                path: '/report',
                component: ReportPage,
                name: 'report',
                props: false
            },
            {
                path: '/test',
                component: TestPage,
                name: 'test',
                props: false
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
