function add_equipments_lend(a,b){
    var username=a;
    var domain_id=b;

   // var obj=document.getElementById("eq_name");
   //   var index=obj.selectedIndex;
   //   var eq_name=obj.options[index].text;
  //  var form =new FormData (document.getElementById("tf"));<option value="host">主机</option>
                     //<option value="laptop">笔记本电脑</option>
                    // <option value="monitor">显示器</option>
                    // <option value="video_card">显卡</option>
   // var sn=document.getElementById("sn").value;

       var tab=$("#table tr");
        var len=tab.length;
      var th=len;
    for (var i=1;i<th;i++)
    {  var valselect=$("#table tr:eq("+i+")").find("select").val();
        var valinput=$("#table tr:eq("+i+")").find("input").val();
        if(valselect=="host") var select="主机";
        if(valselect=="laptop") var select="笔记本电脑";
        if(valselect=="monitor") var select="显示器";
        if(valselect=="video_card") var select="显卡";
        if (valinput==""||valinput==null)
        {layer.alert('数量必须填写！',{icon:2});return false;}
        var obj={"eq_name":select,"num":valinput,"username":username,"domain_id":domain_id};
        add1(obj);
      // console.log(obj);
      //  alert(valselect+valinput);
        //alert(valinput);
    }

    var tab=$("#table tr");
    var val0=$("#table tr:eq(2) td:eq(0)").text();//获取第一行第一列的值；
    var val2=$("#table tr:eq(2)").find("input").val();//获取第2行中input的值
   var val1=$("#table tr:eq(2)").find("select").val();
       //.text();
  //    console.log(val1);
    //console.log(index);
  //  var val1=val.options[index].text;
        // input:eq(0)").value;
     //console.log(val1);
   //console.log(tab.text());
  /*   var sn =document.getElementById("sn").value;
     var obj=document.getElementById("eq_name");
     var index=obj.selectedIndex;
     var eq_name=obj.options[index].text;
    // var eq_name =document.getElementById("eq_name").value;
    var locate=document.getElementById("locate").value;
    var remarks =document.getElementById("demo").value;
     var eq_state1 =document.getElementById("eq_state").value;
     var eq_state;
  if (eq_state1=="在库")eq_state=1;
      else eq_state=0;
      alert(eq_state);
*/
 // var data= {"eq_name":eq_name,"remarks":remarks,"locate":locate,"eq_state":eq_state};
        }
function add1(obj) {
    var myDate=new Date();
   // var time=myDate.toLocaleDateString();//获取当前系统时间
    var obj=obj;
     var eq_name=obj.eq_name;
     var number=obj.num;
      var user=obj.username;
       var loginname= obj.domain_id;

    var data= {"username":user,"domain_id":loginname,"eq_name":eq_name,"number":number};
     console.log(data);
        $.ajax({
             url: rest_api.get_url_by_resource_name("BORROW_RECORD"),
            type: "post",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            data:data,
            success: function (data) {
                   if (data== true) {
                            layer.msg('已向管理员发送请求，请耐心等待！', {
                                    icon: 1,
                                    time: 2000 //2秒关闭（默认是3秒）
                                },
                                function () {
                                  //  layer.closeAll();
                                     return window.location.reload();
                                });
                        }
                        else
                            layer.alert('抱歉，库存不足，请重新输入要借的设备数量！',
                                {icon: 2},
                                function () {
                               //  window.location.href="equipment_allocate";
                                    return window.location.reload();
                                });

             //   var data1=eval(data);
               // if(data1==true) alert("已向管理员发送请求，请耐心等待！")
             //   if(data==false)
                //alert("抱歉，库存不足，请重新输入要借的设备数量！");
               // return window.location.reload()
            },

                error:function (data, textStatus,
                                errorThrown) {
                   layer.alert('ajax错误');
                     return window.location.reload();

                   //if (data==false) alert("1234！")
                }
      })

}

function add() {
    var row=$("table tbody tr");
     var len=row.length;//获取总共的行数
   // var te=row.value;
      //console.log(te);var row=$("table tr");
    var str =
       "<tr> <td >"+len+"</td>"
               + "  <td> <select class='form-control text-right'style='width: 200px' >"
                +  "   <option  value=\"host\">主机</option>"
                 +    "<option value=\"laptop\">笔记本电脑</option>"
                  +  " <option value=\"monitor\">显示器</option>"
                   + " <option value=\"video_card\" >显卡</option>"
               +" </select></td>"
                +  "<td>"
                 +   "<input type=text class=form-control   style='width :300px ' align='center'  placeholder="+'请输入要借设备的数量'+">"
                +"  </td>"
                 +" <td><span class='badge bg-red'>台</span></td> </tr>";
         $("#table tbody").append(str);
}
function minus() {
    // var row=$("table tr:last");//获取最后一行。
     var row=$("table tr");
    var len=row.length;
  //  var m=$("#table tbody").rows[len-2].cells[0].innerHTML;
   // var val=$("#table tr:eq("+(len-1)+") td:eq("+0+"）").html;
   //  alert(row.length);
    if(len>2) $("table tr:last").remove();//获取最后一行并删除
    // alert(row.text());
   // $("#table tbody").parent().parent().remove();
     // this.parent().parent().remove();
}