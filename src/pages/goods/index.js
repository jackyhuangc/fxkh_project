import Vue from 'vue'
import Index1 from './index.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<Index1/>',
  components: { Index1 }
})
