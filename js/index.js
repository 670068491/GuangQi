window.onload = function () {
    var storage = window.localStorage;
    //定义全局变量，代表一个session
    var stompClient = null;
    var port = "http://192.168.1.10:8081/gq/api/";

    var List = []; //总数组
    var ListType = []; //类型数组
    var libraryList = []; //初始化复位
    var elecList = []; //电机复位


    function connect() {
        // 建立连接对象（还未发起连接）
        // var socket = new WebSocket("ws://localhost:8080/webSocketEndPoint");
        var socket = new WebSocket("ws://192.168.1.10:8080/webSocketEndPoint");
        // var socket = new WebSocket("ws://192.168.1.241:8080/webSocketEndPoint");
        stompClient = Stomp.over(socket); // 获取 STOMP 子协议的客户端对象
        stompClient.connect({}, function connectCallback(frame) { // 向服务器发起websocket连接并发送CONNECT帧
                // 连接成功时（服务器响应 CONNECTED web帧）的回调方法
                console.log('[' + frame + ']' + '手动模式：连接成功');
                stompClient.subscribe('/topic/udp/broadcast', function (response) {
                    // stompClient.subscribe('/topic/socket/201', function (response) {
                    // console.log(response.body);
                    var stringResult = response.body.replace("S", "").replace("K", "").split(','); // 转为数组输出[123,456,789];
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

                    // var Byte7 = stringResult[8].substring(0, stringResult[8].length - 1);
                    // var Byte7 = Byt7.substring(0, Byt7.length - 1);
                    // var oYemian = document.getElementById(FrameId);
                    // if (List.indexOf(FrameId) > -1) { //则包含该元素} }

                    // 判断新旧id  /  不存在  新id
                    // !document.getElementById(FrameId)
                    if (List.indexOf(FrameId) == -1 && Byte0 != '5E' && Byte0 != '5F') { // 发送出去
                        stompClient.send("/app/wu", {}, "S" + FrameId + ",5F,00,00,00,00,00,00,00K");
                        // console.log(stringResult);
                        // console.log('发送');
                        // !document.getElementById(FrameId)
                    } else if (List.indexOf(FrameId) == -1 && Byte0 == '5E') { //返回的类型与数量
                        List.push(FrameId);
                        var node = {};
                        node.FrameId = FrameId;
                        node.node_type = Byte5;
                        ListType.push(node);


                        // console.log(List);
                        // node.id = FrameId;
                        // node.value = Byte0 + ',' + Byte1 + ',' + Byte2 + ',' + Byte3 + ',' + Byte4 + ',' + Byte5 + ',' + Byte6 + ',' + Byte7;
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
                            case "00":
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);
                                break;
                            case "01":
                                // 流水灯
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: 0,
                                }, function (data) {
                                    // console.log(data);
                                });
                                new lamp(FrameId, "new");

                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);

                                break;
                            case "02":
                                // RGB
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: 0,
                                }, function (data) {
                                    // console.log(data);
                                });
                                break;
                            case "03":
                                // 按钮
                                // var num = parseInt(Byte4, 16);
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: parseInt(Byte4, 16),
                                }, function (data) {
                                    // console.log(data);
                                });
                                new button(FrameId, Byte4, Byte5, Byte6, Byte7, "new");
                                var data = {
                                    FrameId: FrameId,
                                    num: parseInt(Byte4, 16),
                                    type: Byte5,
                                };
                                var dater = JSON.stringify(data);
                                storage.setItem(FrameId, dater);
                                break;
                            case "04":
                                //点阵控制板
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: 0,
                                }, function (data) {
                                    // console.log(data);
                                });
                                break;
                            case "05":
                                // can转lin
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: 0,
                                }, function (data) {
                                    // console.log(data);
                                });
                                break;
                            case "06":
                                //  电机
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: parseInt(Byte4, 16),
                                }, function (data) {
                                    // console.log(data);
                                });
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                };
                                var dater = JSON.stringify(data);
                                storage.setItem(FrameId, dater);
                                new elec(FrameId, "00", "00", "00", "00", "00", "new");
                                break;
                            case "07":
                                // 旋钮
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: 0,
                                }, function (data) {
                                    // console.log(data);
                                });
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,

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
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: 0,
                                }, function (data) {
                                    // console.log(data);
                                });
                                var data = {
                                    FrameId: FrameId,
                                    type: Byte5,
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);
                                new projector(FrameId, "new");
                                break;
                            case "0A":
                                // 传感器
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: parseInt(Byte4, 16),
                                }, function (data) {
                                    // console.log(data);
                                });

                                var data = {
                                    FrameId: FrameId,
                                    num: parseInt(Byte4, 16),
                                    type: Byte5,
                                };
                                var dat = JSON.stringify(data);
                                storage.setItem(FrameId, dat);
                                new sens(FrameId, parseInt(Byte4, 16), Byte5, Byte6, Byte7, "new");
                                break;
                            case "0B":
                                // 输出控制
                                $.getJSON(port + "saveDeviceType", {
                                    FrameId: FrameId,
                                    Ftype: Byte5,
                                    Fnum: parseInt(Byte4, 16),
                                }, function (data) {
                                    // console.log(data);
                                });

                                var data = {
                                    FrameId: FrameId,
                                    num: parseInt(Byte4, 16),
                                    type: Byte5,

                                };
                                var dater = JSON.stringify(data);
                                storage.setItem(FrameId, dater);
                                new outp(FrameId, parseInt(Byte4, 16), "new");
                                break;
                            default:
                                // console.log("没有此类型");
                                break;
                        }

                        // document.getElementById(FrameId)
                    } else if (List.indexOf(FrameId) > -1) { // 刷新状态
                        var Type = JSON.parse(storage.getItem(FrameId)).type;


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
                                    new button(FrameId, Byte4, Byte5, Byte6, Byte7, "old");
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
                                // console.log("没有此类型");
                                break;
                        }
                        // });
                    }
                });
                stompClient.subscribe('/topic/websocket/broadcast', function (response) {
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
                setTimeout(function () {
                    // 自动重连
                    connect();
                }, 500);
            }
        );
    };

    $(function () {
        connect(); //建立连接
    });


    //面向对象的
    // 第一部分，按钮
    function button(FrameId, Byte4, Byte5, Byte6, Byte7, New) {
        this.oBtnOne = document.getElementById("button_body");
        this.FrameId = FrameId;
        this.Byte4 = parseInt(Byte4, 16);

        this.Byte5 = parseInt(Byte5, 16);
        this.Byte6 = parseInt(Byte6, 16);
        this.Byte7 = parseInt(Byte7, 16);
        this.New = New;
        this.init(); //自动初始化
    };
    button.prototype = {
        constructor: button,
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var Lbyte4Lenght = self.Byte4;
            var text = '';
            // var Lbyte4Lenght = parseInt(self.Byte4, 16);
            // var locaObj = JSON.parse(storage.getItem(Id));
            // console.log(locaObj);
            // console.log(Lbyte4Lenght);
            if (this.New == 'new') { // 新id
                console.log('新:按钮');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("button_body_one");
                oBig.setAttribute("id", Id);
                var oId = Id + 'i';
                var oOof = Id + 'a';

                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: Lbyte4Lenght
                }, function (data) {
                    console.log(data);
                    text = data.resultObject.remark;
                    oBig.innerHTML =
                        '<input type="text" name="" class="button_remark" value=' + text +
                        '><span class="button_body_one_span">ID: <span class="button_body_one_id" id=' + oOof + '>0x' +
                        Id + '</span></span><div class="button_body_one_one" id = ' + oId + '></div>';
                    self.oBtnOne.appendChild(oBig);

                    for (var i = 0; i < Lbyte4Lenght; i++) {

                        // 创建元素
                        var oBtnBtn = document.createElement("div");
                        var oSim = document.getElementById(oId);
                        var Ssid = oId + [i];
                        var Ssssid = Ssid + [i];
                        var text1 = data.resultObject.samllremark[i];

                        oBtnBtn.classList.add("button_body_one_btn");
                        oBtnBtn.setAttribute("id", Ssid);
                        oBtnBtn.innerHTML = '<div class="button_body_one_btn_circle" id=' + Ssssid +
                            '></div><div> <input type ="text" class="button_small_remark" value=' + text1 + '></div>';
                        document.getElementById(oId).appendChild(oBtnBtn);

                    }
                });
                // console.log(typeof(this.Lbyte4) );
                // 插入元素
                // setTimeout(function() {
                // 	// oBig.style.color = '#c6c7c7';
                // 	// oBig.classList.add("active");
                // 	// oBig.style.color="green";
                // }, 3000);
            } else if (self.New == 'old') { // 旧id，刷新状态
                // console.log('旧');
                var oId = Id + 'i';
                // var oOof = Id + 'a';
                // document.getElementById(oOof).innerText = self.Byte7;
                // var oSim = document.getElementById(oId);
                // setTimeout(function() {
                if ((self.Byte7 & 0x01) == 0x01) {
                    document.getElementById(oId + 0 + 0).classList.add("active");
                } else {
                    if (document.getElementById(oId + 0 + 0)) {
                        document.getElementById(oId + 0 + 0).classList.remove("active");
                    }
                }
                if ((self.Byte7 & 0x02) == 0x02) {
                    document.getElementById(oId + 1 + 1).classList.add("active");
                } else {
                    if (document.getElementById(oId + 1 + 1)) {
                        document.getElementById(oId + 1 + 1).classList.remove("active");
                    }
                }
                if ((self.Byte7 & 0x04) == 0x04) {
                    document.getElementById(oId + 2 + 2).classList.add("active");
                } else {
                    if (document.getElementById(oId + 2 + 2)) {
                        document.getElementById(oId + 2 + 2).classList.remove("active");
                    }
                }
                if ((self.Byte7 & 0x08) == 0x08) {
                    document.getElementById(oId + 3 + 3).classList.add("active");
                } else {
                    if (document.getElementById(oId + 3 + 3)) {
                        document.getElementById(oId + 3 + 3).classList.remove("active");
                    }
                }
                if ((self.Byte7 & 0x10) == 0x10) {
                    document.getElementById(oId + 4 + 4).classList.add("active");
                } else {
                    if (document.getElementById(oId + 4 + 4)) {
                        document.getElementById(oId + 4 + 4).classList.remove("active");
                    }
                }
                if ((self.Byte7 & 0x20) == 0x20) {
                    document.getElementById(oId + 5 + 5).classList.add("active");
                } else {
                    if (document.getElementById(oId + 5 + 5)) {
                        document.getElementById(oId + 5 + 5).classList.remove("active");
                    }
                }
                if ((self.Byte7 & 0x40) == 0x40) {
                    document.getElementById(oId + 6 + 6).classList.add("active");
                } else {
                    if (document.getElementById(oId + 6 + 6)) {
                        document.getElementById(oId + 6 + 6).classList.remove("active");
                    }
                }
                if ((self.Byte7 & 0x80) == 0x80) {
                    document.getElementById(oId + 7 + 7).classList.add("active");
                } else {
                    if (document.getElementById(oId + 7 + 7)) {
                        document.getElementById(oId + 7 + 7).classList.remove("active");
                    }
                }

                if ((self.Byte6 & 0x01) == 0x01) {
                    document.getElementById(oId + 8 + 8).classList.add("active");
                } else {
                    if (document.getElementById(oId + 8 + 8)) {
                        document.getElementById(oId + 8 + 8).classList.remove("active");
                    }
                }
                if ((self.Byte6 & 0x02) == 0x02) {
                    document.getElementById(oId + 9 + 9).classList.add("active");
                } else {
                    if (document.getElementById(oId + 9 + 9)) {
                        document.getElementById(oId + 9 + 9).classList.remove("active");
                    }
                }
                if ((self.Byte6 & 0x04) == 0x04) {
                    document.getElementById(oId + 10 + 10).classList.add("active");
                } else {
                    if (document.getElementById(oId + 10 + 10)) {
                        document.getElementById(oId + 10 + 10).classList.remove("active");
                    }
                }
                if ((self.Byte6 & 0x08) == 0x08) {
                    document.getElementById(oId + 11 + 11).classList.add("active");
                } else {
                    if (document.getElementById(oId + 11 + 11)) {
                        document.getElementById(oId + 11 + 11).classList.remove("active");
                    }
                }
                if ((self.Byte6 & 0x10) == 0x10) {
                    document.getElementById(oId + 12 + 12).classList.add("active");
                } else {
                    if (document.getElementById(oId + 12 + 12)) {
                        document.getElementById(oId + 12 + 12).classList.remove("active");
                    }
                }
                if ((self.Byte6 & 0x20) == 0x20) {
                    document.getElementById(oId + 13 + 13).classList.add("active");
                } else {
                    if (document.getElementById(oId + 13 + 13)) {
                        document.getElementById(oId + 13 + 13).classList.remove("active");
                    }
                }
                if ((self.Byte6 & 0x40) == 0x40) {
                    document.getElementById(oId + 14 + 14).classList.add("active");
                } else {
                    if (document.getElementById(oId + 14 + 14)) {
                        document.getElementById(oId + 14 + 14).classList.remove("active");
                    }
                }
                if ((self.Byte6 & 0x80) == 0x80) {
                    document.getElementById(oId + 15 + 15).classList.add("active");
                } else {
                    if (document.getElementById(oId + 15 + 15)) {
                        document.getElementById(oId + 15 + 15).classList.remove("active");
                    }
                }
                if ((self.Byte5 & 0x01) == 0x01) {
                    document.getElementById(oId + 16 + 16).classList.add("active");
                } else {
                    if (document.getElementById(oId + 16 + 16)) {
                        document.getElementById(oId + 16 + 16).classList.remove("active");
                    }
                }
                if ((self.Byte5 & 0x02) == 0x02) {
                    document.getElementById(oId + 17 + 17).classList.add("active");
                } else {
                    if (document.getElementById(oId + 17 + 17)) {
                        document.getElementById(oId + 17 + 17).classList.remove("active");
                    }
                }
                if ((self.Byte5 & 0x04) == 0x04) {
                    document.getElementById(oId + 18 + 18).classList.add("active");
                } else {
                    if (document.getElementById(oId + 18 + 18)) {
                        document.getElementById(oId + 18 + 18).classList.remove("active");
                    }
                }
                if ((self.Byte5 & 0x08) == 0x08) {
                    document.getElementById(oId + 19 + 19).classList.add("active");
                } else {
                    if (document.getElementById(oId + 19 + 19)) {
                        document.getElementById(oId + 19 + 19).classList.remove("active");
                    }
                }
                if ((self.Byte5 & 0x10) == 0x10) {
                    document.getElementById(oId + 20 + 20).classList.add("active");
                } else {
                    if (document.getElementById(oId + 20 + 20)) {
                        document.getElementById(oId + 20 + 20).classList.remove("active");
                    }
                }
                // }
                // }, 500);
            }
            ;

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
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var text = '';
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
                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: 0
                }, function (data) {
                    text = data.resultObject.remark;
                    // 修饰元素
                    oBig.innerHTML =
                        '<input type="text" name="" class="rotaryknob_remark" vlaue=' + text + '> <span class = "rotaryknob_body_one_span">ID: <span class = "rotaryknob_body_one_id">0x' +
                        Id + ' </span> </span> <input type = "text"  class = "rotaryknob_remark_one" disabled="disabled" value = ' +
                        '0x' + self.Byte4 + self.Byte5 + self.Byte6 + self.Byte7 + ' id=' + oId +
                        '><input type = "text"  value = "" class = "rotaryknob_remark_two"><button type="button" class="rota_btn">Power</button>';
                    // 插入元素
                    self.oRotaOne.appendChild(oBig);


                })

            }
            if (this.New == 'old') {
                // console.log('旧');
                // console.log(self.Byte6);
                // console.log(self.Byte7);

                var oId = Id + 'i';
                // console.log(oId);
                var oInp = document.getElementById(oId);
                if (oInp) {
                    oInp.value = '0x' + self.Byte6 + self.Byte7;
                }
                // console.log('old');
                // oInp.value = '';
                // setTimeout(function () {

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
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var Lbyte4Lenght = self.Byte4;
            var text = '';
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
                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: Lbyte4Lenght
                }, function (data) {
                    text = data.resultObject.remark;
                    oBig.innerHTML =
                        '<input type="text" name="" class="sensor_remark" value=' + text + '><span class="sensor_body_one_span">ID: <span class="sensor_body_one_id" id=' +
                        oOof + '>0x' +
                        Id + '</span></span> <div class="sensor_body_one_one" id = ' + oId + '></div>';

                    self.oSensOne.appendChild(oBig);
                    for (var i = 0; i < Lbyte4Lenght; i++) {
                        // console.log('1');
                        // 创建元素
                        var oBtnBtn = document.createElement("div");
                        var oSim = document.getElementById(oId);
                        var Ssid = oId + [i];
                        var Ssssid = Ssid + [i];
                        var text1 = data.resultObject.samllremark[i];

                        oBtnBtn.classList.add("sensor_body_one_btn");
                        oBtnBtn.setAttribute("id", Ssid);
                        oBtnBtn.innerHTML = '<div class="sensor_body_one_btn_circle" id=' + Ssssid +
                            '></div><div><input type ="text" class="sensor_remake" value=' + text1 + '></div>';
                        oSim.appendChild(oBtnBtn);
                        // this.oContent[i].style.display = "none";
                    }
                })

                // setTimeout(function() {
                // }, 500);
                // 插入元素

            }
            ;
            // 旧id，刷新状态
            if (this.New == 'old') {
                console.log('旧');
                var oId = Id + 'i';
                if ((self.Byte7 & 0x01) == 0x01) {
                    document.getElementById(oId + 0 + 0).classList.add("active");
                } else {
                    if (document.getElementById(oId + 0 + 0)) {
                        document.getElementById(oId + 0 + 0).classList.remove("active");
                    }
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
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var text = '';
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

                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: 0
                }, function (data) {
                    text = data.resultObject.remark;
                    // 修饰元素
                    oBig.innerHTML =
                        '<input type="text" name="" class="lamp_remark" value=' + text + '><span class="lamp_body_one_span">ID: <span class="lamp_body_one_id">0x' +
                        Id + '</span></span><div class="lamp_body_one_one"><label for="">模式:</label><select class="lamp_xuanxiang" name="" id=' +
                        oIdBy0 + '><option value = "01">关闭模式</option><option value="02">打开模式</option><option value="03">呼吸模式</option><option value = "04">颜色过渡模式</option><option value="05">正向流水保持模式</option><option value ="06">正向流水不保持模式</option><option value = "07">反向流水保持模式</option><option value = "08">反向流水不保持模式</option><option value = "09">带数量正向流水模式</option><option value = "0A">带数量反向流水模式</option><option value = "0B">正向灭灯流水保持模式</option><option value = "0C">正向灭灯流水模式</option><option value = "0D">正向慢速流水保持模式</option><option value = "0E">正向慢速流水不保持模式</option><option value = "0F">反向慢速流水保持模式</option><option value = "10">反向慢速流水不保持模式</option><option value = "11">带数量正向慢速流水模式</option><option value = "12">带数量反向慢速流水模式</option><option value = "13">带数量正向拖尾流水模式</option><option value = "14">带数量反向拖尾流水模式</option><option value = "15">多彩正向流水模式</option><option value = "16">多彩反向流水模式</option><option value = "17">全彩像素颜色设置模式</option><option value = "18">全彩像素显示模式</option><option value = "19">全彩像素清除模式</option><option value = "1A">单色像素颜色设置模式</option><option value = "1B">单色像素显示模式</option></select><span>流动LED:</span><input type ="text" class="liudong"  id=' +
                        oIdBy1 + '><span>LED数量:</span><input type = "text" class="led" id=' + oIdBy2 +
                        '><span>速度:</span><input class="sudu" type = "text"  id=' + oIdBy3 +
                        '><span>颜色:</span><input type="color" name="" class="yanse"/><span>白色值:</span><input type="text" name="" class="type7" id=' +
                        oIdBy7 + '/><button class = "lamp_send">执行</button></div>';
                    // 插入元素
                    self.oLamOne.appendChild(oBig);


                    // 元件库创建
                    var oLibr = document.createElement("div");
                    var oLibrId = 'libr' + Id;
                    oLibr.classList.add("library_body_body_one");
                    oLibr.setAttribute("id", oLibrId);
                    oLibr.innerHTML = '<span>id:0X' + Id + '</span><span>' + text + '</span>';
                    document.getElementById("library_body_body1").appendChild(oLibr);
                });
                // var oId = self.LFrameId + 'i';
            }
            if (this.New == 'old') {
            }

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
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var oId = Id + 'i';
            var Idval = Id + 'val';
            var IdCov = Id + 'cov';

            var IdAll = Id + 'all';
            var IdCurr = Id + 'curr';
            var text = '';
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

                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: 0
                }, function (data) {
                    // console.log(data);
                    text = data.resultObject.remark;
                    // 修饰元素
                    oBig.innerHTML =
                        '<input type="text" name="" class="elec_remark" value=' + text + '><span class="elec_body_one_span">ID: <span class="elec_body_one_id">0x' +
                        Id + '</span></span><div class="elec_right"><div class="elec_sm_left"></div><input type="range" disabled="true" name="" min="0" max="100" step="1" id=' +
                        Idval + '><input type="text" value="" class="elec_cover" id=' + IdCov + '><input type="text" value="" class="elec_OverAll" id=' + IdAll +
                        '><div class="elec_sm_right"></div><button type="button" class="elec_up">前进</button><button type="button" class="elec_down">后退</button><label for=""><input type="radio" value="" data-index="1" name=' +
                        Id + '>1<input type="radio" value="" data-index="2" name=' + Id + '>2<input type="radio" value="" data-index="3" name=' + Id +
                        '>3<input type="radio" value="" data-index="4" name=' + Id + '>4</label><button type="button" class="elec_save">保存</button><button type="button" class="elec_send">调用</button></div>';
                    // 插入元素
                    self.oElecOne.appendChild(oBig);

                    stompClient.send("/app/wu", {}, "S" + Id + ",55,00,00,00,00,00,00,00K");
                    setTimeout(function () {
                        stompClient.send("/app/wu", {}, "S" + Id + ",55,00,00,00,00,00,00,00K");
                    }, 1000);
                    setTimeout(function () {
                        stompClient.send("/app/wu", {}, "S" + Id + ",55,00,00,00,00,00,00,00K");
                    }, 2000);
                    stompClient.send("/app/wu", {}, "S" + Id + ",7A,00,00,00,00,00,00,01K");
                    // console.log("发送查询");

                    // 元件库创建
                    var oLibr = document.createElement("div");
                    var oLibrId = 'libr' + Id;
                    oLibr.classList.add("library_body_body_one");
                    oLibr.setAttribute("id", oLibrId);
                    oLibr.innerHTML = '<span>id:0X' + Id + '</span> <span>' + text + '</span>'
                    document.getElementById("library_body_body2").appendChild(oLibr);

                })
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
                    if (document.getElementById(IdAll)) {
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
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var text = '';
            if (this.New == 'new') {
                // 创建元素
                console.log('新:安卓屏');
                var oBig = document.createElement("div");
                oBig.classList.add("andr_body_one");
                oBig.setAttribute("id", Id);
                var oId = Id + 'i';

                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: 0
                }, function (data) {
                    console.log(data);
                    text = data.resultObject.remark;
                    // 修饰元素
                    oBig.innerHTML =
                        '<input type="text" name="" class="andr_remark" value=' + text + '><span class="andr_body_one_span">ID: <span class="andr_body_one_id">0x' + Id +
                        '</span></span><div class="andr_body_one_one"><input type="file"><button type="button">打开</button><img src="./img/st.png" alt="" class="andr_img1"><img src="./img/pl.png" alt="" class="andr_img2"><img src="./img/cea.png" alt="" class="andr_img3"></div>';
                    // 插入元素
                    self.oAndrOne.appendChild(oBig);

                })

            }
        }
    }

    //投影仪
    function projector(FrameId, New) {
        this.oProOne = document.getElementById("proj_body");
        this.FrameId = FrameId;
        this.New = New;
        //自动初始化
        this.init();
    }

    projector.prototype = {
        constructor: projector,
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var text = '';
            // 新id
            if (this.New == 'new') {
                console.log('新:投影仪');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("proj_body_one");
                oBig.setAttribute("id", Id);
                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: 0
                }, function (data) {
                    console.log(data);
                    text = data.resultObject.remark;
                    // 修饰元素
                    oBig.innerHTML =
                        '<input type="text" name="" class="proj_remark" value=' + text + '><span class="proj_body_one_span">ID: <span class="proj_body_one_id">0x' + Id + '</span></span><div class="proj_top"><button class="proj_1">开机</button><button class="proj_2">关机</button></div><div class="proj_bott"><button class="proj_3">视频1</button><button class="proj_4">视频2</button><button class="proj_5">视频3</button><button class="proj_6">视频4</button><button class="proj_7">视频5</button><button class="proj_8">视频6</button><button class="proj_9">视频7</button><button class="proj_10">视频8</button></div>';
                    // 插入元素
                    self.oProOne.appendChild(oBig);

                    // 元件库创建
                    var oLibr = document.createElement("div");
                    var oLibrId = 'libr' + Id;
                    oLibr.classList.add("library_body_body_one");
                    oLibr.setAttribute("id", oLibrId);
                    oLibr.innerHTML = '<span>id:0X' + Id + '</span><span>' + text + '</span>';
                    document.getElementById("library_body_body3").appendChild(oLibr);


                })


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
        init: function () {
            //转存this
            var self = this;
            var Id = self.FrameId;
            var Lbyte4Lenght = self.Lbyte4;
            var text = '';
            // 新id
            if (this.New == 'new') {
                console.log('新：输出控制');
                // 创建元素
                var oBig = document.createElement("div");
                oBig.classList.add("outp_body_one");
                oBig.setAttribute("id", Id);

                $.getJSON(port + "getRemark", {
                    deviceId: Id,
                    num: Lbyte4Lenght
                }, function (data) {
                    console.log(data);
                    text = data.resultObject.remark;
                    // 修饰元素
                    oBig.innerHTML = '<input type="text" name="" class="outp_remark" value=' + text + '><span class="outp_body_one_span">ID:<span class="outp_body_one_id">0x' + Id + '</span>';
                    self.oOutpOne.appendChild(oBig);

                    var oOutpB = document.createElement("div");
                    oOutpB.classList.add("outp_b");
                    oBig.appendChild(oOutpB);

                    for (var i = 0; i < Lbyte4Lenght; i++) {
                        var oId = Id + [i];
                        // 创建元素
                        var oBtnBtn = document.createElement("div");
                        oBtnBtn.classList.add("outp_btn");
                        var text1 = data.resultObject.samllremark[i];

                        // oBtnBtn.setAttribute("id", Ssid);
                        oBtnBtn.innerHTML = '<input type="text" name="" class="outp_input"><button type="button" id=' +
                            oId + '>' + text1 + '</button>';
                        oOutpB.appendChild(oBtnBtn);
                        // this.oContent[i].style.display = "none";
                    }

                    // 元件库创建
                    var oLibr = document.createElement("div");
                    var oLibrId = 'libr' + Id;
                    oLibr.classList.add("library_body_body_one");
                    oLibr.setAttribute("id", oLibrId);
                    oLibr.innerHTML = '<span>id:0X' + Id + '</span><span>' + text + '</span>';
                    document.getElementById("library_body_body3").appendChild(oLibr);


                })

            }
        }
    };

    // 事件委托，灯光发送
    $(".lamplight").on("click", ".lamp_send", function () {
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

        type1 = (type1.length < 2) ? "0" + type1 : type1;
        type2 = (type2.length < 2) ? "0" + type2 : type2;
        type3 = (type3.length < 2) ? "0" + type3 : type3;
        type4 = (type4.length < 2) ? "0" + type4 : type4;
        type5 = (type5.length < 2) ? "0" + type5 : type5;
        type6 = (type6.length < 2) ? "0" + type6 : type6;
        type7 = (type7.length < 2) ? "0" + type7 : type7;
        stompClient.send("/app/wu", {}, "S" + id + "," + type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 + "," + type5 + "," + type6 + "," + type7 + "K");

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


    //事件委托，旋钮按下发送
    $(".rotaryknob").on("mousedown", "button", function () {
        var id = $(this).parents(".rotaryknob_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,01K");
        // stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,01K00,12345");
        // console.log("S" + id + ",03,00,00,00,00,00,00,01K");
    });
    //旋钮松开发送
    $(".rotaryknob").on("mouseup", "button", function () {
        var id = $(this).parents(".rotaryknob_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
        setTimeout(function () {
            stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
        }, 100);
        setTimeout(function () {
            stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
        }, 200);
        // console.log("S" + id + ",03,00,00,00,00,00,00,00K");
    });

    // 电机发送
    var elecSet; //前进
    $(".elec_body").on("mousedown", ".elec_up", function () {
        var id = $(this).parents(".elec_body_one").attr('id');
        $(this).css("background-color", "pink");
        elecSet = setInterval(function () {
            stompClient.send("/app/wu", {}, "S" + id + ",0B,00,00,00,00,00,10,50K");
        }, 100);
        // console.log("S" + id + ",0B,00,00,00,00,00,00,00K");
    });
    $(".elec_body").on("mouseup", ".elec_up", function () {
        clearInterval(elecSet);
        $(this).css("background-color", "#5b9bd5");
    });
    var elecSetDown; //后退
    $(".elec_body").on("mousedown", ".elec_down", function () {
        var id = $(this).parents(".elec_body_one").attr('id');
        $(this).css("background-color", "pink");
        elecSetDown = setInterval(function () {
            stompClient.send("/app/wu", {}, "S" + id + ",0C,00,00,00,00,00,10,50K");
        }, 50)
    });
    $(".elec_body").on("mouseup", ".elec_down", function () {
        clearInterval(elecSetDown);
        $(this).css("background-color", "#5b9bd5");
    });
    // var text = "00,00,00,00";
    // var nam = '101';
    // 电机保存
    $(".elec_body").on("click", ".elec_save", function () {
        var Id = $(this).parents(".elec_body_one").attr('id');
        var oIdCov = $(this).siblings('.elec_cover').val();
        var list = $('input:radio[name=' + Id + ']:checked').val();
        var index = $('input:radio[name=' + Id + ']:checked').data(index).index;
        // console.log(Id);
        // console.log(index);
        // console.log(oIdCov);

        if (list == null) {
            alert("请选中一个!");
            return false;
        } else {
            $.getJSON(port + "saveElc", {
                FrameId: Id,
                Findex: index,
                Fvalue: "0D,00,00,50," + oIdCov,
            }, function (data) {
                console.log(data);
            });
            $('input:radio[name=' + Id + ']:checked').val(oIdCov);
            console.log($('input:radio[name=' + Id + ']:checked').val());
            // alert(id);
        }
    });
    // 电机 调用
    $(".elec_body").on("click", ".elec_send", function () {
        var Id = $(this).parents(".elec_body_one").attr('id');
        var list = $('input:radio[name=' + Id + ']:checked').val();
        // var oIdCov = $(this).siblings('.elec_cover').val();
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
    $(".andr_body").on("click", "button", function () {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",04,00,00,00,00,00,00,00K");
    });

    $(".andr_body").on("click", ".andr_img1", function () {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",02,00,00,00,00,00,00,00K");
    });
    $(".andr_body").on("click", ".andr_img2", function () {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",03,00,00,00,00,00,00,00K");
    });
    $(".andr_body").on("click", ".andr_img3", function () {
        var Id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + Id + "", {}, "S" + Id + ",01,00,00,00,00,00,00,00K");
    });


    // 投影仪
    $(".proj_body").on("click", ".proj_1", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_2", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",01,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_3", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",03,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_4", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",04,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_5", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",05,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_6", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",06,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_7", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",07,00,00,00,00,00,00,00K");
    });
    $(".proj_body").on("click", ".proj_8", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",08,00,00,00,00,00,00,00K");
    })
    $(".proj_body").on("click", ".proj_9", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",09,00,00,00,00,00,00,00K");
    })
    $(".proj_body").on("click", ".proj_10", function () {
        var id = $(this).parents(".proj_body_one").attr('id');
        stompClient.send("/app/wu", {}, "S" + id + ",0A,00,00,00,00,00,00,00K");
    });


    //输出控制  发送
    var as = new Array(0, 0, 0, 0, 0, 0, 0, 0);
    $(".outp_body").on("click", "button", function () {
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
            stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,00," + as3 + (as[3].toString(16)).toUpperCase() + "," + as2 +
                (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(
                    16)).toUpperCase() + "K");
            // console.log("S" + id + ",02,00,00,00," + as3 + (as[3].toString(16)).toUpperCase() + "," + as2 + (as[2].toString(16)).toUpperCase() + "," + as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(16)).toUpperCase() + "K");
        } else {
            stompClient.send("/app/wu", {}, "S" + id + ",02,00,00,01," + as7 + (as[7].toString(16)).toUpperCase() + "," + as6 +
                (as[6].toString(16)).toUpperCase() + "," + as5 + (as[5].toString(16)).toUpperCase() + "," + as4 + (as[4].toString(
                    16)).toUpperCase() + "K");
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
    oViryAdd.onclick = function () {
        oViryText.style.display = 'block';
        oViryCov.style.display = 'block';
    }
    // 取消
    oViryEns.onclick = function () {
        oViryText.style.display = 'none';
        oViryCov.style.display = 'none';
        oViryId.value = '';
        oViryNum.value = '';
    }
    // 确定,然后添加
    oViryCan.onclick = function () {
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
            oBig.innerHTML =
                '<input type="text" name="" class="virtual_remark"><span class="virtual_body_one_span">ID: <span class="virtual_body_one_id">0x' +
                viryId + '</span></span><div class="virtual_body_one_one" id=' + oId + '><div class="virtual_delete" id=' +
                oIdDel + '>X</div></div>';
            setTimeout(function () {
                for (var i = 0; i < viryNum; i++) {
                    // 创建元素
                    // console.log('1');
                    var oBtnBtn = document.createElement("div");
                    var oSim = document.getElementById(oId);
                    var Ssid = oId + [i];
                    var Ssssid = Ssid + [i];
                    oBtnBtn.classList.add("virtual_body_one_btn");
                    // oBtnBtn.setAttribute("id", Ssid);
                    oBtnBtn.innerHTML = '<div class="virtual_body_one_btn_circle" id=' + Ssid +
                        '></div><div> <input type ="text"></div>';
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
    $(".virtual_body").on("click", ".virtual_delete", function () {
        $(this).parents(".virtual_body_one").remove();
    })
    //虚拟按钮  发送
    var virt = new Array(0, 0, 0);
    $(".virtual_body").on("click", ".virtual_body_one_btn", function () {
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
        stompClient.send("/app/wu", {}, "S" + id + ",5B,00,00,00,00," + as2 + (as[2].toString(16)).toUpperCase() + "," +
            as1 + (as[1].toString(16)).toUpperCase() + "," + as0 + (as[0].toString(16)).toUpperCase() + "K");
    });

    // 安卓屏发送
    $(".andr_body").on("click", "button", function () {
        // $(this).parents(".virtual_body_one").remove();
        var id = $(this).parents(".andr_body_one").attr('id');
        stompClient.send("/app/user/" + id + "", {}, "S" + id + ",05,00,00,00,00,00,00,00K");
        // console.log(id);
    })


    // 离线保存备注
    $(".button_body").on("blur", ".button_remark", function () { //按钮
        var Id = $(this).parents(".button_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'button'
        }, function (data) {
            console.log(data);
        });
    });


    // 小型按钮
    $(".button_body").on("blur", ".button_small_remark", function () { //按钮
        var Id = $(this).parents(".button_body_one").attr('id').substring(0, 3);
        var oValue = $(this).val();
        var index = $(this).parents('.button_body_one_btn').attr('id').substr(4);
        // var Byte7 = stringResult[8].substring(0, 2);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: index,
            value: oValue,
        }, function (data) {
            console.log(data);
        });
        // console.log(index);
    });


    $(".rotaryknob_body").on("blur", ".rotaryknob_remark", function () { //旋钮
        var Id = $(this).parents(".rotaryknob_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'rotaryknob'
        }, function (data) {
            console.log(data);
        });


    });

    $(".sensor_body").on("blur", ".sensor_remark", function () { //传感器
        var Id = $(this).parents(".sensor_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'sensor'
        }, function (data) {
            console.log(data);
        });
    });

    // 小型传感器
    $(".sensor_body").on("blur", ".sensor_remake", function () { //传感器
        var Id = $(this).parents(".sensor_body_one").attr('id').substring(0, 3);
        var oValue = $(this).val();
        var index = $(this).parents('.sensor_body_one_btn').attr('id').substr(4);
        // var Byte7 = stringResult[8].substring(0, 2);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: index,
            value: oValue,
        }, function (data) {
            console.log(data);
        });
    });


    // 流水灯
    $(".lamp_body").on("blur", ".lamp_remark", function () {
        var Id = $(this).parents(".lamp_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'lamp'
        }, function (data) {
            console.log(data);
        });


    });
    // 电机
    $(".elec_body").on("blur", ".elec_remark", function () {
        var Id = $(this).parents(".elec_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'elec'
        }, function (data) {
            console.log(data);
        });


    });
    // 安卓屏
    $(".andr_body").on("blur", ".andr_remark", function () {
        var Id = $(this).parents(".andr_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'andr'
        }, function (data) {
            console.log(data);
        });


    });
    // 投影仪
    $(".proj_body").on("blur", ".proj_remark", function () {
        var Id = $(this).parents(".proj_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'proj'
        }, function (data) {
            console.log(data);
        });


    });
    // 输出控制
    $(".outp_body").on("blur", ".outp_remark", function () {
        var Id = $(this).parents(".outp_body_one").attr('id');
        var oValue = $(this).val();
        // console.log(Id);
        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: -1,
            value: oValue,
            deviceType: 'outp'
        }, function (data) {
            console.log(data);
        });
    });

    //小输出控制
    $(".outp_body").on("blur", ".outp_input", function () {
        var Id = $(this).parents(".outp_body_one").attr('id');
        var oValue = $(this).val();
        var index = $(this).siblings('button').attr('id').substr(3);
        // console.log(Id);
        // console.log(oValue);
        // console.log(index);

        $.getJSON(port + "saveRemark", {
            deviceId: Id,
            location: index,
            value: oValue,
        }, function (data) {
            console.log(data);
        });
        $(this).siblings(button).text($(this).val());
        $(this).val('');
    });


    $("#cut").click(function () { //自动
        location.href = "./Auto.html";
    });


    // 全部复位
    $("#restorationBtn").click(function () {
        // console.log(libraryList);
        $.getJSON(port + "getRemarkInitAll", {}, function (data) {
            console.log(data);
            if (data.resultObject.lenght != 0) {
                libraryList = data.resultObject;
                for (var i = 0; i < libraryList.length; i++) {
                    stompClient.send("/app/wu", {}, "S" + libraryList[i].deviceId + "," + libraryList[i].deviceValue);
                    console.log("S" + libraryList[i].deviceId + "," + libraryList[i].deviceValue);
                }
            }
        })
    });


    $(".Restoration_cancel").click(function () {
        $(".corer").css("display", "none");
        $(".Restoration").css("display", "none");
    });
    // 打开复位
    $("#AllRestoration").click(function () {
        $(".corer").css("display", "block");
        $(".Restoration").css("display", "block");

        $.getJSON(port + "getRemarkInitAll", {}, function (data) {
            console.log(data);
            if (data.resultObject.lenght == 0) {

            } else {
                libraryList = data.resultObject;
                getDeviceHtml();  //刷新页面
            }
        })
    });

    function addOneDevice(id, type, value) {
        //查找 libraryList  里面有没有
        //如果没有
        for (var i = 0; i < libraryList.length; i++) {
            if (libraryList[i].deviceId == id) {
                return;
            }
        }
        var device = {};
        device.location = libraryList.length;
        device.deviceId = id;
        device.deviceType = type;
        device.deviceValue = value;
        libraryList.push(device);
        //刷新页面
        getDeviceHtml();
        console.log(libraryList);
    }

// <input type="text" name="" class="lamp_remark" value="${libraryList[j].remark}">
    function getDeviceHtml() {
        var htmlStr = ``;
        for (var j = 0; j < libraryList.length; j++) {
            if (libraryList[j].deviceType == '01') {
                var defaultValue = libraryList[j].deviceValue.replace("K", "").split(",");
                htmlStr += `<div class="lamp_body_one" id="Res${libraryList[j].deviceId}">
						
							<span class="lamp_body_one_span">ID:<span class="lamp_body_one_id">0X${libraryList[j].deviceId}</span></span>
								<div class="lamp_body_one_one">
								    <label for="">模式:</label>
								    <select class="lamp_xuanxiang" name="">
									<option value="01" ${defaultValue[0] == "01" ? "selected='selected'" : ""} >关闭模式</option>
									<option value="02" ${defaultValue[0] == "02" ? "selected='selected'" : ""} >打开模式</option>
									<option value="03" ${defaultValue[0] == "03" ? "selected='selected'" : ""} >呼吸模式</option>
									<option value="04" ${defaultValue[0] == "04" ? "selected='selected'" : ""} >颜色过渡模式</option>
									<option value="05" ${defaultValue[0] == "05" ? "selected='selected'" : ""}  >正向流水保持模式</option>
									<option value="06" ${defaultValue[0] == "06" ? "selected='selected'" : ""} >正向流水不保持模式</option>
									<option value="07" ${defaultValue[0] == "07" ? "selected='selected'" : ""} >反向流水保持模式</option>
									<option value="08" ${defaultValue[0] == "08" ? "selected='selected'" : ""} >反向流水不保持模式</option>
									<option value="09" ${defaultValue[0] == "09" ? "selected='selected'" : ""} >带数量正向流水模式</option>
									<option value="0A" ${defaultValue[0] == "0A" ? "selected='selected'" : ""} >带数量反向流水模式</option>
									<option value="0B" ${defaultValue[0] == "0B" ? "selected='selected'" : ""} >正向灭灯流水保持模式</option>
									<option value="0C" ${defaultValue[0] == "0C" ? "selected='selected'" : ""} >正向灭灯流水模式</option>
									<option value="0D" ${defaultValue[0] == "0D" ? "selected='selected'" : ""} >正向慢速流水保持模式</option>
									<option value="0E" ${defaultValue[0] == "0E" ? "selected='selected'" : ""} >正向慢速流水不保持模式</option>
									<option value="0F" ${defaultValue[0] == "0F" ? "selected='selected'" : ""} >反向慢速流水保持模式</option>
									<option value="10" ${defaultValue[0] == "10" ? "selected='selected'" : ""} >反向慢速流水不保持模式</option>
									<option value="11" ${defaultValue[0] == "11" ? "selected='selected'" : ""} >带数量正向慢速流水模式</option>
									<option value="12" ${defaultValue[0] == "12" ? "selected='selected'" : ""} >带数量反向慢速流水模式</option>
									<option value="13" ${defaultValue[0] == "13" ? "selected='selected'" : ""} >带数量正向拖尾流水模式</option>
									<option value="14" ${defaultValue[0] == "14" ? "selected='selected'" : ""} >带数量反向拖尾流水模式</option>
									<option value="15" ${defaultValue[0] == "15" ? "selected='selected'" : ""} >多彩正向流水模式</option>
									<option value="16" ${defaultValue[0] == "16" ? "selected='selected'" : ""} >多彩反向流水模式</option>
									<option value="17" ${defaultValue[0] == "17" ? "selected='selected'" : ""} >全彩像素颜色设置模式</option>
									<option value="18" ${defaultValue[0] == "18" ? "selected='selected'" : ""} >全彩像素显示模式</option>
									<option value="19" ${defaultValue[0] == "19" ? "selected='selected'" : ""} >全彩像素清除模式</option>
									<option value="1A" ${defaultValue[0] == "1A" ? "selected='selected'" : ""} >单色像素颜色设置模式</option>
									<option value="1B" ${defaultValue[0] == "1B" ? "selected='selected'" : ""} >单色像素显示模式</option>
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
								<button class="lamp_send" data-index="${j}">删除</button>
								<button class="lamp_save" data-index="${j}">保存</button>
								
							</div>
						</div>`;

            } else if (libraryList[j].deviceType == '06') {
                var defaultValue = libraryList[j].deviceValue.replace("K", "").split(",");
                // htmlStr +=


            }


        }
        $("#RestorationDiv").html(htmlStr);
    }


    $("#library_body_body1").on("click", ".library_body_body_one", function () { //元件库 灯光 添加进页面
        var Id = $(this).attr('id').substring(4);
        // var type = JSON.parse(storage.getItem(Id)).type;
        addOneDevice(Id, '01', '00,00,00,00,00,00,00,00');


    });
    $("#library_body_body2").on("click", ".library_body_body_one", function () { //元件库 电机 添加进页面
        var Id = $(this).attr('id').substring(4);
        addOneDevice(Id, '06', '00,00,00,00,00,00,00,00');
        // var type = JSON.parse(storage.getItem(Id)).type;
    });

    // 灯光保存
    $("#Restoration").on("click", ".lamp_save", function () {
        var id = $(this).parents(".lamp_body_one").attr('id').substr(3);
        var type0 = $(this).siblings(".lamp_xuanxiang").val().toUpperCase();
        var type1 = $(this).siblings(".liudong").val().toUpperCase();
        var type2 = $(this).siblings(".led").val().toUpperCase();
        var type3 = $(this).siblings(".sudu").val().toUpperCase();
        var type7 = $(this).siblings(".type7").val().toUpperCase();
        // var oColor = $(this).siblings(".yanse").val();

        var colvul = hex2rgb($(this).siblings(".yanse").val());
        colvul = colvul.substring(0, colvul.length - 1).slice(4);
        var str = colvul.split(',');

        var type4 = parseInt(str[0]).toString(16).toUpperCase();
        var type5 = parseInt(str[1]).toString(16).toUpperCase();
        var type6 = parseInt(str[2]).toString(16).toUpperCase();

        type1 = (type1.length < 2) ? "0" + type1 : type1;
        type2 = (type2.length < 2) ? "0" + type2 : type2;
        type3 = (type3.length < 2) ? "0" + type3 : type3;
        type4 = (type4.length < 2) ? "0" + type4 : type4;
        type5 = (type5.length < 2) ? "0" + type5 : type5;
        type6 = (type6.length < 2) ? "0" + type6 : type6;
        type7 = (type7.length < 2) ? "0" + type7 : type7;

        var index = $(this).data(index).index;
        // console.log(libraryList);
        // console.log(libraryList[index]);
        // console.log(index);
        libraryList[index].deviceValue = type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 + "," + type5 + "," + type6 + "," + type7 + "K";
        // console.log(libraryList[index]);

        // getDeviceHtml();  //刷新页面
    })


    //删除
    $("#Restoration").on("click", ".lamp_send", function () {
        // console.log('1')
        // $(this).parents('.lamp_body_one').remove();
        var Id = $(this).parents('.lamp_body_one').attr('id').replace("Res", "");
        var index = $(this).data(index);
        libraryList.splice(index, 1);
        getDeviceHtml();  //刷新页面

    });


    // 保存
    $(".Restoration_seva").click(function () {
        console.log(JSON.stringify(libraryList));
        // console.log(ListType);
        $.getJSON(port + "saveRemarkInitAll", {
            jsonList: JSON.stringify(libraryList),
        }, function (data) {
            console.log(data);
        })
        $(".corer").css("display", "none");
        $(".Restoration").css("display", "none");
    });


};