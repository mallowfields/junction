// Main Vue infrastructure
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import '@/scss/app.scss'
import 'leaflet/dist/leaflet.css'
import LoadScript from 'vue-plugin-load-script'

import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(LoadScript)

Vue.prototype.installPromptEvent = window.installPromptEvent
Vue.prototype.window = window
window.app = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
