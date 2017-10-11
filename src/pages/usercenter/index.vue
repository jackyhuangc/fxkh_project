<style scoped>
#app {
  padding-left: 12px;
  padding-right: 12px;
}

.tools {
  height: 33px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tools .toolbar {
  margin-bottom: 0px;
}
</style>

<template>
  <div id="app">
    <div class="tools">
      <ul class="toolbar">
        <li>
          <label for="username">用户名</label>
          <input id="username" class="datainp datasel" v-model="username" placeholder="请输入用户名或手机号" @keyup="enter_keyup($event)" />
        </li>
  
        <li>
          <a href="javascript:void(0);" @click="query()">
            <i class="fa fa-search"></i>查询</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="javascript:void(0);" @click="add()">
            <i class="fa fa-plus"></i>添加</a>
        </li>
      </ul>
    </div>
  
    <table class="tablelist">
      <thead>
        <tr>
          <th>序号
            <i class="sort"></i>
          </th>
          <th>用户名</th>
          <th>手机号</th>
          <th>邮箱</th>
          <th>最近登录</th>
          <th>分组</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in listGrid">
          <td>{{((curr-1)*20)+index+1}}</td>
          <td>{{item.userName}}</td>
          <td>{{item.telphone}}</td>
          <td>{{item.email}}</td>
          <td>{{ item.lastLoginTime==null?"":new Date(item.lastLoginTime).format("yyyy-MM-dd hh:mm")}}</td>
          <td></td>
          <td>{{item.remark}}</td>
          <td>
            <a href="#" class="tablelink" @click='modify(item)'>权限分配</a>
          </td>
        </tr>
      </tbody>
    </table>
  
    <div style="height:55px;line-height:55px;">
      <div id="pager" style="float:left;">
      </div>
      <div style="float:left;">
        <div style="padding-left:17px; margin-top:-3px;font-size:12px;">{{total}}</div>
      </div>
    </div>
    <detailinfo ref="info">
    </detailinfo>
  </div>
</template>

<script>
import detailinfo from './detail/detail.info.vue'
export default {
  components: {
    detailinfo
  },
  data() {

    return {
      curr: 1,
      total: '总共0条数据',
      username: '',
      listGrid: []
    }
  },
  watch: {
  },
  methods: {
    add: function () {

      var info = this.$refs.info,
        vm = this;
      layer.open({
        type: 1,
        skin: 'layui-layer-lan',
        title: '权限分配[新增]',
        area: ['800px', '550px'],
        scrollbar: false,// 让父页面滚动条失效      
        content: $('#schedule_list'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        success: function (layero, index) {
          info.queryDetail({});
        },
        cancel: function () {
        },
        end: function () {
          vm.query(1);
        }
      });
    },
    modify: function (item) {
      var info = this.$refs.info,
        vm = this;
      layer.open({
        type: 1,
        skin: 'layui-layer-lan',
        title: '权限分配[' + item.userName + ']',
        area: ['800px', '550px'],
        scrollbar: false,// 让父页面滚动条失效      
        content: $('#schedule_list'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        success: function (layero, index) {
          info.queryDetail(item);
        },
        cancel: function () {
        },
        end: function () {
          vm.query(1);
        }
      });
    },
    query: function (page) {

      if (!page)
        page = 1;

      //layer.msg("预案查询...");
      this.$http.get("/api/UserCenter/QueryUser"
        + "?page=" + page
        + "&pageSize=20"
        + "&username=" + (this.username)
      )
        .then((response) => {

          if (response.data.code = '000') {
            this.listGrid = response.data.data;

            var query = this.query;
            this.curr = page;
            // 第一页时，需要重新初始化
            if (page == 1) {
              // 获取总页数

              this.$http.get("/api/UserCenter/QueryUserCount"
                + "?username=" + (this.username), {
                  headers: {
                    "X-Requested-With": "XMLHttpRequest"
                  }
                })
                .then((rep) => {
                  console.log(rep.data);
                  if (rep.data.code = '000') {
                    this.total = '总共' + rep.data.data + '条数据';
                    layui.use(['laypage', 'layer'], function () {
                      var laypage = layui.laypage
                        , layer = layui.layer;

                      laypage({
                        cont: 'pager'
                        , pages: ((rep.data.data) / 20 + ((rep.data.data) % 20 > 0 ? 1 : 0))
                        , curr: page
                        , skin: '#1E9FFF'
                        , jump: function (obj, first) {
                          if (!first) {
                            query(obj.curr);
                          }
                        }
                      });

                    });
                  }
                });
            }
          }
          else
            layer.msg(response.data.error);
        })
        .catch(function (response) {
          console.log(response)
        });
    },
    enter_keyup: function (ev) {
      if (ev.keyCode == 13) {
        this.query(1);
      }
    }
  },
  created: function () {
    console.log("created");

  },
  mounted() {
    console.log("mounted");
    this.query(1);
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated: function () {
    console.log("updated");
  },
  destroyed: function () {
    console.log("destroyed");
  },
}
//this.$refs.input1.value
</script>