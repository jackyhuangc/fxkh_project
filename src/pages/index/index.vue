<template>
  <div id="app">  
           
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
  <legend>防汛抗旱二期系统功能列表</legend>
</fieldset>  
  <div style="width:450px;margin:auto;">
    <blockquote class="layui-elem-quote"><a href="/pages/emergency/index.html" >预案管理</a></blockquote>
    <blockquote class="layui-elem-quote"> <a href="/pages/rsproject/index.html" >水库工程</a></blockquote>
    <blockquote class="layui-elem-quote"> <a href="/pages/social-economy/index.html" >社会经济</a></blockquote>
    <blockquote class="layui-elem-quote"><a href="http://10.51.101.202:8020/" >数据汇集平台</a></blockquote>
    <blockquote class="layui-elem-quote"><a href="javascript:alert('稍后完善');" >应用支撑平台</a></blockquote>
    <blockquote class="layui-elem-quote"><a href="javascript:alert('稍后完善');" >洪灾评估系统</a></blockquote>
    <blockquote class="layui-elem-quote"><a href="javascript:alert('稍后完善');" >旱情业务系统</a></blockquote>
    <blockquote class="layui-elem-quote"><a href="javascript:alert('稍后完善');" >综合信息服务系统</a></blockquote>
    <button @click="exit()" class="layui-btn layui-btn-small layui-btn-primary"><i class="layui-icon"></i> 退出系统</button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app1',
  components: {
  },
  methods: {
    exit: function() {
 
      window.localStorage.clear();
      window.location.href = "/";
  }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.layui-elem-quote {
    padding: 10px;
}
.layui-btn
{
  float:right;
}
</style>
