/*引入Vue框架*/
import Vue from 'vue'
/*引入资源请求插件*/
import VueResource from 'vue-resource'
import Index from './index.vue'

/*使用VueResource插件*/
Vue.use(VueResource)
// Vue.config.productionTip = false
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.emulateJSON = true

// 命名规范
//http://blog.csdn.net/webgongcheng/article/details/52188464 
//css:      .test_css
//js(方法): testFunction()
//js(变量): nCounter
//文件夹    test-files
//文件      test.min.js
Vue.http.interceptors.push(function (request, next) {

  var token = "default";
  if (window.localStorage) {
    token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('token', 'default');
      token = localStorage.getItem('token');
    }
  }

  Vue.http.headers.common.Authorization = 'WJ ' + token;

  next(function (response) {

  })
})
var vm = new Vue({
  el: '#app',
  template: '<Index/>',
  components: { Index },

});       