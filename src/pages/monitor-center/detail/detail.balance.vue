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

		curve(time, fee, deposit, withdraw) {
			var myChart = echarts.init(document.getElementById('main1'));

			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				grid: {
					x: 0,
					x2: 0,
					y: 10,
					y2: 20
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: [
					{
						show: false,
						type: 'category',
						boundaryGap: false,
						data: time
					}
				],
				yAxis: [
					{
						show: false,
						type: 'value'
					}
				],
				series: [
					{
						name: '手续费',
						type: 'line',
						areaStyle: { normal: {} },
						data: fee
					},
					{
						name: '入金',
						type: 'line',
						areaStyle: { normal: {} },
						data: deposit
					},
					{
						name: '出金',
						type: 'line',
						areaStyle: { normal: {} },
						data: withdraw
					}
				]
			};

			myChart.setOption(option);
		}
	},
	created: function() { },
	mounted: function() {

		var time = [];
		var fee = [];
		var deposit = [];
		var withdraw = [];

		time = ['2017-10-09', '2017-10-10', '2017-10-11', '2017-10-12'];
		fee = [100, 200, 300, 150];
		deposit = [1000, 2000, 3000, 2000];
		withdraw = [1000, 800, 1000, 3000];

		this.curve(time, fee, deposit, withdraw);
	},
	updated: function() { },
	destroyed: function() { }
}

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
