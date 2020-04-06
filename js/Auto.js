window.onload = function() {
	$("#cut_two").click(function() {
		// $(".top_btn2").text("切换为手动");
		// $(".boy").css("display", "block");
		// $(".auto").css("display", "none");
		location.href = "./index.html";
	});
	$("#open").click(function() {

		location.href = "./List.html";
	});
	$("#cut_three").click(function() {
		$(".auto .grade").css("display", "block");
		$(".auto .cover").css("display", "block");
		// $(".auto").css("display", "none");
	});

	$("#gradeButton").click(function() {
		$(".autoGradeOne input").val('');
		$(".auto .grade").css("display", "none");
		$(".auto .cover").css("display", "none");
		// $(".auto").css("display", "none");
	});
	$("#cut_four").click(function() {
		// $.get("http://39.105.62.98:8280/api/Values/Get", function(result){
		//    // $("div").html(result);
		// console.log(result);
		//  });
		$(".auto .code").css("display", "block");
		$(".auto .cover").css("display", "block");


	});

	$("#codeButton").click(function() {
		var oName1 = $("#CodeSpan1").val();
		var oName2 = $("#CodeSpan2").val();
		if (!oName1) {
			alert("请输入名称");
			return;
		}
		var myDate = new Date;
		var year = myDate.getFullYear(); //获取当前年
		var mon = myDate.getMonth() + 1; //获取当前月
		var date = myDate.getDate(); //获取当前日
		var Hours = myDate.getHours(); //获取当前小时数(0-23)
		var Minutes = myDate.getMinutes(); //获取当前分钟数(0-59)
		var Seconds = myDate.getSeconds(); //获取当前秒
		// var week = myDate.getDay();
		// var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		console.log(year, mon, date, Hours, Minutes, Seconds)
		var oTime = year + '-' + mon + '-' + date + ' ' + Hours + ':' + Minutes + ':' + Seconds;
		var $p = $('<div class="auto_body_one"><span>' + oName1 + '</span><span class="autoBodyOneName">设计师:<span>' +
			oName2 + '</span></span><span class="autoBodyOneData">' + oTime +
			'<button type="button" class="autoBodyOneOpen">打开</button><button type="button" class="autoBodyOneCopy">复制</button><button type="button" class="autoBodyOneDelete">删除</button></div>'
		);
		$(".auto_body").prepend($p);
		$("#CodeSpan1").val("");
		$("#CodeSpan2").val("");

		// $(".auto .code").css("display", "none");
		// $(".auto .cover").css("display", "none");

		location.href = "./List.html";

		// $("#time").html(year + "年" + mon + "月" + date + "日" + weeks[week]);


	});
}
