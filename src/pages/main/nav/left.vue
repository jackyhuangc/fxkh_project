<template>
  <dl class="leftmenu">
    <dd v-for="(item,index) in menus.data">
      <div class="title">
        <span>
          <img src="../../../../static/Content/images/leftico03.png"></img>
        </span>{{item.title}}
      </div>
      <ul class="menuson">
        <li v-for="(item,index) in item.child">
          <cite></cite>
          <a v-bind:href="item.url" :target="item.target==1?'_blank':'rightFrame'">{{item.title}}</a>
          <i></i>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'left',
  props: ['menus'],// 可用于值传递
  components: {
  },
  methods: {

    exit: function () {
    }
  },
  created: function () {
    console.log("created");
    //初始化操作，如菜单
  },
  mounted() {
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