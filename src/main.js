import Vue from 'vue'
import store from './store/store';
import App from './App.vue'

Vue.config.productionTip = false;

window.app = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

if (module.hot) {
  module.hot.accept()
}
