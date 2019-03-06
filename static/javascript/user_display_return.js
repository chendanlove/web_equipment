
var dataObject = [];
// 设备信息数据table
function equipment() {
      var loc=location.href;
       console.log(loc);
       var n1=loc.length;//地址的总长度
       var n2=loc.indexOf("=");//取得等号的位置
   //  var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
       var sn1=loc.indexOf("eq_name");
      var sn2=loc.indexOf("sn");
      var sn=decodeURI(loc.substr(sn2+3,sn1-sn2-3));
      console.log(sn);
    var eq_name1=loc.indexOf("username");
   // console.log(sn);
      var eq_name=decodeURI(loc.substr(sn1+8,eq_name1-8-sn1));
      console.log(eq_name);
     var username1=loc.indexOf("domain_id");
     var username=decodeURI(loc.substr(eq_name1+9,username1-9-eq_name1));
     console.log(username);
     var domain_id=decodeURI(loc.substr(username1+10,n1-username1+10));
     console.log(domain_id);
     var sn=sn.split(',');
     console.log(sn);
     console.log(sn.length);
     var datalist={};
     var arr=[];
    // console.log(datalist);
     for (var i=0;i<sn.length;i++)
     {   datalist['sn']=sn[i];
         datalist['eq_name']=eq_name;
         datalist['username']=username;
         datalist['domain_id']=domain_id;
         console.log(datalist['sn']);
          arr.push(datalist);
          datalist={};//一定要清空
          console.log(arr);}
                  dataObject = [];
                     dataObject = arr;
						//此处返回的json格式类型是List<Map<String,Object>>
	                      console.log(dataObject);
						//目的是为了解决重复加载原数据不改变问题（需要两个DataTable，并且得在第二个添加destroy）
						/*$('#equipment_info').dataTable({
							"bAutoWidth": true,  //自动设置宽度
							"bScrollCollapse": false, //滚动条关闭
						    bRetrieve: true,//去掉错误提示
						})*/
						$('#equipment_info').DataTable({
							//"destroy": true,
                            "searching": true,//去掉原生搜索
							"bLengthChange": false,   //去掉每页显示多少条数据方法
							data:dataObject,
							/*给数据添加列*/
							columns:[
							      {data:'sn'},
							      {data:'sn'},
							      {data:'eq_name',defaultContent:""},
                                  {data:'username'},
							     {data:'domain_id'}],
                            columnDefs:[
                                {
				            	 targets : [ 0 ],
                                 data:"sn",
				     	         render : function(sn, type, row, meta) {
                                     return " <td>"+"<input name=\"checkbox\" type=\"checkbox\" value=\'checkbox1'>"+"</td>"
					              }
			                	},
                                   {
                                    targets: [1],
                                   data:"sn"
                                 //  width:'10%',
				                },
                                  {
                                    targets: [2],
                                   data:"eq_name",
                                 //  width:'10%',
                                   orderable:false
				           },
                                  {   targets: [3],
                                 data:"username",
                             //width:'10%',
                               orderable:false
			            	},
                                  {
                                    targets: [4],
                                   data:"domain_id",
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


}

$("#checkAll").click(function () {
    if(this.checked)
    {
        $("input[name='checkbox']:checkbox").each(function () {//遍历所有name为checkbox的checkbox
            $(this).attr("checked",true);

        })
    }

})

 var dataObject = [];
// 设备信息数据table
function get_equipment() {
    var loc=location.href;
       console.log(loc);
       var n1=loc.length;//地址的总长度
       var n2=loc.indexOf("=");//取得等号的位置
   //  var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
     var id1=loc.indexOf("id");
     var sn2=loc.indexOf("sn");
     var id=decodeURI(loc.substr(n2+1,sn2-n2-1));
     console.log(id);
       var sn1=loc.indexOf("eq_name");

      var sn=decodeURI(loc.substr(sn2+3,sn1-sn2-3));
      console.log(sn);
      var username1=loc.indexOf("domain_id");
     //var username=decodeURI(loc.substr(eq_name1+9,username1-9-eq_name1));
    //console.log(username);
     var domain_id=decodeURI(loc.substr(username1+10,n1-username1+10));
     console.log(domain_id);
	dataObject = [];
	$.ajax({
		        type : 'get',
               url: rest_api.get_url_by_resource_name("EQUIPMENT"),
				dataType : 'json',
		        data:{'sn':sn,"status":0,"domain_id":domain_id,"borrow_id":id},
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
                                 return " <td>"+"<input name=\"checkbox\"  class='checkbox' type=\"checkbox\" value=\'checkbox1'>"+"</td>";
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
					      if (row.status==0)
                            {str="不在库";}
                          if(row.status==1)
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

function user_display_return() {
       var loc=location.href;
       console.log(loc);
       var n1=loc.length;//地址的总长度
       var n2=loc.indexOf("=");//取得等号的位置
   //  var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
       var sn1=loc.indexOf("eq_name");
      var sn2=loc.indexOf("id");
      var sn=decodeURI(loc.substr(sn2+3,sn1-sn2-3));
      console.log(sn);
    var eq_name1=loc.indexOf("username");
   // console.log(sn);
      var eq_name=decodeURI(loc.substr(sn1+8,eq_name1-8-sn1));
      console.log(eq_name);
     var username1=loc.indexOf("domain_id");
     var username=decodeURI(loc.substr(eq_name1+7,username1-7-eq_name1));
     console.log(username);
     var domain_id=decodeURI(loc.substr(username1+10,n1-username1+10));
     console.log(domain_id);

   }

var checkboxes = $('input[name=checkbox1]');
 var btn = $('#select_id');
  btn.click(function(){
        //alert("全选");
      var checkboxes=document.getElementsByName("checkbox");
      // var checkboxes=$('input[name=checkbox]');
     var isSelected=$("#select_id").prop("checked");//判断id=select_id的值是否处于选中状态选中true,juery1.6用.prop
     var select_id=document.getElementById("select_id");
     for(var i=0;i<checkboxes.length;i++)
     {checkboxes[i].checked=isSelected;}
    });
    checkboxes.click(function(){
        var flag = true;
        checkboxes.each(function(){
            if(!this.checked) flag = false;
        });
        btn.prop('checked',flag);
    });



 function return_eq() {
    var loc=location.href;
   //  var loc=loc;
       console.log(loc);
       var n1=loc.length;//地址的总长度
       var n2=loc.indexOf("=");//取得等号的位置
   //  var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
       var sn1=loc.indexOf("eq_name");
      var sn2=loc.indexOf("sn");
    //  var sn=decodeURI(loc.substr(sn2+3,sn1-sn2-3));
    //  console.log(sn);
    var eq_name1=loc.indexOf("username");
   // console.log(sn);
      var eq_name=decodeURI(loc.substr(sn1+8,eq_name1-8-sn1));
      console.log(eq_name);
     var username1=loc.indexOf("domain_id");
     var username=decodeURI(loc.substr(eq_name1+9,username1-9-eq_name1));
     console.log(username);
     var domain_id=decodeURI(loc.substr(username1+10,n1-username1+10));
     console.log(domain_id);
   //  var sn=sn.split(',');
    // console.log(sn);
       var obj = $("#tabTest  tr");
       var len = obj.length;
       console.log(len);
       var allReceiver;//单选，获取所有选中项的value的值
        var checkID = [];//定义一个空数组
   var ci=document.getElementsByName("checkbox");
          // obj = document.getElementsByName("checkbox");
           var sn = [];
           for (var i=0; i < len; i++) {
               if(ci[i].checked==true)
               {
                   var sn1=$("#tabTest tr:eq("+i+") td:eq(1)").text();
                   var eq_name = $("#tabTest tr:eq("+i+") td:eq(2)").text();//获取第一行第2列的值；
                   sn.push(sn1);
               }
           }

           var number=sn.length;
           console.log(sn);
           //if(sn.length==1)var equipment=sn.join("");
           var  equipment=sn.join(",");
           var data = {"equipment": equipment,"eq_name":eq_name,"username":username,"domain_id":domain_id,"number":number};
           console.log(data);
           $.ajax({
                url: rest_api.get_url_by_resource_name("RETURN_RECORD"),
               type: "POST",
               data: data,
               async : true,
               //contentType:'charset=UTF-8',
                  contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
               //   contentType: "charset=UTF-8",
                dataType: "json",
               success: function (tt) {
                      if (tt== true) {
                            layer.msg('归还设备成功！', {
                                    icon: 1,
                                    time: 2000 //2秒关闭（默认是3秒）
                                },
                                function () {
                                  //  layer.closeAll();
                                    window.location.href="equipment_status";
                                   // window.location.href="equipment_allocate";
                                });
                        }
                        else
                            layer.alert('归还设备失败！',
                                {icon: 2},
                                function () {
                                 window.location.href="equipment_status";
                                   // return window.location.reload();
                                });



                 //  console.log(tt);
                  // if (tt == true)
                      // alert("归还设备成功！");
                 //   else alert("归还设备失败！");
                    //window.location.href="equipment_status";
               },
               error: function (data, textStatus,
                                errorThrown) {
                   layer.alert("ajax服务错误！")
                   window.location.href="equipment_status";
               }
           })




   }

function restore_equipment() {

    function $(sId) {

            return document.getElementById(sId);
        }
        var oTab = $("tabTest");
        for (var i = 0; i < oTab.rows.length; i++) {
            oTab.rows[i].onclick = function () {
               // alert("这是第" + this.rowIndex + "行");
                  var equipment = oTab.rows[this.rowIndex - 1].cells[0].innerHTML;
                  var eq_name=oTab.rows[this.rowIndex-1].cells[1].innerHTML;
                  var username=oTab.rows[this.rowIndex-1].cells[2].innerHTML;
                  var domain_id=oTab.rows[this.rowIndex-1].cells[3].innerHTML;
                  var number=oTab.rows[this.rowIndex-1].cells[4].innerHTML;
                   var return_data = new Object;
                   return_data['equipname']=equipment;
                   return_data['eq_name']=eq_name;
                   return_data['username']=username;
                   return_data['domain_id']=domain_id;
                   return_data['number']=number;
                  console.log(return_data);
                restore(return_data);//传入sn参数。
            };

        }

}



function loadstu(){
    //  alert(1);
     var loc=location.href;
     var n1=loc.length;//地址的总长度
     var n2=loc.indexOf("=");//取得等号的位置
   //  var sn =decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var sn1=loc.indexOf("eq_name");
    console.log(sn1);
    var sn2=loc.indexOf("sn");
    console.log(sn2);
    var sn=decodeURI(loc.substr(sn2+3,sn1-sn2-3));
    var eq_name1=loc.indexOf("username");
    //var eq_name2=loc.indexOf("")
    var eq_name=decodeURI(loc.substr(sn1+8,eq_name1-8-sn1));
    var username1=loc.indexOf("domainID");
    var username=decodeURI(loc.substr(eq_name1+9,username1-9-eq_name1));
    var domainID1=loc.indexOf("mailbox");
    var domainID=decodeURI(loc.substr(username1+9,domainID1-9-username1));
    var mailbox1=loc.indexOf("type");
    var mailbox=decodeURI(loc.substr(domainID1+8,mailbox1-domainID1-8));
    var type1=loc.indexOf("time");
    var type=decodeURI(loc.substr(mailbox1+5,type1-mailbox1-5));
    var time=decodeURI(loc.substr(type1+5,n1-type1+5));

 //   alert (id);
   //var type
    if (type==1)
    document.getElementById("st").value="已借";
    else
     document.getElementById("st").value="已还";
                    $("input[id = 'sn']").attr("value",sn);
                   $("input[id = 'eq_name']").attr("value",eq_name);
                   $("input[id = 'o_time']").attr("value",time);
                   $("input[id = 'st']").attr("value",type);
                  $("input[id = 'lender']").attr("value",username);
                   $("input[id = 'mailbox']").attr("value",mailbox);
                  $("input[id = 'domainID']").attr("value",domainID);
        }