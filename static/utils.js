Date.prototype.format = function (format) {
	/*
	 * eg:format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds(), // second
		"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
		"S": this.getMilliseconds()
		// millisecond
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

var rounddec = function (price) {
	var round = 0;

	// 是小数数字
	if (price.toString().indexOf('.') > -1) {
		var array = price.toString().split(".");
		var str = array[1];

		for (var i = 0; i < str.length; i++) {
			if (str.substring(i, i + 1) > 0) {
				round = i + 1;
			}

			// 最多精确到小数点后3位
			if (i >= 2)
				break;
		}
	}

	return round;
}

var formatPrice = function (price) {
	if (price == undefined || price > 99999999)
		return "-";
	return parseFloat(price).toFixed(rounddec(price));
}
var formatTime = function (strTime) {
	return strTime.replace('T', ' ').substr(11, 5);
}

var change_date = function (days) {
	// 参数表示在当前日期下要增加的天数
	var now = new Date();
	// + 1 代表日期加，- 1代表日期减
	now.setDate((now.getDate()) + 1 * days);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	return year + '-' + month + '-' + day;
};
