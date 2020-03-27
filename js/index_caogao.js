  // if (window.localStorage) {
  // 	alert('浏览器支持本地存储！');
  // } else {
  // 	alert('浏览器不支持本地存储！');
  // }
  var pid = null;
  // console.log(colvul);
  // var type4 = $(this).siblings(".yanse").val();
  // alert(typeof(type4));
  // alert("S" + id + "," + type0 + "," + type1 + "," + type2 + "," + type3 + "," + type4 + "," + type5 + "," + type6 + "," + type7 + "K");
  // $(this).addClass("deleted");
  // alert(typeof(oId));
  // for (let i = 0; i < numm.length; i++) {
  //     var ab = i;
  //     var ab = numm.indexOf("1");
  //     var ele = numm.splice(ab, 1, '0');
  //     // console.log(ab);
  //     // if (ab == -1) {//     // }
  // }
  // var oBtnOne = document.getElementById("button_body");

  // var string2 = 'abcdef';
  // var lang = ["php", "java", "javascript", "java", "javascript"];

  // if (jsonObj.type) {
  // 	console.log('1');
  // } else {
  // 	console.log('2');
  // }
  // console.log(storage.data);
  // var json = storage.getItem("data");
  // var jso = storage.getItem("dat");
  // var jsonObj = JSON.parse(json);
  // // console.log(typeof jsonObj);
  // // console.log(jsonObj);
  // // console.log(json);
  // if (jso) {
  // 	console.log('1')
  // } else {
  // 	console.log('2');
  // }
  // var stomp = null; 

  // console.log(pid);

  // var json = storage.getItem(FrameId);
  // // var jso = storage.getItem("dat");
  // var jsonObj = JSON.parse(json);

  // str.substr(1))

  <
  !-- < select class = "lamp_xuanxiang"
  name = ""
  id = "lamp" >
      <
      option value = "01" > 关闭模式 < /option> <
  option value = "02" > 打开模式 < /option> < /
  select > -- >







      var data = {
          FrameId: FrameId,
          type: '',
          text: '',
      };
  var dat = JSON.stringify(data);
  storage.setItem(FrameId, dat);


  if (!storage.getItem(FrameId)) {
      // console.log('1');
      // 发送出去
      stompClient.send("/app/user/202", {}, "" + FrameId +
          ",5F,00,00,00,00,00,00,00K");
      // stompClient.send("/app/user/1", {}, "" + FrameId +	"5F,00,00,00,00,00,00,00K");
      // stompClient.send("/app/user/1", {}, "Hello, STOMP");

      var data = {
          // state: '00,00,00,00,00,00k',
          FrameId: FrameId,
          Byte0: Byte0,
          Byte1: Byte1,
          Byte2: Byte2,
          Byte3: Byte3,
          Byte4: Byte4,
          Byte5: Byte5,
          Byte6: Byte6,
          Byte7: Byte7,
          type: '',
          text: '',
      };
      var dat = JSON.stringify(data);
      storage.setItem(FrameId, dat);
      // 已经存在 的 id / 旧 id
  } else {
      // 判断是否有类型
      var json = storage.getItem(FrameId);
      var jsonObj = JSON.parse(json);

      var LFrameId = jsonObj.FrameId;
      var LByte0 = jsonObj.Byte0;
      var LByte1 = jsonObj.Byte1;
      var LByte2 = jsonObj.Byte2;
      var LByte3 = jsonObj.Byte3;
      var LByte4 = jsonObj.Byte4;
      var LByte5 = jsonObj.Byte5;
      var LByte6 = jsonObj.Byte6;
      var LByte7 = jsonObj.Byte7;
      var Ltype = jsonObj.type;

      // console.log(jsonObj.type);
      // console.log('2')
      // 如果有类型
      if (Ltype) {
          // var type = jsonObj.type;
          console.log('有类型');
          // console.log(Ltype);
          var data = {
              // state: '00,00,00,00,00,00k',
              FrameId: FrameId,
              Byte0: Byte0,
              Byte1: Byte1,
              Byte2: Byte2,
              Byte3: Byte3,
              Byte4: Byte4,
              Byte5: Byte5,
              Byte6: Byte6,
              Byte7: Byte7,
              type: Ltype,
              text: '',
          };
          var dat = JSON.stringify(data);
          storage.setItem(LFrameId, dat);

          // console.log(typeof (Ltype));
          switch (Ltype) {
              case "01":
                  // 流水灯
                  // console.log("李白");
                  break;
              case "02":
                  // console.log("杜甫");
                  break;
              case "03":
                  // console.log("李贺");
                  break;
                  // 按钮
              case "04":
                  // console.log('old');
                  new button(FrameId, Byte4, Byte5, Byte6, Byte7, "old");
                  break;
              default:
                  // console.log("查无此人");
                  break;
          }

          // 如果没有类型
      } else {
          //如果唯一标识  5f
          if (Byte0 == '5F') {
              console.log('无类型');
              var oType = Byte5;
              var data = {
                  FrameId: LFrameId,
                  Byte0: LByte0,
                  Byte1: LByte1,
                  Byte2: LByte2,
                  Byte3: LByte3,
                  Byte4: LByte4,
                  Byte5: LByte5,
                  Byte6: LByte6,
                  Byte7: LByte7,
                  type: oType,
                  text: jsonObj.text,
              };
              var dat = JSON.stringify(data);
              storage.setItem(LFrameId, dat);
              console.log(oType);
              switch (oType) {
                  case "01":
                      // 流水灯

                      break;
                  case "02":

                      break;
                  case "03":

                      break;
                      // 按钮
                  case "04":
                      new button(LFrameId, LByte4, LByte5, LByte6, LByte7, "new");
                      // console.log('1');
                      break;
                  default:
                      // console.log("查无此人");
                      break;
              }
          };
      }
  }
  // console.log(typeof(FrameHeader));



  // for (var i = 0; i < Lbyte4Lenght; i++) {
  // var Ssid = oId + [i];
  // var Ssssid = oId + [i];
  // var Ssssid = Ssid + [i] + [i];

  // for (var i = 0; i < Lbyte4Lenght; i++) {
  //     // var Ssssid = oId + [i] + [i];
  //     // // console.log(Ssssid);
  //     // // var oYei = document.getElementById(Ssssid);
  //     // // oYei.classList.remove("active");
  //     // document.getElementById(Ssssid).classList.remove("active");
  // }
  // oSim.innerText = self.Byte7;
  // oX.text = self.Byte7;
  //   alert(self.Byte7);
  // var n = new Number(parseInt(self.Byte7, 16));

  // this.Byte7 = parseInt(Byte7, 16).toString(2).split('');
  // this.Byte7 = Byte7;


  this.Byte5 = parseInt(Byte5, 16).toString(2).split('');
  // this.Byte6 = parseInt(Byte6, 16).toString(2).split('');
  // var x=document.querySelectorAll(".button_body_one_btn_circle");
  // var childs = oSim.childNodes;
  // for (var i = 0; i < Lbyte4Lenght; i++) {
  //     // 创建元素
  //     var oBtnBtn = document.createElement("div");
  //     var Ssid = oId + [i];
  //     // var oSim = document.getElementById(LFrameId + "i");
  //     oBtnBtn.classList.add("button_body_one_btn");
  //     oBtnBtn.setAttribute("id", Ssid);
  //     oBtnBtn.innerHTML = '<div class="button_body_one_btn_circle"></div><div> <input type ="text"></div>';
  //     oSim.appendChild(oBtnBtn);
  //     // this.oContent[i].style.display = "none";
  // }
  // for (let i = 0; i < aId5.length; i++) {
  //     var ab = i;
  //     var ab = aId5.indexOf("1");
  //     var ele = aId5.splice(ab, 1, '0');
  //     // console.log(ab);
  //     // console.log(Ssid2);
  //     if (ab != -1) {
  //         var SmDiv = document.getElementById(oId + ab + ab);
  //         SmDiv.classList.add("active");
  //     }
  // }
  // for (let i = 0; i < aId6.length; i++) {
  //     var ab = i;
  //     var ab = aId6.indexOf("1");
  //     var ele = aId6.splice(ab, 1, '0');
  //     var ac = ab + 8;
  //     // console.log(ac);
  //     if (ac != 7) {
  //         var SmDiv = document.getElementById(oId + ac + ac);
  //         SmDiv.classList.add("active");
  //     }
  // }
  // for (let i = 0; i < aId7.length; i++) {
  //     var ab = i;
  //     var ab = aId7.indexOf("1");
  //     var ele = aId7.splice(ab, 1, '0');
  //     var ad = ab + 16;
  //     // console.log(ad);

  //     if (ad != 15) {
  //         var SmDiv = document.getElementById(oId + ad + ad);
  //         SmDiv.classList.add("active");
  //     }
  // };
  // for (let i = 0; i < aId5.length; i++) {
  //     var ab = i;
  //     var ab = aId5.indexOf("1");
  //     var ele = aId5.splice(ab, 1, '0');
  //     console.log(ab);
  //     if (ab != -1) {
  //         var SmDiv = document.getElementById(oId + ab + ab);
  //         SmDiv.classList.add("active");
  //         // console.log('1')
  //     }
  // }

  // for (let i = 0; i < aId6.length; i++) {
  //     var ab = i;
  //     var ab = aId6.indexOf("1");
  //     var ele = aId6.splice(ab, 1, '0');
  //     var ac = ab + 8;
  //     // console.log(ac);

  //     if (ac != 7) {
  //         var SmDiv = document.getElementById(oId + ac + ac);
  //         SmDiv.classList.add("active");
  //     }
  // }
  // for (let i = 0; i < aId7.length; i++) {
  //     var ab = i;
  //     var ab = aId7.indexOf("1");
  //     var ele = aId7.splice(ab, 1, '0');
  //     var ad = ab + 16;
  //     // console.log(ad);

  //     if (ad != 15) {
  //         var SmDiv = document.getElementById(oId + ad + ad);
  //         SmDiv.classList.add("active");
  //     }
  // };


  // for (let i = 0; i < 8; i++) {
  //     var ab = i;
  //     var ab = aId5.indexOf("1");
  // 	var ele = aId5.splice(ab, 1, '0');

  // 	console.log(oId + ab + ab);

  // 	// SmDiv.classList.remove("active");
  //     // console.log(ab);
  //     // console.log(Ssid2);
  //     if (ab != -1) {
  //     	var SmDiv = document.getElementById(oId + ab + ab);
  //         SmDiv.classList.add("active");
  // 	}

  // }

  // for (let i = 0; i < aId6.length; i++) {
  //     var ab = i;
  //     var ab = aId6.indexOf("1");
  //     var ele = aId6.splice(ab, 1, '0');
  //     var ac = ab + 8;
  //     console.log(ac);
  //     if (ac != 7) {
  //         var SmDiv = document.getElementById(oId + ac + ac);
  //         SmDiv.classList.add("active");
  //     }
  // }
  // for (let i = 0; i < aId7.length; i++) {
  //     //     var ab = i;
  //     //     var ab = aId7.indexOf("1");
  //     //     var ele = aId7.splice(ab, 1, '0');
  //     //     var ad = ab + 16;
  //     //     console.log(ad);

  //     //     if (ad != 16) {
  //     //         var SmDiv = document.getElementById(oId + ad + ad);
  //     //         SmDiv.classList.add("active");
  //     //     }
  //     // };











  // for (let i = 0; i < stringR.length; i++) {
  //     var ab = i;
  //     var ab = stringR.indexOf("1");
  //     var ele = stringR.splice(ab, 1, '0');
  //     // console.log(ab);
  //     // if (ab == -1) {//     // }
  // }
  else {
      // 创建元素
      var oBig = document.createElement("div");
      oBig.classList.add("button_body_one");
      oBig.setAttribute("id", self.LFrameId);
      var oId = self.LFrameId + 'i';
      // 是一个2进制
      var aId5 = self.Byte5;
      var aId6 = self.Byte6;
      var aId7 = self.Byte7;

      // 修饰元素
      oBig.innerHTML =
          '<input type="text" name="" class="button_remark"> <span class="button_body_one_span">ID: <span class="button_body_one_id">' +
          self.LFrameId + '</span></span> <div class="button_body_one_one" id = ' + oId +
          '>  </div> ';
      setTimeout(function() {
          for (var i = 0; i < Lbyte4Lenght; i++) {
              // 创建元素
              var oBtnBtn = document.createElement("div");
              oBtnBtn.classList.add("button_body_one_btn");
              var oSim = document.getElementById(oId);
              var Ssid = oId + [i];
              var Ssssid = oId + 0 + [i];

              oBtnBtn.setAttribute("id", Ssid);
              oBtnBtn.innerHTML =
                  '<div class="button_body_one_btn_circle" id=' + Ssssid + '></div><div> <input type ="text"></div>';
              oSim.appendChild(oBtnBtn);
              // this.oContent[i].style.display = "none";
          }

          // var

          for (let i = 0; i < aId5.length; i++) {
              var ab = i;
              var ab = aId5.indexOf("1");
              var ele = aId5.splice(ab, 1, '0');
              // console.log(ab);
              var Ssssid = document.getElementById(oId + 0 + ab);
              if (ab !== -1) {
                  Ssssid.classList.add("active");
              }
          }

          for (let i = 0; i < aId6.length; i++) {
              var ab = i;
              var ab = aId6.indexOf("1");
              var ele = aId6.splice(ab, 1, '0');

              var ac = ab + 8;
              console.log(ac);
              var Ssssid = document.getElementById(oId + 0 + ac);
              if (ab !== -1) {
                  Ssssid.classList.add("active");
              }
          }



      }, 500);
      // 插入元素
      self.oBtnOne.appendChild(oBig);
  }

  // console.log(string2Result) //输出['a','b','c','d','e','f']
  // if (!storage.getItem('1')) {
  // 	console.log('1');
  // }


  // $(".lamplight").click(function () {
  //     console.log('1');
  // });




  // 按钮
  // oBig为一整行 id 为 LFrameId
  // oSim 亮灯的整体 id为oId
  // 每个小按钮的 id 为Ssid oBtnBtn



  // console.log('旧');
  // var oIdBy0 = Id + 'by0';
  // var oIdBy1 = Id + 'by1';
  // var oIdBy2 = Id + 'by2';
  // var oIdBy3 = Id + 'by3';
  // var oIdBy4 = Id + 'by4';
  // var oIdBy5 = Id + 'by5';
  // var oIdBy6 = Id + 'by6';
  // var oIdBy7 = Id + 'by7';
  // // var oSim = document.getElementById(Id);
  // // document.getElementById(oIdBy0).value = '';
  // // console.log(oIdBy1);
  // document.getElementById(oIdBy1).value = self.byte1;
  // document.getElementById(oIdBy2).value = self.byte2;
  // document.getElementById(oIdBy3).value = self.byte3;

  // document.getElementById(oIdBy7).value = self.byte7;
  // // document.getElementById(oIdBy4).value = self.byte4 + self.byte5 + self.byte6 + self.byte7;
  // // document.getElementById(oIdBy5).value = self.byte5;