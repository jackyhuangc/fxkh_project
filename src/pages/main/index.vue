<template>
  <div id="app">
    <div style="height:50px;">
      <div class="topleft">
        <a href="#" target="_parent" class="logo"><img src="../../../static/Content/images/logoV1.png" height="50" width="50" title="系统首页" style="float: left;margin-top:0px;margin-left:0px;" />xxxxxxxxx</a>
      </div>
      <top v-bind:menus="menus" ref="top">
        <!--这是顶部菜单-->
      </top>

      <div class="topright">
        <div class="user">
          <span>{{user}}</span>
          <a href="javascript:void(0);" @click="download()">
            <i>Download</i>
          </a>
          |
          <a href="javascript:void(0);" @click="exit()">
            <i>Exit</i>
          </a>
        </div>
      </div>
    </div>

    <div id="rightside">
      <iframe id="rightFrame" name="rightFrame" src="/pages/monitor-center/index.html" frameborder="0" height="100%" width="100%"></iframe>
    </div>

    <download ref="down">
    </download>
  </div>
</template>

<script>
import top from './nav/top.vue'
import left from './nav/left.vue'
import download from './tool/tool.download.vue'
export default {
  name: 'app1',
  components: {
    top,
    left,
    download
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
    download: function() {

      var inf = this.$refs.down;
      layer.open({
        type: 1,
        skin: 'layui-layer-azure',
        title: false, //不显示标题
        area: ['600px', '330px'],
        content: $('#panel_down'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        success: function(layero, index) {
        },
        cancel: function() {
        }
      });
    },
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
