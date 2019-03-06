
 function add_equipment(){
    var sn=document.getElementById("sn").value;
     if(sn==""|| sn == null)
    {
        layer.alert('sn必须填写!',{icon: 2});
        return false;
    }
    //else
      //var sn =document.getElementById("sn").value;
    // console.log(sn);
     var obj=document.getElementById("eq_name");
     var index=obj.selectedIndex;
     var name=obj.options[index].text;
    // var eq_name =document.getElementById("eq_name").value;
    var location=document.getElementById("locate").value;
    var remark =document.getElementById("demo").value;
    //console.log(sn);
  //  console.log(name);
     add_single_equipment(null, sn, name, location, remark);
  /*var data= {"eq_name":eq_name,"remarks":remarks,"locate":locate};
        $.ajax({
            url:'http://10.30.38.177:5000/device/information/'+sn,
           // url: "/static/data1.json",
            type: "post",
           // contentType: "application/json; charset=utf-8",
             data:data,
           // data:{json:escape(str)},
           // dataType: 'string',
          //  headers:{
                  //      Accept:"application/json",
                     //   "Content-Type":"application/json"
                  //  },
                 //   processData:false,
                   // cache:false,
            success: function (data) {
              //  if (data1==ok){alert("添加成功")};
              //  alert(JSON.stringify(data1));
                alert(1);
                if(data=="OK")
                   alert("设备添加成功！");
                if(data=="repeat")
                 alert("设备SN重复，请重新输入设备信息！");
                if(data=="NO")
                 alert("请输入设备完整信息！");
                console.log(data);
                 //console.log(data1);

            },

                error:function (data, textStatus,
                                errorThrown) {
                    alert("1234！")
                }
      })*/
        }