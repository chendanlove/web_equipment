var dataObject = [];
// display table data
function equipment_status_borrow() {
	dataObject = [];
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("BORROW_RECORD")+"already/2",
				dataType : 'json',
		    //    data:{"status":2},
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
							     {data:'equipment'},
							     {data:'eq_name',defaultContent:""},
								 {data:'username',defaultContent:""},
                                 {data:'domain_id'},
                                 {data:'number'},
							     {data:'time'}],
                            columnDefs : [
                                {
				            	targets : [ 0 ],
                                data:'equipment',
					           //  orderable : false,
				     	          render : function(data, type, row, meta) {
				            		var sns=[];
				            		for (var i=0;i<data.length;i++)
				            			sns.push(data[i].sn);
				            		return sns;
					               }
			                	},
                                {
                                    targets: [1],
                                   data:"eq_name",
                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [2],
                                   data:"username",
                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [3],
                                   data:"domain_id",
                                 //  width:'10%',
                                   orderable:false
				           },
                            {targets: [4],
                             data:"number",
                             //width:'10%',
                             orderable:false,
			            	},
                                {
                                    targets: [5],
                                   data:"time",
                                   orderable:true
				         },
                                {
					           targets: [6],
								data:"equipment",
					      render: function(data, type, row, meta) {
					           	if (data[0].status==0)
					           	//	'<span><a title="同意" href="#" style="color: #d2d6de">同意</a></span>'+
						    return '<span><a title="归还" href="javascript:;" onclick="restore_equipment()">归还</a></span>'
							  else return'<span><a title="已归还" href="#" style="color: #d2d6de">归还</a></span>'
					           }
			 	}],
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
function equipment_status_borrow_s1() {
	dataObject = [];
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("BORROW_RECORD")+"already/2",
				dataType : 'json',
		    //    data:{"status":2},
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
								 {data:'id'},
							     {data:'equipment'},
							     {data:'eq_name',defaultContent:""},
								 {data:'username',defaultContent:""},
                                 {data:'domain_id'},
                                 {data:'number'},
							     {data:'time'}],
                            columnDefs : [
                            	{
				            	targets : [ 0 ],
                                data:'id'
				     	      //   render : function(data, type, row, meta) {
				            	//	return data;
					             //  }
			                	},
                                {
				            	targets : [ 1 ],
                                data:'equipment',
					           //  orderable : false,
				     	          render : function(data, type, row, meta) {
				            		var sns=[];
				            		for (var i=0;i<data.length;i++)
				            			sns.push(data[i].sn);
				            		return sns;
					               }
			                	},
                                {
                                    targets: [2],
                                   data:"eq_name",
                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [3],
                                   data:"username",
                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [4],
                                   data:"domain_id",
                                 //  width:'10%',
                                   orderable:false
				           },
                               {targets: [5],
                                data:"number"
                             //width:'10%',
			            	},
                                {
                                    targets: [6],
                                   data:"time",
                                   orderable:true
				         },
                                {
					            targets: [7],
							   	data:"equipment",
								render: function(data, type, row, meta) {
					              var re;
					              var sn=[];
					          for(var i=0;i<data.length;i++)
						           { var sn1=data[i].sn;
							         sn.push(sn1); }
							       var sn1=sn.join(",");
							    // console.log(sn1);
					             	var  data1={'sn':sn1,"borrow_id":row.id};
					                        	console.log(data1);
                              $.ajax({
		                                 type : 'get',
                                          url: rest_api.get_url_by_resource_name("EQUIPMENT"),
			                    	     dataType : 'json',
		                                 data:data1,
                            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			                        	   async : true,
				               success : function(datalist) {
                                        dataObject = datalist;
                                         console.log(datalist);
                                         console.log(datalist.length);
                                         console.log(row.number);
						              if (datalist.length==row.number)
						                re='<span><a title="归还" href="javascript:;" onclick="return_equipment()">归还</a></span>';
						               if (datalist.length==null)
						                re='<span><a title="已归还" href="#" style="color: #d2d6de">已归还</a></span>';
						               else  re='<span><a title="归还" href="javascript:;" onclick="return_equipment()">部分归还</a></span>';
						               console.log(re);
			                    	},
			    	           error : function(resource) {
				                      	 console.log("ajax请求出错了");
				                              }
		                        	});
                              console.log(re);
                             // if(A.every(check1))//判断A数组中每个数是否都W为1在库
							 // if (index>0)console.log(A[index]);
							//   return'<span><a title="已归还" href="#" style="color: #d2d6de">已归还</a></span>';
							 //  else if (A.every(check0))
					           	//	'<span><a title="同意" href="#" style="color: #d2d6de">同意</a></span>'+
						//    return '<span><a title="归还" href="javascript:;" onclick="return_equipment()">归还</a></span>';
							 //  else return  '<span><a title="归还" href="javascript:;" onclick="return_equipment()">部分归还</a></span>';
					         return re;
					              }
                                }
                                ],
					     /* render: function(data, type, row, meta) {
					           var	A=new Array( );//创建数组
					          // console.log(data.length);
					           	for (var i=0;i<data.length;i++) {

                                    A[i] = data[i].status;
                                }
								console.log(A.length);
							  function check0(a1) {return a1==0;
                              }
                              function check1(a1) {return a1==1;
                              }
                              if(A.every(check1))//判断A数组中每个数是否都W为1在库
							 // if (index>0)console.log(A[index]);
							   return'<span><a title="已归还" href="#" style="color: #d2d6de">已归还</a></span>';
							   else if (A.every(check0))
					           	//	'<span><a title="同意" href="#" style="color: #d2d6de">同意</a></span>'+
						    return '<span><a title="归还" href="javascript:;" onclick="return_equipment()">归还</a></span>';
							   else return  '<span><a title="归还" href="javascript:;" onclick="return_equipment()">部分归还</a></span>';
					           }*/

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
						}
						);

				},
				complete:function(){
					$("#loading").hide();
				},
				error : function(resource) {
					console.log("ajax请求出错了");
				}
			});
}
function equipment_status_borrow_sn() {
	dataObject = [];
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("BORROW_RECORD")+"already",
				dataType : 'json',
		        data:{"status":4},
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
								 {data:'equipment'},
							     {data:'equipment'},
							     {data:'eq_name',defaultContent:""},
								 {data:'username',defaultContent:""},
                                 {data:'domain_id'},
                                 {data:'number'},
							     {data:'time'}],
                            columnDefs : [
                            	{
				                	targets : [ 0 ],
                                     data:'equipment',
				     	        render : function(data, type, row, meta) {
				                		//return
				            		 return row.id;
					               }
			                	},
                                {
				            	targets : [ 1 ],
                                data:'equipment',
					           //  orderable : false,
				     	          render : function(data, type, row, meta) {
				            		var sns=[];
				            		for (var i=0;i<data.length;i++)
				            			sns.push(data[i].sn);
				            		return sns;
					               }
			                	},
                                {
                                    targets: [2],
                                   data:"eq_name",
                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [3],
                                   data:"username",
                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [4],
                                   data:"domain_id",
                                 //  width:'10%',
                                   orderable:false
				           },
                               {targets: [5],
                                data:"number"
                             //width:'10%',
			            	},
                                {
                                    targets: [6],
                                   data:"time",
                                   orderable:true
				         },
                                {
					            targets: [7],
							   	data:"equipment",
					        /*  render: function(data, type, row, meta) {
					           var	A=new Array( );//创建数组
					          // console.log(data.length);
					           	for (var i=0;i<data.length;i++) {

                                    A[i] = data[i].status;
                                }
								console.log(A.length);
							  function check0(a1) {return a1==0;
                              }
                              function check1(a1) {return a1==1;
                              }
                              if(A.every(check1))//判断A数组中每个数是否都W为1在库
							 // if (index>0)console.log(A[index]);
							   return'<span><a title="已归还" href="#" style="color: #d2d6de">已归还</a></span>';
							   else if (A.every(check0))
					           	//	'<span><a title="同意" href="#" style="color: #d2d6de">同意</a></span>'+
						    return '<span><a title="归还" href="javascript:;" onclick="return_equipment()">归还</a></span>';
							   else return  '<span><a title="归还" href="javascript:;" onclick="return_equipment()">部分归还</a></span>';
					           }*/
					          render : function(data, type, row, meta) {
				            		  return '<span><a title="归还" href="javascript:;" onclick="return_equipment()">归还</a></span>';
					               }

					            }
                                ],

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
						}
						);

				},
				complete:function(){
					$("#loading").hide();
				},
				error : function(resource) {
					console.log("ajax请求出错了");
				}
			});
}
function add(sns) {
	var sns=6;
	dataObject = [];
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("EQUIPMENT"),
				dataType : 'json',
		       data:{"sns":6},
               contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				async : true,
				beforeSend:function(){
					$("#loading").show();
				},
				success : function(datalist) {
                    // dataObject = datalist;
                     var json=eval(datalist);
						//此处返回的json格式类型是List<Map<String,Object>>
						//console.log(dataObject);
					console.log(json);


					var str1="<div class='box-body'><div class='row'><th>序列号</th><th>在库状态</th><th>名称</th><th>位置</th><th></th>";
					  var tt=" ";
                var str = null;
               for (var i = 0; i < json.length; i++) {
                    str += "<tr>";
                    str += "<td>" + json[i].sn + "</td>";
                    str += "<td>" + json[i].status + "</td>";
                   str += "<td>" + json[i].name + "</td>";
                    str += "<td>" + json[i].location + "</td>";
                    str += "<td>" + json[i].remarks + "</td>";
               //    str+="<input type=button  onclick= modify()  >
                   // str +="<td> <a href=jaavaonclick=modify()>修改</a> +</td>";
                 str+=" <td><span> <a href=javascript:; onclick=modify()>归还</a></span></span>"+
                    "<span> <a href=javascript:; onclick=del1()>删除</a></span></td></div></div>";
                  $("#equipment_info #5bd2d787c7c63723c5d999a3 ").html(str1+str);
                }




				},
				error : function(resource) {
					console.log("ajax请求出错了");
				}
			});
}


function return_equipment() {
         function $(sId) {

             return document.getElementById(sId);
         }
         var oTab = $("tabTest");
         for (var i = 0; i < oTab.rows.length; i++) {
             oTab.rows[i].onclick = function () {
                 //alert("这是第" + this.rowIndex + "行");
                 //var m=
                 var id=oTab.rows[this.rowIndex-1].cells[0].innerHTML;
                 var sn = oTab.rows[this.rowIndex - 1].cells[1].innerHTML;
                var eq_name=oTab.rows[this.rowIndex-1].cells[2].innerHTML;
                var username=oTab.rows[this.rowIndex-1].cells[3].innerHTML;
                var domain_id=oTab.rows[this.rowIndex-1].cells[4].innerHTML;
                 location.href = "user_display_return?" +"id="+encodeURI(id)+ "sn=" + encodeURI(sn)+"eq_name="+encodeURI(eq_name)+"username="+encodeURI(username)+"domain_id="+encodeURI(domain_id);
             };

         }

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


    function restore(return_data) {
        var data = return_data;
       // console.log(data);
        var sn=data.equipname;
        var eq_name=data.eq_name;
        var username=data.username;
        var domain_id=data.domain_id;
        var number=data.number;
        var data1={"equipment":sn,"eq_name":eq_name,"domain_id":domain_id,"number":number,"username":username};
        console.log(data1);
        $.ajax({
            url: rest_api.get_url_by_resource_name("RETURN_RECORD"),
            type: "POST",
             data: data1,
              dataType : 'json',
               contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				async : true,
            success: function (tt) {
            	if (tt==true)
            		alert("归还成功");
            	else alert("归还失败");
            	return window.location.reload()
            },

            error: function (data, textStatus,
                             errorThrown) {
                alert("错误！")
				return window.location.reload()
            }
        })
    }