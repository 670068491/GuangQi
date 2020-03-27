window.onload = function() {
    var storage = window.localStorage;
    //定义全局变量，代表一个session
    var stompClient = null;
    // var oBtn = document.getElementById("btn");
    var oX = document.getElementsByClassName("button_body_one_span")[0];
    var box2 = document.getElementsByTagName('button_body_one_btn_circle');
    // var oF = 's201';
    // // var oId = oF + 'i';
    // var oA = document.getElementById("s201i");
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
    // var array = nums.split("");
    oX.onclick = function() {
        oX.classList.add("active");
        // console.log(nu.toString(16).toUpperCase());
        var yte;
        // var yte = yte4 + yte5 + yte6 + yte7;
        yte = parseInt(yte4 + yte5 + yte6 + yte7, 16) - 0x8000;
        var bte = parseInt(bte4 + bte5 + bte6 + bte7, 16) - 0x8000;
        bte = (bte / yte).toFixed(2);
        // elecval.value ='333';
        console.log(bte * 100);
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
    };

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

    function connect() {
        // 建立连接对象（还未发起连接）
        // var socket = new WebSocket("ws://localhost:8080/webSocketEndPoint");
        var socket = new WebSocket("ws://192.168.1.10:8080/webSocketEndPoint");
        // var socket = new WebSocket("ws://192.168.1.241:8080/webSocketEndPoint");
        // 获取 STOMP 子协议的客户端对象
        stompClient = Stomp.over(socket);
        // 向服务器发起websocket连接并发送CONNECT帧
        stompClient.connect({}, function connectCallback(frame) {
                // 连接成功时（服务器响应 CONNECTED web帧）的回调方法
                console.log('[' + frame + ']' + '手动模式：连接成功');
                stompClient.subscribe('/topic/udp/broadcast', function(response) {
                    // stompClient.subscribe('/topic/socket/201', function (response) {
                    // console.log(response.body);
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
                    if (!oYemian && Byte0 != '5E' && Byte0 != '5F') {
                        // 发送出去
                        // console.log(stringResult);
                        stompClient.send("/app/wu", {}, "S" + FrameId + ",5F,00,00,00,00,00,00,00K");
                        // console.log('发送');
                        // 返回的类型 与 数量
                    } else if (!oYemian && Byte0 == '5E') {
                        // var data = {
                        //     FrameId: FrameId,
                        //     // num: num,
                        //     type: Byte5,
                        //     text: '',
                        // };
                        // var dat = JSON.stringify(data);
                        // storage.setItem(FrameId, dat);
                        // console.log(stringResult);
                        switch (Byte5) {
                            case "01":
                                // 流水灯
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                    text: '',
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);
                                new lamp(FrameId, "new");
                                break;
                            case "02":
                                // rgb
                                break;
                            case "03":
                                // 按钮
                                var num = parseInt(Byte4, 16);
                                if (loca) {
                                    var locaObj = JSON.parse(loca);
                                    var text = locaObj.text;
                                    var data = {
                                        FrameId: FrameId,
                                        num: num,
                                        type: Byte5,
                                        text: text,
                                    };
                                    var dater = JSON.stringify(data);
                                    storage.setItem(FrameId, dater);
                                } else {
                                    var data = {
                                        FrameId: FrameId,
                                        num: num,
                                        type: Byte5,
                                        text: '',
                                    };
                                    var dater = JSON.stringify(data);
                                    storage.setItem(FrameId, dater);
                                }
                                new button(FrameId, num, Byte5, Byte6, Byte7, "new");
                                break;
                            case "04":
                                //点阵控制板
                                break;
                            case "05":
                                // can转lin
                                break;
                            case "06":
                                //  电机
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                    text: '',
                                };
                                var dater = JSON.stringify(data);
                                storage.setItem(FrameId, dater);
                                new elec(FrameId, "00", "00", "00", "00", "00", "new");
                                break;
                            case "07":
                                // 旋钮                          
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                    text: '',
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);
                                new rotaryknob(FrameId, Byte4, Byte5, Byte6, Byte7, "new");
                                break;
                            case "08":
                                // 安卓屏
                                break;
                            case "09":
                                // 投影仪
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                    text: '',
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);
                                new projector(FrameId, "new");
                                break;
                            case "0A":
                                // 传感器
                                var num = parseInt(Byte4, 16);
                                var data = {
                                    FrameId: FrameId,
                                    num: num,
                                    type: Byte5,
                                    text: '',
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);
                                new sens(FrameId, num, Byte5, Byte6, Byte7, "new");
                                break;
                            case "0B":
                                // 输出控制
                                var num = parseInt(Byte4, 16);
                                var data = {
                                    FrameId: FrameId,
                                    num: num,
                                    type: Byte5,
                                    text: '',
                                };
                                var dater = JSON.stringify(data);
                                storage.setItem(FrameId, dater);
                                new outp(FrameId, num, "new");
                                break;
                            default:
                                console.log("没有此类型");
                                break;
                        }
                    } else if (oYemian) {
                        // 刷新状态
                        var locaObj = JSON.parse(loca);
                        var Type = locaObj.type;
                        // var LByte4 = locaObj.Byte4;
                        // console.log(locaObj.type);
                        switch (Type) {
                            case "01":
                                // 流水灯
                                // new lamp(FrameId, Byte0, Byte1, Byte2, Byte3, Byte4, Byte5, Byte6, Byte7, "old");
                                break;
                            case "02":
                                // RGB灯
                                break;
                            case "03":
                                // 按钮
                                if (Byte0 == '5B') {
                                    // console.log('old');
                                    new button(FrameId, Byte5, Byte6, Byte7, "old");
                                }
                                break;
                            case "04":
                                break;
                            case "05":
                                break;
                            case "06":
                                // 电机
                                if (Byte0 == '5B' || Byte0 == '54') {
                                    new elec(FrameId, Byte0, Byte4, Byte5, Byte6, Byte7, "old");
                                }
                                break;
                            case "07":
                                // 旋钮
                                if (Byte0 == '5B') {
                                    // console.log(Byte6);
                                    // console.log(Byte7);
                                    //   console.log(stringResult);
                                    //   console.log(response.body);
                                    new rotaryknob(FrameId, Byte4, Byte5, Byte6, Byte7, "old");
                                }
                                break;
                            case "08":
                                // 安卓
                                break;
                            case "09":
                                // 投影仪
                                break;
                            case "0A":
                                // 传感器
                                if (Byte0 == '5B') {
                                    new sens(FrameId, Byte5, Byte6, Byte7, "old");
                                }
                                break;
                            default:
                                console.log("没有此类型");
                                break;
                        }
                    }
                });
                stompClient.subscribe('/topic/websocket/broadcast', function(response) {
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
                    var oYemian = document.getElementById(FrameId);
                    if (!oYemian && Byte0 == '5E') {
                        switch (Byte5) {
                            case "08":
                                // 安卓屏
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                    text: '',
                                };
                                var dater = JSON.stringify(data);
                                storage.setItem(FrameId, dater);
                                new andr(FrameId, "new");
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

    //connect(); //建立连接

    //面向对象的
    // 第一部分，按钮
    function button(FrameId, num, Byte5, Byte6, Byte7, New) {
        this.oBtnOne = document.getElementById("button_body");
        this.FrameId = FrameId;
        this.Byte4 = num;
        this.Byte5 = parseInt(Byte5, 16);
        this.Byte6 = parseInt(Byte6, 16);
        this.Byte7 = parseInt(Byte7, 16);
        this.New = New;
        //自动初始化
        this.init();
    };
    button.prototype = {
        constructor: button,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            // var Lbyte4Lenght = parseInt(self.Byte4, 16);
            var Lbyte4Lenght = self.Byte4;
            var locaObj = JSON.parse(storage.getItem(Id));
            var text = locaObj.text;
            // console.log(locaObj);
            // console.log(Lbyte4Lenght);
            // 新id
            if (this.New == 'new') {
                console.log('新:按钮');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("button_body_one");
                oBig.setAttribute("id", Id);
                var oId = Id + 'i';
                var oOof = Id + 'a';
                // 修饰元素
                oBig.innerHTML =
                    '<input type="text" name="" class="button_remark" value=' + text + '><span class="button_body_one_span">ID: <span class="button_body_one_id" id=' + oOof + '>0x' +
                    Id + '</span></span><div class="button_body_one_one" id = ' + oId + '></div>';
                // console.log(typeof(this.Lbyte4) );
                setTimeout(function() {
                    for (var i = 0; i < Lbyte4Lenght; i++) {
                        // console.log('1');
                        // 创建元素
                        var oBtnBtn = document.createElement("div");
                        var oSim = document.getElementById(oId);
                        var Ssid = oId + [i];
                        var Ssssid = Ssid + [i];
                        oBtnBtn.classList.add("button_body_one_btn");
                        oBtnBtn.setAttribute("id", Ssid);
                        oBtnBtn.innerHTML = '<div class="button_body_one_btn_circle" id=' + Ssssid + '></div><div> <input type ="text"></div>';
                        oSim.appendChild(oBtnBtn);
                        // this.oContent[i].style.display = "none";
                    }
                }, 500);
                // 插入元素
                self.oBtnOne.appendChild(oBig);
                setTimeout(function() {
                    // oBig.style.color = '#c6c7c7';
                    // oBig.classList.add("active");
                    // oBig.style.color="green"; 
                }, 3000);
                // 旧id，刷新状态
            };
            if (this.New == 'old') {
                // console.log('旧');
                var oId = Id + 'i';
                // var oOof = Id + 'a';
                // document.getElementById(oOof).innerText = self.Byte7;
                // var oSim = document.getElementById(oId);
                // setTimeout(function() {
                if ((self.Byte7 & 0x01) == 0x01) {
                    document.getElementById(oId + 0 + 0).classList.add("active");
                } else {
                    document.getElementById(oId + 0 + 0).classList.remove("active");
                }
                if ((self.Byte7 & 0x02) == 0x02) {
                    document.getElementById(oId + 1 + 1).classList.add("active");
                } else {
                    document.getElementById(oId + 1 + 1).classList.remove("active");
                }
                if ((self.Byte7 & 0x04) == 0x04) {
                    document.getElementById(oId + 2 + 2).classList.add("active");
                } else {
                    document.getElementById(oId + 2 + 2).classList.remove("active");
                }
                if ((self.Byte7 & 0x08) == 0x08) {
                    document.getElementById(oId + 3 + 3).classList.add("active");
                } else {
                    document.getElementById(oId + 3 + 3).classList.remove("active");
                }
                if ((self.Byte7 & 0x10) == 0x10) {
                    document.getElementById(oId + 4 + 4).classList.add("active");
                } else {
                    document.getElementById(oId + 4 + 4).classList.remove("active");
                }
                if ((self.Byte7 & 0x20) == 0x20) {
                    document.getElementById(oId + 5 + 5).classList.add("active");
                } else {
                    document.getElementById(oId + 5 + 5).classList.remove("active");
                }
                if ((self.Byte7 & 0x40) == 0x40) {
                    document.getElementById(oId + 6 + 6).classList.add("active");
                } else {
                    document.getElementById(oId + 6 + 6).classList.remove("active");
                }
                if ((self.Byte7 & 0x80) == 0x80) {
                    document.getElementById(oId + 7 + 7).classList.add("active");
                } else {
                    document.getElementById(oId + 7 + 7).classList.remove("active");
                }
                if ((self.Byte7 & 0x80) == 0x80) {
                    document.getElementById(oId + 7 + 7).classList.add("active");
                } else {
                    document.getElementById(oId + 7 + 7).classList.remove("active");
                }

                if ((self.Byte6 & 0x01) == 0x01) {
                    document.getElementById(oId + 8 + 8).classList.add("active");
                } else {
                    document.getElementById(oId + 8 + 8).classList.remove("active");
                }
                if ((self.Byte6 & 0x02) == 0x02) {
                    document.getElementById(oId + 9 + 9).classList.add("active");
                } else {
                    document.getElementById(oId + 9 + 9).classList.remove("active");
                }
                if ((self.Byte6 & 0x04) == 0x04) {
                    document.getElementById(oId + 10 + 10).classList.add("active");
                } else {
                    document.getElementById(oId + 10 + 10).classList.remove("active");
                }
                if ((self.Byte6 & 0x08) == 0x08) {
                    document.getElementById(oId + 11 + 11).classList.add("active");
                } else {
                    document.getElementById(oId + 11 + 11).classList.remove("active");
                }
                if ((self.Byte6 & 0x10) == 0x10) {
                    document.getElementById(oId + 12 + 12).classList.add("active");
                } else {
                    document.getElementById(oId + 12 + 12).classList.remove("active");
                }
                if ((self.Byte6 & 0x20) == 0x20) {
                    document.getElementById(oId + 13 + 13).classList.add("active");
                } else {
                    document.getElementById(oId + 13 + 13).classList.remove("active");
                }
                if ((self.Byte6 & 0x40) == 0x40) {
                    document.getElementById(oId + 14 + 14).classList.add("active");
                } else {
                    document.getElementById(oId + 14 + 14).classList.remove("active");
                }
                if ((self.Byte6 & 0x80) == 0x80) {
                    document.getElementById(oId + 15 + 15).classList.add("active");
                } else {
                    document.getElementById(oId + 15 + 15).classList.remove("active");
                }
                if ((self.Byte6 & 0x80) == 0x80) {
                    document.getElementById(oId + 16 + 16).classList.add("active");
                } else {
                    document.getElementById(oId + 16 + 16).classList.remove("active");
                }
                if ((self.Byte5 & 0x01) == 0x01) {
                    document.getElementById(oId + 17 + 17).classList.add("active");
                } else {
                    document.getElementById(oId + 17 + 17).classList.remove("active");
                }
                if ((self.Byte5 & 0x02) == 0x02) {
                    document.getElementById(oId + 18 + 18).classList.add("active");
                } else {
                    document.getElementById(oId + 18 + 18).classList.remove("active");
                }
                if ((self.Byte5 & 0x04) == 0x04) {
                    document.getElementById(oId + 19 + 19).classList.add("active");
                } else {
                    document.getElementById(oId + 19 + 19).classList.remove("active");
                }
                if ((self.Byte5 & 0x08) == 0x08) {
                    document.getElementById(oId + 20 + 20).classList.add("active");
                } else {
                    document.getElementById(oId + 20 + 20).classList.remove("active");
                }
                // }
                // }, 500);
            };

        }
    };

    // 第三部分 旋钮
    function rotaryknob(FrameId, Byte4, Byte5, Byte6, Byte7, New) {
        this.oRotaOne = document.getElementById("rotaryknob_body");
        this.FrameId = FrameId;
        this.Byte4 = Byte4;
        this.Byte5 = Byte5;
        this.Byte6 = Byte6;
        this.Byte7 = Byte7;
        this.New = New;
        //自动初始化
        this.init();
    }
    rotaryknob.prototype = {
        constructor: rotaryknob,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            // self.Byte4 = Byte4;
            // 新id
            if (this.New == 'new') {
                console.log('新:旋钮');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("rotaryknob_body_one");
                oBig.setAttribute("id", Id);
                var oId = Id + 'i';
                // console.log(self.Byte4);
                // 修饰元素
                oBig.innerHTML =
                    '<input type="text" name="" class="rotaryknob_remark"> <span class = "rotaryknob_body_one_span">ID: <span class = "rotaryknob_body_one_id">0x' +
                    Id + ' </span> </span> <input type = "text"  class = "rotaryknob_remark_one" disabled="disabled" value = ' + '0x' + self.Byte4 + self.Byte5 + self.Byte6 + self.Byte7 + ' id=' + oId + '><input type = "text"  value = ""   class = "rotaryknob_remark_two"><button type="button" class="rota_btn">Power</button>';
                // 插入元素
                self.oRotaOne.appendChild(oBig);
            }
            if (this.New == 'old') {
                // console.log('旧');
                // console.log(self.Byte6);
                // console.log(self.Byte7);

                var oId = Id + 'i';
                // console.log(oId);
                var oInp = document.getElementById(oId);
                // oInp.value = '';
                // setTimeout(function () {
                oInp.value = '0x' + self.Byte6 + self.Byte7;
                // }, 500);
            }

        }
    };
    // 第四部分  传感器
    function sens(FrameId, num, Byte5, Byte6, Byte7, New) {
        this.oSensOne = document.getElementById("sensor_body");
        this.FrameId = FrameId;
        this.Byte4 = num;
        this.Byte5 = parseInt(Byte5, 16);
        this.Byte6 = parseInt(Byte6, 16);
        this.Byte7 = parseInt(Byte7, 16);
        this.New = New;
        //自动初始化
        this.init();
    }
    sens.prototype = {
        constructor: sens,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var Lbyte4Lenght = self.Byte4;
            // console.log(Lbyte4Lenght);
            // 新id
            if (this.New == 'new') {
                console.log('新：传感器');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("sensor_body_one");
                oBig.setAttribute("id", Id);
                var oId = Id + 'i';
                var oOof = Id + 'a';
                // 修饰元素
                oBig.innerHTML =
                    '<input type="text" name="" class="sensor_remark"><span class="sensor_body_one_span">ID: <span class="sensor_body_one_id" id=' + oOof + '>0x' +
                    Id + '</span></span> <div class="sensor_body_one_one" id = ' + oId + '></div>';
                setTimeout(function() {
                    for (var i = 0; i < Lbyte4Lenght; i++) {
                        // console.log('1');
                        // 创建元素
                        var oBtnBtn = document.createElement("div");
                        var oSim = document.getElementById(oId);
                        var Ssid = oId + [i];
                        var Ssssid = Ssid + [i];
                        oBtnBtn.classList.add("sensor_body_one_btn");
                        oBtnBtn.setAttribute("id", Ssid);
                        oBtnBtn.innerHTML = '<div class="sensor_body_one_btn_circle" id=' + Ssssid + '></div><div><input type ="text"></div>';
                        oSim.appendChild(oBtnBtn);
                        // this.oContent[i].style.display = "none";
                    }
                }, 500);
                // 插入元素
                self.oSensOne.appendChild(oBig);
            };
            // 旧id，刷新状态
            if (this.New == 'old') {
                console.log('旧');
                var oId = Id + 'i';
                if ((self.Byte7 & 0x01) == 0x01) {
                    document.getElementById(oId + 0 + 0).classList.add("active");
                } else {
                    document.getElementById(oId + 0 + 0).classList.remove("active");
                }
                if ((self.Byte7 & 0x02) == 0x02) {
                    document.getElementById(oId + 1 + 1).classList.add("active");
                } else {
                    document.getElementById(oId + 1 + 1).classList.remove("active");
                }
                if ((self.Byte7 & 0x04) == 0x04) {
                    document.getElementById(oId + 2 + 2).classList.add("active");
                } else {
                    document.getElementById(oId + 2 + 2).classList.remove("active");
                }
                if ((self.Byte7 & 0x08) == 0x08) {
                    document.getElementById(oId + 3 + 3).classList.add("active");
                } else {
                    document.getElementById(oId + 3 + 3).classList.remove("active");
                }
                if ((self.Byte7 & 0x10) == 0x10) {
                    document.getElementById(oId + 4 + 4).classList.add("active");
                } else {
                    document.getElementById(oId + 4 + 4).classList.remove("active");
                }
                if ((self.Byte7 & 0x20) == 0x20) {
                    document.getElementById(oId + 5 + 5).classList.add("active");
                } else {
                    document.getElementById(oId + 5 + 5).classList.remove("active");
                }
                if ((self.Byte7 & 0x40) == 0x40) {
                    document.getElementById(oId + 6 + 6).classList.add("active");
                } else {
                    document.getElementById(oId + 6 + 6).classList.remove("active");
                }
                if ((self.Byte7 & 0x80) == 0x80) {
                    document.getElementById(oId + 7 + 7).classList.add("active");
                } else {
                    document.getElementById(oId + 7 + 7).classList.remove("active");
                }
                if ((self.Byte7 & 0x80) == 0x80) {
                    document.getElementById(oId + 7 + 7).classList.add("active");
                } else {
                    document.getElementById(oId + 7 + 7).classList.remove("active");
                }

                if ((self.Byte6 & 0x01) == 0x01) {
                    document.getElementById(oId + 8 + 8).classList.add("active");
                } else {
                    document.getElementById(oId + 8 + 8).classList.remove("active");
                }
                if ((self.Byte6 & 0x02) == 0x02) {
                    document.getElementById(oId + 9 + 9).classList.add("active");
                } else {
                    document.getElementById(oId + 9 + 9).classList.remove("active");
                }
                if ((self.Byte6 & 0x04) == 0x04) {
                    document.getElementById(oId + 10 + 10).classList.add("active");
                } else {
                    document.getElementById(oId + 10 + 10).classList.remove("active");
                }
                if ((self.Byte6 & 0x08) == 0x08) {
                    document.getElementById(oId + 11 + 11).classList.add("active");
                } else {
                    document.getElementById(oId + 11 + 11).classList.remove("active");
                }
                if ((self.Byte6 & 0x10) == 0x10) {
                    document.getElementById(oId + 12 + 12).classList.add("active");
                } else {
                    document.getElementById(oId + 12 + 12).classList.remove("active");
                }
                if ((self.Byte6 & 0x20) == 0x20) {
                    document.getElementById(oId + 13 + 13).classList.add("active");
                } else {
                    document.getElementById(oId + 13 + 13).classList.remove("active");
                }
                if ((self.Byte6 & 0x40) == 0x40) {
                    document.getElementById(oId + 14 + 14).classList.add("active");
                } else {
                    document.getElementById(oId + 14 + 14).classList.remove("active");
                }
                if ((self.Byte6 & 0x80) == 0x80) {
                    document.getElementById(oId + 15 + 15).classList.add("active");
                } else {
                    document.getElementById(oId + 15 + 15).classList.remove("active");
                }
                if ((self.Byte6 & 0x80) == 0x80) {
                    document.getElementById(oId + 16 + 16).classList.add("active");
                } else {
                    document.getElementById(oId + 16 + 16).classList.remove("active");
                }
                if ((self.Byte5 & 0x01) == 0x01) {
                    document.getElementById(oId + 17 + 17).classList.add("active");
                } else {
                    document.getElementById(oId + 17 + 17).classList.remove("active");
                }
                if ((self.Byte5 & 0x02) == 0x02) {
                    document.getElementById(oId + 18 + 18).classList.add("active");
                } else {
                    document.getElementById(oId + 18 + 18).classList.remove("active");
                }
                if ((self.Byte5 & 0x04) == 0x04) {
                    document.getElementById(oId + 19 + 19).classList.add("active");
                } else {
                    document.getElementById(oId + 19 + 19).classList.remove("active");
                }
                if ((self.Byte5 & 0x08) == 0x08) {
                    document.getElementById(oId + 20 + 20).classList.add("active");
                } else {
                    document.getElementById(oId + 20 + 20).classList.remove("active");
                }

            }
        }
    };

    // 第5部分，灯光
    function lamp(FrameId, New) {
        this.oLamOne = document.getElementById("lamp_body");
        this.FrameId = FrameId;
        this.New = New;
        //自动初始化
        this.init();
    }
    lamp.prototype = {
        constructor: lamp,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            // 新id
            if (this.New == 'new') {
                console.log('新:灯光');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("lamp_body_one");
                oBig.setAttribute("id", Id);
                var oIdBy0 = Id + 'by0';
                var oIdBy1 = Id + 'by1';
                var oIdBy2 = Id + 'by2';
                var oIdBy3 = Id + 'by3';
                var oIdBy4 = Id + 'by4';
                var oIdBy5 = Id + 'by5';
                var oIdBy6 = Id + 'by6';
                var oIdBy7 = Id + 'by7';
                // var oId = self.LFrameId + 'i';
                // 修饰元素
                oBig.innerHTML = '<input type="text" name="" class="lamp_remark"><span class="lamp_body_one_span">ID: <span class="lamp_body_one_id">0x' + Id + '</span></span><div class="lamp_body_one_one"><label for="">模式:</label><select class="lamp_xuanxiang" name="" id=' + oIdBy0 + '><option value = "01">关闭模式</option><option value="02">打开模式</option><option value="03">呼吸模式</option><option value = "04">颜色过渡模式</option><option value="05">正向流水保持模式</option><option value ="06">正向流水不保持模式</option><option value = "07">反向流水保持模式</option><option value = "08">反向流水不保持模式</option><option value = "09">带数量正向流水模式</option><option value = "0A">带数量反向流水模式</option><option value = "0B">正向灭灯流水保持模式</option><option value = "0C">正向灭灯流水模式</option><option value = "0D">正向慢速流水保持模式</option><option value = "0E">正向慢速流水不保持模式</option><option value = "0F">反向慢速流水保持模式</option><option value = "10">反向慢速流水不保持模式</option><option value = "11">带数量正向慢速流水模式</option><option value = "12">带数量反向慢速流水模式</option><option value = "13">带数量正向拖尾流水模式</option><option value = "14">带数量反向拖尾流水模式</option><option value = "15">多彩正向流水模式</option><option value = "16">多彩反向流水模式</option><option value = "17">全彩像素颜色设置模式</option><option value = "18">全彩像素显示模式</option><option value = "19">全彩像素清除模式</option><option value = "1A">单色像素颜色设置模式</option><option value = "1B">单色像素显示模式</option></select><span>流动LED:</span><input type ="text" class="liudong"  id=' + oIdBy1 + '><span>LED数量:</span><input type = "text" class="led" id=' + oIdBy2 + '><span>速度:</span><input class="sudu" type = "text"  id=' + oIdBy3 + '><span>颜色:</span><input type="color" name="" class="yanse"/><span>白色值:</span><input type="text" name="" class="type7" id=' + oIdBy7 + '/><button class = "lamp_send">执行</button></div>';
                // 插入元素
                self.oLamOne.appendChild(oBig);
            }
            if (this.New == 'old') {}
        }
    }

    // 电机
    function elec(FrameId, Byte0, Byte4, Byte5, Byte6, Byte7, New) {
        this.oElecOne = document.getElementById("elec_body");
        this.FrameId = FrameId;
        this.byte0 = Byte0;
        this.byte4 = Byte4;
        this.byte5 = Byte5;
        this.byte6 = Byte6;
        this.byte7 = Byte7;
        this.New = New;
        //自动初始化
        this.init();
    }
    elec.prototype = {
        constructor: elec,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var oId = Id + 'i';
            var Idval = Id + 'val';
            var IdCov = Id + 'cov';

            var IdAll = Id + 'all';
            var IdCurr = Id + 'curr';
            //    var OverAll; //总路程
            //   var Current; //当前位置
            var elecTrue = false;
            // console.log(FrameId,self.byte0,);
            // console.log(elecTrue);
            // console.log(self.byte0);
            // 新id
            if (this.New == 'new') {
                // 创建元素
                console.log('新:电机');
                var oBig = document.createElement("div");
                oBig.classList.add("elec_body_one");
                oBig.setAttribute("id", Id);
                // 修饰元素
                oBig.innerHTML = '<input type="text" name="" class="elec_remark"><span class="elec_body_one_span">ID: <span class="elec_body_one_id">0x' +
                    Id + '</span></span><div class="elec_right"><div class="elec_sm_left"></div><input type="range" disabled="true" name="" min="0" max="100" step="1" id=' + Idval + '><input type="text" value="" class="elec_cover" id=' + IdCov + '><input type="text" value="" class="elec_OverAll" id=' + IdAll + '><div class="elec_sm_right"></div><button type="button" class="elec_up">前进</button><button type="button" class="elec_down">后退</button><label for=""><input type="radio" value="" name=' + Id + '>1<input type="radio" value="" name=' + Id + '>2<input type="radio"  value="" name=' + Id + '>3<input type="radio"  value="" name=' + Id + '>4</label><button type="button" class="elec_save">保存</button><button type="button" class="elec_send">调用</button></div>';

                // 插入元素
                self.oElecOne.appendChild(oBig);
                stompClient.send("/app/wu", {}, "S" + Id + ",55,00,00,00,00,00,00,00K");
                setTimeout(function() {
                    stompClient.send("/app/wu", {}, "S" + Id + ",55,00,00,00,00,00,00,00K");
                }, 1000);
                setTimeout(function() {
                    stompClient.send("/app/wu", {}, "S" + Id + ",55,00,00,00,00,00,00,00K");
                }, 2000);
                stompClient.send("/app/wu", {}, "S" + Id + ",7A,00,00,00,00,00,00,01K");
                // console.log("发送查询");
            }
            if (this.New == 'old') {
                if (self.byte0 == "54") {
                    // console.log('改变');
                    var OverAll = parseInt(self.byte4 + self.byte5 + self.byte6 + self.byte7, 16) - 0x8000;
                    document.getElementById(IdAll).value = OverAll;
                    // console.log(OverAll)
                    // elecTrue = true;
                }
                if (self.byte0 == "5B") {
                    var Current;
                    Current = parseInt(self.byte4 + self.byte5 + self.byte6 + self.byte7, 16) - 0x8000;
                    var oIdall = document.getElementById(IdAll).value;
                    var oIdval = document.getElementById(Idval);
                    Current = (Current / oIdall).toFixed(2);
                    oIdval.value = Current * 100;

                    var oIdCov = document.getElementById(IdCov);
                    oIdCov.value = self.byte4 + "," + self.byte5 + "," + self.byte6 + "," + self.byte7;
                    // console.log(Current * 100);
                }
            }
        }
    };
    //安卓屏
    function andr(FrameId, New) {
        this.oAndrOne = document.getElementById("andr_body");
        this.FrameId = FrameId;
        // this.Byte4 = num;
        // this.Byte5 = parseInt(Byte5, 16);
        // this.Byte6 = parseInt(Byte6, 16);
        // this.Byte7 = parseInt(Byte7, 16);
        this.New = New;
        //自动初始化
        this.init();
    }
    andr.prototype = {
        constructor: andr,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            if (this.New == 'new') {
                // 创建元素
                console.log('新:安卓屏');
                var oBig = document.createElement("div");
                oBig.classList.add("andr_body_one");
                oBig.setAttribute("id", Id);
                var oId = Id + 'i';
                // 修饰元素
                oBig.innerHTML = '<input type="text" name="" class="andr_remark"><span class="andr_body_one_span">ID: <span class="andr_body_one_id">0x' + Id + '</span></span><div class="andr_body_one_one"><input type="file"><button type="button">打开</button><img src="./img/st.png" alt="" class="andr_img1"><img src="./img/pl.png" alt="" class="andr_img2"><img src="./img/cea.png" alt="" class="andr_img3"></div>';
                // 插入元素
                self.oAndrOne.appendChild(oBig);
            }
        }
    }

    //投影仪
    function projector(FrameId, Byte4, Byte5, Byte6, Byte7, New) {
        this.oProOne = document.getElementById("proj_body");
        this.FrameId = FrameId;
        this.New = New;
        //自动初始化
        this.init();
    }
    projector.prototype = {
        constructor: projector,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            // 新id
            if (this.New == 'new') {
                console.log('新:投影仪');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("proj_body_one");
                oBig.setAttribute("id", Id);
                // 修饰元素
                oBig.innerHTML =
                    '<input type="text" name="" class="proj_remark"><span class="proj_body_one_span">ID: <span class="proj_body_one_id">0x' +
                    Id + '</span></span><div class="proj_top"><button class="proj_1">开机</button><button class="proj_2">关机</button></div><div class="proj_bott"><button class="proj_3">视频1</button><button class="proj_4">视频2</button><button class="proj_5">视频3</button><button class="proj_6">视频4</button><button class="proj_7">视频5</button><button class="proj_8">视频6</button><button class="proj_9">视频7</button><button class="proj_10">视频8</button></div>';
                // 插入元素
                self.oProOne.appendChild(oBig);
            }
        }
    };

    // 输出控制
    function outp(FrameId, num, New) {
        this.oOutpOne = document.getElementById("outp_body");
        this.FrameId = FrameId;
        this.Lbyte4 = parseInt(num);
        this.New = New;
        //自动初始化
        this.init();
    }
    outp.prototype = {
        constructor: outp,
        init: function() {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var Lbyte4Lenght = self.Lbyte4;
            // 新id
            if (this.New == 'new') {
                console.log('新：输出控制');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("outp_body_one");
                oBig.setAttribute("id", Id);
                // 修饰元素
                oBig.innerHTML = '<input type="text" name="" class="outp_remark"><span class="outp_body_one_span">ID:<span class="outp_body_one_id">0x' + Id + '</span>';
                setTimeout(function() {
                    var oOutpB = document.createElement("div");
                    oOutpB.classList.add("outp_b");
                    oBig.appendChild(oOutpB);
                    for (var i = 0; i < Lbyte4Lenght; i++) {
                        var oId = Id + [i];
                        // 创建元素
                        var oBtnBtn = document.createElement("div");
                        oBtnBtn.classList.add("outp_btn");
                        // oBtnBtn.setAttribute("id", Ssid);
                        oBtnBtn.innerHTML = '<input type="text" name=""  value="" class="outp_input"/><button type="button" id=' + oId + '></button>';
                        oOutpB.appendChild(oBtnBtn);
                        // this.oContent[i].style.display = "none";
                    }
                }, 500);
                // 插入元素
                self.oOutpOne.appendChild(oBig);
            }
        }
    };

    // 事件委托，灯光发送
    $(".lamplight").on("click", ".lamp_send", function() {
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
        stompClient.send("/app/wu", {}, "S" + id + "," + type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 + "," + type5 + "," + type6 + "," + type7 + "K");
        alert("S" + id + "," + type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 + "," + type5 + "," + type6 + "," + type7 + "K");
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
    //事件委托，旋钮按下发送
    $(".rotaryknob").on("mousedown", "button", function() {
        var id = $(this).parents(".rotaryknob_body_one").attr('id');
        // stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,01K00,12345");
        stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,01K");
        // console.log("S" + id + ",03,00,00,00,00,00,00,01K");
    });
    //旋钮松开发送
    $(".rotaryknob").on("mouseup", "button", function() {
        var id = $(this).parents(".rotaryknob_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
        setTimeout(function() {
            stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
        }, 100);
        setTimeout(function() {
            stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
        }, 200);
        // console.log("S" + id + ",03,00,00,00,00,00,00,00K");
    });

    // 电机发送
    var elecSet; //前进
    $(".elec_body").on("mousedown", ".elec_up", function() {
        var id = $(this).parents(".elec_body_one").attr('id');
        $(this).css("background-color", "pink");
        elecSet = setInterval(function() {
            stompClient.send("/app/wu", {}, "S" + id + ",0B,00,00,00,00,00,10,50K");
        }, 100);
        // console.log("S" + id + ",0B,00,00,00,00,00,00,00K");
    });
    $(".elec_body").on("mouseup", ".elec_up", function() {
        clearInterval(elecSet);
        $(this).css("background-color", "#5b9bd5");
    });
    var elecSetDown; //后退
    $(".elec_body").on("mousedown", ".elec_down", function() {
        var id = $(this).parents(".elec_body_one").attr('id');
        $(this).css("background-color", "pink");
        elecSetDown = setInterval(function() {
            stompClient.send("/app/wu", {}, "S" + id + ",0C,00,00,00,00,00,10,50K");
        }, 50)
    });
    $(".elec_body").on("mouseup", ".elec_down", function() {
        clearInterval(elecSetDown);
        $(this).css("background-color", "#5b9bd5");
    });
    // var text = "00,00,00,00";
    // var nam = '101';
    // 电机保存
    $(".elec_body").on("click", ".elec_save", function() {
        var Id = $(this).parents(".elec_body_one").attr('id');
        var oIdCov = $(this).siblings('.elec_cover').val();
        var list = $('input:radio[name=' + Id + ']:checked').val();
        if (list == null) {
            alert("请选中一个!");
            return false;
        } else {
            $('input:radio[name=' + Id + ']:checked').val(oIdCov);
            console.log($('input:radio[name=' + Id + ']:checked').val());
            // alert(id);
        }
    });
    // 电机 调用
    $(".elec_body").on("click", ".elec_send", function() {
        var Id = $(this).parents(".elec_body_one").attr('id');
        // var oIdCov = $(this).siblings('.elec_cover').val();
        var list = $('input:radio[name=' + Id + ']:checked').val();
        if (list == null) {
            alert("请选中一个!");
            return false;
        } else {
            // alert(list);
            stompClient.send("/app/wu", {}, "S" + Id + ",0D,00,00,50," + list + "K");
            console.log("S" + Id + ",0D,00,00,50," + list + "K");
            // $('input:radio[name=' + id + ']:checked').val(oIdCov);
            // alert($('input:radio[name=' + id + ']:checked').val());
            // alert(id);
        }
    });
    //安卓屏
    $(".andr_body").on("click", "button", function() {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",04,00,00,00,00,00,00,00K");
    });

    $(".andr_body").on("click", ".andr_img1", function() {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",02,00,00,00,00,00,00,00K");
    });
    $(".andr_body").on("click", ".andr_img2", function() {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",03,00,00,00,00,00,00,00K");
    });
    $(".andr_body").on("click", ".andr_img3", function() {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",01,00,00,00,00,00,00,00K");
    });



    // 投影仪
    $(".proj_body").on("click", ".elec_save", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_2", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",01,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_3", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_4", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",04,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_5", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",05,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_6", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",06,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_7", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",07,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_8", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",08,00,00,00,00,00,00,00K");
    })
    $(".proj_body").on("click", ".proj_9", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",09,00,00,00,00,00,00,00K");
    })
    $(".proj_body").on("click", ".proj_10", function() {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",0A,00,00,00,00,00,00,00K");
    });


    // 输出控制改变文字
    $(".outp_body").on("blur", ".outp_input", function() {
        $(this).siblings(button).text($(this).val());
        $(this).val('');
    });
    //输出控制  发送
    var as = new Array(0, 0, 0, 0, 0, 0, 0, 0);
    $(".outp_body").on("click", "button", function() {
        var id = $(this).attr('id');
        var oId = $(this).attr('id').slice(3);
        id = id.slice(0, 3);
        var color = $(this).css("background-color");

        let val = parseInt(oId);
        let yu = val % 8;
        let zheng = parseInt(oId / 8);

        if (color == 'rgb(91, 155, 213)') {
            as[zheng] |= 0x01 << yu;
            $(this).css("background-color", "rgb(255, 0, 0)");
        } else {
            as[zheng] &= ~(0x01 << yu);
            $(this).css("background-color", "rgb(91, 155, 213)");
        }
        // console.log(val);
        var as0 = as[0] > 0x0f ? "" : "0";
        var as1 = as[1] > 0x0f ? "" : "0";
        var as2 = as[2] > 0x0f ? "" : "0";
        var as3 = as[3] > 0x0f ? "" : "0";
        var as4 = as[4] > 0x0f ? "" : "0";
        var as5 = as[5] > 0x0f ? "" : "0";
        var as6 = as[6] > 0x0f ? "" : "0";
        var as7 = as[7] > 0x0f ? "" : "0";
        // alert(("S" + id + ",02,00,00," + type3 + "," + as3 + (as[3].toString(16)).toUpperCase() + "," + as2 + (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(16)).toUpperCase() + "K"));
        if (oId < 32) {
            stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,00," + as3 + (as[3].toString(16)).toUpperCase() + "," + as2 + (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(16)).toUpperCase() + "K");
            // console.log("S" + id + ",02,00,00,00," + as3 + (as[3].toString(16)).toUpperCase() + "," + as2 + (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(16)).toUpperCase() + "K");
        } else {
            stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,01," + as7 + (as[7].toString(16)).toUpperCase() + "," + as6 + (as[6].toString(16)).toUpperCase() + "," + as5 + (as[5].toString(16)).toUpperCase() + "," + as4 + (as[4].toString(16)).toUpperCase() + "K");
            // console.log("S" + id + ",02,00,00,01," + as7 + (as[7].toString(16)).toUpperCase() + "," + as6 + (as[6].toString(16)).toUpperCase() + "," + as5 + (as[5].toString(16)).toUpperCase() + "," + as4 + (as[4].toString(16)).toUpperCase() + "K");

        }

    });

    // 加号，增加虚拟按钮
    var oViryAdd = document.getElementById("virt_add");
    var oViryText = document.getElementById("virt_text");
    var oViryCov = document.getElementById("virt_cover");
    var oViryEns = document.getElementById("virt_ensure");
    var oViryCan = document.getElementById("virt_cancel");
    var oViryId = document.getElementById("virt_text_span");
    var oViryNum = document.getElementById("virt_text_num");
    var oViry = document.getElementById("virtual_body");

    // 打开
    oViryAdd.onclick = function() {
        oViryText.style.display = 'block';
        oViryCov.style.display = 'block';
    }
    // 取消
    oViryEns.onclick = function() {
        oViryText.style.display = 'none';
        oViryCov.style.display = 'none';
        oViryId.value = '';
        oViryNum.value = '';
    }
    // 确定,然后添加
    oViryCan.onclick = function() {
        var viryId = oViryId.value;
        var viryNum = oViryNum.value;
        // parseInt(num, 16);
        // var oViryId = document.getElementById(viryId);
        if (!viryId) {
            alert('请输入ID');
        } else if (!viryNum) {
            alert('请输入数量');
        } else if (viryNum > 24) {
            alert('请输入24以内的数量');
            oViryNum.value = '';
        } else if (document.getElementById(viryId)) {
            alert('此id已存在，请重新输入');
            oViryId.value = '';
            // console.log('q');
        } else {
            var oBig = document.createElement("div");
            oBig.classList.add("virtual_body_one");
            oBig.setAttribute("id", viryId);
            var oId = viryId + 'i';
            var oIdDel = viryId + 'del';
            console.log('新：虚拟按钮');
            // 修饰元素
            oBig.innerHTML = '<input type="text" name="" class="virtual_remark"><span class="virtual_body_one_span">ID: <span class="virtual_body_one_id">0x' + viryId + '</span></span><div class="virtual_body_one_one" id=' + oId + '><div class="virtual_delete" id=' + oIdDel + '>X</div></div>';
            setTimeout(function() {
                for (var i = 0; i < viryNum; i++) {
                    // 创建元素
                    // console.log('1');
                    var oBtnBtn = document.createElement("div");
                    var oSim = document.getElementById(oId);
                    var Ssid = oId + [i];
                    var Ssssid = Ssid + [i];
                    oBtnBtn.classList.add("virtual_body_one_btn");
                    // oBtnBtn.setAttribute("id", Ssid);
                    oBtnBtn.innerHTML = '<div class="virtual_body_one_btn_circle" id=' + Ssid + '></div><div> <input type ="text"></div>';
                    oSim.appendChild(oBtnBtn);
                }
            }, 500);
            // 插入元素
            oViry.appendChild(oBig);
            oViryId.value = '';
            oViryNum.value = '';
            oViryText.style.display = 'none';
            oViryCov.style.display = 'none';
        }
    };
    //虚拟按钮  删除
    $(".virtual_body").on("click", ".virtual_delete", function() {
        $(this).parents(".virtual_body_one").remove();
    })
    //虚拟按钮  发送
    var virt = new Array(0, 0, 0);
    $(".virtual_body").on("click", ".virtual_body_one_btn", function() {
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
        stompClient.send("/app/wu", {}, "S" + id + ",5B,00,00,00,00," + as2 + (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(16)).toUpperCase() + "K");
    });

    // 安卓屏发送
    $(".andr_body").on("click", "button", function() {
        // $(this).parents(".virtual_body_one").remove();
        var id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + id + "", {}, "S" + id + ",05,00,00,00,00,00,00,00K");
        // console.log(id);
    })

    // 离线保存备注
    $(".button_body").on("blur", ".button_remark", function() {
        var Id = $(this).parents(".button_body_one").attr('id');
        var buttonval = $(this).val();
        // var Loca = storage.getItem(Id);
        var locaObj = JSON.parse(storage.getItem(Id));
        var FrameId = locaObj.FrameId;
        var num = locaObj.num;
        var type = locaObj.type;
        // var text = locaObj.text;
        var data = {
            FrameId: FrameId,
            num: num,
            type: type,
            text: buttonval,
        };
        var dater = JSON.stringify(data);
        localStorage.setItem(FrameId, dater);
        // console.log(data);
    });
    $(".rotaryknob_body").on("blur", ".rotaryknob_remark", function() {
        var Id = $(this).parents(".rotaryknob_body_one").attr('id');
        var buttonval = $(this).val();
        var locaObj = JSON.parse(storage.getItem(Id));
        var FrameId = locaObj.FrameId;
        var type = locaObj.type;
        var data = {
            FrameId: FrameId,
            type: type,
            text: buttonval,
        };
        var dater = JSON.stringify(data);
        localStorage.setItem(FrameId, dater);
        // console.log(data);
    });

    $(".sensor_body").on("blur", ".sensor_remark", function() {
        var Id = $(this).parents(".sensor_body_one").attr('id');
        var buttonval = $(this).val();
        var locaObj = JSON.parse(storage.getItem(Id));
        var FrameId = locaObj.FrameId;
        var num = locaObj.num;
        var type = locaObj.type;
        var data = {
            FrameId: FrameId,
            num: num,
            type: type,
            text: buttonval,
        };
        var dater = JSON.stringify(data);
        localStorage.setItem(FrameId, dater);
        // console.log(data);
    });
    // 流水灯
    $(".lamp_body").on("blur", ".lamp_remark", function() {
        var Id = $(this).parents(".lamp_body_one").attr('id');
        var buttonval = $(this).val();
        var locaObj = JSON.parse(storage.getItem(Id));
        var FrameId = locaObj.FrameId;
        var type = locaObj.type;
        var data = {
            FrameId: FrameId,
            type: type,
            text: buttonval,
        };
        var dater = JSON.stringify(data);
        localStorage.setItem(FrameId, dater);
    });
    // 电机
    $(".elec_body").on("blur", ".elec_remark", function() {
        var Id = $(this).parents(".elec_body_one").attr('id');
        var buttonval = $(this).val();
        var locaObj = JSON.parse(storage.getItem(Id));
        var FrameId = locaObj.FrameId;
        var type = locaObj.type;
        var data = {
            FrameId: FrameId,
            type: type,
            text: buttonval,
        };
        var dater = JSON.stringify(data);
        localStorage.setItem(FrameId, dater);
    });
    // 安卓屏
    $(".andr_body").on("blur", ".andr_remark", function() {
        var Id = $(this).parents(".andr_body_one").attr('id');
        var buttonval = $(this).val();
        var locaObj = JSON.parse(storage.getItem(Id));
        var FrameId = locaObj.FrameId;
        var type = locaObj.type;
        var data = {
            FrameId: FrameId,
            type: type,
            text: buttonval,
        };
        var dater = JSON.stringify(data);
        localStorage.setItem(FrameId, dater);
    });
    // 投影仪
    $(".proj_body").on("blur", ".proj_remark", function() {
        var Id = $(this).parents(".proj_body_one").attr('id');
        var buttonval = $(this).val();
        var locaObj = JSON.parse(storage.getItem(Id));
        var FrameId = locaObj.FrameId;
        var type = locaObj.type;
        var data = {
            FrameId: FrameId,
            type: type,
            text: buttonval,
        };
        var dater = JSON.stringify(data);
        localStorage.setItem(FrameId, dater);
    });
    // 输出控制























    // 自动模式与手动模式


    var pattern = true;
    $("#cut").click(function() {
        if ($('.top_btn2').text() == "切换自动") {
            $(".top_btn1").text("当前模式：自动");
            $(".top_btn2").text("切换手动");
            $(".content").css("display", "none");
            $(".selfmotion").css("display", "block");
            pattern = false;
            stompClient.disconnect(function() {
                console.log('手动模式断开')
            });
            // setTimeout(function() {
            //     connectSelf(); //建立连接,自动模式
            // }, 1000);
            // console.log('1');
        } else {
            $(".top_btn1").text("当前模式：手动");
            $(".top_btn2").text("切换自动");
            $(".content").css("display", "block");
            $(".selfmotion").css("display", "none");
            pattern = true;
            // stompClient.disconnect(function() {
            //     console.log("自动模式断开");
            // });
            connect(); //建立连接,手动模式

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
                stompClient.subscribe('/topic/udp/broadcast', function(response) {
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
                setTimeout(function() {
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

    $("#selfer_three").click(function() {
        connectLed();
        $(".selfmotion").css("display", "none");
        $(".Pattern3").css("display", "block");
        stompClient.send("/app/wu", {}, "S101,5F,00,00,00,00,00,00,00K");
        setTimeout(function() {
            stompClient.send("/app/wu", {}, "S102,5F,00,00,00,00,00,00,00K");
        }, 100);
        setTimeout(function() {
            stompClient.send("/app/wu", {}, "S103,5F,00,00,00,00,00,00,00K");
        }, 200);
    });

    $(".pattern3_button").click(function() {
        stompClient.send("/app/wu", {}, "S101,00,00,00,00,00,00,00,00K");
        $("#pattern3_ico1").addClass("active");
        setTimeout(function() {
            stompClient.send("/app/wu", {}, "S102,00,00,00,00,00,00,00,00K");
            $("#pattern3_ico1").removeClass("active");
            $("#pattern3_ico2").addClass("active");
        }, 100);
        setTimeout(function() {
            stompClient.send("/app/wu", {}, "S103,00,00,00,00,00,00,00,00K");
            $("#pattern3_ico1").removeClass("active");
            $("#pattern3_ico2").addClass("active");
        }, 200);


    });
    $(".pattern3_tuichu").click(function() {
        stompClient.disconnect(function() {
            console.log("自动模式-灯光氛围灯:断开");
        });
        var led1 = false;
        var led2 = false;
        var led3 = false;
        var led4 = false;
        $(".selfmotion").css("display", "block");
        $(".Pattern3").css("display", "none");
    });


};