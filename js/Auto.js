window.onload = function () {

    var serverAddr = "http://192.168.1.10:8081/gq/api/";
    // var serverAddr = "http://www.shoulder-tech.com/gq/api/";
    // 获取列表
    function ListOfScenarios() {
        // $.post("http://39.106.47.82:8080/gq/api/getSceneList", {
        // 	// suggest: txt
        // }, function(result) {
        // 	console.log(result)
        // 	// $("span").html(result);
        // });
        $.getJSON(serverAddr + "getSceneList", {
            // id: 0,
            // action: 'jobcategoryjson'
        }, function (data) {
            console.log(data);
            // console.log(JSON.parse(data));
            // console.log(JSON.stringify(data));
            var htmlStr = ``;
            for (i = 0; i < data.resultObject.length; i++) {
                // console.log('1');

                htmlStr +=
                    `<div class="auto_body_one">
					<span>${data.resultObject[i].name}</span>
					<span class="autoBodyOneName">设计师:<span>${data.resultObject[i].designer}</span></span>
					<span class="autoBodyOneData">${data.resultObject[i].changeTime}</span>
					<button type="button" 
						class="autoBodyOneOpen" 
						id="open" 
						data-id="${data.resultObject[i].id}"
						data-name="${data.resultObject[i].name}"
						data-designer="${data.resultObject[i].designer}"
						>打开
					</button>
					<button type="button" class="autoBodyOneCopy" data-id="${data.resultObject[i].id}">复制</button>
					<button type="button" class="autoBodyOneDelete" data-id="${data.resultObject[i].id}">删除</button>
					<button type="button" class="autoBodyOneGrade" data-id="${data.resultObject[i].id}">评分</button>

				</div>`;
            }
            $(".auto_body").html(htmlStr);
        });
    }

    $(function () {
        ListOfScenarios();
    });


    $("#cut_two").click(function () { //切换为手动
        window.location.href = "./index.html";
    });

    $("#open").click(function () {
        location.href = "./List.html";
    });


    $("#cut_three").click(function () {
        $(".auto .grade").css("display", "block");
        $(".auto .cover").css("display", "block");

        $.getJSON(serverAddr + "getEvaluateName", {}, function (data) {
            // console.log(data);
            $("#autoGradeOne1").val(data.resultObject.standard1);
            $("#autoGradeOne2").val(data.resultObject.standard2);
            $("#autoGradeOne3").val(data.resultObject.standard3);
            $("#autoGradeOne4").val(data.resultObject.standard4);
            $("#autoGradeOne5").val(data.resultObject.standard5);
            $("#autoGradeOne6").val(data.resultObject.standard6);
        });


    });

    $("#gradeButton").click(function () {
        var standard1 = $("#autoGradeOne1").val();
        var standard2 = $("#autoGradeOne2").val();
        var standard3 = $("#autoGradeOne3").val();
        var standard4 = $("#autoGradeOne4").val();
        var standard5 = $("#autoGradeOne5").val();
        var standard6 = $("#autoGradeOne6").val();


        if (!standard1) {
            alert('请输入标准一');
            return;
        }
        if (!standard2) {
            alert('请输入标准二');
            return;
        }
        if (!standard3) {
            alert('请输入标准三');
            return;
        }
        if (!standard4) {
            alert('请输入标准四');
            return;
        }
        if (!standard5) {
            alert('请输入标准五');
            return;
        }
        if (!standard6) {
            alert('请输入标准六');
            return;
        }

        // console.log(standard1);
        $.getJSON(serverAddr + "saveEvaluateName", {
            standard1: standard1,
            standard2: standard2,
            standard3: standard3,
            standard4: standard4,
            standard5: standard5,
            standard6: standard6,
        }, function (data) {
            $(".autoGradeOne input").val('');
            $(".auto .grade").css("display", "none");
            $(".auto .cover").css("display", "none");
        });

    });
    // 新增
    $("#cut_four").click(function () {
        // $.get("http://39.105.62.98:8280/api/Values/Get", function(result){
        //    // $("div").html(result);
        // console.log(result);
        //  });
        $(".auto #code1").css("display", "block");
        $(".auto .cover").css("display", "block");

    });

    // 删除
    $(".auto_body").on("click", ".autoBodyOneDelete", function () {
        var uid = $(this).data("id");
        // console.log(uid);
        $.getJSON(serverAddr + "deleteScene", {
            sceneId: uid,
            // action: 'jobcategoryjson'
        }, function (data) {

        });
        $(this).parents(".auto_body_one").remove();
    });

    // 打开
    $(".auto_body").on("click", ".autoBodyOneOpen", function () {
        var uid = $(this).data("id");
        var name = $(this).data("name");
        var designer = $(this).data("designer");
        location.href = "./List.html?name=" + name + "&stylist=" + designer + "&uId=" + uid + "&isopen=open"; //此处拼接内容";

        // 	// console.log(uid);
        // 	$.getJSON("http://39.106.47.82:8080/gq/api/deleteScene", {
        // 		sceneId: uid,
        // 		// action: 'jobcategoryjson'
        // 	}, function (data) {
        // 	});
        // 	$(this).parents(".auto_body_one").remove();
    });

    //复制
    $(".auto_body").on("click", ".autoBodyOneCopy", function () {
        // $(".auto #code2").css("display", "block");
        // $(".auto .cover").css("display", "block");
        // var oId = $(this).siblings('.autoBodyOneDelete').data("id");
		
		var uid = $(this).data("id");
		oldId = uid;
		
        // $('#codeButton1').data("data-id", uid);
		$(".auto #code2").css("display", "block");
		$(".auto .cover").css("display", "block");

        // console.log(oId);
    });

//评分
    $(".auto_body").on("click", ".autoBodyOneGrade", function () {
        $.getJSON(serverAddr + "getEvaluateName", {}, function(data) {
            console.log(data);
            $('#demonstration0').text(data.resultObject.standard1);
            $('#demonstration1').text(data.resultObject.standard2);
            $('#demonstration2').text(data.resultObject.standard3);
            $('#demonstration3').text(data.resultObject.standard4);
            $('#demonstration4').text(data.resultObject.standard5);
            $('#demonstration5').text(data.resultObject.standard6);
        });


        var uid = $(this).data("id");
        $(".auto .questionnaire").css("display", "block");
        $(".auto .cover").css("display", "block");
        $('.questionnaire_submit').data("id", {id: uid})
    })


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


    $(".questionnaire_calcel").click(function () {   //取消
        // console.log('1');
        $(".auto .questionnaire").css("display", "none");
        $(".auto .cover").css("display", "none");
        $("#ques_inp_input1").val('');
        $("#ques_inp_input2").val('');
        $("#ques_inp_input3").val('');
        $("#ques_inp_input4").val('');
        $("#ques_inp_input5").val('');
        $("#ques_inp_input6").val('');

    });

    $(".questionnaire_submit").click(function () {  //保存
        var sceneId = $(this).data("id").id;
        // console.log(sceneId);

        var name = $("#ques_inp_input1").val();
        var age = $("#ques_inp_input2").val();
        var sex = $("#ques_inp_input3").val();
        var weight = $("#ques_inp_input4").val();
        var height = $("#ques_inp_input5").val();
        var phone = $("#ques_inp_input6").val();

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
            $(".auto .questionnaire").css("display", "none");
            $(".auto .cover").css("display", "none");
            $("#ques_inp_input1").val('');
            $("#ques_inp_input2").val('');
            $("#ques_inp_input3").val('');
            $("#ques_inp_input4").val('');
            $("#ques_inp_input5").val('');
            $("#ques_inp_input6").val('');
        });

    })


    var name = null;
    var stylist = null; //设计师

    $("#codeButton").click(function () {
        name = $("#CodeSpan1").val();
        stylist = $("#CodeSpan2").val();
        if (!name) {
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
        // var $p = $('<div class="auto_body_one"><span>' + oName1 + '</span><span class="autoBodyOneName">设计师:<span>' +
        // 	oName2 + '</span></span><span class="autoBodyOneData">' + oTime +
        // 	'<button type="button" class="autoBodyOneOpen">打开</button><button type="button" class="autoBodyOneCopy">复制</button><button type="button" class="autoBodyOneDelete">删除</button></div>'
        // );
        // $(".auto_body").prepend($p);
        $("#CodeSpan1").val("");
        $("#CodeSpan2").val("");
        // $(".auto .code").css("display", "none");
        // $(".auto .cover").css("display", "none");
        $.getJSON(serverAddr + "saveScene", {
            name: name,
            designer: stylist
            // action: 'jobcategoryjson'
        }, function (data) {
            // console.log(data);
            var uId = data.resultObject.id;
            location.href = "./List.html?name=" + name + "&stylist=" + stylist + "&uId=" + uId; //此处拼接内容";
        });
        // $("#time").html(year + "年" + mon + "月" + date + "日" + weeks[week]);
    });

    // var name = null;
    // var stylist = null; //设计师
	var oldId = '';
    $("#codeButton1").click(function () {
        name = $("#CodeSpan3").val();
        stylist = $("#CodeSpan4").val();
        if (!name) {
            alert("请输入名称");
            return;
        }
		// var oldId = $("#codeButton1").data("id");
		// console.log(oldId);
        $("#CodeSpan3").val("");
        $("#CodeSpan4").val("");
        // $(".auto .code").css("display", "none");
        // $(".auto .cover").css("display", "none");
        $.getJSON(serverAddr + "saveScene", {
            name: name,
            designer: stylist
            // action: 'jobcategoryjson'
        }, function (data) {
			
            // console.log(data);
            var uId = data.resultObject.id;
			$.getJSON(serverAddr+"getSceneInfo", {
				sceneId:oldId
			}, function(data) {
				// console.log(data);
				var nodeList = data.resultObject.nodeList;
				var logicList = data.resultObject.logicList;
				// drawHtml();
				$.getJSON(serverAddr+"saveSceneInfo", {
					sceneId: uId,
					nodeList: JSON.stringify(nodeList),
					logicList: JSON.stringify(logicList),
				}, function(data) {
					
						// console.log(data);
					location.href = "./List.html?name=" + name + "&stylist=" + stylist + "&uId=" + uId+"&isopen=open"; //此处拼接内容";
					
				});
			});
        });
       
    });


}