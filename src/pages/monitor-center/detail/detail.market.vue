<template>
  <div id="app" v-show="show">
    <div id="main2" style="height:100%;width:100%;">xxxxxffffw</div>
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
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },

    curve(types, datas) {
      var myChart = echarts.init(document.getElementById('main2'));

      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //   orient: 'vertical',
        //   x: 'left',
        //   data: types
        // },
        //color: ['red', 'green', 'yellow', 'blueviolet'],
        series: [
          {
            name: '终端平台',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: datas
          }
        ]
      };

      myChart.setOption(option);
    }
  },
  created: function() { },
  mounted: function() {

    var time = [];
    var last = [];
    var buy = [];
    var sale = [];
    var rawData = [];
    //console.log(ret.Data.length);
    var dataSource = [];
    for (var i = 0; i < 20; i++) {
      dataSource.push({
        ModifyTime: '2017-10-1' + i % 10 + ' 12:22',
        LastPrice: 123.00,
        OpenPrice: 100.00,
        ClosePrice: 200.00,
        LowestPrice: 90.00,
        HighestPrice: 200.00,
      });
    }
    for (var i = 0; i < dataSource.length; i++) {
      if (!dataSource[i].ModifyTime) {
        continue;
      }
      time.push(dataSource[i].ModifyTime.substr(0, 16));
      last.push(formatPrice(dataSource[i].LastPrice));
      var data = [];
      data.push('-');
      data.push(dataSource[i].OpenPrice);
      data.push(dataSource[i].ClosePrice);
      data.push('-');
      data.push('-');
      // 5分钟内的最低
      data.push(dataSource[i].LowestPrice);
      // 5分钟内的最高
      data.push(dataSource[i].HighestPrice);
      data.push('-');
      data.push('-');
      data.push('-');
      rawData.push(data);
    }

    var types = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
    var datas = [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ];
    this.curve(types, datas);

  },
  updated: function() { },
  destroyed: function() { }
}

// layui.use(['element', 'layer', 'form', 'layedit', 'laydate'], function() {
//   var element = layui.element()
//   var form = layui.form()
//     , layer = layui.layer
//     , layedit = layui.layedit
//     , laydate = layui.laydate;

// });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  font-size: 14px;
}

body {
  margin: 0px;
}

input {
  border: none;
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 0px;
  font-size: 18px;
  height: 34px;
  line-height: 34px;
}
</style>
