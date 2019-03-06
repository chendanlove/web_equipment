 var dataObject = [];
// 设备信息数据table
function equipment_available_for_user() {
	dataObject = [];
	$.ajax({
		        type : 'get',
               url: rest_api.get_url_by_resource_name("EQUIPMENT"),
				dataType : 'json',
		        data:{'status':1},
               contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				async : true,
				beforeSend:function(){
					$("#loading").show();
				},
				success : function(data) {
				/*    $("#equipment_info tbody").empty()
                    for(var i = 0; i < data.length; i++){
                        var status = data[i].status == 1? "在库":"不在库";
                        str="<tr>" +
                            "<td>" + data[i].sn+ " </td>"+
                            "<td> "+ data[i].name + "</td>" +
                            "<td>" + status + "</td>" +
                            "<td>" + data[i].location + "</td>" +
                            "<td>"+ data[i].remark + "</td>"
                        $("#equipment_info tbody").append(str)
                    }
                    $("#equipment_info").DataTable({
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
                    });*/
                     dataObject = data;
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
							"bLengthChange": true,   //去掉每页显示多少条数据方法
							data:dataObject,
							/*给数据添加列*/
							columns:[
							    {data:'sn'},
							     {data:'name',defaultContent:""},
                                 {data:'status'},
							    {data:'location'},
							    {data:'remark',defaultContent:"没有备注"}],
                            columnDefs : [
                               {
				            	targets : [ 0 ],
                               data:"sn"
					           //  orderable : false,
				     	       //   render : function(sn, type, row, meta) {
					           // 	return '<input id="input-' + sn
							  //	   + '" type="checkbox" name="ids" value=' + sn
						 	  //	  + '><label for="input-' + 'sn' + '"></label>';
					            //    }
			                	},
                                {
                                   targets: [1],
                                  data:"name",
                                 //  width:'10%',
                                   orderable:false
				           },
                               {   targets: [2],
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
                                   targets: [3],
                                  data:"location",
                                   orderable:false
			         },
                                {
                                    targets: [4],
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
