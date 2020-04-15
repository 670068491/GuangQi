new_element = document.createElement("script");　　
new_element.setAttribute("type", "text/javascript");　　
new_element.setAttribute("src", "index.js"); // 在这里引入了js
document.body.appendChild(new_element);

	// 自动模式与手动模式
	var pattern = true;
	$("#cut").click(function () {
		location.href = "./Auto.html";
		// // $(".top_btn2").text("切换为手动");
		// $(".boy").css("display", "none");
		// $(".auto").css("display", "block");
		//    if ($('#cut').text() == "切换为自动") {
		//        $(".top_btn1").text("当前模式：自动");
		//        pattern = false;
		//        // stompClient.disconnect(function() {
		//        //     console.log('手动模式断开')
		//        // });
		//        // setTimeout(function() {
		//        //     connectSelf(); //建立连接,自动模式
		//        // }, 1000);
		//        // console.log('1');
		//    } else {
		//        $(".top_btn1").text("当前模式：手动");
		//        $(".top_btn2").text("切换为自动");
		//        $(".content").css("display", "block");
		//        $(".selfmotion").css("display", "none");
		//        pattern = true;
		//        // stompClient.disconnect(function() {
		//        //     console.log("自动模式断开");
		//        // });
		//        // connect(); //建立连接,手动模式
		//    }
	});



	// 氛围灯光模式
	var oPattern3btn = document.getElementById("pattern3_btn");
	var oPattern3State = document.getElementById("patt3_state");
	var oPattern3Z = document.getElementById("pattern3_z");

	function connectLed() {
		// 建立连接对象（还未发起连接）
		var socket = new WebSocket("ws://192.168.1.10:8080/webSocketEndPoint");
		// 获取 STOMP 子协议的客户端对象
		stompClient = Stomp.over(socket);
		// 向服务器发起websocket连接并发送CONNECT帧
		stompClient.connect({}, function connectCallback(frame) {
				console.log('[' + frame + ']' + '自动模式：连接成功');
				stompClient.subscribe('/topic/udp/broadcast', function (response) {
					// console.log(response.body);
					var stringResult = response.body.split(',');
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
					// if (response.body == ) {
					// }
					if (Byte0 == "5E") {
						if (FrameId == "101") {
							var led1 = true;
						}
						if (FrameId == "102") {
							var led2 = true;
						}
					}

					if (led1 == true && led2 == true && led3 == true) {
						oPattern3Z.classList.add("active");
						oPattern3btn.style.backgroundColor = "#5B9BD5";
						oPattern3btn.disabled = false;
						oPattern3State.innerHTML = "可以启动";
						// element.style.fontWeight = "bold"
					}
				});
			},
			// 报错原因
			function errorCallBack(error) {
				console.log('连接失败[' + error + ']');
				setTimeout(function () {
					// 自动重连
					connectLed();
				}, 100);
			}
		);
	};
	var led1 = false;
	var led2 = false;
	var led3 = false;
	var led4 = false;

	$("#selfer_three").click(function () {
		connectLed();
		$(".selfmotion").css("display", "none");
		$(".Pattern3").css("display", "block");
		stompClient.send("/app/wu", {}, "S101,5F,00,00,00,00,00,00,00K");
		setTimeout(function () {
			stompClient.send("/app/wu", {}, "S102,5F,00,00,00,00,00,00,00K");
		}, 100);
		setTimeout(function () {
			stompClient.send("/app/wu", {}, "S103,5F,00,00,00,00,00,00,00K");
		}, 200);
	});

	$(".pattern3_button").click(function () {
		stompClient.send("/app/wu", {}, "S101,00,00,00,00,00,00,00,00K");
		$("#pattern3_ico1").addClass("active");
		setTimeout(function () {
			stompClient.send("/app/wu", {}, "S102,00,00,00,00,00,00,00,00K");
			$("#pattern3_ico1").removeClass("active");
			$("#pattern3_ico2").addClass("active");
		}, 100);
		setTimeout(function () {
			stompClient.send("/app/wu", {}, "S103,00,00,00,00,00,00,00,00K");
			$("#pattern3_ico1").removeClass("active");
			$("#pattern3_ico2").addClass("active");
		}, 200);


	});
	$(".pattern3_tuichu").click(function () {
		stompClient.disconnect(function () {
			console.log("自动模式-灯光氛围灯:断开");
		});
		var led1 = false;
		var led2 = false;
		var led3 = false;
		var led4 = false;
		$(".selfmotion").css("display", "block");
		$(".Pattern3").css("display", "none");
	});