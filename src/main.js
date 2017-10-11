// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Login from './pages/sso/index.vue'

/*使用VueResource插件*/
Vue.use(VueResource)
// Vue.http.options.xhr = { withCredentials: true }
// Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Login/>',
  components: { Login }
})
