import Vue from 'vue'
import Vuex from 'vuex'

import ws from '../ws';

import location from './location';
import trip from './trip';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        location,
        trip,
        user
    },
    plugins: [ws.vuex]
});

export default store;

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./trip', './user', './location'], () => {
    // swap in the new actions and mutations
    store.hotUpdate({
      modules: {
        user: require('./user').default,
        trip: require('./trip').default,
        location: require('./location').default
      }
    })
  })
}
