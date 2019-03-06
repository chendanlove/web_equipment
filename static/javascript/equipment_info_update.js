

function equipment_info_display(){
     var loc=location.href;
     var n1=loc.length;//地址的总长度
     var n2=loc.indexOf("=");//取得等号的位置
     var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
        $.ajax({
               url: rest_api.get_url_by_resource_name("EQUIPMENT") + sn,
               type: "GET",
             //data:data,
             contentType : 'application/json; charset=UTF-8',
             dataType: "json",
            success: function (tt) {
                var json =eval(tt);
              //  console.log(tt);
                var eq_name1=json.name;
                var eq_name;
                if (eq_name1=="主机") eq_name="host";
                if(eq_name1=="笔记本电脑")eq_name="laptop";
                if(eq_name1=="显示器")eq_name="monitor";
                if(eq_name1=="显卡")eq_name="video_card";
           //  $("#eq_name").val('monitor');//这种方法也可以。
                $("#eq_name").find("option[value="+eq_name+"]").attr("selected",true);//获得select中value的值。
                  $("input[id = 'sn']").attr("value",sn);
                  //if(json.status)
                var eq_state1;
                if(json.status=="0"){eq_state1="not";}
                else {eq_state1="is";}
                 $("#eq_state").val(eq_state1);
                //  document.getElementById("eq_name").text= eq_name1;
                document.getElementById("locate").value= json.location;
               $("eq_name").val(eq_state1);
                 document.getElementById('remarks').value=json.remark;
            },
                error:function (data, textStatus,
                                errorThrown) {
                    alert("错误！")
                }
      })

        }



function equipment_info_update(){
                   var obj=document.getElementById("eq_name");
                   var index=obj.selectedIndex;
                  var eq_name=obj.options[index].text;
                // var eq_name = document.getElementById('eq_name').value;
                  var sn = document.getElementById('sn').value;
                  var locate =document.getElementById('locate').value;
                   var obj1=document.getElementById("eq_state");
                   var index1=obj1.selectedIndex;
                 var status=obj1.options[index1].text;
         if (status=="在库")var eq_state=1;
                  else var eq_state=0;
                 var remarks  = document.getElementById('remarks').value;
         var data1={
              "name":eq_name,
             "status":eq_state,
              "location":locate,
              "remark":remarks}

        $.ajax({
           url: rest_api.get_url_by_resource_name("EQUIPMENT") + sn,
            type: "put",
             contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
          //  contentType: "application/json; charset=utf-8",
             data:data1,
              cache:true,
            success: function (data) {
               var json =eval(data);
               console.log(json);
                 if (json== true) {
                            layer.msg('更新设备成功！', {
                                    icon: 1,
                                    time: 2000 //2秒关闭（默认是3秒）
                                },
                                function () {
                                  //  layer.closeAll();
                                    location.href = '/';
                                }
                            );
                        }
                        else
                            layer.alert('修改设备失败！',
                                {icon: 2},
                                function () {
                                 location.href = '/';
                                   // return window.location.reload();
                                });
             //  if(json==true) alert("更新成功！");
                //location.href = '/';
            },

                error:function (data, textStatus,
                                errorThrown) {
              layer. alert("ajax错误");
               location.href = '/';
                }
      })
        }