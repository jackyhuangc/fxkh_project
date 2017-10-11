/*引入Vue框架*/
import Vue from 'vue'
/*引入资源请求插件*/
import VueResource from 'vue-resource'
import Index from './index.vue'

/*使用VueResource插件*/
Vue.use(VueResource)

//Vue.http.options.xhr = { withCredentials: true }
// Vue.config.productionTip = false
// Vue.http.options.emulateHTTP = true
// Vue.http.options.emulateJSON = true
// Vue.http.options.xhr = { withCredentials: true }
//Vue.http.options.emulateJSON = true

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
  }
  console.log(token);
  Vue.http.headers.common.Authorization = 'WJ token=' + token;
  next(function (response) {
    console.log(response);
    // 如果返回401未授权，则跳转登录页面
    if (response.status == 401) {
      console.log("您未登录或长时间未操作，请重新登录！");
      window.localStorage.clear();
      window.location.href = "/";
    }
  })
})

var vm = new Vue({
  el: '#app',
  template: '<Index/>',
  components: { Index },

});       