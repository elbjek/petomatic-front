import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
Vue.prototype.$eventBus = new Vue()


Vue.use(Vuetify)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})