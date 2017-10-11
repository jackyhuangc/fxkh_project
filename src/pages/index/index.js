import Vue from 'vue'
import VueResource from 'vue-resource'
import Index from './index.vue'

/*使用VueResource插件*/
Vue.use(VueResource)

var token = localStorage.getItem('token');
if (!token) {
  console.log("您未登录或长时间未操作，请重新登录！");
  window.location.href = "/";
}
else {
  Vue.http.get("http://" + window.ApiServer + "/api/UserCenter/GetUserInfoByToken"
    + "?token=" + token)
    .then((rep) => {
      console.log(rep.data);
    });
}

new Vue({
  el: '#app',
  template: '<Index/>',
  components: { Index }
})
