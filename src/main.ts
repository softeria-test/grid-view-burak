import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Just like main.js in ordinary JS, generic implementations are done here.
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
