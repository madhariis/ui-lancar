import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueQrcodeReader from 'vue-qrcode-reader'
import VCalendar from 'v-calendar'

import 'v-calendar/lib/v-calendar.min.css'
Vue.config.productionTip = false
Vue.use(VueQrcodeReader)
Vue.use(VCalendar, {

})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
