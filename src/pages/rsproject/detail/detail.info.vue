<template>
  <div id="detail_info" v-show="show">
    <div class="table-c" style="width:320px;margin:auto;color:#BEBEBE; background-color:#414141; text-align: center;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="20%">-</td>
          <td width="30%">-</td>
          <td width="20%">-</td>
          <td width="30%">-</td>
        </tr>
        <tr>
          <td width="15%">-</td>
          <td width="35%">-</td>
          <td width="15%">
            <input type="number" style="color:#fff;width:90px; height:100%;background-color:#414141; text-align:center;" value='1234' />
          </td>
          <td width="35%">-100</td>
        </tr>
        <tr>
          <td width="15%">-</td>
          <td width="35%">
            <input type="number" style="color:#fff;width:90px;height:100%;background-color:#414141; text-align:center;" value='1' />
          </td>
          <td colspan="2" width="50%">-</td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <div style="line-height: 30px;">
              <input id="cancel" type="button" @click="cancel()" style="font-size:14px;color:#fff; text-align:center; width:100%;height:36px; line-height:36px; background-color:#3C3C3C;" value="关闭" />
            </div>
          </td>
          <td colspan="2" align="center">
            <div style="line-height: 30px;">
              <input id="order_stop" type="button" @click="stopOrder(1)" style="font-size:14px;color:#fff;text-align:center; width:100%;height:36px; line-height:36px; background-color:#3C3C3C; " value="添加" />
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['msg1'],// 可用于值传递
  data() {
    return {
      show: false
    }
  },
  methods: {
    init: function (id) {
      //alert(id);
      console.log("接收到传过来的参数" + id);
    },
    cancel: function () {
      alert("cancel");
    },
    stopOrder: function (i) {
      alert(i);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#detail_info {
  height: 300px;
  width: 450px;
}

.table-c {
  padding: 5px 10px 6px;
  text-decoration: none;

  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;

  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  position: relative;
  cursor: pointer;
}

.table-c table {
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
}

.table-c table td {
  border-left: 1px solid #333333;
  border-top: 1px solid #333333;
  height: 36px;
  font-size: 14px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
