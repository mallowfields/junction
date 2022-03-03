// Main Vue infrastructure
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import '@/scss/app.scss'
import 'leaflet/dist/leaflet.css'
import LoadScript from 'vue-plugin-load-script'

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
