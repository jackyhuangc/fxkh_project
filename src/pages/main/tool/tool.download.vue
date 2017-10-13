<template>
	<div id="panel_down" v-show="show" style="padding:10px;">
		<div class="qrcode" style="float:left;text-align:center;">
			<div class="qrimage-wrap white b-a text-center">
				<table>
					<tbody>
						<tr>
							<td width="230px" height="230px">
								<img id="qrimage" src="../../../../static/android.png"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="qrcode-download" style="text-align:center;">
				<div class="btn green btn-block" style="font-weight:normal;text-align:center;line-height:35px;margin: 0px auto;" id="download">Android下载</div>
			</div>
		</div>
		<div class="qrcode" style="float:right;text-align:center;">
			<div class="qrimage-wrap white b-a text-center">
				<table>
					<tbody>
						<tr>
							<td width="230px" height="230px">
								<img id="qrimage" src="../../../../static/ios.png"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="qrcode-download" style="text-align:center;">
				<div class="btn green btn-block" style="font-weight:normal;text-align:center;line-height:35px;margin: 0px auto;" id="download">IOS下载</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'panel_down',
	data() {
		return {
			show: true,
			title: '',
			datasource: {
			}
		}
	},
	methods: {
		android() {

		},
		ios() {

		}
	},
	created: function() { },
	mounted: function() {
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
