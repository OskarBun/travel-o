// JS Imports
// –– Vue
import Vue from 'vue'
import Vuex from 'vuex'
// –– Websocket
import ws from '../ws';
// –– Models
import destination from './destination';
import trip from './trip';
import user from './user';
import role from './role';


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        destination,
        trip,
        user,
        role
    },
    plugins: [ws.vuex]
});

export default store;

if (module.hot) {
    // accept actions and mutations as hot modules
    module.hot.accept(['./destination', './trip', './user', './role'], () => {
        // swap in the new actions and mutations
        store.hotUpdate({
            modules: {
                destination: require('./destination').default,
                user: require('./user').default,
                trip: require('./trip').default,
                role: require('./role').default
            }
        })
    })
}
