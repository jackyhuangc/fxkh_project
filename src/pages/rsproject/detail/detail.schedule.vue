<template>
  <div id="schedule_list" v-show="show">
    <!--<li v-for="(item,index) in msg1.data">
              <a href='#'>{{item}}</a>
              </li>-->
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;text-align: center;">
      <legend>{{title}}</legend>
    </fieldset>
  
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li class="layui-this">调度方案</li>
        <li>度汛方案</li>
        <li>应急预案</li>
        <li>批复文件</li>
        <span style="margin-top:10px;margin-right:10px; float:right;" @click="upload()">
          <button class="layui-btn layui-btn-mini">
            <i class="layui-icon"></i>预案上传</button>
        </span>
      </ul>
      <div class="layui-tab-content" style="height: 100px;">
        <div class="layui-tab-item layui-show">
          <table class="layui-table" lay-even="" lay-skin="nob">
            <colgroup>
              <col width="300">
              <col width="100">
              <col width="100">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th>调度方案</th>
                <th>文件等级</th>
                <th>上传时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in schplans">
                <td>
                  <a v-bind:href="item.docPath" target="_blank">{{item.planDocName}}</a>
                </td>
                <td>{{convertPlanLevel(item.planLevel)}}</td>
                <td>{{new Date(item.addTime).format("yyyy-MM-dd hh:mm")}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="layui-tab-item">
          <table class="layui-table" lay-even="" lay-skin="nob">
            <colgroup>
              <col width="300">
              <col width="100">
              <col width="100">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th>度汛方案</th>
                <th>文件等级</th>
                <th>上传时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in floodplans">
                <td>{{item.planDocName}}</td>
                <td>{{convertPlanLevel(item.planLevel)}}</td>
                <td>{{new Date(item.addTime).format("yyyy-MM-dd hh:mm")}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="layui-tab-item">
          <table class="layui-table" lay-even="" lay-skin="nob">
            <colgroup>
              <col width="300">
              <col width="100">
              <col width="100">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th>应急预案</th>
                <th>文件等级</th>
                <th>上传时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in emergencyplans">
                <td>{{item.planDocName}}</td>
                <td>{{convertPlanLevel(item.planLevel)}}</td>
                <td>{{new Date(item.addTime).format("yyyy-MM-dd hh:mm")}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="layui-tab-item">
          <table class="layui-table" lay-even="" lay-skin="nob">
            <colgroup>
              <col width="300">
              <!--<col width="100">
                <col width="80">-->
              <col width="120">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th>批复文件</th>
                <!--<th>批复机构</th>
                  <th>批复时间</th>-->
                <th>上传时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in replyplans">
                <td>
                  <a v-bind:href="item.docPath" target="_blank">{{item.planDocName}}</a>
                </td>
                <!--<td>{{item.replyUser}}</td>
                  <td v-if="item.replyTime==null"></td>
                  <td v-else>{{new Date(item.replyTime).format("yyyy-MM-dd")}}</td>-->
                <!--td>{{ getLocalTime((new Date(item.addTime).getTime()-8*60*60*1000)/1000)}}</td-->
                <td>{{ new Date(item.addTime).format("yyyy-MM-dd hh:mm")}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello1',
  props: ['msg1'],// 可用于值传递
  data() {
    return {
      show: false,
      title: '',
      ennmcd: '',
      schplans: [],
      floodplans: [],
      emergencyplans: [],
      replyplans: []
    }
  },
  methods: {
    queryfile: function (item) {
      //alert(id);
      this.title = item.ennm + '-[' + item.dsnm + ']';
      this.ennmcd = item.ennmcd;
      //console.log("接收到传过来的参数"+id);


      //layer.msg("预案查询...");
      this.$http.get("/api/PlatResource/QueryEmergencyPlan"
        + "?page=" + 1
        + "&docname="
        + "&ennmcd=" + item.ennmcd
        + "&districtcode="
        + "&plantype=31"
        + "&planlevel=-1"
      )
        .then((response) => {
          if (response.data.code = '000') {
            this.schplans = response.data.data;
            //layer.msg("查询结果"+JSON.stringify(response.data.data));
          }
        });

      this.$http.get("/api/PlatResource/QueryEmergencyPlan"
        + "?page=" + 1
        + "&docname="
        + "&ennmcd=" + item.ennmcd
        + "&districtcode="
        + "&plantype=32"
        + "&planlevel=-1"
      )
        .then((response) => {
          if (response.data.code = '000') {
            this.floodplans = response.data.data;
            //layer.msg("查询结果"+JSON.stringify(response.data.data));
          }
        });

      this.$http.get("/api/PlatResource/QueryEmergencyPlan"
        + "?page=" + 1
        + "&docname="
        + "&ennmcd=" + item.ennmcd
        + "&districtcode="
        + "&plantype=33"
        + "&planlevel=-1"
      )
        .then((response) => {
          if (response.data.code = '000') {
            this.emergencyplans = response.data.data;
            //layer.msg("查询结果"+JSON.stringify(response.data.data));
          }
        });

      this.$http.get("/api/PlatResource/QueryEmergencyPlan"
        + "?page=" + 1
        + "&docname="
        + "&ennmcd=" + item.ennmcd
        + "&districtcode="
        + "&plantype=8"
        + "&planlevel=-1"
      )
        .then((response) => {
          if (response.data.code = '000') {
            this.replyplans = response.data.data;
            //layer.msg("查询结果"+JSON.stringify(response.data.data));
          }
        });
    },
    upload: function () {
      layer.closeAll();
      // 上传预案
      layer.open({
        type: 2,
        skin: 'layui-layer-lan',
        maxmin: false,
        title: '上传预案',
        area: ['800px', '500px'],
        content: ['../fileupload-rs/index.html?ennmcd=' + this.ennmcd, 'yes'],
        end: function () {
        }
      });
    },
    convertPlanLevel: function (level) {
      switch (level) {
        case 1:
          return "省级";
        case 2:
          return "市州";
        case 3:
          return "区县";
        default:
          break;
      }

      return "";
    }
  }
}

layui.use(['element', 'layer'], function () {
  var element = layui.element()
    , layer = layui.layer;

  element.on('tab(docDemoTabBrief)', function (data) {
    //layer.msg('切到到了'+ data.index + '：' + this.innerHTML);
  });
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#schedule_list {}

.layui-elem-field legend {
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
}

a {
  font-size: 14px;
}




/*.layui-table
  {
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:keep-all;
  }*/
</style>
