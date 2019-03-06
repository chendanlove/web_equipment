 var dataObject = [];
// 设备信息数据table
 /* str="<tr>" +
                "<td>"+result[i].id+"</td>"+
                "<td>"+result[i].username+"</td>"+
                "<td>"+result[i].eq_name+"</td>" +
                //"<td>"+eq_state1+"</td>" +
                "<td>"+result[i].number+"</td>" +
                "<td>"+result[i].domainID +"</td>"+
                "<td>"+result[i].mailbox +"</td>"+
                " <td><span> <a href=javascript:; onclick=agree()>同意</a></span></span>"+
              "<span> <a href=javascript:; onclick=refuse()>拒绝</a></span></td>";*/
 //加id.
function reply_equipment() {
	dataObject = [];
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("BORROW_RECORD"),
				dataType : 'json',
               contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				async : true,
                data:{"status":1},
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
							     {data:'time'},
                                 {data:'username'},
							     {data:'eq_name',defaultContent:""},
                                 {data:'number'},
							    {data:'domain_id'}
							     ],
                            columnDefs : [
                                {
				            	targets : [ 0 ],
                                data:"id",
					            orderable : true
				     	       //   render : function(sn, type, row, meta) {
					           // 	return '<input id="input-' + sn
							  //	   + '" type="checkbox" name="ids" value=' + sn
						 	  //	  + '><label for="input-' + 'sn' + '"></label>';
					            //    }
			                	},

                                {
				            	targets : [ 1 ],
                                data:"time",
					            orderable : true
				     	       //   render : function(sn, type, row, meta) {
					           // 	return '<input id="input-' + sn
							  //	   + '" type="checkbox" name="ids" value=' + sn
						 	  //	  + '><label for="input-' + 'sn' + '"></label>';
					            //    }
			                	},
                                {
                                    targets: [2],
                                   data:"username",
                                 //  width:'10%',
                                   orderable:false
				           },
                                {   targets: [3],
                               data:"eq_name",
                             //width:'10%',
                             orderable:false
					       	},
                                {
                                    targets: [4],
                                   data:"number",
                                   orderable:false
				         },
                                {
                                    targets: [5],
                                    data:"domin_id",
                                   orderable:false
				         },
                                {
					           targets: [6],
                            //    {   targets: [2],
                                    //                              data:"status",
                                    //                              //width:'10%',
                                    //                              orderable:false,
                                    // 					    render: function(data, type, row, meta) {
                                    // 					          var str="";
                                    // 					      if (row.status=="0")
                                    //                             {str="不在库";}
                                    //                           if(row.status=="1")
                                    //                             {str="在库";}
                                    //                              return str;}
                                    // 			            	}," <td><span> <a href=javascript:; onclick=agree()>同意</a></span></span>"+
                        //   "<span> <a href=javascript:; onclick=refuse()>拒绝</a></span></td>"
					      render: function(data, type, row, meta) {
                               // if(row.status=="")
                               //   return '<span><a title="同意" style="color:#d2d6de" href="javascript:;" onclick="agree()" >同意</a></span><span><a title="拒绝" href="javascript:;" onclick="refuse()">拒绝</a></span>'
                                //  else
						           return '<span><a title="同意"  href="javascript:;" onclick="agree()" >同意</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a title="拒绝" href="javascript:;" onclick="refuse()">拒绝</a></span>'
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

function agree()
        {
      function $(sId) {
          return document.getElementById(sId);
      }
      var oTab = $("tabTest");
      for (var i = 0; i < oTab.rows.length; i++) {
          oTab.rows[i].onclick = function () {
              var id=oTab.rows[this.rowIndex-1].cells[0].innerHTML;
              //location.href="equipment_info_update.html?"+"sn="+encodeURI(sn);
            //  location.href="{{url_for('equipment_info_update')}}?"+"sn="+encodeURI(sn);
              borrow_lend(id);
          };

      }

  }

function borrow_lend(id){
      var record_id = id;
    //  alert(sn1);
    //  confirm_=confirm(sn1+"是否同意某某的接设备请求？");
    //  if(confirm_){
         var data={"status":2};
         $.ajax({
                url: rest_api.get_url_by_resource_name("BORROW_RECORD")+record_id,
                type: "put",
                 data:data,
              async : true,
                contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                 dataType: "json",
             success: function (tt,textStatus) {
                 // console.log(tt);
                  if (tt== true) {
                            layer.msg('已同意借出！', {
                                    icon: 1,
                                    time: 2000 //2秒关闭（默认是3秒）
                                },
                                function () {
                                  //  layer.closeAll();
                                   return window.location.reload();
                                });
                        }
                        else
                            layer.alert('操作失败！',
                                {icon: 2},
                                function () {
                                 return window.location.reload();
                                   // return window.location.reload();
                                });
                 // if(tt==true)
                //alert("同意借出！");
                //  return window.location.reload();
                    },
                error:function (data, textStatus,
                                errorThrown) {
                      layer.alert("服务器错误！");
                      return window.location.reload();
                }
               })
       // }

  }

function refuse()
        {
      function $(sId) {
          return document.getElementById(sId);
      }

      var oTab = $("tabTest");
      for (var i = 0; i < oTab.rows.length; i++) {
          oTab.rows[i].onclick = function () {
             // alert("这是第" + this.rowIndex + "行");

              var id=oTab.rows[this.rowIndex-1].cells[0].innerHTML;

              ref(id);//传入sn参数。
          };

      }

  }

function ref(id){
      var id= id;
      //alert();
       var data={"status":3};
       layer.confirm('你确定要拒绝借设备请求吗？',{
              btn:['确定', '取消'],
            yes:  function () {
                $.ajax({
                    url: rest_api.get_url_by_resource_name("BORROW_RECORD")+id,
                    type: "PUT",
                 contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                   data:data,
                    async: true,
                    dataType: "json",
                    success: function (tt) {
                        console.log(tt);
                        if (tt == true) {
                            layer.msg('确定拒绝借设备请求！', {
                                    icon: 1,
                                    time: 2000 //2秒关闭（默认是3秒）
                                },
                                function () {
                                  //  layer.closeAll();
                                    return window.location.reload();
                                }
                            );
                        }
                        else
                            layer.alert('操作错误',
                                {icon: 2},
                                function () {
                                    return window.location.reload();
                                });
                    },
                    error: function (data, textStatus,
                                     errorThrown) {
                        layer.alert('ajax错误！', {icon: 2});
                        window.location.reload();
                    }
                })
            }, function () {return false;}
    } )

      //confirm_=confirm("你确定要拒绝借设备请求吗？");
     /* if(confirm_){
         $.ajax({
                 url: rest_api.get_url_by_resource_name("BORROW_RECORD")+id,
                 type: "PUT",
                 contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                 data:data,
               //  dataType: "json",
             success: function (tt) {
                  console.log(tt);
                  if(tt==true)
                alert("拒绝借设备请求！")
                 return window.location.reload();
                    },
                error:function (data, textStatus,
                                errorThrown) {
                  return null;
                }
               })
        }*/
  }