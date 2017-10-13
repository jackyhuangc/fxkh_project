<template>
  <div id="app" v-show="show">
    <div id="main3" style="height:100%;width:100%;">xxxxxffffw</div>
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
      var myChart = echarts.init(document.getElementById('main3'));

      var option = {
        // title: {
        //     text: '世界人口总量',
        //     subtext: '数据来自网络'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
          x: 0,
          x2: 0,
          y: 10,
          y2: 20
        },
        xAxis: {
          show: false,
          type: 'value',
          boundaryGap: [0, 1],
          splitLine: { show: false }//去除网格线
        },
        yAxis: {
          show: false,
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],

          axisLabel: {
            margin: -45,
            textStyle: {
              color: 'red',
              fontSize: 14
            }
          },
          splitLine: { show: false }//去除网格线
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230],

            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = [
                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                  ];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          // {
          //     name: '2012年',
          //     type: 'bar',
          //     data: [19325, 23438, 31000, 121594, 134141, 681807]
          // }
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
