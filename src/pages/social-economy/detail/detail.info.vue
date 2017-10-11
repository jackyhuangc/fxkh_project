<template>
  <div id="schedule_list" v-show="show"> 
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;text-align: center;">
      <legend>经济产值情况</legend>
    </fieldset>
     
<form class="layui-form" action="">
  <div class="layui-form-item">
   <div class="layui-inline">
      <label class="layui-form-label">GDP</label>
      <div class="layui-input-inline">
        <input type="text" name="gdp" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.gdp">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">工业产值</label>
      <div class="layui-input-inline">
        <input type="text" name="indoutput" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.indoutput">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
  </div>
  <div class="layui-form-item">
   <div class="layui-inline">
      <label class="layui-form-label">农业产值</label>
      <div class="layui-input-inline">
        <input type="text" name="agroutput" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.agroutput">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">林业产值</label>
      <div class="layui-input-inline">
        <input type="text" name="foroutput" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.foroutput">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
  </div>
  <div class="layui-form-item">
   <div class="layui-inline">
      <label class="layui-form-label">牧业产值</label>
      <div class="layui-input-inline">
        <input type="text" name="anioutput" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.anioutput">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">渔业产值</label>
      <div class="layui-input-inline">
        <input type="text" name="fisoutput" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.fisoutput">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
  </div>
  
  <div class="layui-form-item">
   <div class="layui-inline">
      <label class="layui-form-label">第一产业增加值</label>
      <div class="layui-input-inline">
        <input type="text" name="fiiaddoutput" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.fiiaddoutput">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">第三产业增加值</label>
      <div class="layui-input-inline">
        <input type="text" name="ttiaddoutput" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.ttiaddoutput">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
  </div>
  
  <div class="layui-form-item">
   <div class="layui-inline">
      <label class="layui-form-label">固定资产</label>
      <div class="layui-input-inline">
        <input type="text" name="fixasset" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.fixasset">
      </div>
      <div class="layui-form-mid layui-word-aux">(万元)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">大牲畜数量</label>
      <div class="layui-input-inline">
        <input type="text" name="livesnum" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.livesnum">
      </div>
      <div class="layui-form-mid layui-word-aux">(头)</div>
    </div>
  </div>

  <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;text-align: center;">
     <legend>人口情况</legend>
  </fieldset>
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">总人口</label>
      <div class="layui-input-inline">
        <input type="text" name="popunumb" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.popunumb">
      </div>
      <div class="layui-form-mid layui-word-aux">(人数)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">农村人口</label>
      <div class="layui-input-inline">
        <input type="text" name="rpopnumb" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.rpopnumb">
      </div>
      <div class="layui-form-mid layui-word-aux">(人数)</div>
    </div>
  </div>
   
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">常住人口</label>
      <div class="layui-input-inline">
        <input type="text" name="ppopnumb" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.ppopnumb">
      </div>
      <div class="layui-form-mid layui-word-aux">(人数)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">总户数</label>
      <div class="layui-input-inline">
        <input type="text" name="tohounum" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.tohounum">
      </div>
      <div class="layui-form-mid layui-word-aux">(户数)</div>
    </div>
  </div>
  <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;text-align: center;">
     <legend>耕地及播种面积情况</legend>
  </fieldset>
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">耕地面积</label>
      <div class="layui-input-inline">
        <input type="text" name="glarea" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.glarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">土地面积</label>
      <div class="layui-input-inline">
        <input type="text" name="tlarea" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.tlarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(平方公里)</div>
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">旱地面积</label>
      <div class="layui-input-inline">
        <input type="text" name="hlaera" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.hlaera">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">水田面积</label>
      <div class="layui-input-inline">
        <input type="text" name="slarea" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.slarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">农作物播种</label>
      <div class="layui-input-inline">
        <input type="text" name="aplarea" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.aplarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">经济作物播种</label>
      <div class="layui-input-inline">
        <input type="text" name="eplarea" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.eplarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">棉花播种面积</label>
      <div class="layui-input-inline">
        <input type="text" name="cplarea" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.cplarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">油料播种面积</label>
      <div class="layui-input-inline">
        <input type="text" name="oplarea" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.oplarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">有效灌溉面积</label>
      <div class="layui-input-inline">
        <input type="text" name="valarea" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.valarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">保障灌溉面积</label>
      <div class="layui-input-inline">
        <input type="text" name="safarea" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.safarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-inline">
      <label class="layui-form-label">旱涝保收面积</label>
      <div class="layui-input-inline">
        <input type="text" name="secarea" lay-verify="number" autocomplete="off"  class="layui-input" v-model="datasource.secarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
    <div class="layui-inline">
      <label class="layui-form-label">实际灌溉面积</label>
      <div class="layui-input-inline">
        <input type="text" name="aciarea" lay-verify="number" autocomplete="off" class="layui-input" v-model="datasource.aciarea">
      </div>
      <div class="layui-form-mid layui-word-aux">(公顷)</div>
    </div>
  </div>
  <div class="layui-form-item" v-show="show">
    <div class="layui-input-block">
      <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
  </div>
</form>

  </div>
</template>

<script>
export default {
  name: 'hello1',
  data () {
    return {
      show:false,
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
        //alert(id);
        this.title=item.addvnm+'-['+item.pubyear+']';
        this.ennmcd=item.ennmcd;
        //console.log("接收到传过来的参数"+id);

          
      //layer.msg("预案查询...");
      this.$http.get("/api/PlatResource/GetSocialEconomy"
      +"?addvcd="+item.addvcd
      +"&pubyear="+item.pubyear
      )
        .then((response) => {
          
          if (response.data.code = '000') {

            //this.show=true;
            this.datasource=response.data.data;
            //layer.msg("查询结果"+JSON.stringify(response.data.data));
          }
          });
    }
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
    number:[/^[0-9]+.?[0-9]*$/,'必须为数字']
  });
    
  //监听提交
  form.on('submit(demo1)', function(data){
    // 这里可以进行保存提交data.field为表单json对象
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    });
    return false;
  });
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#schedule_list
{
  
}

.layui-elem-field legend {
    padding: 0 10px;
    font-size: 16px;    
    font-weight: bold;
}
a{
  font-size: 14px;
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
