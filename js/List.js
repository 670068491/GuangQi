window.onload = function() {
	var stompClient = null; //定义全局变量，代表一个session
	var sceneId = null;
	var isopen = null;

	var List = []; //总数组
	var nodeList = []; //总节点
	var logicList = []; //逻辑节点
	var ListType = []; //类型数组  包含所有的id,类型,num  localStorage作用
	var logicMap = []; //判断数组
	var libraryList = []; //复位数组

	var currentIndex = 0; //当前执行节点位置
	var nodeIndex = 10; //共有10个节点
	// var nodeSum = nodeIndex;
	var presentNodeIndex = null; //用户点击的当前节点  index
	var serverAddr = "http://192.168.1.10:8081/gq/api/";
	var elcarray = []; //存放点击四个预设值
	//当选择次点击是 先从此处查询，如果没有，则请求服务器，获取


	function GainName() {
		var name = $.Request("name");
		var stylist = $.Request("stylist");
		isopen = $.Request("isopen");
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
		console.log(isopen);
		getElcAll();
		$.getJSON(serverAddr + "getDeviceTypeAll", {}, function(data) {
			ListType = data.resultObject;

			for (let z = 0; z < ListType.length; z++) { //元件库虚拟按钮
				if (ListType[z].ftype == '10') {
					// 元件库创建
					var text = ListType[z].remark;
					var oLibr = document.createElement("div");
					var oLibrId = 'libr' + ListType[z].frameId;
					oLibr.classList.add("library_body_body_one");
					oLibr.setAttribute("id", oLibrId);
					oLibr.innerHTML = '<span>id:0X' + ListType[z].frameId + '</span> <span class="elec_remake">' + text +
						'</span>';
					document.getElementById("library_body_body3").appendChild(oLibr);


					var Id = ListType[z].frameId;
					var Lbyte4Length = ListType[z].fnum;

					var oBig = document.createElement("div");
					oBig.classList.add("virtual_body_one");
					oBig.setAttribute("id", Id);
					var oId = Id + 'i';


					oBig.innerHTML = '<input type="text" name="" class="virtual_remark" readonly="readonly" value=' + text +
						'><span class="virtual_body_one_span">id:<span class="virtual_body_one_id">0x' + Id +
						'</span></span><div class="virtual_body_one_one" id=' + oId + '></div>';
					document.getElementById("lib_virtual").appendChild(oBig);

					for (var j = 0; j < Lbyte4Length; j++) {
						var text1 = ListType[z].samllremark[j];
						var oBtnBtn = document.createElement("div");
						var oSim = document.getElementById(oId);
						var Ssid = oId + [j];
						oBtnBtn.setAttribute("id", Ssid);

						oBtnBtn.classList.add("virtual_body_one_btn");
						oBtnBtn.innerHTML = '<div class="virtual_body_one_btn_circle" id=' + Ssid +
							'></div><div> <input type ="text" readonly="readonly" class = "virtual_smallMake" value= ' + text1 +
							'></div>';
						oSim.appendChild(oBtnBtn);
					}

					// new virtual(ListType[z].frameId, ListType[z].fnum);
				}
			}


			connect(); //建立连接
			// console.log(ListType);
		});
	});

	//先获取点击四个值
	function getElcAll() {
		$.getJSON(serverAddr + "getElcAll", {}, function(data) {
			console.log(data);
			elcarray = data.resultObject;
			if (isopen == "open") {
				// console.log(isopen);
				getDataFormServer();
			} else {
				initData(); //初始化数据
				drawHtml(); //初始化界面
			}

		});
	}

	function getDataFormServer() {
		$.getJSON(serverAddr + "getSceneInfo", {
			sceneId: sceneId
		}, function(data) {
			console.log(data);
			nodeList = data.resultObject.nodeList;
			logicList = data.resultObject.logicList;
			nodeIndex = data.resultObject.nodeList.length;

			drawHtml();
		});
	}


	$("#back").click(function() { //返回
		location.href = "./Auto.html";
	});


	$(".lib").click(function() { // 元件库
		$(".library").animate({
			opacity: 1
		}, "slow", function() {
			$(".library").animate({
				width: "16vw",
				height: '35vw'
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
			$.getJSON(serverAddr + "getEvaluateName", {}, function(data) {
				console.log(data);
				$('#evaluate_div_one1').text(data.resultObject.standard1);
				$('#evaluate_div_one2').text(data.resultObject.standard2);
				$('#evaluate_div_one3').text(data.resultObject.standard3);
				$('#evaluate_div_one4').text(data.resultObject.standard4);
				$('#evaluate_div_one5').text(data.resultObject.standard5);
				$('#evaluate_div_one6').text(data.resultObject.standard6);
			});
			$.getJSON(serverAddr + "getEvaluate", {
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


	//1 init data 第一步，初始化
	function initData() {
		//添加10个节点
		for (var i = 0; i < nodeIndex; i++) {
			var node = {};
			node.remark = "备注"; //remark
			node.nodeName = "结点" + (i + 1); //nodeName
			node.nodeSort = i; //nodeSort
			node.deviceList = []; //单节点的设备
			nodeList.push(node);
		}
		//添加9个逻辑
		// console.log(nodeList);
		for (var i = 0; i < nodeIndex - 1; i++) {
			var node = {};
			node.signalType = '';
			node.signalValue = '0,00';
			node.delay = 1;
			node.theOrder = i;
			logicList.push(node);
			// node.nodeName = "结点" + (i + 1);
			// node.deviceList = []; //单节点的设备
		}
	}


	//2 在页面上创建节点逻辑设备
	function drawHtml() {
		var htmlStr = ``;
		for (var i = 0; i < nodeList.length; i++) {
			//添加一个竖杠

			//添加一个结点
			htmlStr +=
				`<div class="node_small" id="${'o' + [i]}">
                <div class="node_small_text"><textarea data-index="${i}" class="node_small_textarea" name="" id="" cols="15" rows="8" placeholder="请输入评论">${nodeList[i].remark}</textarea></div>
						<span class="string_span">节点${[i+1]}</span>
						<button class="node_small_del">删除</button>
						<div class="strip">
							<div class="strip_head"><img src="./img/33.png" class="strip_head_img"></div>
							<div class="strip_one">`
			//添加设备
			// if (Array.isArray(nodeList[i].deviceList)) {
			if (Array.isArray(nodeList[i].deviceList)) {
				// console.log(nodeList[i].deviceList);
				// console.log(nodeList);
				htmlStr += getDeviceHtml(i);

			}

			htmlStr += `</div>
						</div>
					</div>`;
			if (i < logicList.length) {
				//添加一个竖杠

				htmlStr +=
					`<div class="string" style="height:${nodeList[i].deviceList.length * 3 + 2}vw" id="${'lines' + i}"></div>`;
				//添加逻辑
				htmlStr +=
					`<div class="logic" id="${'l' + [i]}">
					    <div class="logic_span">逻辑<span>${[i + 1]}</span></div>
						<div class="points" id="${'poin' + i}">
							<div class="points_signal">`
				htmlStr += getlogicHtml(i);

				htmlStr +=
					`</div>
							<div class="points_delay">
								<span>延迟(执行前)</span>
								<input type="" class="points_delay_inp" name="" id="" value="${logicList[i].delay}"/>
								<span>秒</span>
								<button type="button" class="points_save">保存</button>
							</div>
						</div>
                    </div>`;
				htmlStr += `<div class="string"  style="height:${logicList.signalType == '' ? 4 : 7}vw"></div>`;
			}

		}
		$(".node").html(htmlStr);
	}

	// 节点里的组件刷新
	function drawNode() {
		$(".active").find('.strip_one').html(getDeviceHtml(presentNodeIndex));
		$("#lines" + presentNodeIndex).css("height", $(".active").find('.strip').height() + "px");
		// console.log($(".active").find('.strip').height() + "px");
		// console.log(nodeList);
	}

	function getDeviceHtml(tIndex) {
		var htmlStr = ``;
		//判断类型，等
		// console.log(presentNodeIndex);
		// if (Array.isArray(nodeList[i].deviceList)) {

		// console.log(nodeList[tIndex].deviceList.length);
		// let length = nodeList[tIndex].deviceList.length;

		for (let j = 0; j < nodeList[tIndex].deviceList.length; j++) {
			if (nodeList[tIndex].deviceList[j].deviceType == 'light') {
				var defaultValue = nodeList[tIndex].deviceList[j].deviceValue.replace("K", "").split(",");
				// console.log(nodeList[tIndex].deviceList[j]);

				let oText = '';
				for (let i = 0; i < ListType.length; i++) {
					if (ListType[i].frameId == nodeList[tIndex].deviceList[j].deviceId) {
						oText = ListType[i].remark;
					}
				}
				// console.log(oText)
				htmlStr +=
					`<div class="lamp_body_one margin_bottom" id="${nodeList[tIndex].deviceList[j].deviceId}">
							<input type="text" name="" class="lamp_remark" readonly="readonly" value="${oText}">
							<span class="lamp_body_one_span">id:<span class="lamp_body_one_id">0x${nodeList[tIndex].deviceList[j].deviceId}</span>
							</span>
								<div class="lamp_body_one_one">
								    <label for="">模式:</label>
								    <select class="lamp_xuanxiang" name="">
									<option value="01" ${defaultValue[0] == "01" ? "selected='selected'" : ""}>关闭模式</option>
									<option value="02" ${defaultValue[0] == "02" ? "selected='selected'" : ""}>打开模式</option>
									<option value="03" ${defaultValue[0] == "03" ? "selected='selected'" : ""}>呼吸模式</option>
									<option value="04" ${defaultValue[0] == "04" ? "selected='selected'" : ""}>颜色过渡模式</option>
									<option value="05" ${defaultValue[0] == "05" ? "selected='selected'" : ""}>正向流水保持模式</option>
									<option value="06" ${defaultValue[0] == "06" ? "selected='selected'" : ""}>正向流水不保持模式</option>
									<option value="07" ${defaultValue[0] == "07" ? "selected='selected'" : ""}>反向流水保持模式</option>
									<option value="08" ${defaultValue[0] == "08" ? "selected='selected'" : ""}>反向流水不保持模式</option>
									<option value="09" ${defaultValue[0] == "09" ? "selected='selected'" : ""}>带数量正向流水模式</option>
									<option value="0A" ${defaultValue[0] == "0A" ? "selected='selected'" : ""}>带数量反向流水模式</option>
									<option value="0B" ${defaultValue[0] == "0B" ? "selected='selected'" : ""}>正向灭灯流水模式</option>
									<option value="0C" ${defaultValue[0] == "0C" ? "selected='selected'" : ""}>反向灭灯流水模式</option>
									<option value="0D" ${defaultValue[0] == "0D" ? "selected='selected'" : ""}>正向慢速流水保持模式</option>
									<option value="0E" ${defaultValue[0] == "0E" ? "selected='selected'" : ""}>正向慢速流水不保持模式</option>
									<option value="0F" ${defaultValue[0] == "0F" ? "selected='selected'" : ""}>反向慢速流水保持模式</option>
									<option value="10" ${defaultValue[0] == "10" ? "selected='selected'" : ""}>反向慢速流水不保持模式</option>
									<option value="11" ${defaultValue[0] == "11" ? "selected='selected'" : ""}>带数量正向慢速流水模式</option>
									<option value="12" ${defaultValue[0] == "12" ? "selected='selected'" : ""}>带数量反向慢速流水模式</option>
									<option value="13" ${defaultValue[0] == "13" ? "selected='selected'" : ""}>带数量正向拖尾流水模式</option>
									<option value="14" ${defaultValue[0] == "14" ? "selected='selected'" : ""}>带数量反向拖尾流水模式</option>
									<option value="15" ${defaultValue[0] == "15" ? "selected='selected'" : ""}>多彩正向流水模式</option>
									<option value="16" ${defaultValue[0] == "16" ? "selected='selected'" : ""}>多彩反向流水模式</option>
									<option value="17" ${defaultValue[0] == "17" ? "selected='selected'" : ""}>全彩像素颜色设置模式</option>
									<option value="18" ${defaultValue[0] == "18" ? "selected='selected'" : ""}>全彩像素显示模式</option>
									<option value="19" ${defaultValue[0] == "19" ? "selected='selected'" : ""}>全彩像素清除模式</option>
									<option value="1A" ${defaultValue[0] == "1A" ? "selected='selected'" : ""}>单色像素颜色设置模式</option>
									<option value="1B" ${defaultValue[0] == "1B" ? "selected='selected'" : ""}>单色像素显示模式</option>
								</select>
								<span>流动LED:</span>
								<input class="liudong" type="text" value="${defaultValue[1]}">
								<span>LED数量:</span>
								<input class="led" type="text" value="${defaultValue[2]}">
								<span>速度:</span>
								<input class="sudu" type="text" value="${defaultValue[3]}">
								<span>颜色:</span>
								<input type="color" name="" class="yanse" value="#${defaultValue[4] + defaultValue[5] + defaultValue[6]}"/>
								<span>白色值:</span>
								<input type="text" name="" class="type7" value="${defaultValue[7]}"/>
								<button class="lamp_del" data-index="${j}">删除</button>
								<button class="lamp_send" data-index="${j}">保存</button>

							</div>
						</div>`

			} else if (nodeList[tIndex].deviceList[j].deviceType == 'elec') {
				var vlc = {};
				vlc.v1 = "0D,00,00,50,00,00,00,00";
				vlc.v2 = "0D,00,00,50,00,00,00,00";
				vlc.v3 = "0D,00,00,50,00,00,00,00";
				vlc.v4 = "0D,00,00,50,00,00,00,00";
				for (var m = 0; m < elcarray.length; m++) {
					if (elcarray[m].id == nodeList[tIndex].deviceList[j].deviceId) {
						vlc = elcarray[m];
					}
				}
				let oText = '';
				for (let i = 0; i < ListType.length; i++) {
					if (ListType[i].frameId == nodeList[tIndex].deviceList[j].deviceId) {
						oText = ListType[i].remark;
					}
				}

				var xzdev = nodeList[tIndex].deviceList[j].deviceValue.replace("K", "");
				htmlStr +=
					`<div class="elec_body_one margin_bottom" id="${nodeList[tIndex].deviceList[j].deviceId}">
									<input type="text" name="" readonly="readonly" class="elec_remark" value="${oText}">
									<span class="elec_body_one_span">id:
										<span class="elec_body_one_id">0x${nodeList[tIndex].deviceList[j].deviceId}</span>
									</span>
									<div class="elec_right">
										<label for="">
											<input type="radio" ${xzdev == vlc.v1 ? "checked" : ""} name="${nodeList[tIndex].deviceList[j].deviceId + tIndex}" value="${vlc.v1}">1
											<input type="radio" ${xzdev == vlc.v2 ? "checked" : ""} name="${nodeList[tIndex].deviceList[j].deviceId + tIndex}" value="${vlc.v2}">2
											<input type="radio" ${xzdev == vlc.v3 ? "checked" : ""} name="${nodeList[tIndex].deviceList[j].deviceId + tIndex}" value="${vlc.v3}">3
											<input type="radio" ${xzdev == vlc.v4 ? "checked" : ""} name="${nodeList[tIndex].deviceList[j].deviceId + tIndex}" value="${vlc.v4}">4
										</label>
									</div>
									<button type="button" class="elec_del" data-index="${j}">删除</button>
									<button type="button" class="elec_Allsave" data-index="${j}">保存</button>
								</div>`;
			} else if (nodeList[tIndex].deviceList[j].deviceType == '09') {

				// var defaultValue = nodeList[tIndex].deviceList[j].deviceValue.replace("K", "").split(",");
				let oText = '';
				for (let i = 0; i < ListType.length; i++) {
					if (ListType[i].frameId == nodeList[tIndex].deviceList[j].deviceId) {
						oText = ListType[i].remark;
					}
				}

				htmlStr +=
					`<div class="proj_body_one margin_bottom" id="Res${nodeList[tIndex].deviceList[j].deviceId}">
                 <input type="text" name="" readonly="readonly" class="proj_remark" value="${oText}">
                                 <span class="proj_body_one_span">id:
                                      <span class="proj_body_one_id">0x${nodeList[tIndex].deviceList[j].deviceId}</span></span>
                                 <div class="proj_top">
                                     <button class="proj_1 proj" data-index="${j}" data-val="2">开机</button>
                                     <button class="proj_2 proj" data-index="${j}" data-val="1">关机</button>
                                     <button class="proj_3 proj" data-index="${j}" data-val="3">视频1</button>
                                     <button class="proj_4 proj" data-index="${j}" data-val="4">视频2</button>
                                     <button class="proj_5 proj" data-index="${j}" data-val="5">视频3</button>
                                     <button class="proj_6 proj" data-index="${j}" data-val="6">视频4</button>
                                     <button class="proj_7 proj" data-index="${j}" data-val="7">视频5</button>
                                     <button class="proj_8 proj" data-index="${j}" data-val="8">视频6</button>
                                     <button class="proj_9 proj" data-index="${j}" data-val="9">视频7</button>
                                     <button class="proj_10 proj" data-index="${j}" data-val="10">视频8</button>
                                     <button class="proj_del" data-index="${j}">删除</button>
                                 </div>
                            </div> `;

			} else if (nodeList[tIndex].deviceList[j].deviceType == '0B') {
				//输出控制
				let oText = '';
				for (let i = 0; i < ListType.length; i++) {
					if (ListType[i].frameId == nodeList[tIndex].deviceList[j].deviceId) {
						oText = ListType[i].remark;
					}
				}

				htmlStr +=
					`<div class="outp_body_one margin_bottom" id="Res${nodeList[tIndex].deviceList[j].deviceId}" data-ind="${j}">
                 <input type="text" name="" readonly="readonly" class="outp_remark" value="${oText}">
                            <span class="outp_body_one_span">id:
                                <span class="outp_body_one_id">0x${nodeList[tIndex].deviceList[j].deviceId}</span>
                            </span>
                            <div class="outp_b">`
				var samllremark = [];
				for (let z = 0; z < ListType.length; z++) {
					if (nodeList[tIndex].deviceList[j].deviceId == ListType[z].frameId) {
						samllremark = ListType[z].smallremark;
					}
				}
				// console.log(nodeList[tIndex].deviceList[j]);
				for (var i = 0; i < nodeList[tIndex].deviceList[j].deviceNum; i++) {
					var defaultRemark = "";
					if (i < samllremark.length) {
						defaultRemark = samllremark[i];
					}
					htmlStr +=
						` <div class="outp_btn">                             
                                    <button class="outp_button" data-index="${i}" type="button">${defaultRemark}</button>
                                </div>`
				}
				htmlStr +=
					`<button class="outp_del" data-index="${j}">删除</button></div>                            
                        </div>`;


			} else if (nodeList[tIndex].deviceList[j].deviceType == '08') {
				let oText = '';
				for (let i = 0; i < ListType.length; i++) {
					if (ListType[i].frameId == nodeList[tIndex].deviceList[j].deviceId) {
						oText = ListType[i].remark;
					}
				}
				htmlStr +=
					`<div class="andr_body_one margin_bottom" id="Res${nodeList[tIndex].deviceList[j].deviceId}" data-index="${j}">
                                <input type="text" readonly="readonly" name="" class="andr_remark" value="${oText}">
                                <span class="andr_body_one_span">id:
                                    <span class="andr_body_one_id">0x${nodeList[tIndex].deviceList[j].deviceId}</span>
                                </span>
                                <div class="andr_body_one_one">
                                    <button type="button" data-index="${j}" data-val="1" class="andr_stop andr_Btn">停止并关闭</button>
                                    <button type="button" data-index="${j}" data-val="2" class="andr_pause andr_Btn">暂停</button>
                                    <button type="button" data-index="${j}" data-val="3" class="andr_play andr_Btn">继续播放</button>
                                    <button type="button" data-index="${j}" data-val="4" class="andr_video1 andr_Btn">视频1</button>
                                    <button type="button" data-index="${j}" data-val="5" class="andr_video2 andr_Btn">视频2</button>
                                    <button type="button" data-index="${j}" data-val="6" class="andr_video3 andr_Btn">视频3</button>
                                    <button type="button" data-index="${j}" data-val="7" class="andr_video4 andr_Btn">视频4</button>
                                    <button type="button" data-index="${j}" data-val="8" class="andr_video5 andr_Btn">视频5</button>
                                    <button type="button" data-index="${j}" data-val="9" class="andr_video6 andr_Btn">视频6</button>
                                    <button type="button" data-index="${j}" data-val="A" class="andr_video7 andr_Btn">视频7</button>
                                    <button type="button" data-index="${j}" data-val="B" class="andr_video8 andr_Btn">视频8</button>
                                    <button type="button" data-index="${j}" data-val="C" class="andr_video9 andr_Btn">视频9</button>
                                    <button type="button" data-index="${j}" data-val="D" class="andr_video10 andr_Btn">视频10</button>
                                    <button type="button" data-index="${j}" class="andr_del" data-index="${j}">删除</button>
                                </div>
                            </div>`;

			}
		}
		return htmlStr;
	}

	// 节点里的逻辑刷新
	function drawLogic() {
		// console.log(logicList);
		$(".active2").find('.points_signal').html(getlogicHtml(presentNodeIndex));
		// $("#lines" + presentNodeIndex).css("height", $(".active").find('.strip').height() + "px");
		console.log(logicList);
	}

	function getlogicHtml(presentNodeIndex) {
		var ln = '';
		var lid = '';
		var lnum = 0;
		let htmlStr;
		if (logicList[presentNodeIndex].signalType != "") {
			// console.log(logicList[presentNodeIndex]);
			var oRemake = '';
			for (let i = 0; i < ListType.length; i++) {
				if (ListType[i].frameId == logicList[presentNodeIndex].signalType.split(",")[1]) {
					oRemake = ListType[i].remark;
				}
			}

			htmlStr =
				`<div class="points_signal">
                      <div class="button_body_one">
                         <input type="text" name="" class="button_remark" value="${oRemake}" readOnly="true">
                         <span class="button_body_one_span">ID:
                               <span class="button_body_one_id">${logicList[presentNodeIndex].signalType.split(",")[1]}</span>
                         </span>
                      <div class="button_body_one_one">`

			var samllremark = [];
			for (let z = 0; z < ListType.length; z++) {
				if (logicList[presentNodeIndex].signalType.split(",")[1] + [i] == ListType[z].frameId) {
					samllremark = ListType[z].smallremark;
				}
			}

			for (var i = 0; i < logicList[presentNodeIndex].signalType.split(",")[0]; i++) {
				var isActive = "";
				var theselect = "";
				var defaultRemark = "";
				if (i < samllremark.length) {
					defaultRemark = samllremark[i];
				}

				if (logicList[presentNodeIndex].signalValue.split(",")[0] == (i + 1)) {
					var daaz = logicList[presentNodeIndex].signalValue.split(",")[1];
					isActive = "active3";
					theselect =
						`<select>
									<option value="00" ${daaz == "00" ? "selected='selected'" : ""}>00</option>
									<option value="01" ${daaz == "01" ? "selected='selected'" : ""}>01</option>
								</select>`
				}
				htmlStr +=
					`<div class="button_body_one_btn" id="${logicList[presentNodeIndex].signalType.split(",")[1] + [i]}">
                            <div class="button_body_one_btn_circle ${isActive}"></div>`

				// console.log(defaultRemark)
				htmlStr += `<input type="text" class="button_samllremark"  value="${defaultRemark}" readOnly="true">`
				htmlStr += `${theselect}
                                        </div>`
			}
			htmlStr +=
				`</div>
          <button type="button" class="logic_del">删除</button>
        </div>
       </div>`;
		} else {
			htmlStr =
				`<div class="points_signal">
                      <div class="button_body_one">
                       <div class="button_body_one_one">
					   请从右侧信号库中选择
					   </div>
					  <button type="button" class="logic_del">删除</button>
					</div>
				   </div>`;

		}
		return htmlStr;
	}


	//节点增加
	$("#plus").click(function() {
		nodeIndex++;

		var node = {};
		node.remark = "备注"; //remark
		node.nodeName = "结点" + (nodeIndex); //nodeName
		node.nodeSort = nodeIndex - 1; //nodeSort
		node.deviceList = []; //单节点的设备
		nodeList.push(node);

		var node = {};
		node.signalType = '';
		node.signalValue = '0,00';
		node.delay = 1;
		node.theOrder = nodeIndex - 2;
		logicList.push(node);

		console.log(nodeList);
		console.log(logicList);


		drawHtml();

	});


	/**
	 * 3，添加设备
	 * @param {Object} index 当前在第几个结点  从0开始
	 * @param {Object} name
	 * @param {Object} id
	 * @param {Object} value   'S123:12:F2,22S'
	 */
	function addDevice(index, id, value, num) {
		/*`deviceType` varchar(512) DEFAULT NULL COMMENT '设备类型',
		  `deviceValue` varchar(512) DEFAULT NULL COMMENT '设备值',
		  `deviceId` varchar(128) DEFAULT NULL COMMENT '设备id',
		  `the_order` int  */
		var device = {};
		var Type;
		for (let i = 0; i < ListType.length; i++) {
			if (ListType[i].frameId == id) {
				Type = ListType[i].ftype;
			}
		}

		switch (Type) {
			case "01":
				// 流水灯
				device.deviceType = "light";
				break;
			case "06":
				// 电机
				device.deviceType = "elec";
				break;
			case "08":
				//安卓屏
				device.deviceType = "08";
				break;
			case "09":
				// 投影仪
				device.deviceType = "09";
				break;
			case "0B":
				// 输出控制
				device.deviceType = "0B";
				break;
			default:
				console.log("没有此类型");
				break;
		}

		// device.deviceType = "light";
		// device.theOrder = index;

		device.deviceId = id;
		device.deviceValue = value;
		device.deviceNum = num;
		if (!Array.isArray(nodeList[index].deviceList)) {
			nodeList[index].deviceList = [];
		}
		device.theOrder = nodeList[index].deviceList.length;
		nodeList[index].deviceList.push(device);
		console.log(nodeList);
		// drawHtml();
		drawNode();
	}


	function addLogic(index, id, num, text) {
		var num = num;
		logicList[index].signalValue = '0,00';


		logicList[index].signalType = num + ',' + id + ',' + text;
		console.log(logicList);
		drawLogic();
	}


	// NodeIndex
	//元件库 添加进节点   //灯光
	$("#library_body_body1").on("click", ".library_body_body_one", function() {
		if ($(".node_small").hasClass('active')) {
			var Index = $(".active").attr('id').replace("o", "");
			var Id = $(this).attr('id').substring(4);
			presentNodeIndex = Index;
			if ($(".active").find('#' + Id).length == 0) {
				addDevice(Index, Id, '00,00,00,00,00,00,00,00K');
			}
		}
	});

	$("#library_body_body2").on("click", ".library_body_body_one", function() { //电机
		if ($(".node_small").hasClass('active')) {
			var Index = $(".active").attr('id').replace("o", "");
			var Id = $(this).attr('id').substring(4);
			presentNodeIndex = Index;
			if ($(".active").find('#' + Id).length == 0) {
				addDevice(Index, Id, '0D,00,00,50,00,00,00,00K');
			}
		}
	});

	$("#library_body_body6").on("click", ".library_body_body_one", function() { //元件库 投影仪 添加进页面
		if ($(".node_small").hasClass('active')) {
			var Index = $(".active").attr('id').replace("o", "");
			var Id = $(this).attr('id').substring(4);
			presentNodeIndex = Index;
			if ($(".active").find('#Res' + Id).length == 0) {
				// console.log($(".active").find('#' + Id).length);
				addDevice(Index, Id, '00,00,00,00,00,00,00,00');
			}
		}
	});
	//元件库 输出控制 添加进页面
	$("#library_body_body4").on("click", ".library_body_body_one", function() {
		if ($(".node_small").hasClass('active')) {
			var Index = $(".active").attr('id').replace("o", "");
			var Id = $(this).attr('id').substring(4);
			presentNodeIndex = Index;
			let num;
			for (let i = 0; i < ListType.length; i++) {
				if (ListType[i].frameId == Id) {
					num = ListType[i].fnum;
				}
			}

			if ($(".active").find('#Res' + Id).length == 0) {
				// console.log($(".active").find('#' + Id).length);
				addDevice(Index, Id, '00,00,00,00,00,00,00,00', num);
			}

		}
	});
	// 安卓屏 添加进页面
	$("#library_body_body5").on("click", ".library_body_body_one", function() {
		if ($(".node_small").hasClass('active')) {
			var Index = $(".active").attr('id').replace("o", "");
			var Id = $(this).attr('id').substring(4);
			presentNodeIndex = Index;

			if ($(".active").find('#Res' + Id).length == 0) {
				// console.log($(".active").find('#' + Id).length);
				addDevice(Index, Id, '00,00,00,00,00,00,00,00');
			}
		}
	})


	//逻辑点添加进 界面
	$("#library_body_body3").on("click", ".library_body_body_one", function() {
		if ($(".logic").hasClass('active2')) {
			var Index = $(".active2").attr('id').substring(1);
			var Id = $(this).attr('id').substring(4);

			let num;
			for (let i = 0; i < ListType.length; i++) {
				if (ListType[i].frameId == Id) {
					num = ListType[i].fnum;
				}
			}
			// var num = JSON.parse(storage.getItem(Id)).num;
			var text = $(this).find('.lib_span').text();
			presentNodeIndex = Index;
			addLogic(Index, Id, num, text);
		}
	});


	//备注保存
	$(".node").on("blur", ".node_small_textarea", function() {
		var nodeId = $(this).parents(".node_small").attr('id').substring(1);
		var oValue = $(this).val();
		// var arrindex = $(this).attr("data-index");
		nodeList[nodeId].remark = oValue;

		// nodeList[nodeId].deviceList[arrindex].remark = oValue;
		// console.log(arrindex)
	});




	//逻辑点  设置01
	$(".node").on("click", ".button_body_one_btn_circle", function() {
		var flag = $(this).hasClass("active3");
		$(this).parents('.button_body_one_one').find('div').removeClass("active3");
		$(this).parents('.button_body_one_one').find('select').remove();
		// $( oDiv ".node div").removeClass("active3");
		// $(".logic select").remove();
		if (flag) {
			// $(this).removeClass("active3");
		} else {
			$(this).addClass("active3");
			var htmlStr = ``;
			htmlStr +=
				`<select>
					<option value="00">00</option>
					<option value="01">01</option>
				</select>`;
			$(this).parents('.button_body_one_btn').append(htmlStr);
		}
	});


	// 事件委托，电机保存
	$(".node").on("click", ".elec_Allsave", function() {
		var arrindex = $(this).attr("data-index");
		var nodeId = $(this).parents(".node_small").attr('id').substring(1);
		var Id = $(this).parents(".elec_body_one").attr('id');
		// console.log(Id);
		var list = $('input:radio[name=' + Id + nodeId + ']:checked').val();
		if (list == null) {
			alert("请选中一个!");
			return false;
		} else {
			// alert(list);
			// stompClient.send("/app/wu", {}, "S" + Id + ",0D,00,00,50," + list + "K");
			console.log(list + "K");
			// console.log($(this).attr("data-index"));
			console.log(nodeId);

			nodeList[nodeId].deviceList[arrindex].deviceValue = list + "K";
			window.toTest4();

			console.log(nodeList);
			// $('input:radio[name=' + id + ']:checked').val(oIdCov);
			// alert($('input:radio[name=' + id + ']:checked').val());
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

		if ($(this).siblings(".liudong").val().length > 2) {
			window.toTest1();
			$(this).siblings(".liudong").val('00');
			return;
		}
		if ($(this).siblings(".led").val().length > 2) {
			window.toTest1();
			$(this).siblings(".led").val('00');
			return;
		}
		if ($(this).siblings(".sudu").val().length > 2) {
			window.toTest1();
			$(this).siblings(".sudu").val('00');
			return;
		}
		if ($(this).siblings(".type7").val().length > 2) {
			window.toTest1();
			$(this).siblings(".type7").val('00');
			return;
		}

		type1 = (type1.length < 2) ? "0" + type1 : type1;
		type2 = (type2.length < 2) ? "0" + type2 : type2;
		type3 = (type3.length < 2) ? "0" + type3 : type3;
		type4 = (type4.length < 2) ? "0" + type4 : type4;
		type5 = (type5.length < 2) ? "0" + type5 : type5;
		type6 = (type6.length < 2) ? "0" + type6 : type6;
		type7 = (type7.length < 2) ? "0" + type7 : type7;

		// console.log(type7);
		var arrindex = $(this).attr("data-index");
		var nodeId = $(this).parents(".node_small").attr('id').substring(1);
		// console.log($(this).attr("data-index"));
		// console.log(nodeId);
		nodeList[nodeId].deviceList[arrindex].deviceValue = type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 +
			"," + type5 + "," + type6 + "," + type7 + "K";
		window.toTest4();
		console.log(nodeList);

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

	function drawNodeDel(oIndex) {
		$("#o" + oIndex).find('.strip_one').html(getDeviceHtml(oIndex));
		$("#lines" + oIndex).css("height", $("#o" + oIndex).find('.strip').height() + "px");


		// console.log(nodeList);
	}


	// 投影仪保存数据
	$(".node").on("click", ".proj", function() {
		var arrindex = $(this).attr("data-index");
		var nodeId = $(this).parents(".node_small").attr('id').substring(1);
		var val = $(this).data(val).val;

		var flag = $(this).hasClass("active4");
		$(".proj_top button").removeClass("active4");
		$(".proj_bott button").removeClass("active4");
		console.log('1');
		if (!flag) {
			$(this).addClass("active4");
			nodeList[nodeId].deviceList[arrindex].deviceValue = "0" + val + ",00,00,00,00,00,00,00K";
		}

		// // var oindex = $(this).parents(".proj_body_one").data(index).index;
		// // var index = $(this).data(index).index;
		// var index = $(this).data(index).index;

	})

	// 输出控制保存
	var Ras = new Array(0, 0, 0, 0, 0, 0, 0, 0);
	$(".node").on("click", ".outp_button", function() {
		let id = $(this).parents('.outp_body_one').attr('id').substr(3);
		// var indexT = $(this).data(index).index;
		var ind = $(this).parents(".outp_body_one").data(ind).ind;
		var index = $(this).data(index).index;
		var color = $(this).css("background-color");
		let nodList = $(this).parents(".node_small").attr('id').substring(1);
		let val = parseInt(index);
		let yu = val % 8;
		let zheng = parseInt(index / 8);
		if (color == 'rgb(91, 155, 213)') {
			Ras[zheng] |= 0x01 << yu;
			$(this).css("background-color", "pink");
		} else {
			Ras[zheng] &= ~(0x01 << yu);
			$(this).css("background-color", "rgb(91, 155, 213)");
		}
		var as0 = Ras[0] > 0x0f ? "" : "0";
		var as1 = Ras[1] > 0x0f ? "" : "0";
		var as2 = Ras[2] > 0x0f ? "" : "0";
		var as3 = Ras[3] > 0x0f ? "" : "0";
		var as4 = Ras[4] > 0x0f ? "" : "0";
		var as5 = Ras[5] > 0x0f ? "" : "0";
		var as6 = Ras[6] > 0x0f ? "" : "0";
		var as7 = Ras[7] > 0x0f ? "" : "0";

		// console.log("nodList"+ nodList);
		// console.log("index"+ index);


		if (index < 32) {
			nodeList[nodList].deviceList[ind].deviceValue = "02,00,00,00," + as3 + (Ras[3].toString(16)).toUpperCase() + "," +
				as2 + (Ras[2].toString(16)).toUpperCase() + "," + as1 + (Ras[1].toString(16)).toUpperCase() + "," + as0 + (Ras[0]
					.toString(16)).toUpperCase() + "K";

			// console.log( nodeList[nodList].deviceList[index].deviceValue);
		} else {
			nodeList[nodList].deviceList[ind].deviceValue = "02,00,00,01," + as7 + (Ras[7].toString(16)).toUpperCase() + "," +
				as6 + (Ras[6].toString(16)).toUpperCase() + "," + as5 + (Ras[5].toString(16)).toUpperCase() + "," + as4 + (Ras[4]
					.toString(16)).toUpperCase() + "K";
			// console.log( nodeList[nodList].deviceList[index].deviceValue);

		}

	})

	//安卓屏  保存数据
	$(".node").on("click", ".andr_Btn", function() {
		var id = $(this).parents(".andr_body_one").attr('id').substr(3);
		var oIndex = $(this).parents(".node_small").attr('id').substring(1);
		var index = $(this).data(index).index;
		var val = $(this).data(val).val;
		var flag = $(this).hasClass("active5");
		$(this).parents('.andr_body_one_one').find('button').removeClass("active5");
		// console.log(id);
		if (!flag) {
			$(this).addClass("active5");
			nodeList[oIndex].deviceList[index].deviceValue = "0" + val + ",00,00,00,00,00,00,00K";
			// libraryList[index].deviceValue = "0" + val + ",00,00,00,00,00,00,00";
			// $(this).removeClass("active");
		}
	})

	//虚拟按钮  发送
	var virt = new Array(0, 0, 0);
	$(".lib_virtual").on("click", ".virtual_body_one_btn", function() {
		var id = $(this).parents(".virtual_body_one").attr('id');
		var oId = $(this).children(".virtual_body_one_btn_circle").attr('id').slice(4);
		var flag = $(this).children(".virtual_body_one_btn_circle").hasClass("active");
		let val = parseInt(oId);
		let yu = val % 8;
		let zheng = parseInt(oId / 8);
		// var oId = $(this).attr('id').slice(3);
		console.log(oId);

		if (flag) {
			virt[zheng] &= ~(0x01 << yu);
			$(this).children(".virtual_body_one_btn_circle").removeClass("active");
		} else {
			virt[zheng] |= 0x01 << yu;
			$(this).children(".virtual_body_one_btn_circle").addClass("active");
		}
		var as0 = virt[0] > 0x0f ? "" : "0";
		var as1 = virt[1] > 0x0f ? "" : "0";
		var as2 = virt[2] > 0x0f ? "" : "0";
		// console.log(id);
		// console.log("S" + id + ",5B,00,00,00,00," + as2 + (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(16)).toUpperCase() + "K");
		stompClient.send("/app/wu", {}, "S" + id + ",5B,00,00,00,00," + as2 + (virt[2].toString(16)).toUpperCase() + "," +
			as1 + (virt[1].toString(16)).toUpperCase() + "," + as0 + (virt[0].toString(16)).toUpperCase() + "K");
	});



	//灯光删除
	$(".node").on("click", ".lamp_del", function() {
		var index = $(this).data(index).index;
		var oIndex = $(this).parents(".node_small").attr('id').substring(1);
		nodeList[oIndex].deviceList.splice(index, 1);
		console.log(nodeList);
		drawNodeDel(oIndex);
	});
	//电机删除
	$(".node").on("click", ".elec_del", function() {
		var index = $(this).data(index).index;
		var oIndex = $(this).parents(".node_small").attr('id').substring(1);
		nodeList[oIndex].deviceList.splice(index, 1);
		drawNodeDel(oIndex);
	})

	//投影仪删除
	$(".node").on("click", ".proj_del", function() {
		var index = $(this).data(index).index;
		var oIndex = $(this).parents(".node_small").attr('id').substring(1);
		nodeList[oIndex].deviceList.splice(index, 1);
		drawNodeDel(oIndex);
	})
	//输出控制删除
	$(".node").on("click", ".outp_del", function() {
		var index = $(this).data(index).index;
		var oIndex = $(this).parents(".node_small").attr('id').substring(1);
		nodeList[oIndex].deviceList.splice(index, 1);
		drawNodeDel(oIndex);
	})
	//安卓屏删除
	$(".node").on("click", ".andr_del", function() {
		var index = $(this).data(index).index;
		var oIndex = $(this).parents(".node_small").attr('id').substring(1);
		nodeList[oIndex].deviceList.splice(index, 1);
		drawNodeDel(oIndex);
	})


	//删除节点与逻辑
	$(".node").on("click", ".node_small_del", function() {
		var oIndex = $(this).parents(".node_small").attr('id').substring(1);
		nodeList.splice(oIndex, 1);
		logicList.splice(oIndex, 1);
		console.log(nodeList);
		// initData();  
		drawHtml(); //初始化界面
	})


	function drawLogicDel(oIndex) {
		// console.log(logicList);
		let index = oIndex;
		presentNodeIndex = oIndex;
		$("#l" + oIndex).find('.points_signal').html(getlogicHtml(index));
		console.log(logicList);
	}

	// 逻辑点删除设备
	$(".node").on("click", ".logic_del", function() {
		var oIndex = $(this).parents(".logic").attr('id').substring(1);
		logicList[oIndex].signalType = "";

		logicList[oIndex].signalValue = '0,00';
		presentNodeIndex = oIndex;
		drawLogicDel(oIndex);
		// console.log(logicList);
		// drawLogicDel(oIndex);
		// logicList.splice(oIndex, 1);

	})


	// 逻辑点保存
	$(".node").on("click", ".points_save", function() {
		// var index = $(this).parents().siblings('.points_signal').
		var index = $(this).parents('.logic').attr('id').substr(1);

		if (logicList[index].signalType != '') {
			if (!$(this).parents('.logic').find('.button_body_one_btn_circle').hasClass("active3")) {
				window.toTest2();
				return;
			}
			var smallIndex = $(this).parents('.logic').find(".active3").parents('.button_body_one_btn').attr('id').substring(
				3);
			// logicList[index].signalValue = parseInt(smallIndex)+1;
			var value = $(this).parents('.logic').find(".active3").siblings('select').val();

			logicList[index].signalValue = (parseInt(smallIndex) + 1) + "," + value;
			window.toTest4();

			console.log(index);
			console.log(logicList[index]);
		} else {
			window.toTest4();
		}


		// console.log(Index);
		console.log(logicList);
	});


	// 延迟改变
	$(".node").on("blur", ".points_delay_inp", function() {
		var oVal = parseInt($(this).val());
		var index = $(this).parents('.logic').attr('id').substr(1);
		logicList[index].delay = oVal;
		console.log(logicList);
	});




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
		console.log(logicList)
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
			$(".node div").removeClass("activeGo");
			return;
		}
		actionDo();
		if (currentIndex == 0) {
			$("#o" + currentIndex).addClass("activeGo");
		} else {
			// $(".node div").removeClass("activeGo");
			$("#o" + currentIndex).addClass("activeGo");
		}
		//开始判断 currentIndex 位置的逻辑
		if (currentIndex < (nodeIndex - 1)) { // 判断currentIndex位置是否有逻辑
			// $(".node div").removeClass("activeGo");
			$("#l" + currentIndex).addClass("activeGo");


			//从页面获取
			var logicValue = logicList[currentIndex].signalValue; //逻辑信号

			var logicId;
			//先判断是否有逻辑 值
			// var logicId = logicList[currentIndex].signalType[0].id; //逻辑的ID  门
			var delay = logicList[currentIndex].delay; //延迟时间秒

			if (logicList[currentIndex].signalType != '') {
				logicId = logicList[currentIndex].signalType.split(",")[1]; //逻辑的ID  门
			} else {
				setTimeout(function() {
					console.log(currentIndex);


					currentIndex++;
					isLogic();
				}, delay * 1000);
				return;
			}
			// setTimeout(function () {
			// 	currentIndex++;
			// 	isLogic();
			// }, delay * 1000);
			// return;
			var logicValue = logicValue.split(",");

			if (logicValue.length < 2 || logicValue[0] == '0') {
				setTimeout(function() {
					currentIndex++;
					isLogic();
				}, delay * 1000);
				return;
			}
			console.log(logicList);
			for (var i = 0; i < logicMap.length; i++) {
				if (logicMap[i].id == logicId) {

					console.log(logicValue);
					console.log(logicMap[i].value);

					if (logicValue[1] == '00' ? !isThelogic(logicValue[0], logicMap[i].value) : isThelogic(logicValue[0], logicMap[i]
							.value)) {
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
			$(".node div").removeClass("activeGo");


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
		$(".node div").removeClass("activeGo");

	}

	function loopLogic() {
		if (!isAction) {
			return;
		}
		setTimeout(function() {
			//从页面获取signalValue
			// console.log(logicList)
			console.log(currentIndex)
			var logicValue = logicList[currentIndex].signalValue; //逻辑信号
			// var
			var logicId;
			if (logicList[currentIndex].signalType != '') {
				logicId = logicList[currentIndex].signalType.split(",")[1]; //逻辑的ID  门
			}
			logicValue = logicValue.split(",");
			var delay = logicList[currentIndex].delay; //延迟时间秒
			for (var i = 0; i < logicMap.length; i++) {
				if (logicMap[i].id == logicId) {
					// console.log(logicValue);
					// console.log(logicId+" "+logicMap[i].value);
					if (logicValue[1] == '00' ? !isThelogic(logicValue[0], logicMap[i].value) : isThelogic(logicValue[0], logicMap[
							i].value)) {
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

	function isThelogic(lIndex, value) {
		var vs = value.split(",");
		if (vs.length < 8) {
			return false;
		}
		var byte5 = parseInt(vs[5], 16);
		var byte6 = parseInt(vs[6], 16);
		var byte7 = parseInt(vs[7], 16);
		var lIndex = parseInt(lIndex);
		// console.log(vs[7]+" "+byte7 + " " + byte6 + " " + byte5)
		// console.log(lIndex)
		if (lIndex < 9) {
			var thebyte = byte7;
			if (lIndex == 1 && (thebyte & 0x01) == 0x01) {
				return true;
			}
			if (lIndex == 2 && (thebyte & 0x02) == 0x02) {
				return true;
			}
			if (lIndex == 3 && (thebyte & 0x04) == 0x04) {
				return true;
			}
			if (lIndex == 4 && (thebyte & 0x08) == 0x08) {
				return true;
			}
			if (lIndex == 5 && (thebyte & 0x10) == 0x10) {
				return true;
			}
			if (lIndex == 6 && (thebyte & 0x20) == 0x20) {
				return true;
			}
			if (lIndex == 7 && (thebyte & 0x40) == 0x40) {
				return true;
			}
			if (lIndex == 8 && (thebyte & 0x80) == 0x80) {
				return true;
			}

		} else if (lIndex < 17) {
			var thebyte = byte6;
			lIndex = lIndex - 8;
			if (lIndex == 1 && (thebyte & 0x01) == 0x01) {
				return true;
			}
			if (lIndex == 2 && (thebyte & 0x02) == 0x02) {
				return true;
			}
			if (lIndex == 3 && (thebyte & 0x04) == 0x04) {
				return true;
			}
			if (lIndex == 4 && (thebyte & 0x08) == 0x08) {
				return true;
			}
			if (lIndex == 5 && (thebyte & 0x10) == 0x10) {
				return true;
			}
			if (lIndex == 6 && (thebyte & 0x20) == 0x20) {
				return true;
			}
			if (lIndex == 7 && (thebyte & 0x40) == 0x40) {
				return true;
			}
			if (lIndex == 8 && (thebyte & 0x80) == 0x80) {
				return true;
			}
		} else if (lIndex < 25) {
			var thebyte = byte5;
			lIndex = lIndex - 16;
			if (lIndex == 1 && (thebyte & 0x01) == 0x01) {
				return true;
			}
			if (lIndex == 2 && (thebyte & 0x02) == 0x02) {
				return true;
			}
			if (lIndex == 3 && (thebyte & 0x04) == 0x04) {
				return true;
			}
			if (lIndex == 4 && (thebyte & 0x08) == 0x08) {
				return true;
			}
			if (lIndex == 5 && (thebyte & 0x10) == 0x10) {
				return true;
			}
			if (lIndex == 6 && (thebyte & 0x20) == 0x20) {
				return true;
			}
			if (lIndex == 7 && (thebyte & 0x40) == 0x40) {
				return true;
			}
			if (lIndex == 8 && (thebyte & 0x80) == 0x80) {
				return true;
			}
		}


	}


	function actionDo() {
		//TODO 扫描 currentIndex 节点的内容,并发送
		for (var i = 0; i < nodeList[currentIndex].deviceList.length; i++) {

			// console.log("S" + nodeList[currentIndex].deviceList[i].deviceId + ',' + nodeList[currentIndex].deviceList[i].deviceValue);
			var sendstr = "S" + nodeList[currentIndex].deviceList[i].deviceId +
				',' + nodeList[currentIndex].deviceList[i].deviceValue;

			// 	theDeIndex = i;
			// 	cuIn = currentIndex;
			// setTimeout(function(){
			// 	var ti = theDeIndex;
			// 	stompClient.send("/app/wu", {}, "S" + nodeList[cuIn].deviceList[ti].deviceId +
			// 	',' + nodeList[cuIn].deviceList[ti].deviceValue);
			// 	theDeIndex++;
			// },i*10)

			sendQueue.push(sendstr);
			// theDeIndex = i;
			// sendStr(sendstr,i*50);
			// console.log("S" + nodeList[currentIndex].deviceList[i].deviceId + ',' + nodeList[currentIndex].deviceList[i].deviceValue);

		}
		sendStr();
	}

	var sendQueue = [];


	function sendStr() {
		// console.log(str);


		// var Type;
		// for (let i = 0; i < ListType.length; i++) {
		//     if (ListType[i].frameId == FrameId) {
		//         Type = ListType[i].ftype;
		//     }
		// }

		setTimeout(function() {
			if (sendQueue.length > 0) {

				// console.log(sendQueue[0].replace("S", "").replace("K", "").split(',')[0]);

				var Type;
				for (let i = 0; i < ListType.length; i++) {
					if (ListType[i].frameId == sendQueue[0].replace("S", "").replace("K", "").split(',')[0]) {
						Type = ListType[i].ftype;
					}
				}
				if (Type == '08') {
					console.log(sendQueue[0]);

					var ID = sendQueue[0].replace("S", "").replace("K", "").split(',')[0];
					// ("/app/user/" + Id + "", {}, "S" + Id + ",02,00,00,00,00,00,00,00K");
					stompClient.send("/app/user/" + ID + "", {}, sendQueue[0]);
					sendQueue.splice(0, 1);
					sendStr();
				} else {
					console.log(sendQueue[0]);
					stompClient.send("/app/wu", {}, sendQueue[0]);
					sendQueue.splice(0, 1);
					sendStr();
				}



			}

		}, 50)
	}


	// $(".cover_cancel").click(function () {

	// 复位
	$("#restoration").click(function() {
		$.getJSON(serverAddr + "getRemarkInitAll", {}, function(data) {
			console.log(data);
			if (data.resultObject.length != 0) {
				libraryList = data.resultObject;
				for (var i = 0; i < libraryList.length; i++) {
					(function(a) {
						setTimeout(function() {
							console.log("S" + libraryList[a].deviceId + "," + libraryList[a].deviceValue);
							stompClient.send("/app/wu", {}, "S" + libraryList[a].deviceId + "," + libraryList[a].deviceValue);
							// oBig.style.color = '#c6c7c7';
							// oBig.classList.add("active");
							// oBig.style.color="green";
						}, a * 100);
					}(i))
				}
				window.toTest3();
			}
		})


	})


	//保存
	$("#Save").click(function() {
		save();
		window.toTest1();
		// console.log('1');
	});

	function save() {
		// console.log(JSON.stringify(nodeList));
		// console.log(JSON.stringify(logicList));


		console.log(nodeList);

		$.post(serverAddr + "saveSceneInfo", {
			sceneId: sceneId,
			nodeList: JSON.stringify(nodeList),
			logicList: JSON.stringify(logicList),
		}, function(data) {
			console.log(data);
		});

		// // 打开问卷调查
		// $(".List .corer").css("display", "block");
		// $(".List .List_cover").css("display", "block");
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
		$.getJSON(serverAddr + "getEvaluateName", {}, function(data) {
			console.log(data);
			$('#demonstration0').text(data.resultObject.standard1);
			$('#demonstration1').text(data.resultObject.standard2);
			$('#demonstration2').text(data.resultObject.standard3);
			$('#demonstration3').text(data.resultObject.standard4);
			$('#demonstration4').text(data.resultObject.standard5);
			$('#demonstration5').text(data.resultObject.standard6);
		});
	});

	var Main = {
		created: function() {
			window.toTest1 = this.open2;
			window.toTest2 = this.open3;
			window.toTest3 = this.open1;
			window.toTest4 = this.open5;

		},
		methods: {
			open1() {
				this.$message('复位完成');
			},
			open2() {
				this.$message({
					message: '恭喜您，保存成功',
					type: 'success'
				});
			},
			open3() {
				this.$message({
					message: '请选择信号',
					type: 'warning'
				});
			},
			open4() {
				this.$message.error('错了哦，这是一条错误消息');
			},
			open5() {
				this.$message('设备保存成功');
			},

		}
	}
	var Ctor = Vue.extend(Main)
	new Ctor().$mount('#app')


	// $(".node_small").click(function() {
	// $(".node_one div").removeClass("active");
	// 	$(this).addClass("active");
	// });


	function connect() {
		// 建立连接对象（还未发起连接）
		// var socket = new WebSocket("ws://localhost:8080/webSocketEndPoint");
		var socket = new WebSocket("ws://192.168.1.10:8080/webSocketEndPoint");
		// var socket = new WebSocket("ws://192.168.1.241:8080/webSocketEndPoint");
		stompClient = Stomp.over(socket); // 获取 STOMP 子协议的客户端对象
		stompClient.connect({}, function connectCallback(frame) { // 向服务器发起websocket连接并发送CONNECT帧
				// 连接成功时（服务器响应 CONNECTED web帧）的回调方法
				console.log('[' + frame + ']' + '自动模式：连接成功');
				stompClient.subscribe('/topic/udp/broadcast', function(response) {
					// stompClient.subscribe('/topic/socket/201', function (response) {
					// console.log(response.body + " " + new Date().getTime());
					var stringResult = response.body.replace("S", "").replace("K", "").split(',');
					// 转为数组输出[123,456,789];
					// console.log(stringResult);
					var FrameId = stringResult[0];
					var Byte0 = stringResult[1];
					var Byte1 = stringResult[2];
					var Byte2 = stringResult[3];
					var Byte3 = stringResult[4];
					var Byte4 = stringResult[5];
					var Byte5 = stringResult[6];
					var Byte6 = stringResult[7];
					var Byte7 = stringResult[8];

					var id = "0X" + FrameId;

					// var oHtmlId = document.getElementById(id);
					// var loca = storage.getItem(FrameId);
					//console.log(typeof(Byte5));
					//判断新旧id  /  页面不存在  新id
					//逻辑信号保存到全局变量 TODO
					//是否使逻辑信号
					//假设 收到的是逻辑信号  byte0 是 信号值
					// console.log(oHtmlId);

					if (FrameId == '501') {
						console.log(stringResult)
					}

					if (List.indexOf(FrameId) == -1) {
						List.push(FrameId);
						var Type;
						for (var i = 0; i < ListType.length; i++) {
							if (ListType[i].frameId == FrameId) {
								Type = ListType[i].ftype;
							}
						}
						switch (Type) {
							case "01": // 流水灯
								new lamp(FrameId);
								break;
							case "03": // 按钮
								new button(FrameId);
								break;
							case "06": // 电机
								new elec(FrameId);
								break;
							case "07": // 旋钮
								// new rotaryknob(FrameId);
								break;
							case "08":
								new andr(FrameId);
								// 安卓屏
								break;
							case "09":
								// 投影仪
								// console.log('新投影仪');
								new projector(FrameId);
								break;
							case "0A": // 传感器
								new sens(FrameId);
								break;
							case "0B":
								// 输出控制
								new outp(FrameId);
								break;
							default:
								// console.log("没有此类型");
								break;
						}
						// if (loca) {
						// 	// console.log('1');
						// 	var locaObj = JSON.parse(loca);
						//
						// }
					}
					if (Byte0 == "5F") {
						return;
					}

					for (let i = 0; i < logicMap.length; i++) {
						if (logicMap[i].id == FrameId) {
							logicMap[i].value = Byte0 + ',' + Byte1 + ',' + Byte2 + ',' + Byte3 + ',' + Byte4 + ',' + Byte5 + ',' +
								Byte6 + ',' + Byte7;
							// console.log(FrameId+logicMap[i].value);
							return;
						}
					}

					let temp = {};
					temp.id = FrameId;
					temp.value = Byte0 + ',' + Byte1 + ',' + Byte2 + ',' + Byte3 + ',' + Byte4 + ',' + Byte5 + ',' + Byte6 + ',' +
						Byte7;
					logicMap.push(temp);

					// console.log(logicMap);


				});
				stompClient.subscribe('/topic/websocket/broadcast', function(response) {
					var stringResult = response.body.replace("S", "").replace("K", "").split(',');
					// console.log(stringResult);
					var FrameId = stringResult[0];
					var Byte0 = stringResult[1];
					var Byte1 = stringResult[2];
					var Byte2 = stringResult[3];
					var Byte3 = stringResult[4];
					var Byte4 = stringResult[5];
					var Byte5 = stringResult[6];
					var Byte6 = stringResult[7];
					var Byte7 = stringResult[8];
					// var oYemian = document.getElementById(FrameId);

					if (List.indexOf(FrameId) == -1 && Byte0 == '5E') {
						List.push(FrameId);
						// let Type;
						// for (let i = 0; i < ListType.length; i++) {
						//     if (ListType[i].frameId == FrameId) {
						//         Type = ListType[i].ftype;
						//     }
						// }
						// switch (Type) {
						//     case "08":
						//         // 安卓屏

						//         new andr(FrameId, "new");
						//         break;
						// }
						switch (Byte5) {
							case "08":
								// 安卓屏
								$.getJSON(serverAddr + "saveDeviceType", {
									FrameId: FrameId,
									Ftype: Byte5,
									Fnum: 0,
								}, function(data) {
									// console.log(data);
								});
								new andr(FrameId);
								break;
						}
					}
				});
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
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}

	lamp.prototype = {
		constructor: lamp,
		init: function() {
			//转存this
			var self = this;
			var Id = self.FrameId;
			var text = '';
			$.getJSON(serverAddr + "getRemark", {
				deviceId: Id,
				num: 0
			}, function(data) {
				// console.log(data);
				text = data.resultObject.remark;
				// 元件库创建
				var oLibr = document.createElement("div");
				var oLibrId = 'libr' + Id;
				oLibr.classList.add("library_body_body_one");
				oLibr.setAttribute("id", oLibrId);
				oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span class="lamp_remake">' + text + '</span>';
				document.getElementById("library_body_body1").appendChild(oLibr);
			})
		}
	};

	function elec(FrameId) { //电机
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}

	elec.prototype = {
		constructor: elec,
		init: function() {
			//转存this
			var self = this;
			var Id = self.FrameId;
			var text = '';
			// 创建元素
			$.getJSON(serverAddr + "getRemark", {
				deviceId: Id,
				num: 0
			}, function(data) {
				// console.log(data);
				text = data.resultObject.remark;

				// 元件库创建
				var oLibr = document.createElement("div");
				var oLibrId = 'libr' + Id;
				oLibr.classList.add("library_body_body_one");
				oLibr.setAttribute("id", oLibrId);
				oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span class="elec_remake">' + text + '</span>';
				document.getElementById("library_body_body2").appendChild(oLibr);
			})
		}
	}


	function button(FrameId) { //按钮
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}

	button.prototype = {
		constructor: button,
		init: function() {
			//转存this
			var self = this;
			var Id = self.FrameId;
			var text = '';

			// 创建元素
			$.getJSON(serverAddr + "getRemark", {
				deviceId: Id,
				num: 0
			}, function(data) {
				// console.log(data);
				text = data.resultObject.remark;
				// 元件库创建
				var oLibr = document.createElement("div");
				var oLibrId = 'libr' + Id;
				oLibr.classList.add("library_body_body_one");
				oLibr.setAttribute("id", oLibrId);
				oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span class="button_remake">' + text + '</span>';
				document.getElementById("library_body_body3").appendChild(oLibr);
			})
		}
	}

	//安卓屏
	function andr(FrameId) {
		// this.oAndrOne = document.getElementById("library_body_body5");
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}

	andr.prototype = {
		constructor: andr,
		init: function() {
			//转存this
			var self = this;
			var Id = self.FrameId;
			var text = '';

			$.getJSON(serverAddr + "getRemark", {
				deviceId: Id,
				num: 0
			}, function(data) {
				console.log(data);
				text = data.resultObject.remark;
				// 元件库创建
				var oLibr = document.createElement("div");
				var oLibrId = 'libr' + Id;
				oLibr.classList.add("library_body_body_one");
				oLibr.setAttribute("id", oLibrId);
				oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span class="proj_remake">' + text + '</span>';
				document.getElementById("library_body_body5").appendChild(oLibr);

			})


		}
	}

	//投影仪
	function projector(FrameId) {
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}

	projector.prototype = {
		constructor: projector,
		init: function() {
			//转存this
			var self = this;
			var Id = self.FrameId;
			var text = '';
			// console.log('新:投影仪');
			// 创建元素
			$.getJSON(serverAddr + "getRemark", {
				deviceId: Id,
				num: 0
			}, function(data) {
				console.log(data);
				text = data.resultObject.remark;

				// 元件库创建
				var oLibr = document.createElement("div");
				var oLibrId = 'libr' + Id;
				oLibr.classList.add("library_body_body_one");
				oLibr.setAttribute("id", oLibrId);
				oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span class="proj_remake">' + text + '</span>';
				document.getElementById("library_body_body6").appendChild(oLibr);
			})
		}
	};

	// 输出控制
	function outp(FrameId) {
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}

	outp.prototype = {
		constructor: outp,
		init: function() {

			//转存this
			var self = this;
			var Id = self.FrameId;
			var text = '';
			// 创建元素
			$.getJSON(serverAddr + "getRemark", {
				deviceId: Id,
				num: 0
			}, function(data) {
				console.log(data);
				text = data.resultObject.remark;

				// 元件库创建
				var oLibr = document.createElement("div");
				var oLibrId = 'libr' + Id;
				oLibr.classList.add("library_body_body_one");
				oLibr.setAttribute("id", oLibrId);
				oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span class="outp_remake">' + text + '</span>';
				document.getElementById("library_body_body4").appendChild(oLibr);
			})

		}
	};


	//传感器
	function sens(FrameId) {
		this.FrameId = FrameId;
		//自动初始化
		this.init();
	}

	sens.prototype = {
		constructor: sens,
		init: function() {
			//转存this
			var self = this;
			var Id = self.FrameId;
			var text = '';
			// 创建元素
			$.getJSON(serverAddr + "getRemark", {
				deviceId: Id,
				num: 0
			}, function(data) {
				console.log(data);
				text = data.resultObject.remark;
				// 元件库创建
				var oLibr = document.createElement("div");
				var oLibrId = 'libr' + Id;
				oLibr.classList.add("library_body_body_one");
				oLibr.setAttribute("id", oLibrId);
				oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span class="sens_remake">' + text + '</span>';
				document.getElementById("library_body_body3").appendChild(oLibr);
			})

		}
	};


}
