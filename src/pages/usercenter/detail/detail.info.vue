

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ztree li span.button.chk {
    width: 13px;
    height: 13px;
    margin: 2px 3px 0 0;
    cursor: auto;
}
.ztree li span {
    line-height: 16px;
    margin-right: 2px;
    float: left;
}
.layui-elem-field legend {
    padding: 0 10px;
    font-size: 16px;    
    font-weight: bold;
}
.layui-form-label 
{
  width:90px;
}
  /*.layui-table
  {
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:keep-all;
  }*/
</style>
<template>
  <div id="schedule_list" v-show="false">     
     
<form class="layui-form" action="" style="padding-top:20px;">
  <input type="hidden" name="userid" v-model="datasource.userID">
  <input type="hidden" name="password" v-model="datasource.password">
   
  <div class="layui-form-item">
   <div class="layui-inline">
      <label class="layui-form-label">用户</label>
      <div class="layui-input-inline">
        <input type="text" name="username" require="required" autocomplete="off"  class="layui-input" v-model="datasource.userName">
      </div>
      <div class="layui-form-mid layui-word-aux"></div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">手机</label>
      <div class="layui-input-inline">
        <input type="text" name="telphone" lay-verify="required|phone" autocomplete="off" class="layui-input" v-model="datasource.telphone">
      </div>
      <div class="layui-form-mid layui-word-aux"></div>
    </div>
  </div>
  <div class="layui-form-item">
   <div class="layui-inline">
      <label class="layui-form-label">邮箱</label>
      <div class="layui-input-inline">
        <input type="text" name="email" autocomplete="off"  class="layui-input" v-model="datasource.email">
      </div>
      <div class="layui-form-mid layui-word-aux"></div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">分组</label>
      <div class="layui-input-inline">
        <input type="text" name="dept" autocomplete="off" class="layui-input" v-model="datasource.dept">
      </div>
      <div class="layui-form-mid layui-word-aux"></div>
    </div>
  </div>
  <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">备注</label>
    <div class="layui-input-block" style="margin-left:120px;width:532px;">
     <input type="text" name="remark" autocomplete="off" class="layui-input" v-model="datasource.remark">
     
    </div>
  </div>
 
  <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;text-align: center;">
     <legend>权限分配</legend>
  </fieldset>
  <div>
    <div id="permissionTree" name="permissionTree" class="ztree" style="border:1px solid #d5d5d5;height:200px;overflow-y:auto;">
    </div>
  </div>
  <div class="layui-form-item" v-show="show">
    <div class="layui-input-block" style="margin-left: 0px;margin-top:5px;text-align:center;">
      <button class="layui-btn" lay-submit="" @click="save()" lay-filter="form1">立即提交</button>
    </div>
  </div>
</form>

  </div>
</template>

<script>
 import Vue from 'vue' 
export default {
  name: 'hello1',
  data () {
    return {
      show:true,
      title:'',
      ennmcd:'',
      schplans:[],
      floodplans:[],
      emergencyplans:[],
      replyplans:[],
      datasource:{
      }
    }
  },
  methods:{
    queryDetail:function(item){
      this.datasource=item;
          
      //layer.msg("预案查询...");
      this.$http.get("/api/UserCenter/QueryPermission"
      +"?userId="+(!item.userID?0:item.userID)
      )
        .then((response) => {
          
          console.log(response);
          
          if (response.data.code = '000') {

              var setting = {
                check: {
                    enable: true
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
              };

              var zNodes =[
              ];
              
              $.each(response.data.data, function (index, item) {
                  zNodes.push({ id: item.permissionID, pId: item.parentPermissionID, name: item.permissionName, open: true, checked: item.isSelected });
              });

              $.fn.zTree.init($("#permissionTree"), setting, zNodes);
          }
          });
    },
    save:function(){
    
    }
  },
  updated: function () {
    console.log("detail ********** updated!");
  }
}

layui.use(['element', 'layer','form', 'layedit', 'laydate'], function(){
  var element = layui.element()
  var form = layui.form()
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
  
  //自定义验证规则
  form.verify({
    //number:[/^[0-9]+.?[0-9]*$/,'必须为数字']
  });
    
  //监听提交
  form.on('submit(form1)', function(data){

    // 这里可以进行保存提交data.field为表单json对象
    // layer.alert(JSON.stringify(data.field), {
    //   title: '最终的提交信息'
    // });
      
    var listPermission = [];

    var treeObj = $.fn.zTree.getZTreeObj("permissionTree"),
        nodes = treeObj.getCheckedNodes(true),
        v = "";

    if (nodes != null) {
    for (var i = 0; i < nodes.length; i++) {
        v += nodes[i].name + ",";
        listPermission.push({ permissionID: nodes[i].id });
      }
    }
    var user=data.field;
    user.permission=listPermission;
    Vue.http.post("/api/UserCenter/SaveUser",
         user)
        .then((response) => {

          if (response.data.code == '000') {
              layer.msg("操作成功！",{time:2000},function(){

              layer.closeAll();
              });
            }
          else
            layer.msg(response.data.error);
        })
        .catch(function (response) {
          console.log(response)
    });  

    // 单击提交后不自动退出
    return false;
  });
});    
</script>
