<style scoped>
  .tablelist
  {
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:keep-all;
  }
</style>
<template>
	<div id="app">
		<div class="tools">
			<ul class="toolbar" style="margin-top:8px;">
				<li>
					<label for="ennm">水库名称：</label>
					<input class="datainp" id="ennm" type="text" style="width:376px;" placeholder="" value="" v-model="ennm"   @keyup="enter_keyup($event)"/>
				</li>        
				<li>
					<label for="selectEncl">工程等级：</label>
					<select id="selectEncl" class="datainp datasel" v-model="encls.selected">
                        <option v-for="option in encls.data" v-bind:value="option.value">  
                            {{ option.text }}  
                        </option>  
                    </select>
				</li>
			</ul>
			<div style="clear:left;"></div>
			<ul class="toolbar">		
      <li>
					<label for="selectStateDistrict">所属市州：</label>
					<select id="selectStateDistrict" class="datainp datasel" v-model="states.selected">
                        <option v-for="option in states.data" v-bind:value="option.value">  
                            {{ option.text }}  
                        </option>  
          </select>
				</li>
				<li>
					<label for="selectCountryDistrict">所属区县：</label>
					<select id="selectCountryDistrict" class="datainp datasel" v-model="countries.selected">
                        <option v-for="option in countries.data" v-bind:value="option.value">  
                            {{ option.text }}  
                        </option>  
                    </select>
				</li>        
				<li>
					<label for="selectPlanType">所属水系：</label>
					<select id="selectPlanType" class="datainp datasel" v-model="drainages.selected">
                        <option v-for="option in drainages.data" v-bind:value="option.value">  
                            {{ option.text }}  
                        </option>  
                    </select>
				</li>		
				<li>
					<a href="javascript:void(0);" @click="query()"><i class="fa fa-search"></i>查询</a>
				</li>	
			</ul>
		</div>

		<table class="tablelist">
			<thead>
				<tr>
					<th style="width:5%;">序号<i class="sort"></i></th>
					<th style="width:10%;">水库名称</th>
					<th style="width:10%;">站码</th>
					<th style="width:10%;">行政区划</th>
					<th style="width:10%;">所属水系</th>
					<th style="width:5%;">等级</th>
					<th style="width:10%;">总库容(亿方)</th>
					<th style="width:10%;">装机容量(万千瓦)</th>
					<th style="width:20%;">管理单位</th>
					<th style="width:10%;">操作</th>
        </tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in listGrid">
					<td>{{((curr-1)*20)+index+1}}</td>
					<td>{{item.ennm}}</td>
					<td>{{item.ennmcd}}</td>
					<td>{{item.dsnm}}</td>     
					<td>{{item.drainage}}</td>
					<td>{{convertEncl(item.encl)}}</td>
					<td>{{item.ttst}}</td>   
					<td>{{item.incp}}</td>              
					<td>{{item.adunnm}}</td>   
					<td><a href="#" class="tablelink" @click="yuan_click(index)">预案</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="tablelink" @click="modify_click(index)">修改</a></td>
				</tr>
			</tbody>
		</table>

    <div style="height:55px;line-height:55px;">
       <div id="pager" style="float:left;">
       </div>
       <div style="float:left;">
        <div style="padding-left:17px; margin-top:-2px;font-size:14px;">{{total}}</div>
       </div>
     </div>
     <schedulefile v-bind:msg1="countries" ref="sch">
     </schedulefile>
     <detailinfo v-bind:msg1="states" ref="inf">
     </detailinfo>
  </div>
</template>

<script>
import schedulefile from './detail/detail.schedule.vue'
import detailinfo from './detail/detail.info.vue'
export default {
  // 可设置全局HTTP属性
  //   http: {
  //   headers: {
  //     token: 'Basic YXBpOnBhc3N3b3Jk',
  // 	  Authorization : "WJ " + "applicationId=1&partnerId=BDT&timestamp"//window.btoa(apikey + "&signed=" + hex_md5(apikey))
  //   }
  // },
 components:{
   schedulefile,
   detailinfo
 },
 data(){
   
   return {  
    curr:1,
    total:'总共0条数据',
    ennm:'',
    states: {
      selected: '000000',
      data: []
    },
    countries: {
      selected: '000000',
      data: []
    },
    drainages: {
      selected: '',
      data: [
        { value: '', text: '-全部-' },
        { value: '黄河水系', text: '├黄河水系' },
        { value: '黄河干流水系', text: '　└黄河干流水系' },
        { value: '长江水系', text: '├长江水系' },
        { value: '长江干流水系', text: '　└长江干流水系' },
        { value: '岷江水系', text: '　├岷江水系' },
        { value: '雅砻江水系', text: '　└雅砻江水系' }
      ]
    },
    encls: {
      selected: '',
      data: [
        { value: '', text: '-全部-' },
        { value: 'Ⅰ', text: '大(一)' },
        { value: 'Ⅱ', text: '大(二)' },
        { value: 'Ⅲ', text: '中型' },
        { value: 'Ⅳ', text: '小(一)' },
        { value: 'Ⅴ', text: '小(二)' }
      ]
    },
    listGrid: []
  }
 },
  watch:{
  	'states.selected':function(val,old){
  		console.log(val);
  		console.log(old);
      
      this.$http.get("http://localhost:28025/api/PlatResource/QueryDistrictByStateCode?code="+val)
        .then((response) => {

          if (response.data.code = '000') {
              var array=[];
                console.log(response.data.data.length);
                
              array.push({ value:'000000',text:'-全部-' });
              for(var i=0;i<response.data.data.length;i++)
              {
                  array.push({ value:response.data.data[i].districtCode,text:response.data.data[i].districtName });
              }
              console.log(array);
              console.log(array[0].text);
              this.countries.data=array;
              this.countries.selected=array[0].value;
            }
          else
            layer.msg(response.data.error);
        })
        .catch(function (response) {
          console.log(response)
        });
  	}
  },
  methods: {
    query: function (page) {

      if (!page)
        page = 1;

      //layer.msg("预案查询...");
      this.$http.get("http://localhost:28025/api/PlatResource/QueryRSProject"
      +"?page=" + page
      +"&ennm="+this.ennm
      +"&dscode="+(this.countries.selected!='000000'?this.countries.selected:this.states.selected)
      +"&drainage="+this.drainages.selected    
      +"&encl="+this.encls.selected 
      // 此处可单独设置header,注意，关键字一定不要加引号
      // , {
      //       headers: { 
      //         Authorization:'Bearer ssss'
      //         }
      //   }     
      )
        .then((response) => {

          if (response.data.code = '000') {
            this.listGrid = response.data.data;

            var query=this.query;
            this.curr=page;
            // 第一页时，需要重新初始化
            if (page == 1) {
              //this.$http.headers.common.Authorization = 'WJ XMLHttpRequest';
              //this.$http.headers.common["token"] = 'WJ XMLHttpRequest';
              // 获取总页数
              
              this.$http.get("http://localhost:28025/api/PlatResource/QueryRSProjectCount"   
              +"?ennm="+this.ennm
              +"&dscode="+(this.countries.selected!='000000'?this.countries.selected:this.states.selected)
              +"&drainage="+this.drainages.selected    
              +"&encl="+this.encls.selected, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }})
                .then((rep) => {
                  console.log(rep.data);
                  if (rep.data.code = '000') {
                    this.total='总共'+rep.data.data+'条数据';
                    layui.use(['laypage', 'layer'], function () {
                      var laypage = layui.laypage
                        , layer = layui.layer;

                      laypage({
                        cont: 'pager'
                        , pages: ((rep.data.data) / 20+((rep.data.data) % 20>0?1:0))
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
            if(ev.keyCode==13){
              this.query(1);
            }
    },
    yuan_click: function (index) {
      // 预案浏览
      var sch=this.$refs.sch;
      layer.open({
          type: 1,
          skin: 'layui-layer-azure',
          title: false, //不显示标题
          area: ['450px', '300px'],
          content: $('#schedule_list'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
          success: function(layero, index){
            //console.log(layero, index);
            sch.queryfile(2);
          },
          cancel: function(){
          }
      });   
    },
    modify_click: function (index) {
      // 资料修改
      var inf=this.$refs.inf;
      layer.open({
          type: 1,
          skin: 'layui-layer-azure',
          title: false, //不显示标题
          area: ['450px', '300px'],
          content: $('#detail_info'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
          success: function(layero, index){
            //console.log(layero, index);
            inf.init(2);
          },
          cancel: function(){
          }
      });   
    },
    convertEncl:function(level){
        switch(level)
        {
          case 'Ⅰ':
            return "大(一)";
          case 'Ⅱ':
            return "大(二)";
          case 'Ⅲ':
            return "中型";
          case 'Ⅳ':
            return "小(一)";
          case 'Ⅴ':
            return "小(二)";
          default:
            break;
        }
      
      return "";
    }
  },
  created: function () {
    console.log("created"); 
    
    this.$http.get("http://localhost:28025/api/PlatResource/QueryDistrict?mode=2")
        .then((response) => {

          if (response.data.code = '000') {
              var array=[];
              array.push({ value:'000000',text:'-全部-' });
              for(var i=0;i<response.data.data.length;i++)
              {
                  array.push({ value:response.data.data[i].districtCode,text:response.data.data[i].districtName });
              }

              this.states.data=array;
              
              var array1=[];
              array1.push({ value:'000000',text:'-全部-' });
              this.countries.data=array1;
              this.countries.selected=array1[0].value;
            }
          else
            layer.msg(response.data.error);
        })
        .catch(function (response) {
          console.log(response)
        });
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
    $('.tablelist tbody tr:odd').addClass('odd');   
  },
  destroyed: function () {
    console.log("destroyed");
  },
}
//this.$refs.input1.value
</script>