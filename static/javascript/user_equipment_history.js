var dataObject = [];
// 设备信息数据table
function user_equipment_history(domain_id) {
	dataObject = [];
	var domain_id=domain_id;
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("RETURN_RECORD"),
				dataType : 'json',
		        data:{'domain_id':domain_id},
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
                                 {data:'id'},
							     {data:'time'}],
                            columnDefs : [
                                {
				            	targets : [ 0 ],
                                data:"equipment",
					             orderable : false,
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
                                   data:"id",
									render : function(data, type, row, meta) {
				            	    return "已还";
					              }
				           },
                                {
                                    targets: [4],
                                   data:"time",
                                   orderable:true
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

function user_equipment_history1(domain_id) {
	var domain_id=domain_id;
	dataObject = [];
	var status = 0;
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("RETURN_RECORD")+domain_id,
				dataType : 'json',
		       // data:'data',
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
                                  {data:'number'},
							     {data:'time'}],
                            columnDefs : [
                                {
				            	targets : [ 0 ],
                                data:"equipment"
					           //  orderable : false,
				     	       //   render : function(sn, type, row, meta) {
					           // 	return '<input id="input-' + sn
							  //	   + '" type="checkbox" name="ids" value=' + sn
						 	  //	  + '><label for="input-' + 'sn' + '"></label>';
					            //    }
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
                            {targets: [4],
                             data:"number",
                             //width:'10%',
                             orderable:false
			            	},
                                {
                                    targets: [5],
                                   data:"time",
                                   orderable:true
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
function restore_equipment() {

    function $(sId) {

            return document.getElementById(sId);
        }

        var oTab = $("tabTest");
        for (var i = 0; i < oTab.rows.length; i++) {
            oTab.rows[i].onclick = function () {
                alert("这是第" + this.rowIndex + "行");

                  var equipment = oTab.rows[this.rowIndex - 1].cells[0].innerHTML;
                  var eq_name=oTab.rows[this.rowIndex-1].cells[1].innerHTML;
                  var username=oTab.rows[this.rowIndex-1].cells[2].innerHTML;
                  var domain_id=oTab.rows[this.rowIndex-1].cells[3].innerHTML;
                  var number=oTab.rows[this.rowIndex-1].cells[5].innerHTML;
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


    function restore(id) {

        var data = id;
        console.log(data);
        $.ajax({
            url: rest_api.get_url_by_resource_name("RETURN_RECORD"),
            type: "POST",
             data: data,
              dataType : 'json',
               contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				async : true,
            success: function (tt) {
                alert(123);
            },

            error: function (data, textStatus,
                             errorThrown) {
                alert("错误！")
            }
        })
    }