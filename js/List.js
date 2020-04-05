window.onload = function() {
	$("#back").click(function() {
		location.href = "./Auto.html";
	});
	// 添加逻辑与节点
	var nodeIndex = 10;
	$("#plus").click(function() {
		nodeIndex++;
		var $One = $(
			'<div class="node_one"><div class = "string"></div><div class = "logic"></div><div class = "string"></div><div class = "node_small"><span>节点<span>' +
			nodeIndex +
			'</span></span><div class="strip"><div class="strip_head"><img src="./img/33.png"  class="strip_head_img"></div><div class="strip_one"></div></div></div></div>'
		);
		$(".node").append($One);
	});

	$(".lib").click(function() {
		$(".library").animate({
			opacity: 1
		}, "slow", function() {
			$(".library").animate({
				width: "16vw",
				height: '100%'
			}, "slow", function() {})
		})

		// $(".library").stop(true).slideDown("slow");
	});

	$(".library_Back").click(function() {
		// $(".library").stop(true).fadeOut("slow");
		$(".library").animate({
			width: "0vw",
			height: '0vw'
		}, "slow", function() {
			$(".library").animate({
				opacity: 0
			}, "slow", function() {

			})
		})
		// $(".library").delay(600).animate({
		// 	opacity: 0
		// }, 200);

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

	var pack2 = true;
	$("#pack2").click(function() {
		if (pack2) {
			$("#library_body_body2").animate({
				height: "0.1vw"
			}, "slow", function() {})
			pack2 = false;
		} else {
			$("#library_body_body2").animate({
				height: "100%"
			}, "slow", function() {});
			pack2 = true;
		}
	});




	$(".strip").on("click", ".strip_head_img", function() {
		// $(".active").find(".strip_one").append($One);
		var oSrc = $(this).attr("src");
		if (oSrc == './img/33.png') {
			// console.log('1');
			$(this).parents('.strip').animate({
				height: "0"
			}, "slow", function() {});
			$(this).attr({
				src: "./img/44.png"
			});
		} else {
			$(this).parents('.strip').animate({
				height: "100%"
			}, "slow", function() {});
			$(this).attr({
				src: "./img/33.png"
			});
		}
	});
	$(".node").on("click", ".string_span", function() {
		// console.log($(this));
		var flag = $(this).parents(".node_small").hasClass("active");
		$(".node_one div").removeClass("active");
		if (flag) {
			$(this).parents(".node_small").removeClass("active");
		} else {
			$(this).parents(".node_small").addClass("active");
		}

	});

	$(".node").on("click", ".logic", function() {
		var flag = $(this).hasClass("active2");
		$(".node_one div").removeClass("active2");
		if (flag) {
			$(this).removeClass("active2");
		} else {
			$(this).addClass("active2");
		}
	});

	$(".library_body_body").on("click", ".library_body_body_one", function() {
		console.log($(this).attr('id'));
		var $One = $(
			'<div class="lamp_body_one"><input type="text" name="" class="lamp_remark "><span class="lamp_body_one_span">ID:<span class="lamp_body_one_id">0x123</span></span><div class="lamp_body_one_one"><label for="">模式:</label><select class="lamp_xuanxiang" name="" value=""><option value="01">关闭模式</option></select><span>流动LED:</span><input class="liudong" type="text"><span>LED数量:</span><input class="led" type="text"><span>速度:</span><input class="sudu" type="text"><span>颜色:</span><input type="color" name="" class="yanse" /><span>白色值:</span><input type="text" name="" class="type7" /><button class="lamp_send">执行</button></div></div>'
		);
		$(".active").find(".strip_one").append($One);



	});


	var currentIndex = 0; //当前执行节点位置
	var nodeSum = nodeIndex; //共有10个节点
	var isAction = false;
	//总节点数比逻辑多一个
	//默认10个节点,9个逻辑
	/**
	 * 启动功能
	 */

	$("#start").click(function() {
		isLogic();
	});

	function actionGo() {
		if (isAction) {
			return;
		}
		currentIndex = 0;
		isAction = true;

	}

	/**
	 * 逻辑判断
	 */
	function isLogic() {
		if (!isAction) {
			return;
		}
		// if(currentIndex == 0) {
		// }
		if (currentIndex >= nodeSum) {
			//已经全部执行完毕
			isAction = false;
			return;
		}
		actionDo();
		//开始判断 currentIndex 位置的逻辑
		if (currentIndex < (nodeSum - 1)) { // 判断currentIndex位置是否有逻辑  
			//从页面获取
			var logicValue = 0; //逻辑信号
			var logicId = "0x123"; //逻辑的ID  门
			var delay = 1; //延迟时间秒
			for (var i = 0; i < logicMap.length; i++) {
				if (logicMap[i].id == logicId) {
					if (logicValue == logicMap[i].value) {
						setTimeout(function() {
							currentIndex++;
							isLogic();
						}, delay * 1000);
						return;

					}
				}

			}
			//不满足条件 死循环
			loopLogic();

		} else {
			//已经全部执行完毕
			isAction = false;
		}
	}
	// 停止
	function stop() {
		isAction = false;

	}

	function loopLogic() {
		if (!isAction) {
			return;
		}
		setTimeout(function() {
			//从页面获取
			var logicValue = 0; //逻辑信号
			var logicId = "0x123"; //逻辑的ID  门
			var delay = 1; //延迟时间秒
			for (var i = 0; i < logicMap.length; i++) {
				if (logicMap[i].id == logicId) {
					if (logicValue == logicMap[i].value) {
						setTimeout(function() {
							currentIndex++;
							isLogic();
						}, delay * 1000);
						return;
					}
				}

			}
			loopLogic();
		}, 1000);
		//从页面获取


	}



	function actionDo() {
		//TODO 扫描 currentIndex 节点的内容,并发送
		// var oSend = 
		 $("li").each(function(){
		    alert($(this).text())
		  });
			// stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,00,00,00,00,00K");
		//$("#node"+currentIndex)
	}




	// $(".node_small").click(function() {
	// $(".node_one div").removeClass("active");
	// 	$(this).addClass("active");
	// });

	var logicMap = [];


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
					var Byte7 = stringResult[8].substring(0, 2);

					// var Byte7 = Byt7.substring(0, Byt7.length - 1);
					var oYemian = document.getElementById(FrameId);
					var loca = storage.getItem(FrameId);
					// console.log(typeof(Byte5));
					// 判断新旧id  /  页面不存在  新id 
					// 逻辑信号保存到全局变量 TODO
					//是否使逻辑信号
					//假设 收到的是逻辑信号  byte0 是 信号值

					for (var i = 0; i < logicMap.length; i++) {
						if (logicMap[i].id == FrameId) {
							logicMap[i].value = Byte0;
							return;
						}

					}
					var temp = {};
					temp.id = FrameId;
					temp.value = Byte0;
					logicMap.push(temp);


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
