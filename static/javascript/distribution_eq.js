 var dataObject = [];
// 设备信息数据table
function equipment_available() {
     var loc=location.href;
       console.log(loc);
       var n1=loc.length;//地址的总长度
       var n2=loc.indexOf("=");//取得等号的位置
   //  var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
      var eq_name1=loc.indexOf("eq_name");
       var number1=loc.indexOf("number");
       var eq_name=decodeURI(loc.substr(eq_name1+8,number1-8-eq_name1));
       console.log(eq_name);
	dataObject = [];
	$.ajax({
		        type : 'get',
               url: rest_api.get_url_by_resource_name("EQUIPMENT"),
				dataType : 'json',
                data:{'status':1,"name":eq_name},
               contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				async : true,
				beforeSend:function(){
					$("#loading").show();
				},
				success : function(datalist) {
                     dataObject = datalist;
						//此处返回的json格式类型是List<Map<String,Object>>
						console.log(dataObject);
						//目的是为了解决重复加载原数据不改变问题（需要两个DataTable，并且得在第二个添加destroy）
						$('#equipment_info').dataTable({
							"bAutoWidth": true,  //自动设置宽度
							"bScrollCollapse": false, //滚动条关闭
						    bRetrieve: true,//去掉错误提示
						});
						$('#equipment_info').DataTable({
							"destroy": true,
                            "searching": true,//去掉原生搜索
							"bLengthChange": false,   //去掉每页显示多少条数据方法
							data:dataObject,
							/*给数据添加列*/
							columns:[
							     {data:'sn'},
                                 {data:'sn'},
							     {data:'name',defaultContent:""},
                                 {data:'status'},
							    {data:'location'},
							    {data:'remark',defaultContent:"没有备注"}],
                            columnDefs : [
                                {
				            	targets : [ 0 ],
                                 data:"sn",
				     	         render : function(sn, type, row, meta) {
				            	   // " <td>"+"<input name=\"checkbox\" type=\"checkbox\" value=\"checkbox1\"</td>"+
					           //	return '<input id="input-' + sn
							  	 //  + '" type="checkbox" name="ids" value=' + sn
						 	 	//  + '><label for="input-' + 'sn' + '"></label>';
                                     return " <td>"+"<input name=\"checkbox\" type=\"checkbox\" value=\"checkbox1\"</td>";
					              }
			                	},
                                   {
                                    targets: [1],
                                   data:"sn"
                                 //  width:'10%',
				           },
                                {
                                    targets: [2],
                                   data:"name",
                                 //  width:'10%',
                                   orderable:false
				           },
                                {   targets: [3],
                             data:"status",
                             //width:'10%',
                             orderable:false,
					    render: function(data, type, row, meta) {
					          var str="";
					      if (row.status=="0")
                            {str="不在库";}
                          if(row.status=="1")
                            {str="在库";}
                             return str;}
			            	},
                                {
                                    targets: [4],
                                   data:"location",
                                   orderable:false
				         },
                                {
                                    targets: [5],
                                    data:"remark",
                                   orderable:false
				         }
                               ],

							  /*语言*/
							  language : {
									"sProcessing" : "处理中...",
									"sLengthMenu" : "显示 _MENU_ 项结果",
									"sZeroRecords" : "没有匹配结果",
									"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
									"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
									"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
									"sInfoPostFix" : "",
									"sSearch" : "查询:",
									"sUrl" : "",
									"sEmptyTable" : "表中数据为空",
									"sLoadingRecords" : "载入中...",
									"sInfoThousands" : ",",
									"oPaginate" : {
										"sFirst" : "首页",
										"sPrevious" : "上页",
										"sNext" : "下页",
										"sLast" : "末页"
									},
									"oAria" : {
										"sSortAscending" : ": 以升序排列此列",
										"sSortDescending" : ": 以降序排列此列"
									}
								},
						});

				},
				complete:function(){
					$("#loading").hide();
				},
				error : function(resource) {
					console.log("ajax请求出错了");
				}
			});
}

 function distribute() {
       var loc=location.href;
       console.log(loc);
       var n1=loc.length;//地址的总长度
       var n2=loc.indexOf("=");//取得等号的位置
   //  var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
       var sn1=loc.indexOf("username");
      var sn2=loc.indexOf("id");
      var id=decodeURI(loc.substr(sn2+3,sn1-sn2-3));
      console.log(id);
      var eq_name1=loc.indexOf("eq_name");
       var number1=loc.indexOf("number");
       var eq_name=decodeURI(loc.substr(eq_name1+8,number1-8-eq_name1));
       console.log(eq_name);
        var number1=loc.indexOf("number");
      var username1=loc.indexOf("domainID");
     var number=decodeURI(loc.substr(number1+7,username1-7-number1));
     console.log(number);

  /*    var eq_name1=loc.indexOf("eq_name");
   // console.log(sn);
      var username=decodeURI(loc.substr(sn1+9,eq_name1-9-sn1));
     // console.log(eq_name);
       var number1=loc.indexOf("number");
       var eq_name=decodeURI(loc.substr(eq_name1+8,number1-8-eq_name1));

     var username1=loc.indexOf("domainID");
     var number=decodeURI(loc.substr(number1+7,username1-7-number1));

     var domainID1=loc.indexOf("mailbox");
     var domainID=decodeURI(loc.substr(username1+9,domainID1-9-username1));

     var mailbox=decodeURI(loc.substr(domainID1+8,n1-domainID1+8));*/
      var record_id=id;
       var obj = $("#tabTest  tr");
       var len = obj.length;
       //console.log(len);
       var allReceiver;//单选，获取所有选中项的value的值
        var checkID = [];//定义一个空数组
        $("input[name='checkbox']:checked").each(function(i)
        {//把所有被选中的复选框的值存入数组
            checkID[i] =$(this).val();
          //  alert(i);
        });
	 // console.log(checkID);
    //var myDate=new Date();
  //  var time=myDate.toLocaleDateString();
   var ci=document.getElementsByName("checkbox");
          // obj = document.getElementsByName("checkbox");
           var sn = [];
           for (var i=0; i < len; i++) {
               if(ci[i].checked==true)
               {
                   var sn1=$("#tabTest tr:eq("+i+") td:eq(1)").text();
                   var eq_name = $("#tabTest tr:eq("+i+") td:eq(2)").text();//获取第一行第一列的值；
                   sn.push(sn1);
               }
           }
           if(sn.length>number){layer.alert('已选超过申请数量，请重新进行分配');return false;}
           var str=sn.join(",");
           //var  data1={"sn":sn[0],"status":0,"name":"笔记本电脑",location:"20号楼"}
           var data = {
                "equipment": str};
           console.log(data);
           $.ajax({
                url: rest_api.get_url_by_resource_name("BORROW_RECORD")+"allocation/"+record_id,
               type: "PUT",
               data: data,
               async : true,
               //contentType:'charset=UTF-8',
                  contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
               //   contentType: "charset=UTF-8",
                dataType: "json",
               success: function (tt) {
                    console.log(tt);
                   if (tt== true) {
                            layer.msg('分配设备成功！', {
                                    icon: 1,
                                    time: 2000 //2秒关闭（默认是3秒）
                                },
                                function () {
                                  //  layer.closeAll();
                                    window.location.href="equipment_allocate";
                                });
                        }
                        else
                            layer.alert('分配设备失败！',
                                {icon: 2},
                                function () {
                                 window.location.href="equipment_allocate";
                                   // return window.location.reload();
                                });
                //   console.log(tt);
                  // if (tt == true)
                    //   alert("分配设备成功！");
                  //  window.location.href="equipment_allocate";
               },
               error: function (data, textStatus,
                                errorThrown) {
                 layer.alert("ajax错误！");
                   window.location.href="equipment_allocate";
               }
           })




   }