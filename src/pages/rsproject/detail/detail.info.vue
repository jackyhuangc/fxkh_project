<template>
  <div id="detail_info" v-show="show">
   
    	<li v-for="(item,index) in msg1.data">
        <a href='#'>{{item}}</a>
        </li>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props:['msg1'],// 可用于值传递
  data () {
    return {
      show:false
    }
  },
  methods:{
    init:function(id){
        //alert(id);
        console.log("接收到传过来的参数"+id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#detail_info
{
    height:300px;
    width:450px;
}
</style>
