new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "index.js"); // 在这里引入了js
document.body.appendChild(new_element);

// 自动模式与手动模式
var pattern = true;
$("#cut").click(function () {
    location.href = "./Auto.html";
    // $(".top_btn2").text("切换为手动");
    $(".boy").css("display", "none");
    $(".auto").css("display", "block");
    if ($('#cut').text() == "切换为自动") {
        $(".top_btn1").text("当前模式：自动");
        pattern = false;
        // stompClient.disconnect(function() {
        //     console.log('手动模式断开')
        // });
        // setTimeout(function() {
        //     connectSelf(); //建立连接,自动模式
        // }, 1000);
        // console.log('1');
    } else {
        $(".top_btn1").text("当前模式：手动");
        $(".top_btn2").text("切换为自动");
        $(".content").css("display", "block");
        $(".selfmotion").css("display", "none");
        pattern = true;
        // stompClient.disconnect(function() {
        //     console.log("自动模式断开");
        // });
        // connect(); //建立连接,手动模式
    }
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

// var array = nums.split("");





// var Id = $(this).parents(".proj_body_one").attr('id');
// var buttonval = $(this).val();
// var locaObj = JSON.parse(storage.getItem(Id));
// var FrameId = locaObj.FrameId;
// var type = locaObj.type;
// var data = {
// 	FrameId: FrameId,
// 	type: type,
// 	text: buttonval,
// };
// var dater = JSON.stringify(data);
// localStorage.setItem(FrameId, dater);



// var Id = $(this).parents(".andr_body_one").attr('id');
// var buttonval = $(this).val();
// var locaObj = JSON.parse(storage.getItem(Id));
// var FrameId = locaObj.FrameId;
// var type = locaObj.type;
// var data = {
// 	FrameId: FrameId,
// 	type: type,
// 	text: buttonval,
// };
// var dater = JSON.stringify(data);
// localStorage.setItem(FrameId, dater);
// var Id = $(this).parents(".elec_body_one").attr('id');
// var buttonval = $(this).val();
// var locaObj = JSON.parse(storage.getItem(Id));
// var FrameId = locaObj.FrameId;
// var type = locaObj.type;
// var data = {
// 	FrameId: FrameId,
// 	type: type,
// 	text: buttonval,
// };
// var dater = JSON.stringify(data);
// localStorage.setItem(FrameId, dater);
// // var Loca = storage.getItem(Id);
// var locaObj = JSON.parse(storage.getItem(Id));
// var FrameId = locaObj.FrameId;
// var num = locaObj.num;
// var type = locaObj.type;
// // var text = locaObj.text;
// var data = {
// 	FrameId: FrameId,
// 	num: num,
// 	type: type,
// 	text: buttonval,
// };
// var dater = JSON.stringify(data);
// localStorage.setItem(FrameId, dater);
// console.log(data);



// var Id = $(this).parents(".rotaryknob_body_one").attr('id');
// var buttonval = $(this).val();
// var locaObj = JSON.parse(storage.getItem(Id));
// var FrameId = locaObj.FrameId;
// var type = locaObj.type;
// var data = {
// 	FrameId: FrameId,
// 	type: type,
// 	text: buttonval,
// };
// var dater = JSON.stringify(data);
// localStorage.setItem(FrameId, dater);
// console.log(data);


// var Id = $(this).parents(".sensor_body_one").attr('id');
// var buttonval = $(this).val();
// var locaObj = JSON.parse(storage.getItem(Id));
// var FrameId = locaObj.FrameId;
// var num = locaObj.num;
// var type = locaObj.type;
// var data = {
// 	FrameId: FrameId,
// 	num: num,
// 	type: type,
// 	text: buttonval,
// };
// var dater = JSON.stringify(data);
// localStorage.setItem(FrameId, dater);
// console.log(data);


// var Id = $(this).parents(".lamp_body_one").attr('id');
// var buttonval = $(this).val();
// var locaObj = JSON.parse(storage.getItem(Id));
// var FrameId = locaObj.FrameId;
// var type = locaObj.type;
// var data = {
// 	FrameId: FrameId,
// 	type: type,
// 	text: buttonval,
// };
// var dater = JSON.stringify(data);
// localStorage.setItem(FrameId, dater);

if (data.resultObject.length == 0) { // 修饰元素
    // htmlStr += `<div class="button_body_one" id="${Id}">    </div>`;
    oBig.innerHTML =
        '<input type="text" name="" class="button_remark" value=""><span class="button_body_one_span">ID: <span class="button_body_one_id" id=' +
        oOof + '>0x' + Id + '</span></span><div class="button_body_one_one" id = ' + oId + '></div>';
    // console.log('1');
    self.oBtnOne.appendChild(oBig);
} else {
    text = data.resultObject[0].deviceValue;

}


// oBig.innerHTML =
//     '<input type="text" name="" class="button_remark" value=""><span class="button_body_one_span">ID: <span class="button_body_one_id" id=' +
//     oOof + '>0x' + Id + '</span></span><div class="button_body_one_one" id = ' + oId + '></div>';
// // console.log('1');
// self.oBtnOne.appendChild(oBig);

// setTimeout(function () {
//
// }, 200);





// oX.onclick = function() {
// 	oX.classList.add("active");
// 	// console.log(nu.toString(16).toUpperCase());
// 	var yte;
// 	// var yte = yte4 + yte5 + yte6 + yte7;
// 	yte = parseInt(yte4 + yte5 + yte6 + yte7, 16) - 0x8000;
// 	var bte = parseInt(bte4 + bte5 + bte6 + bte7, 16) - 0x8000;
// 	bte = (bte / yte).toFixed(2);
// 	// elecval.value ='333';
// 	console.log(bte * 100);
// document.getElementById("444all").value = "200";
// console.log(oAc.value);
// document.getElementById("1").classList.remove("active");
// var num = parseInt(num, 16).toString(2).split('');
// var stringR = numm;
// console.log(stringR);
// console.log(num);
// string2Result.[0] = 0;
// var ele = string2Result.splice(a, 1, '0');
// console.log(ele);
// var replace = lang.splice(1,4,"c#","ruby"); //删除4项，插入两项
// console.log(lang); //asp,c#,ruby
// console.log(replace); //php,返回删除的项
// var childs = oA.childNodes;
// for (var i = childs.length - 1; i >= 0; i--) {
// 	// alert(childs[i].nodeName);
// 	oA.removeChild(childs[i]);
// }
// 	// ox.setAttribute("id", oId);
// 	// ox.setAttribute("id", '1');
// 	console.log("1");
// oX.removeChild(oA);
// 	// var thisNode = document.getElementById("demo");
// 	// thisNode.parentNode.removeNode(thisNode);
// };

// oBtn.onclick = function() {
// console.log(document.getElementById("444all").value)
// stompClient.send("/app/user/1", {}, "S201,5F,00,00,00,08,03,00,00K");
// localStorage.setItem("c", "Jquery");
// localStorage.a = "iwanc";
// localStorage["b"] = "HTML5";
// localStorage.setItem("c", "Jquery");
// if (localStorage.getItem('a')) {
// 	console.log('1')
// }
// var data = {
//     state: '00,00,00,00,00,00k',
//     text: '外灯',
//     type: '1',
// };
// var d = JSON.stringify(data);
// storage.setItem("data", d);
// var json = storage.getItem("data");
// var jsonObj = JSON.parse(json);
// console.log(jsonObj);
// };



// var oBtn = document.getElementById("btn");
// var oX = document.getElementsByClassName("button_body_one_span")[0];
// var box2 = document.getElementsByTagName('button_body_one_btn_circle');

// var oA = document.getElementById(oF + "i");
// var oA = document.querySelectorAll('#button_body_one_btn');
// var oA = document.getElementsByClassName('button_body_one_one')[0];
// var ox = document.getElementsByClassName("button_body_one_span");
// var oD=document.querySelectorAll("#button_body_one_btn_circle");
//  var oAc = document.getElementById("elec_cover");
// var elecval = document.getElementById("444all");
var num = parseInt("0C", 16);
var nu = 255;
var nums = 123456;
var yte4 = "02";
var yte5 = "01";
var yte6 = "01";
var yte7 = "01";

var bte4 = "01";
var bte5 = "01";
var bte6 = "01";
var bte7 = "01";

// var Type = JSON.parse(storage.getItem(FrameId)).type;
// var loca = storage.getItem(FrameId);
// var Type = JSON.parse(loca).type;
// // console.log(loca);
// var locaObj = JSON.parse(loca);
// var LByte4 = locaObj.Byte4;
// console.log(locaObj.type);
// $.getJSON(port + "getDeviceType", {
//     FrameId: FrameId,
// }, function (data) {
//     // console.log(data);
//     var Type = data.resultObject.ftype;

// var data = {
//     FrameId: FrameId,
//     type: Byte5,
// };
// var dat = JSON.stringify(data);
// storage.setItem(FrameId, dat);
// var data = {
//     FrameId: FrameId,
//     type: Byte5,
// };
// var dat = JSON.stringify(data);
// storage.setItem(FrameId, dat);

// var data = {
//     FrameId: FrameId,
//     // num: num,
//     type: Byte5,
//     text: '',
// };
// var dat = JSON.stringify(data);
// storage.setItem(FrameId, dat);
// console.log(stringResult);

// var data = {
//     FrameId: FrameId,
//     num: parseInt(Byte4, 16),
//     type: Byte5,
// };
// var dater = JSON.stringify(data);
// storage.setItem(FrameId, dater);


// var data = {
//     FrameId: FrameId,
//     type: Byte5,
// };
// var dater = JSON.stringify(data);
// storage.setItem(FrameId, dater);

// var data = {
//     FrameId: FrameId,
//     type: Byte5,
// };
// var dat = JSON.stringify(data);
// storage.setItem(FrameId, dat);

// var data = {
//     FrameId: FrameId,
//     type: Byte5,
// };
// var dat = JSON.stringify(data);
// storage.setItem(FrameId, dat);

// var data = {
//     FrameId: FrameId,
//     num: parseInt(Byte4, 16),
//     type: Byte5,
// };
// var dat = JSON.stringify(data);
// storage.setItem(FrameId, dat);

// var data = {
//     FrameId: FrameId,
//     num: parseInt(Byte4, 16),
//     type: Byte5,
// };
// var dater = JSON.stringify(data);
// storage.setItem(FrameId, dater);

// console.log(Byte6);
// console.log(Byte7);
//   console.log(stringResult);
//   console.log(response.body);


var data = {
    FrameId: FrameId,
    type: Byte5,

};
var dater = JSON.stringify(data);
storage.setItem(FrameId, dater);

// 电机发送
var elecSet; //前进
$(".node").on("mousedown", ".elec_up", function () {
    var id = $(this).parents(".elec_body_one").attr('id');
    $(this).css("background-color", "pink");
    elecSet = setInterval(function () {
        stompClient.send("/app/wu", {}, "S" + id + ",0B,00,00,00,00,00,10,50K");
    }, 100);
    // console.log("S" + id + ",0B,00,00,00,00,00,00,00K");
});
$(".node").on("mouseup", ".elec_up", function () {
    clearInterval(elecSet);
    $(this).css("background-color", "#5b9bd5");
});
var elecSetDown; //后退
$(".node").on("mousedown", ".elec_down", function () {
    var id = $(this).parents(".elec_body_one").attr('id');
    $(this).css("background-color", "pink");
    elecSetDown = setInterval(function () {
        stompClient.send("/app/wu", {}, "S" + id + ",0C,00,00,00,00,00,10,50K");
    }, 50)
});
$(".node").on("mouseup", ".elec_down", function () {
    clearInterval(elecSetDown);
    $(this).css("background-color", "#5b9bd5");
});

// var myIp =serverAddr+"";
// var serverAddr = "http://www.shoulder-tech.com/gq/api/";
// var serverAddr = "http://127.0.0.1:8080/api/";
// var port  = serverAddr+"getEvaluateName";


// for (var i = 0; i < nodeIndex - 1; i++) {
// 	var node = {};
// 	node.signalType = "";
// 	node.signalValue = 0;
// 	node.delay = 1;
// 	node.theOrder = i;
// 	logicList.push(node);
// 	// node.nodeName = "结点" + (i + 1);
// 	// node.deviceList = []; //单节点的设备
// }

// var oActive = document.getElementsByClassName("active");
// console.log($(".node_small").hasClass('active'))
// var oYemian = document.getElementById(FrameId);
// console.log($(".active").find('#' + Id));
// if (!document.getElementById(Id)) {
// if(  nodeList[presentNodeIndex].deviceList.){
// }
// console.log(Index);
// $(".active").find(".strip_one").append($One);

// console.log(Id);
// var remake = $(this).find('.proj_remake').text();

//电机位置保存
$(".node").on("click", ".elec_save", function () {
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


$(".questionnaire_submit").click(function () {
    var name = $("#ques_inp_input1").val();
    var age = $("#ques_inp_input2").val();
    var sex = $("#ques_inp_input3").val();
    var weight = $("#ques_inp_input4").val();
    var height = $("#ques_inp_input5").val();
    var phone = $("#ques_inp_input6").val();
    // console.log(standard1);

    $.getJSON(serverAddr + "saveEvaluate", {
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

    }, function (data) {
        console.log(data);


    });

    $(".List .corer").css("display", "none");
    $(".List .questionnaire").css("display", "none");

    // console.log(name);
});
var type = JSON.parse(storage.getItem(Id)).type;

stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,00," + as3 + (as[3].toString(16)).toUpperCase() + "," + as2 +
    (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(
        16)).toUpperCase() + "K");
stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,01," + as7 + (as[7].toString(16)).toUpperCase() + "," + as6 +
    (as[6].toString(16)).toUpperCase() + "," + as5 + (as[5].toString(16)).toUpperCase() + "," + as4 + (as[4].toString(
        16)).toUpperCase() + "K");


var data = {
    FrameId: FrameId,
    type: Byte5,
    text: '',
};
var dater = JSON.stringify(data);
storage.setItem(FrameId, dater);

stompClient.send("/app/wu", {}, "S" + id + "," + type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 +
    "," + type5 + "," + type6 + "," + type7 + "K");


clearInterval(elecSet);
$(this).css("background-color", "pink");

clearInterval(elecSet);

clearInterval(elecSet);
$(this).css("background-color", "#5b9bd5");


var id = $(this).parents(".elec_body_one").attr('id');
var oValue = $(this).siblings(".elec_sudu").val();
var oColor = $(this).css("background-color");


elecColor = $(this).css("background-color");

elecSet = setInterval('console.log(elecId + "+" + elecValue);', 100);

stompClient.send("/app/wu", {}, "S" + id + ",0B,00,00,00,00,00,10," + oValue + "K");


console.log(oColor);
elecSet = setInterval(SelecSet(id, oValue), 10);
var id = setInterval(frame(id, oValue), 10);
elecSet = setInterval(function () {
    if (oColor == 'rgb(91, 155, 213)') {
        console.log('1');
    }
    if (oColor == "rgb(91, 155, 213)") {
        console.log('1');
        stompClient.send("/app/wu", {}, "S" + id + ",0B,00,00,00,00,00,10," + oValue + "K");
    } else {
        console.log('2');
        clearInterval(elecSet);
    }
}, 100);
console.log("S" + id + ",0B,00,00,00,00,00,00,00K");


var id = $(this).parents(".elec_body_one").attr('id');
$(this).css("background-color", "pink");
let oValue = $(this).siblings(".elec_sudu").val();


elecSetDown = setInterval(function () {
    stompClient.send("/app/wu", {}, "S" + id + ",0C,00,00,00,00,00,10," + oValue + "K");
}, 50)


logicList[index] = {};
var Type = JSON.parse(storage.getItem(id)).type;



logicList[index].signalType = num + ',' + id + ',' + text;
logicList[index].signalType = {};
var node = {};
node.num = num;
node.id = id;
node.text = text;
logicList[index].signalType.push(node);
logicList[index].signalobj = node;
logicList[index].signalType = JSON.stringify(node);

var elec_s = document.getElementById('elec_s');



document.oncontextmenu = function (e) {
    e.preventDefault();
};
window.ontouchstart = function (e) {
    e.preventDefault();
};
$('button').bind('contextmenu', function (e) {
    e.preventDefault();
})
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
document.oncontextmenu = function (e) {
    e.preventDefault();
};
