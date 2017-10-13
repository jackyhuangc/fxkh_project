<template>
  <div id="app1" v-show="show" style="font-size: 16px;text-align:center; overflow:hidden;">

  </div>
</template>

<script>
export default {
  name: 'app_1',
  data() {
    return {
      show: true,
      title: '',
      datasource: {
      }
    }
  },
  methods: {
  },
  created: function() { },
  mounted: function() {
    var vm = this;
    setInterval(function() {

      $("#app1").append("<div style='font-size: 16px;'>xfdfsafdsfds" + new Date().getTime() + "</div>");
      var div = document.getElementById('app1');
      div.scrollTop = div.scrollHeight;
    }, 500);
  },
  updated: function() { },
  destroyed: function() { }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  text-align: center;
  font-family: '雅黑';
  font-size: 26px
}
</style>
