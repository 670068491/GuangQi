window.onload = function() {
	$("#back").click(function() {
		location.href = "./Auto.html";


	});

	$("#plus").click(function() {

		var $One = $(
			'<div class="node_one"><div class = "string"></div><div class = "node_small">节点<span>1</span></div><div class = "string"></div><div class = "logic"></div></div>'
		);
		$(".node").prepend($One);

	});

	$(".lib").click(function() {
		$(".library").animate({
			width: "15vw"
		}, "slow", function() {})
	});

	$(".library_Back").click(function() {
		$(".library").animate({
			width: "0vw"
		}, "slow", function() {})
	});

	var pack1 = true;
	$("#pack1").click(function() {
		if (pack1) {
			$("#library_body_body1").animate({
				height: "0.1vw"
			}, "slow", function() {})
			pack1 = false;
		} else {
			$("#library_body_body1").animate({
				height: "100%"
			}, "slow", function() {});
			pack1 = true;
		}
	});

	$(".node_small").click(function() {
		$(this).addClass("active");
});




	function connect() {
		// console.log('1');
		// 建立连接对象（还未发起连接）
		var socket = new WebSocket("ws://localhost:8080/webSocketEndPoint");
		// var socket = new WebSocket("ws://192.168.1.10:8080/webSocketEndPoint");
		// var socket = new WebSocket("ws://192.168.1.241:8080/webSocketEndPoint");
		stompClient = Stomp.over(socket); // 获取 STOMP 子协议的客户端对象
		stompClient.connect({}, function connectCallback(frame) { // 向服务器发起websocket连接并发送CONNECT帧
				// 连接成功时（服务器响应 CONNECTED web帧）的回调方法
				console.log('[' + frame + ']' + '手动模式：连接成功');
				stompClient.subscribe('/topic/udp/broadcast', function(response) {
					// stompClient.subscribe('/topic/socket/201', function (response) {
					console.log(response.body);
					var stringResult = response.body.split(',');
					// 转为数组输出[123,456,789];
					// console.log(stringResult);
					var FrameId = stringResult[0].substr(1);
					var Byte0 = stringResult[1];
					var Byte1 = stringResult[2];
					var Byte2 = stringResult[3];
					var Byte3 = stringResult[4];
					var Byte4 = stringResult[5];
					var Byte5 = stringResult[6];
					var Byte6 = stringResult[7];
					var Byte7 = stringResult[8].substring(0, stringResult[8].length - 1);
					// var Byte7 = Byt7.substring(0, Byt7.length - 1);
					var oYemian = document.getElementById(FrameId);
					var loca = storage.getItem(FrameId);
					// console.log(typeof(Byte5));
					// 判断新旧id  /  页面不存在  新id 
				
				
				
				
				
				});
				// stompClient.subscribe('/topic/websocket/broadcast', function(response) {
				// 	var stringResult = response.body.split(',');
				// 	// console.log(stringResult);
				// 	var FrameId = stringResult[0].substr(1);
				// 	var Byte0 = stringResult[1];
				// 	var Byte1 = stringResult[2];
				// 	var Byte2 = stringResult[3];
				// 	var Byte3 = stringResult[4];
				// 	var Byte4 = stringResult[5];
				// 	var Byte5 = stringResult[6];
				// 	var Byte6 = stringResult[7];
				// 	var Byte7 = stringResult[8].substring(0, stringResult[8].length - 1);
				// 	var oYemian = document.getElementById(FrameId);
				// 	if (!oYemian && Byte0 == '5E') {
				// 		switch (Byte5) {
				// 			case "08":
				// 				// 安卓屏
				// 				var data = {
				// 					FrameId: FrameId,
				// 					type: Byte5,
				// 					text: '',
				// 				};
				// 				var dater = JSON.stringify(data);
				// 				storage.setItem(FrameId, dater);
				// 				new andr(FrameId, "new");
				// 				break;
				// 		}
				// 	}
				// });
			},
			// 报错原因
			function errorCallBack(error) {
				// 连接失败时（服务器响应 ERROR 帧）的回调方法
				console.log('连接失败[' + error + ']');
				setTimeout(function() {
					// 自动重连
					connect();
				}, 100);
			}
		);
	};
	// connect(); //建立连接





}
