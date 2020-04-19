window.onload = function() {
	var storage = window.localStorage;
	var stompClient = null; //定义全局变量，代表一个session
	var sceneId = null;
var myIp ="http://192.168.1.10:8081/gq/api/";

var port  = "http://192.168.1.10:8081/gq/api/getEvaluateName";





	function GainName() {
		var name = $.Request("name");
		var stylist = $.Request("stylist");
		sceneId = $.Request("uId");

		// console.log(name);
		// console.log(stylist);
		if (name != "null") {
			$('.auto_top_two_1').text(name);
			$('.auto_top_two_3').text(stylist);

		}
		// console.log(uId);
	}

	$(function() {
		GainName(); //获取链接里的名称
		connect(); //建立连接
		initData(); //初始化数据
		drawHtml(); //初始化界面
	});



	$("#back").click(function() { //返回
		location.href = "./Auto.html";
	});




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
	var oEvaluate = true;
	$(".evaluate").click(function() {

		if (oEvaluate) {
			oEvaluate = false;
			$(".evaluate_div").css("display", "block");
			$.getJSON(myIp+"", {}, function(data) {
				console.log(data);
				$('#evaluate_div_one1').text(data.resultObject.standard1);
				$('#evaluate_div_one2').text(data.resultObject.standard2);
				$('#evaluate_div_one3').text(data.resultObject.standard3);
				$('#evaluate_div_one4').text(data.resultObject.standard4);
				$('#evaluate_div_one5').text(data.resultObject.standard5);
				$('#evaluate_div_one6').text(data.resultObject.standard6);
			});
			$.getJSON(port, {
				sceneId: sceneId,
			}, function(data) {
				console.log(data);
				$('#maxs1').text(data.resultObject.maxs1);
				$('#mins1').text(data.resultObject.mins1);
				$('#avgs1').text(data.resultObject.avgs1);
				$('#maxs2').text(data.resultObject.maxs2);
				$('#mins2').text(data.resultObject.mins2);
				$('#avgs2').text(data.resultObject.avgs2);
				$('#maxs3').text(data.resultObject.maxs3);
				$('#mins3').text(data.resultObject.mins3);
				$('#avgs3').text(data.resultObject.avgs3);
				$('#maxs4').text(data.resultObject.maxs4);
				$('#mins4').text(data.resultObject.mins4);
				$('#avgs4').text(data.resultObject.avgs4);
				$('#maxs5').text(data.resultObject.maxs5);
				$('#mins5').text(data.resultObject.mins5);
				$('#avgs5').text(data.resultObject.avgs5);
				$('#maxs6').text(data.resultObject.maxs6);
				$('#mins6').text(data.resultObject.mins6);
				$('#avgs6').text(data.resultObject.avgs6);
			});
		} else {
			oEvaluate = true;
			$(".evaluate_div").css("display", "none");
		}
	});















	var nodeList = []; //总节点
	var logicList = []; //逻辑节点

	var currentIndex = 0; //当前执行节点位置
	var nodeIndex = 10; //共有10个节点
	// var nodeSum = nodeIndex; 
	var presentNodeIndex = null; //用户点击的当前节点  index


	//1 init data 第一步，初始化
	function initData() {
		//添加10个节点
		for (var i = 0; i < nodeIndex; i++) {
			var node = {};
			node.remark = "备注"; //remark
			node.node_name = "结点" + (i + 1); //nodeName
			node.node_sort = i; //nodeSort
			node.deviceList = []; //单节点的设备
			nodeList.push(node);
		}
		//添加9个逻辑
		// console.log(nodeList);
		for (var i = 0; i < nodeIndex - 1; i++) {
			var node = {};
			node.signalType = '';
			node.signalValue = '00,00,00,00,00,00,00,00';
			node.delay = 1;
			node.theOrder = i;
			logicList.push(node);
			// node.node_name = "结点" + (i + 1);
			// node.deviceList = []; //单节点的设备
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
										<select class="lamp_xuanxiang" name="" value="00">
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
										<input class="liudong" type="text" value="00">
										<span>LED数量:</span>
										<input class="led" type="text" value="00">
										<span>速度:</span>
										<input class="sudu" type="text" value="00">
										<span>颜色:</span>
										<input type="color" name="" class="yanse" value="00"/>
										<span>白色值:</span>
										<input type="text" name="" class="type7" value="00"/>
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
					`<div class="logic" id="${'l' + [i]}">
					    <span class="logic_span">逻辑<span>${[i+1]}</span></span>
						<div class="points">
							<div  class="points_signal"></div>
							<div  class="points_delay">
								<span>延迟(执行前)</span>
								<input type=""  class="points_delay_inp"  name="" id="" value="${logicList[i].delay}" />
								<span>秒</span>
								<button type="button" class="points_save">保存</button>
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
								    <select class="lamp_xuanxiang" name="" value="00">
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
								<input class="liudong" type="text" value="00">
								<span>LED数量:</span>
								<input class="led" type="text" value="00">
								<span>速度:</span>
								<input class="sudu" type="text" value="00">
								<span>颜色:</span>
								<input type="color" name="" class="yanse"/>
								<span>白色值:</span>
								<input type="text" name="" class="type7" value="00"/>
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


	// 节点里的逻辑刷新
	function drawLogic() {
		console.log(logicList);
		// console.log(logicList[presentNodeIndex].signalType[0].text);
		var htmlStr =
			`<div class="points_signal">
		                  <div class="button_body_one">
			                 <input type="text" name="" class="button_remark" value="${logicList[presentNodeIndex].signalType.split(",")[2]}" readOnly="true">
			                 <span class="button_body_one_span">ID:
			                   	<span class="button_body_one_id">${logicList[presentNodeIndex].signalType.split(",")[1]}</span>
							 </span>
						   <div class="button_body_one_one">`
		for (var i = 0; i < logicList[presentNodeIndex].signalType.split(",")[0]; i++) {
			htmlStr +=
				` <div class="button_body_one_btn" id="${logicList[presentNodeIndex].signalType.split(",")[1]+[i]}">
							                      <div class="button_body_one_btn_circle"></div>
						                    </div>  `
			// console.log('1');

		}
		`</div>
		</div>
		
	</div>`;

		// htmlStr += `<div class="points_signal">

		// </div>
		// `;

		// console.log(presentNodeIndex);
		// if (Array.isArray(nodeList[i].deviceList)) {
		// for (var j = 0; j < nodeList[presentNodeIndex].deviceList.length; j++) {
		// 	if (nodeList[presentNodeIndex].deviceList[j].deviceType == 'light') {
		// 		htmlStr +=
		// 			``

		// 	} else if (nodeList[presentNodeIndex].deviceList[j].deviceType == 'elec') {
		// 		htmlStr += ``;

		// 	}
		// }
		$(".active2").find('.points_signal').html(htmlStr);
		console.log(logicList);
	}


	//节点增加
	$("#plus").click(function() {
		nodeIndex++;

		var node = {};
		node.remark = "备注"; //remark
		node.node_name = "结点" + (nodeIndex); //nodeName
		node.node_sort = nodeIndex - 1; //nodeSort
		node.deviceList = []; //单节点的设备
		nodeList.push(node);

		var node = {};
		node.signalType = '';
		node.signalValue = '';
		node.delay = 1;
		node.theOrder = nodeIndex - 2;
		logicList.push(node);

		console.log(nodeList);
		console.log(logicList);

		// for (var i = 0; i < nodeIndex - 1; i++) {
		// 	var node = {};
		// 	node.signalType = "";
		// 	node.signalValue = 0;
		// 	node.delay = 1;
		// 	node.theOrder = i;
		// 	logicList.push(node);
		// 	// node.node_name = "结点" + (i + 1);
		// 	// node.deviceList = []; //单节点的设备
		// }


		var $One = $(
			`<div class = "string"></div>
			
			<div class = "logic">
			   <span class="logic_span">逻辑<span>${nodeIndex-1}</span></span>
			    <div class="points">
			         <div class="points_signal"></div>
			         <div class="points_delay">
				        <span>延迟(执行前)</span>
				         <input type="" name="" id="" value="1"/>
				         <span>秒</span>
				          <button type="button" class="points_save">保存</button>
			         </div>
		        </div>
			</div>
			<div class = "string"></div>
			<div class = "node_small"><span class="logic_span">节点<span>${nodeIndex}</span></span>
				<div class="strip">
				     <div class="strip_head">
			             <img src="./img/33.png"  class="strip_head_img">
			         </div>
			         <div class="strip_one">
			         </div>
			     </div>
			</div>`
		);
		$(".node").append($One);
	});




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



	function addLogic(index, id, num, text) {
		// logicList[index] = {};
		// var Type = JSON.parse(storage.getItem(id)).type;
		var num = JSON.parse(storage.getItem(id)).num;
		logicList[index].signalValue = '00,00,00,00,00,00,00';
		// logicList[index].signalType = num + ',' + id + ',' + text;
		// logicList[index].signalType ={};
		// var node = {};
		// node.num = num;
		// node.id = id;
		// node.text = text;
		// logicList[index].signalType.push(node);
		// logicList[index].signalobj = node;
		// logicList[index].signalType = JSON.stringify(node);

		logicList[index].signalType = num + ',' + id + ',' + text;
		console.log(logicList);
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
		if ($(".logic").hasClass('active2')) {
			var Index = $(".active2").attr('id').substring(1);
			var Id = $(this).attr('id').substring(2);
			var num = JSON.parse(storage.getItem(Id)).num;
			var text = $(this).find('.lib_span').text();
			presentNodeIndex = Index;
			// var locaObj =loca);
			// var Type = locaObj.type;
			// console.log(Index );
			// console.log( Id);
			// console.log(text);
			addLogic(Index, Id, num, text);
		}
	});


	//逻辑点  设置01 
	$(".node").on("click", ".button_body_one_btn_circle", function() {
		var flag = $(this).hasClass("active3");
		$(".node div").removeClass("active3");
		$(".logic select").remove();
		if (flag) {
			// $(this).removeClass("active3");
		} else {
			$(this).addClass("active3");
			var htmlStr = ``;
			htmlStr +=
				`<select>
					<option value="01">01</option>
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

		if (type1.length < 2) {
			type1 = "0" + type1;
		}
		if (type2.length < 2) {
			type2 = "0" + type2;
		}
		if (type3.length < 2) {
			type3 = "0" + type3;
		}

		if (type4.length < 2) {
			type4 = "0" + type4;
		}
		if (type5.length < 2) {
			type5 = "0" + type5;
		}
		if (type6.length < 2) {
			type6 = "0" + type6;
		}
		if (type7.length < 2) {
			type7 = "0" + type7;
		}

		// console.log(type7);


		var arrindex = $(this).attr("data-index");
		var nodeId = $(this).parents(".node_small").attr('id').substring(1);
		// console.log($(this).attr("data-index"));
		// console.log(nodeId);
		nodeList[nodeId].deviceList[arrindex].deviceValue = type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 +
			"," + type5 + "," + type6 + "," + type7 + "K";

		console.log(nodeList);
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
	// 逻辑点保存
	$(".node").on("click", ".points_save", function() {
		// var index = $(this).parents().siblings('.points_signal').
		var smallIndex = $(".active3").parents('.button_body_one_btn').attr('id').substring(3);
		var index = $(this).parents('.logic').attr('id').substr(1);


		if (smallIndex == 0) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,01';
		} else if (smallIndex == 1) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,02';
		} else if (smallIndex == 2) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,04';
		} else if (smallIndex == 3) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,08';
		} else if (smallIndex == 4) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,10';
		} else if (smallIndex == 5) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,20';
		} else if (smallIndex == 6) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,40';
		} else if (smallIndex == 7) {
			logicList[index].signalValue = '00,00,00,00,00,00,00,80';
		} else if (smallIndex == 8) {
			logicList[index].signalValue = '00,00,00,00,00,00,01,00';
		} else if (smallIndex == 9) {
			logicList[index].signalValue = '00,00,00,00,00,00,02,00';
		} else if (smallIndex == 10) {
			logicList[index].signalValue = '00,00,00,00,00,00,04,00';
		} else if (smallIndex == 11) {
			logicList[index].signalValue = '00,00,00,00,00,00,08,00';
		} else if (smallIndex == 12) {
			logicList[index].signalValue = '00,00,00,00,00,00,10,00';
		} else if (smallIndex == 13) {
			logicList[index].signalValue = '00,00,00,00,00,00,20,00';
		} else if (smallIndex == 14) {
			logicList[index].signalValue = '00,00,00,00,00,00,40,00';
		} else if (smallIndex == 15) {
			logicList[index].signalValue = '00,00,00,00,00,00,80,00';
		} else if (smallIndex == 16) {
			logicList[index].signalValue = '00,00,00,00,00,01,00,00';
		} else if (smallIndex == 17) {
			logicList[index].signalValue = '00,00,00,00,00,02,00,00';
		} else if (smallIndex == 18) {
			logicList[index].signalValue = '00,00,00,00,00,04,00,00';
		} else if (smallIndex == 19) {
			logicList[index].signalValue = '00,00,00,00,00,08,00,00';
		} else if (smallIndex == 20) {
			logicList[index].signalValue = '00,00,00,00,00,10,00,00';
		}


		// if (Index <= 7) {
		// 	logicV(byte7, smallIndex);
		// } else if (8 <= Index <= 15) {
		// 	logicV(byte6, smallIndex);
		// } else if (15 < Index) {
		// 	logicV(byte5, smallIndex);
		// }


		// console.log(Index);
		console.log(logicList);
	});

	// function logicV(byte, index) {

	// }



	// 延迟改变
	$(".node").on("blur", ".points_delay_inp", function() {
		var oVal = parseInt($(this).val());
		var index = $(this).parents('.logic').attr('id').substr(1);
		logicList[index].delay = oVal;
		console.log(logicList);
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

	$("#start").click(function() { //启动
		// $(this).css()
		$(this).css("background-color", "#0077ff");
		setTimeout(function() {
			$("#start").css("background-color", "#898989");
		}, 1000);

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
			var logicValue = logicList[currentIndex].signalValue; //逻辑信号

			var logicId;

			// var logicId = logicList[currentIndex].signalType[0].id; //逻辑的ID  门
			var delay = logicList[currentIndex].delay; //延迟时间秒
			if (logicList[currentIndex].signalType != '') {
				logicId = logicList[currentIndex].signalType.split(",")[1]; //逻辑的ID  门
			} else {
				setTimeout(function() {
					currentIndex++;
					isLogic();
				}, delay * 1000);

			}
			// setTimeout(function () {
			// 	currentIndex++;
			// 	isLogic();
			// }, delay * 1000);
			// return;

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


	$("#Stop").click(function() { //停止
		stop();
		$(this).css("background-color", "red");
		setTimeout(function() {
			$("#Stop").css("background-color", "#ff8888");
		}, 1000);
	});

	// 停止
	function stop() {
		isAction = false;
	}

	function loopLogic() {
		if (!isAction) {
			return;
		}
		setTimeout(function() {
			//从页面获取signalValue
			var logicValue = logicList[currentIndex].signalValue; //逻辑信号
			// var 
			var logicId;
			if (logicList[currentIndex].signalType != '') {
				logicId = logicList[currentIndex].signalType.split(",")[1]; //逻辑的ID  门
			}

			var delay = logicList[currentIndex].delay; //延迟时间秒
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
			console.log(nodeList);
			// console.log("S" + nodeList[currentIndex].deviceList[i].deviceId + ',' + nodeList[currentIndex].deviceList[i].deviceValue);
			stompClient.send("/app/wu", {}, "S" + nodeList[currentIndex].deviceList[i].deviceId + ',' + nodeList[currentIndex].deviceList[
				i].deviceValue);
		}
	}




	// $(".cover_cancel").click(function () {


	//保存
	$("#Save").click(function() {
		save();
		// console.log('1');
	});

	function save() {
		console.log(JSON.stringify(nodeList));
		console.log(JSON.stringify(logicList));

		$.getJSON("http://192.168.1.10:8081/gq/api/saveSceneInfo", {
			sceneId: sceneId,
			nodeList: JSON.stringify(nodeList),
			logicList: JSON.stringify(logicList),
		}, function(data) {
			console.log(data);
		});

		// 打开问卷调查
		$(".List .corer").css("display", "block");
		$(".List .List_cover").css("display", "block");
	}



	// 取消
	$(".cover_cancel").click(function() {
		$(".List .corer").css("display", "none");
		$(".List .List_cover").css("display", "none");
	});

	// 确定
	$(".cover_confirm").click(function() {
		$(".List .List_cover").css("display", "none");
		$(".List .questionnaire").css("display", "block");
		$.getJSON("http://192.168.1.10:8081/gq/api/getEvaluateName", {}, function(data) {
			console.log(data);
			$('#demonstration0').text(data.resultObject.standard1);
			$('#demonstration1').text(data.resultObject.standard2);
			$('#demonstration2').text(data.resultObject.standard3);
			$('#demonstration3').text(data.resultObject.standard4);
			$('#demonstration4').text(data.resultObject.standard5);
			$('#demonstration5').text(data.resultObject.standard6);
		});
	});

	var standard1 = 0;
	var standard2 = 0;
	var standard3 = 0;
	var standard4 = 0;
	var standard5 = 0;
	var standard6 = 0;
	var Main = {
		data() {
			return {
				value0: 0,
				value1: 0,
				value2: 0,
				value3: 0,
				value4: 0,
				value5: 0,
			}
		},
		methods: {
			formatTooltip(val) {
				return val / 10;
			},
			change(val) {
				standard1 = val;
			},
			change1(val) {
				standard2 = val;
			},
			change2(val) {
				standard3 = val;
			},
			change3(val) {
				standard4 = val;
			},
			change4(val) {
				standard5 = val;
			},
			change5(val) {
				standard6 = val;
			},

		}
	}
	var Ctor = Vue.extend(Main);
	new Ctor().$mount('#app');



	$(".questionnaire_submit").click(function() {
		var name = $("#ques_inp_input1").val();
		var age = $("#ques_inp_input2").val();
		var sex = $("#ques_inp_input3").val();
		var weight = $("#ques_inp_input4").val();
		var height = $("#ques_inp_input5").val();
		var phone = $("#ques_inp_input6").val();
		// console.log(standard1);


		$.getJSON("http://192.168.1.10:8081/gq/api/saveEvaluate", {
			sceneId: sceneId,
			standard1: standard1,
			standard2: standard2,
			standard3: standard3,
			standard4: standard4,
			standard5: standard5,
			standard6: standard6,
			name: name,
			age: age,
			sex: sex,
			weight: weight,
			height: height,
			phone: phone,

		}, function(data) {
			console.log(data);


		});


		$(".List .corer").css("display", "none");
		$(".List .questionnaire").css("display", "none");

		// console.log(name);
	});


	// $(".node_small").click(function() {
	// $(".node_one div").removeClass("active");
	// 	$(this).addClass("active");
	// });

	var logicMap = [];

	function connect() {
		// console.log('1');
		// 建立连接对象（还未发起连接）
		// var socket = new WebSocket("ws://localhost:8080/webSocketEndPoint");
		var socket = new WebSocket("ws://192.168.1.10:8080/webSocketEndPoint");
		// var socket = new WebSocket("ws://192.168.1.241:8080/webSocketEndPoint");
		stompClient = Stomp.over(socket); // 获取 STOMP 子协议的客户端对象
		stompClient.connect({}, function connectCallback(frame) { // 向服务器发起websocket连接并发送CONNECT帧
				// 连接成功时（服务器响应 CONNECTED web帧）的回调方法
				console.log('[' + frame + ']' + '手动模式：连接成功');
				stompClient.subscribe('/topic/udp/broadcast', function(response) {
					// stompClient.subscribe('/topic/socket/201', function (response) {
					// console.log(response.body + " " + new Date().getTime());
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

					var id = "0X" + FrameId;
					
					// var oHtmlId = document.getElementById(id);
					var loca = storage.getItem(FrameId);
					//console.log(typeof(Byte5));
					//判断新旧id  /  页面不存在  新id 
					//逻辑信号保存到全局变量 TODO
					//是否使逻辑信号
					//假设 收到的是逻辑信号  byte0 是 信号值
					// console.log(oHtmlId);
				
					if (!document.getElementById(id)) {
						if (loca) {
							// console.log('1');
							var locaObj = JSON.parse(loca);
							var Type = locaObj.type;
							// var LByte4 = locaObj.Byte4;
							// console.log(locaObj.type);
							switch (Type) {
								case "01": // 流水灯
									new lamp(FrameId);
									break;
								case "03": // 按钮
									var num = locaObj.num;
									// console.log(num);
									new button(FrameId, num);
									break;
								case "06": // 电机
									new elec(FrameId);
									break;
								case "0A": // 传感器
									var num = locaObj.num;
									new button(FrameId, num);
									break;
								default:
									// console.log("没有此类型");
									break;
							}
						}
					}


					for (var i = 0; i < logicMap.length; i++) {
						if (logicMap[i].id == FrameId) {
							logicMap[i].value = Byte0 + ',' + Byte1 + ',' + Byte2 + ',' + Byte3 + ',' + Byte4 + ',' + Byte5 + ',' +
								Byte6 + ',' + Byte7;
							return;
						}
					}

					var temp = {};
					temp.id = FrameId;
					temp.value = Byte0 + ',' + Byte1 + ',' + Byte2 + ',' + Byte3 + ',' + Byte4 + ',' + Byte5 + ',' + Byte6 + ',' +
						Byte7;
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
			// console.log(Id);
			$.getJSON("http://192.168.1.10:8081/gq/api/getRemark", {
				deviceId: self.FrameId,
			}, function(data) {
				// console.log(data);
				if (data.resultObject.length == 0) { // 修饰元素
					oBig.innerHTML = '<span>id:' + Id + '</span> <span></span>'
					self.oLamOne.appendChild(oBig);
				} else {
					text = data.resultObject[0].deviceValue;
					oBig.innerHTML = '<span>id:' + Id + '</span> <span>' + text + '</span>'
					self.oLamOne.appendChild(oBig);
				}
			});
		}
	};

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
			var oBig = document.createElement("div"); // 创建元素
			oBig.classList.add("library_body_body_one");
			oBig.setAttribute("id", Id);
			$.getJSON("http://192.168.1.10:8081/gq/api/getRemark", {
				deviceId: self.FrameId,
			}, function(data) {
				// console.log(data);
				if (data.resultObject.length == 0) { // 修饰元素
					oBig.innerHTML = '<span>id:' + Id + '</span> <span></span>'
					self.oLamOne.appendChild(oBig);
				} else {
					text = data.resultObject[0].deviceValue;
					oBig.innerHTML = '<span>id:' + Id + '</span> <span>' + text + '</span>'
					self.oLamOne.appendChild(oBig);
				}
			});
		}
	}


	function button(FrameId, num) { //按钮
		this.oLamOne = document.getElementById("library_body_body3");
		this.FrameId = FrameId;
		this.num = num;
		//自动初始化
		this.init();
	}
	button.prototype = {
		constructor: button,
		init: function() {
			//转存this
			var self = this;
			var Id = '0X' + self.FrameId;
			// console.log('新:灯光');
			var oBig = document.createElement("div"); // 创建元素
			oBig.classList.add("library_body_body_one");
			oBig.setAttribute("id", Id);
			$.getJSON("http://192.168.1.10:8081/gq/api/getRemark", {
				deviceId: self.FrameId,
			}, function(data) {
				// console.log(data);
				if (data.resultObject.length == 0) { // 修饰元素
					oBig.innerHTML = '<span>id:' + Id + '</span> <span class="lib_span"></span>'
					self.oLamOne.appendChild(oBig);
				} else {
					text = data.resultObject[0].deviceValue;
					oBig.innerHTML = '<span>id:' + Id + '</span> <span class="lib_span">' + text + '</span>'
					self.oLamOne.appendChild(oBig);
				}
			});
		}
	}

	// function sens(FrameId, num) { //按钮
	// 	this.oLamOne = document.getElementById("library_body_body3");
	// 	this.FrameId = FrameId;
	// 	this.num = num;
	// 	//自动初始化
	// 	this.init();
	// }
	// sens.prototype = {
	// 	constructor: sens,
	// 	init: function () {
	// 		//转存this
	// 		var self = this;
	// 		var Id = '0X' + self.FrameId;
	// 		// console.log('新:灯光');
	// 		var oBig = document.createElement("div"); // 创建元素
	// 		oBig.classList.add("library_body_body_one");
	// 		oBig.setAttribute("id", Id);
	// 		$.getJSON("http://39.106.47.82:8080/gq/api/getRemark", {
	// 			deviceId: self.FrameId,
	// 		}, function (data) {
	// 			// console.log(data);
	// 			if (data.resultObject.length == 0) { // 修饰元素
	// 				oBig.innerHTML = '<span>id:' + Id + '</span> <span class="lib_span"></span>'
	// 				self.oLamOne.appendChild(oBig);
	// 			} else {
	// 				text = data.resultObject[0].deviceValue;
	// 				oBig.innerHTML = '<span>id:' + Id + '</span> <span class="lib_span">' + text + '</span>'
	// 				self.oLamOne.appendChild(oBig);
	// 			}
	// 		});
	// 	}
	// }




}
