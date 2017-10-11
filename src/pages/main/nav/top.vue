<template>
<div>
    <ul class="nav">
		<!--li>
			<a href="/" target="rightFrame" class="selected" style="width:90px;" @click="menuClick(1)"><img src="../../../../static/Content/images/icons/1_06.png" title="首页" /><h2>首页</h2></a>
		</li>
		<li>
			<a id="test" href="/" target="rightFrame" style="width:90px;" @click="menuClick(2)"><img src="../../../../static/Content/images/icons/1_06.png" title="首页" /><h2>首页</h2></a>
		 ROUTER路由方式配置
			<router-link to="/left1"><img src="../../../../static/Content/images/icons/1_06.png" title="首页1" /><h2>首页1</h2></router-link>
		</li-->

    <li v-for="(item,index) in navs.data">
			<a href="/static/error.html" target="rightFrame" :class="index==0?'selected':''" style="width:90px;" @click="menuClick(item.code)"><img src="../../../../static/Content/images/icons/1_06.png" title="item.title" /><h2>{{item.title}}</h2></a>
		</li>
	</ul>
</div>
</template>

<script>
export default {
  name: 'top',	
  props:['menus'],// 可用于值传递
  data(){   
   return {  
    navs: {
      selected: '000000',
      data: []
    }
  }
 },
  components: {
  },
  methods: {

    exit: function() { 
    },
    menuClick:function(i){
      if(i==1)
      {
          this.menus.data=[
                {title:'二期工程链接',child:[
                {title:'数据汇集平台',url:'javascript:alert("稍后完善");'},
                {title:'洪灾评估系统',url:'javascript:alert("稍后完善");'},
                {title:'抗旱业务系统',url:'javascript:alert("稍后完善");'},
                {title:'综合信息服务系统',url:'javascript:alert("稍后完善");'}
          ]}
        ];
      }
      else
      {
            this.menus.data=[
        {title:'数据资源目录',child:[
          {title:'防汛预案',url:'/pages/emergency/index.html'},
          {title:'水库工程',url:'/pages/rsproject/index.html'},
          {title:'社会经济',url:'/pages/social-economy/index.html'},
          {title:'专题图层',url:'javascript:alert("稍后完善");'}
        ]},
                {title:'平台资源监控',child:[
          {title:'系统监控',url:'javascript:alert("稍后完善");'},
          {title:'数据库监控',url:'javascript:alert("稍后完善");'}
        ]},
                {title:'用户管理中心',child:[
          {title:'用户信息维护',url:'javascript:alert("稍后完善");'},
          {title:'用户操作日志',url:'javascript:alert("稍后完善");'}
        ]},
                {title:'二期工程链接',child:[
          {title:'数据汇集平台',url:'javascript:alert("稍后完善");'},
          {title:'洪灾评估系统',url:'javascript:alert("稍后完善");',target:1},
          {title:'抗旱业务系统',url:'javascript:alert("稍后完善");'},
          {title:'综合信息服务系统',url:'javascript:alert("稍后完善");'}
        ]}
      ];
      }
    }
  },
  created: function () {
    console.log("created");     
    //初始化操作，如菜单
  },
  mounted() {     
    // 根据模块设置菜单数据(初始化)
    console.log("根据模块设置菜单数据(初始化)");

    this.navs.data=[
        {title:'首页',icon:'/pages/emergency/index.html',code:0}
        // ,
        // {title:'测试',icon:'/pages/emergency/index.html',code:1}
    ];
    this.menus.data=[
        {title:'数据资源目录',child:[
          {title:'防汛预案',url:'/pages/emergency/index.html'},
          {title:'水库工程',url:'/pages/rsproject/index.html'},
          {title:'社会经济',url:'/pages/social-economy/index.html'},
          {title:'流域水系',url:'http://10.51.101.198:5099/Home/map'},
          {title:'灾情制图',url:'http://10.51.101.198:5099/home/disasterMap'}//,
          // {title:'专题图层',url:'javascript:alert("稍后完善");'}
        ]},
                {title:'平台资源监控',child:[
          {title:'系统监控',url:'javascript:alert("稍后完善");'},
          {title:'数据库监控',url:'javascript:alert("稍后完善");'}
        ]},
                {title:'用户管理中心',child:[
          {title:'用户信息维护',url:'/pages/usercenter/index.html'},
          {title:'用户操作日志',url:'javascript:alert("稍后完善");'}
        ]},
                {title:'相关工程链接',child:[
          {title:'数据汇集平台',url:'http://10.51.101.202:8020',target:1},
          {title:'洪灾评估系统',url:'http://10.51.101.198:5099',target:1},
          {title:'抗旱业务系统',url:'javascript:alert("稍后完善");'},
          {title:'综合信息服务系统',url:'javascript:alert("稍后完善");'}
        ]}
      ];
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated: function () {
    console.log("updated");
  },
  destroyed: function () {
    console.log("destroyed");
  }
}
</script>

<style scoped>
</style>
