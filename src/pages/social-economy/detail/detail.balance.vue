<template>
  <div id="app" v-show="show">
   	<div id="main1" style="height:100%;width:100%;">xxxxxffffw</div>
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
      
		curve(instrumentid, time, last, rawData) {
				var myChart = echarts.init(document.getElementById('main1'));
				var dates = rawData.map(function(item) {
					return item[0];
				});
				var data = rawData.map(function(item) {
					return [+item[1], +item[2], +item[5], +item[6]];
				});
				var option2 = {
   backgroundColor : 'rgba(255, 255, 255, 0.1)',
	// 			 legend: {
    //     data:['手续费','入金','出金']
    // },
  	grid : {
						x : -1,
						x2 : 0,
						y : 10,
						y2 : 20
					},
					tooltip : {
						trigger : 'axis'
					},
					toolbox : {
						show : false
					},
					calculable : true,
					dataZoom : {
						show : false,
						realtime : true,
						start : 50,
						end : 100
					},
					animation : false,
					xAxis : [{
						type : 'category',
						data : time,
						splitLine : {
							show : false,
							lineStyle : {
								color : ['#530D1D'],
								type : 'solid'
							}
						},
						splitArea : {
							show : false
						},
						axisLabel : {
							textStyle : {
								color : '#530D1D'
							},
							formatter : function(value) {
								return formatTime(value);
							}
						},
						axisLine : {
							show : true,
							lineStyle : {
								color : '#530D1D',
								width : 1,
								type : 'solid'
							}
						}
						//['21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00']
					}],
					yAxis : [{
						type : 'value',
						scale : true,
						splitLine : {
							show : true,
							lineStyle : {
								color : ['#530D1D'],
								type : 'solid'
							}
						},
						splitArea : {
							show : false
						},
						axisLabel : {
							margin : -45,
							textStyle : {
								color : 'red',
								fontSize : 14
							}
						},
						axisLine : {
							lineStyle : {
								color : '#ffffff'
							}
						}
					}],
					series : [{
						name : '手续费',
						type : 'line',
						symbol : 'none',
						data : last,
						itemStyle : {
							normal : {
								color : '#E6941A',
								lineStyle : {
									color : '#E6941A',
									width : 1
								}
							}
                        }
                    },
                        {
						name : '入金',
						type : 'line',
						symbol : 'none',
						data : last,
						itemStyle : {
							normal : {
								color : '#EEEE11',
								lineStyle : {
									color : '#EEEE11',
									width : 1
								}
							}
                        }
                        },
                        {
						name : '出金',
						type : 'line',
						symbol : 'none',
						data : last,
						itemStyle : {
							normal : {
								color : '#4DB34D',
								lineStyle : {
									color : '#4DB34D',
									width : 1
								}
							}
						}
						//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 32.6, 20.0, 6.4, 3.3, 32.6, 20.0, 6.4]
					}]
				};
				myChart.setOption(option2);
			}
  },
  created: function()
  {},
  mounted: function()
  {

          var time = [];
					var last = [];
					var buy = [];
					var sale = [];
					var rawData = [];
          //console.log(ret.Data.length);
          var dataSource=[];
          for(var i=0;i<20;i++)
          {
            dataSource.push({
          ModifyTime:'2017-10-1'+i%10+' 12:22',
          LastPrice:123.00,
          OpenPrice:100.00,
          ClosePrice:200.00,
          LowestPrice:90.00,
          HighestPrice:200.00,
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
					this.curve("xxxx", time, last, rawData);

  },
  updated: function()
  {},
  destroyed: function()
  {}
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
