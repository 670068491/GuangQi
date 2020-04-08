window.onload = function() {
	var storage = window.localStorage;
	var stompClient = null; //定义全局变量，代表一个session

	function GainName() {
		var name = $.Request("name");
		var stylist = $.Request("stylist");
		// console.log(name);
		// console.log(stylist);
		if (name != "null") {
			$('.auto_top_two_1').text(name);
			$('.auto_top_two_3').text(stylist);
		}
	}

	$(function() {
		GainName();
		// connect(); //建立连接
		
		initData();//初始化数据
		// drawHtml(); //初始化界面
	});






	$("#back").click(function() {
		location.href = "./Auto.html";
	});

	// $("#plus").click(function() {
	// 	nodeIndex++;
	// 	var $One = $(
	// 		'<div class="node_one"><div class = "string"></div><div class = "logic"></div><div class = "string"></div><div class = "node_small"><span>节点<span>' +
	// 		nodeIndex +
	// 		'</span></span><div class="strip"><div class="strip_head"><img src="./img/33.png"  class="strip_head_img"></div><div class="strip_one"></div></div></div></div>'
	// 	);
	// 	$(".node").append($One);
	// });

	$(".lib").click(function() { // 元件库
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
			}, "slow", function() {})
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

	var pack2 = true; //元件库  电机
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
	var pack3 = true; //元件库  输入信号
	$("#pack3").click(function() {
		if (pack3) {
			$("#library_body_body3").animate({
				height: "0.1vw"
			}, "slow", function() {})
			pack3 = false;
		} else {
			$("#library_body_body3").animate({
				height: "100%"
			}, "slow", function() {});
			pack3 = true;
		}
	});



















	var nodeList = []; //总节点
	var logicList = [];

	var currentIndex = 0; //当前执行节点位置
	var nodeIndex = 10; //共有10个节点
	// var nodeSum = nodeIndex; 
	var presentNodeIndex = null;

	//1 init data 第一步，初始化
	function initData() {
		//添加10个节点
		for (var i = 0; i < nodeIndex; i++) {
			var node = {};
			node.remark = "备注";  //remark
			node.node_name = "结点" + (i + 1);  //nodeName
			node.node_sort = i;    //nodeSort
			node.deviceList = []; //单节点的设备
			nodeList.push(node);
		}
		//添加9个逻辑
		// console.log(nodeList);
		// private String signalType;
		//   private long signalValue;
		//   private long delay;
		//   private long theOrder;

		for (var i = 0; i < nodeIndex - 1; i++) {
			var node = {};
			node.signalType = "";
			// node.node_name = "结点" + (i + 1);
			node.signalValue = 0;
			node.delay = 1;
			node.theOrder = i;
			// node.deviceList = []; //单节点的设备
			logicList.push(node);
		}
	}



	//2 在页面上创建节点逻辑设备
	function drawHtml() {
		var htmlStr = ``;
		for (var i = 0; i < nodeList.length; i++) {
			//添加一个竖杠
			htmlStr += `<div class="string"></div>`;
			//添加一个结点
			htmlStr +=
				`<div class="node_small" id="${'o'+[i]}">
						<span class="string_span">${nodeList[i].node_name}</span>
						<div class="strip">
							<div class="strip_head"><img src="./img/33.png" class="strip_head_img"></div>
							<div class="strip_one">`
			//添加设备
			// if (Array.isArray(nodeList[i].deviceList)) {
			if (Array.isArray(nodeList[i].deviceList)) {
				// console.log(nodeList[i].deviceList);
				// console.log(nodeList);
				for (var j = 0; j < nodeList[i].deviceList.length; j++) {
					//判断类型，等
					htmlStr +=
						`<div class="lamp_body_one">
									<input type="text" name="" class="lamp_remark ">
									<span class="lamp_body_one_span">ID:<span class="lamp_body_one_id">0x123</span>
									</span>
									<div class="lamp_body_one_one">
										<label for="">模式:</label>
										<select class="lamp_xuanxiang" name="" value="">
											<option value="01">关闭模式</option>
										</select>
										<span>流动LED:</span>
										<input class="liudong" type="text">
										<span>LED数量:</span>
										<input class="led" type="text">
										<span>速度:</span>
										<input class="sudu" type="text">
										<span>颜色:</span>
										<input type="color" name="" class="yanse" />
										<span>白色值:</span>
										<input type="text" name="" class="type7" />
										<!-- <button class="lamp_send">执行</button> -->
									</div>
								</div>`
				}
			}

			htmlStr += `</div>
						</div>
					</div>`;
			if (i < logicList.length) {
				//添加一个竖杠
				htmlStr += `<div class="string"></div>`;
				//添加逻辑
				htmlStr +=
					`<div class="logic">
						<div class="points">
							<div  class="points_signal">
								<!-- <span>门信号</span> -->
								<label for="">门信号:</label>
								<select>
									<option value="01">01</option>
									<option value="02">00</option>
								</select>
							</div>
							<div  class="points_delay">
								<span>延迟(执行前)</span>
								<input type="" name="" id="" value="${logicList[i].delay}" />秒
							</div>
						</div>
					</div>`;
			}

		}
		$(".node").html(htmlStr);
	}
	// 节点里的组件刷新
	function drawNode() {
		var htmlStr = ``;
		//判断类型，等
		// console.log(presentNodeIndex);
		// if (Array.isArray(nodeList[i].deviceList)) {
		for (var j = 0; j < nodeList[presentNodeIndex].deviceList.length; j++) {
			if (nodeList[presentNodeIndex].deviceList[j].deviceType == 'light') {
				htmlStr +=
					`<div class="lamp_body_one" id="${nodeList[presentNodeIndex].deviceList[j].deviceId}">
								<input type="text" name="" class="lamp_remark">
								<span class="lamp_body_one_span">ID:<span class="lamp_body_one_id">0X${nodeList[presentNodeIndex].deviceList[j].deviceId}</span>
								</span>
								<div class="lamp_body_one_one">
									<label for="">模式:</label>
									<select class="lamp_xuanxiang" name="" value="">
										<option value="01">关闭模式</option>
										<option value="02">打开模式</option>
										<option value="03">呼吸模式</option>
										<option value="04">颜色过渡模式</option>
										<option value="05">正向流水保持模式</option>
										<option value="06">正向流水不保持模式</option>
										<option value="07">反向流水保持模式</option>
										<option value="08">反向流水不保持模式</option>
										<option value="09">带数量正向流水模式</option>
										<option value="0A">带数量反向流水模式</option>
										<option value="0B">正向灭灯流水保持模式</option>
										<option value="0C">正向灭灯流水模式</option>
										<option value="0D">正向慢速流水保持模式</option>
										<option value="0E">正向慢速流水不保持模式</option>
										<option value="0F">反向慢速流水保持模式</option>
										<option value="10">反向慢速流水不保持模式</option>
										<option value="11">带数量正向慢速流水模式</option>
										<option value="12">带数量反向慢速流水模式</option>
										<option value="13">带数量正向拖尾流水模式</option>
										<option value="14">带数量反向拖尾流水模式</option>
										<option value="15">多彩正向流水模式</option>
										<option value="16">多彩反向流水模式</option>
										<option value="17">全彩像素颜色设置模式</option>
										<option value="18">全彩像素显示模式</option>
										<option value="19">全彩像素清除模式</option>
										<option value="1A">单色像素颜色设置模式</option>
										<option value="1B">单色像素显示模式</option>
									</select>
									<span>流动LED:</span>
									<input class="liudong" type="text">
									<span>LED数量:</span>
									<input class="led" type="text">
									<span>速度:</span>
									<input class="sudu" type="text">
									<span>颜色:</span>
									<input type="color" name="" class="yanse" />
									<span>白色值:</span>
									<input type="text" name="" class="type7" />
									<button class="lamp_send" data-index="${j}" >保存</button>
								</div>
							</div>`

			} else if (nodeList[presentNodeIndex].deviceList[j].deviceType == 'elec') {
				htmlStr +=
					`<div class="elec_body_one" id="${nodeList[presentNodeIndex].deviceList[j].deviceId}">
									<input type="text" name="" class="elec_remark">
									<span class="elec_body_one_span">ID:
										<span class="elec_body_one_id">0X${nodeList[presentNodeIndex].deviceList[j].deviceId}</span>
									</span>
									<div class="elec_right">
										
										<input type="range" disabled="true" name="" min="0" max="100" value="10" step="1" class="elec_int">
										<input type="text" value="" class="elec_cover">
										<input type="text" value="" class="elec_OverAll">
										<input type="text" value="" class="elec_Current">
										
										<button type="button" class="elec_up">前进</button>
										<button type="button" class="elec_down">后退</button>

										<label for="">
											<input type="radio" name="${nodeList[presentNodeIndex].deviceList[j].deviceId}" value="1">1
											<input type="radio" name="${nodeList[presentNodeIndex].deviceList[j].deviceId}" value="2">2
											<input type="radio" name="${nodeList[presentNodeIndex].deviceList[j].deviceId}" value="3">3
											<input type="radio" name="${nodeList[presentNodeIndex].deviceList[j].deviceId}" value="2">4
										</label>
										<button type="button" class="elec_save">保存位置</button>
									</div>
									<button type="button" class="elec_Allsave" data-index="${j}">保存</button>
								</div>`;
			}
		}
		$(".active").find('.strip_one').html(htmlStr);
		// console.log(nodeList);
	}







	/**
	 * 3，添加设备
	 * @param {Object} index 当前在第几个结点  从0开始
	 * @param {Object} name
	 * @param {Object} id
	 * @param {Object} value   'S123:12:F2,22S'
	 */
	function addDevice(index, id, value) {
		/*
		`deviceType` varchar(512) DEFAULT NULL COMMENT '设备类型',
		  `deviceValue` varchar(512) DEFAULT NULL COMMENT '设备值',
		  `deviceId` varchar(128) DEFAULT NULL COMMENT '设备id',
		  `the_order` int
		*/
		var device = {};
		var loca = storage.getItem(id);
		var locaObj = JSON.parse(loca);
		var Type = locaObj.type;

		switch (Type) {
			case "01":
				// 流水灯
				device.deviceType = "light";
				break;
			case "06":
				// 电机
				device.deviceType = "elec";
				break;
			default:
				console.log("没有此类型");
				break;
		}

		// device.deviceType = "light";
		device.theOrder = index;
		device.deviceId = id;
		device.deviceValue = value;
		if (!Array.isArray(nodeList[index].deviceList)) {
			nodeList[index].deviceList = [];
		}
		nodeList[index].deviceList.push(device);
		console.log(nodeList);
		// drawHtml();
		drawNode();
	}
	
	function save() {
		// id:id
		// nodeList  : JSON.stringify(nodeList);
		// logicList	:JSON.stringify(logicList);
	}
	/**
	 * 3，添加设备
	 * @param {Object} index 当前在第几个结点  从0开始
	 * @param {Object} name
	 * @param {Object} id
	 * @param {Object} value   'S123:12:F2,22S'
	 */
	function addLogic(index, id, value) {
		var device = {};
		var loca = storage.getItem(id);
		var locaObj = JSON.parse(loca);
		var Type = locaObj.type;


		device.deviceId = id;
		device.deviceValue = value;
		if (!Array.isArray(nodeList[index].deviceList)) {
			nodeList[index].deviceList = [];
		}
		nodeList[index].deviceList.push(device);
		console.log(logicList);
		// drawHtml();
		drawLogic();

	}


	

	// NodeIndex
	//元件库 添加进节点   //灯光
	$("#library_body_body1").on("click", ".library_body_body_one", function() {

		if ($(".node_small").hasClass('active')) {
			var Index = $(".active").attr('id').substring(1);
			var Id = $(this).attr('id').substring(2);
			presentNodeIndex = Index;

			if ($(".active").find('#' + Id).length == 0) {
				addDevice(Index, Id, '00,00,00,00,00,00,00,00');
			}
		}
		// var oActive = document.getElementsByClassName("active");
		// console.log($(".node_small").hasClass('active'))
		// var oYemian = document.getElementById(FrameId);
		// console.log($(".active").find('#' + Id));
		// if (!document.getElementById(Id)) {
		// if(  nodeList[presentNodeIndex].deviceList.){
		// }
		// console.log(Index);
		// $(".active").find(".strip_one").append($One);
	});
	//电机
	$("#library_body_body2").on("click", ".library_body_body_one", function() {
		if ($(".node_small").hasClass('active')) {
			var Index = $(".active").attr('id').substring(1);
			var Id = $(this).attr('id').substring(2);
			presentNodeIndex = Index;
			addDevice(Index, Id, '00,00,00,00,00,00,00,00');
		}
	});

	//逻辑点添加进 界面
	$("#library_body_body3").on("click", ".library_body_body_one", function() {
		if ($(".node_small").hasClass('active2')) {
			var Index = $(".active2").attr('id').substring(1);
			var Id = $(this).attr('id').substring(2);
			presentNodeIndex = Index;
			// addDevice(Index, Id, '00,00,00,00,00,00,00,00');
		}
	});
//逻辑点  设置01 
	$(".node").on("click", ".button_body_one_btn_circle", function() {
		var flag = $(this).hasClass("active3");
		$(".node div").removeClass("active3");
		
		$(".node select").remove();
		if (flag) {
			// $(this).removeClass("active3");
		} else {
			$(this).addClass("active3");
			
			var htmlStr = ``;
			htmlStr +=`<select>
							<option value="01">00</option>
											<option value="02">01
											</option>
										</select>`;
			
			$(this).parents('.button_body_one_btn').append(htmlStr);
		}
	});







	// 事件委托，灯光保存
	$(".node").on("click", ".lamp_send", function() {
		var id = $(this).parents(".lamp_body_one").attr('id');
		var type0 = $(this).siblings(".lamp_xuanxiang").val();
		var type1 = $(this).siblings(".liudong").val();
		var type2 = $(this).siblings(".led").val();
		var type3 = $(this).siblings(".sudu").val();
		var type7 = $(this).siblings(".type7").val();
		var oColor = $(this).siblings(".yanse").val();

		var colvul = hex2rgb(oColor);
		colvul = colvul.substring(0, colvul.length - 1).slice(4);
		var str = colvul.split(',');
		var type4 = parseInt(str[0]).toString(16).toUpperCase();
		var type5 = parseInt(str[1]).toString(16).toUpperCase();
		var type6 = parseInt(str[2]).toString(16).toUpperCase();

		if (type4.length < 2) {
			type4 = "0" + type4;
		}
		if (type5.length < 2) {
			type5 = "0" + type5;
		}
		if (type6.length < 2) {
			type6 = "0" + type6;
		}
		var arrindex = $(this).attr("data-index");
		var nodeId = $(this).parents(".node_small").attr('id').substring(1);
		// console.log($(this).attr("data-index"));
		// console.log(nodeId);
		nodeList[nodeId].deviceList[arrindex].deviceValue = type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 +
			"," + type5 + "," + type6 + "," + type7 + "K";
		// console.log(nodeList);
		// stompClient.send("/app/wu", {}, "S" + id + "," + type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 +
		// 	"," + type5 + "," + type6 + "," + type7 + "K");
		// alert("S" + id + "," + type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 + "," + type5 + "," + type6 +
		// 	"," + type7 + "K");
	});


	// HEX 到 RGB ，注意处理简写“#abc”为“#aabbcc”
	function hex2rgb(hex) {
		var hexNum = hex.substring(1);
		hexNum = '0x' + (hexNum.length < 6 ? repeatLetter(hexNum, 2) : hexNum);
		var r = hexNum >> 16;
		var g = hexNum >> 8 & '0xff';
		var b = hexNum & '0xff';
		return `rgb(${r},${g},${b})`;

		function repeatWord(word, num) {
			var result = '';
			for (let i = 0; i < num; i++) {
				result += word;
			}
			return result;
		}

		function repeatLetter(word, num) {
			var result = '';
			for (let letter of word) {
				result += repeatWord(letter, num);
			}
			return result;
		}
	};

	// 电机发送
	var elecSet; //前进
	$(".node").on("mousedown", ".elec_up", function() {
		var id = $(this).parents(".elec_body_one").attr('id');
		$(this).css("background-color", "pink");
		elecSet = setInterval(function() {
			stompClient.send("/app/wu", {}, "S" + id + ",0B,00,00,00,00,00,10,50K");
		}, 100);
		// console.log("S" + id + ",0B,00,00,00,00,00,00,00K");
	});
	$(".node").on("mouseup", ".elec_up", function() {
		clearInterval(elecSet);
		$(this).css("background-color", "#5b9bd5");
	});
	var elecSetDown; //后退
	$(".node").on("mousedown", ".elec_down", function() {
		var id = $(this).parents(".elec_body_one").attr('id');
		$(this).css("background-color", "pink");
		elecSetDown = setInterval(function() {
			stompClient.send("/app/wu", {}, "S" + id + ",0C,00,00,00,00,00,10,50K");
		}, 50)
	});
	$(".node").on("mouseup", ".elec_down", function() {
		clearInterval(elecSetDown);
		$(this).css("background-color", "#5b9bd5");
	});

	//电机位置保存
	$(".node").on("click", ".elec_save", function() {
		var Id = $(this).parents(".elec_body_one").attr('id');
		var oIdCov = $(this).siblings('.elec_cover').val();
		var list = $('input:radio[name=' + Id + ']:checked').val();
		console.log(oIdCov)

		if (list == null) {
			alert("请选中一个!");
			return false;
		} else {
			$('input:radio[name=' + Id + ']:checked').val(oIdCov);
			// console.log($('input:radio[name=' + Id + ']:checked').val());
			// alert(id);
		}
	});


	// 电机 保存在节点
	// $(".node").on("click", ".elec_Allsave", function() {
	// 	var Id = $(this).parents(".elec_body_one").attr('id');
	// 	console.log(Id);
	// 	// var oIdCov = $(this).siblings('.elec_cover').val();
	// 	var list = $('input:radio[name=' + Id + ']:checked').val();
	// 	if (list == null) {
	// 		alert("请选中一个!");
	// 		return false;
	// 	} else {
	// 		// alert(list);
	// 		// stompClient.send("/app/wu", {}, "S" + Id + ",0D,00,00,50," + list + "K");
	// 		// console.log("S" + Id + ",0D,00,00,50," + list + "K");
	// 		var arrindex = $(this).attr("data-index");
	// 		var nodeId = $(this).parents(".node_small").attr('id').substring(1);
	// 		// console.log($(this).attr("data-index"));
	// 		// console.log(nodeId);
	// 		nodeList[nodeId].deviceList[arrindex].deviceValue = "0D,00,00,50," + list + "K";
	// 		console.log(nodeList);
	// 		// $('input:radio[name=' + id + ']:checked').val(oIdCov);
	// 		// alert($('input:radio[name=' + id + ']:checked').val());
	// 		// alert(id);
	// 	}
	// });


	// 添加逻辑与节点

	// 节点上箭头
	$(".strip").on("click", ".strip_head_img", function() {
		// var oheight = $(this).parents('.strip').height();
		// console.log(oheight);
		// $(".active").find(".strip_one").append($One);
		var oSrc = $(this).attr("src");
		if (oSrc == './img/33.png') {
			$(this).parent().siblings('.strip_one').stop(true).hide("slow");
			$(this).attr({
				src: "./img/44.png"
			});
			// $(this).parent().siblings('.strip_one').hide();
			// console.log('1');
			// $(this).parent().siblings('.strip_one').animate({
			// 	height: "0vw"
			// }, "slow", function() {});
		} else {
			$(this).parent().siblings('.strip_one').stop(true).show("slow");
			$(this).attr({
				src: "./img/33.png"
			});
			// $(this).parents(".strip").stop(true).animate({
			// 	height: "100%",
			// })
		}
	});

	// 节点变色
	$(".node").on("click", ".string_span", function() {
		// console.log($(this));
		var flag = $(this).parents(".node_small").hasClass("active");
		$(".node div").removeClass("active");
		if (flag) {
			$(this).parent(".node_small").removeClass("active");
		} else {
			$(this).parent(".node_small").addClass("active");
		}

	});
	// 逻辑点变色
	$(".node").on("click", ".logic_span", function() {
		var flag = $(this).parents(".logic").hasClass("active2");
		$(".node div").removeClass("active2");
		if (flag) {
			$(this).parents(".logic").removeClass("active2");
		} else {
			$(this).parents(".logic").addClass("active2");
		}
	});








	var isAction = false; //启动状态
	//总节点数比逻辑多一个
	//默认10个节点,9个逻辑
	/**
	 * 启动功能
	 */

	$("#start").click(function() {
		actionGo();
	});

	function actionGo() {
		if (isAction) {
			return;
		}
		currentIndex = 0;
		isAction = true;
		isLogic();
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
		if (currentIndex >= nodeIndex) {
			//已经全部执行完毕
			isAction = false;
			return;
		}
		actionDo();
		//开始判断 currentIndex 位置的逻辑
		if (currentIndex < (nodeIndex - 1)) { // 判断currentIndex位置是否有逻辑  
			//从页面获取
			var logicValue = 0; //逻辑信号
			var logicId = "0x123"; //逻辑的ID  门
			var delay = 1; //延迟时间秒
			setTimeout(function() {
				currentIndex++;
				isLogic();
			}, delay * 1000);
			return;


			// for (var i = 0; i < logicMap.length; i++) {
			// 	if (logicMap[i].id == logicId) {
			// 		if (logicValue == logicMap[i].value) {
			// 			setTimeout(function() {
			// 				currentIndex++;
			// 				isLogic();
			// 			}, delay * 1000);
			// 			return;

			// 		}
			// 	}

			// }
			//不满足条件 死循环
			// loopLogic();

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
		for (var i = 0; i < nodeList[currentIndex].deviceList.length; i++) {

			stompClient.send("/app/wu", {}, "S" + nodeList[currentIndex].deviceList[i].deviceId + ',' + nodeList[currentIndex]
				.deviceList[i].device_deviceValue);
		}

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
					console.log(response.body + " " + new Date().getTime());
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

					var oHtmlId = document.getElementById(FrameId);
					var loca = storage.getItem(FrameId);
					// console.log(typeof(Byte5));
					// 判断新旧id  /  页面不存在  新id 
					// 逻辑信号保存到全局变量 TODO
					//是否使逻辑信号
					//假设 收到的是逻辑信号  byte0 是 信号值
					if (!oHtmlId) {
						if (loca) {
							// console.log('1');
							var locaObj = JSON.parse(loca);
							var Type = locaObj.type;
							// var LByte4 = locaObj.Byte4;
							console.log(locaObj.type);
							switch (Type) {
								case "01":
									// 流水灯
									new lamp(FrameId);
									break;
								case "06":
									// 电机
									new elec(FrameId);
									break;
								default:
									console.log("没有此类型");
									break;
							}


						}
					}




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

	function lamp(FrameId) { //灯光
		this.oLamOne = document.getElementById("library_body_body1");
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}
	lamp.prototype = {
		constructor: lamp,
		init: function() {
			//转存this
			var self = this;
			var Id = '0X' + self.FrameId;
			// console.log('新:灯光');
			// 创建元素
			var oBig = document.createElement("div");
			oBig.classList.add("library_body_body_one");
			oBig.setAttribute("id", Id);
			// 修饰元素
			oBig.innerHTML = '<span>id:0X' + Id + '</span> <span>前灯1</span>';
			// 插入元素
			self.oLamOne.appendChild(oBig);
			console.log('1');

		}
	}

	function elec(FrameId) { //电机
		this.oLamOne = document.getElementById("library_body_body2");
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}
	elec.prototype = {
		constructor: elec,
		init: function() {
			//转存this
			var self = this;
			var Id = '0X' + self.FrameId;
			// console.log('新:灯光');
			// 创建元素
			var oBig = document.createElement("div");
			oBig.classList.add("library_body_body_one");
			oBig.setAttribute("id", Id);
			// 修饰元素
			oBig.innerHTML = '<span>id:0X' + Id + '</span> <span>前灯1</span>';
			// 插入元素
			self.oLamOne.appendChild(oBig);
			// console.log('1');

		}
	}


}
