/*引入Vue框架*/
import Vue from 'vue'
//Vue-router用于单页面组件页面的跳转，一个页面是由多个组件构成的，所以在跳转页面的时候，并不适合用传统的 href，于是 vue-router 应运而生。
//import VueRouter from 'vue-router'
/*引入资源请求插件*/
import VueResource from 'vue-resource'
import Index from './index.vue'

/*使用VueResource插件*/
Vue.use(VueResource)

// Vue.config.productionTip = false
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.emulateJSON = true
// request.headers = _.extend({}, _.http.headers.common,
//     !request.crossOrigin ? _.http.headers.custom : {},
//     _.http.headers[request.method.toLowerCase()],
//     request.headers
// );
// request 在发送前会把 common 数组加入 headers，而 custom，只有当访问地址非异域的时候才加入 headers
//定义子组件，子组件必须在父组件之前定义。    

// Vue.http.interceptors.push(function (request, next) {

//   // var token = "default";
//   // if (window.localStorage) {
//   //   token = localStorage.getItem('token');
//   //   if (!token) {
//   //     localStorage.setItem('token', 'default');
//   //     token = localStorage.getItem('token');
//   //     // // 未授权跳转
//   //     //window.location.href = "/";
//   //   }
//   // }

//   // // 因为跨域，改方法设置无效
//   // //request.headers['token'] = 'xxx'
//   // Vue.http.headers.common.Authorization = 'WJ ' + token;
//   // //Vue.http.headers.common['token'] = "xxx";

//   // next(function (response) {

//   // })
// });

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

// 根实例只能有一个
var vm = new Vue({
  el: '#app',
  template: '<Index/>',
  components: { Index } // 用Index组件渲染#app跟实例
});
