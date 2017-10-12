<template>
  <div id="app">
    <div style="height:50px;">
      <div class="topleft">
        <a href="#" target="_parent" class="logo"><img src="../../../static/Content/images/zhxx_logo.png" height="50" width="50" title="系统首页" style="float: left;" />xxxxxxxxx</a>
      </div>

      <!--ul class="nav">
                        <li>
                        <router-link to="/left">left</router-link>
                        </li>
                        <li>
                        <router-link to="/left1">left1</router-link>
                        </li>
                			</ul-->

      <top v-bind:menus="menus" ref="top">
        <!--这是顶部菜单-->
      </top>

      <div class="topright">
        <div class="user">
          <span>{{user}}</span>|
          <a href="javascript:void(0);" @click="exit()">
            <i>Exit</i>
          </a>
        </div>
      </div>
    </div>

    <div id="rightside">
      <iframe id="rightFrame" name="rightFrame" src="/pages/social-economy/index.html" frameborder="0" height="100%" width="100%"></iframe>
    </div>
  </div>
</template>

<script>
import top from './nav/top.vue'
import left from './nav/left.vue'
export default {
  name: 'app1',
  components: {
    top,
    left
  },
  data() {

    return {
      user: 'admin',
      // 左侧菜单
      menus: {
        selected: '',
        data: []
      },
    }
  },
  methods: {

    exit: function() {
      window.localStorage.clear();
      window.location = "/";
    }
  },
  created: function() {
    console.log("created");
    //初始化操作，如菜单
  },
  mounted() {
    console.log("mounted");

    var token = localStorage.getItem('token');
    this.$http.get("/api/UserCenter/GetUserInfoByToken"
      + "?token=" + token)
      .then((rep) => {
        console.log(rep.data);
        this.user = rep.data.data.userName;
      });
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated: function() {
    console.log("updated");
  },
  destroyed: function() {
    console.log("destroyed");
  }
}
</script>

<style scoped>

</style>
