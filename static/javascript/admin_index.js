/**
 * Javascript for admin_index.html
 */

/**
 * To set the content of pagination div
 * @param {number} record_count: the whole record counts to be displayed
 */
function set_pagination_div(record_count){
    page_count = Math.ceil(record_count / ui_config.record_number_per_page);
    document.getElementById("text_page_count").innerHTML = page_count;
    $("#select_page").empty()
    for(var page_index = 1; page_index <= page_count; page_index++){
        $("#select_page").append("<option value=" + (page_index - 1) + ">" + page_index + "</option>")
    }
}


/**
 * The handler for equipment type select change event
 * @param {string} name: the name of equipments to be displayed
 */
function change_select_type(eq_name){
    query_equipments(display_data, null, eq_name, null)
    query_equipments_count(set_pagination_div, eq_name)
}


/**
 * The handler for page select change event
 * @param {number} page_index: the page to be displayed
 */
function change_select_index(page_index){
    query_equipments(display_data,
                     page_index * ui_config.record_number_per_page,
                     $("#select_equipment_type").val(),
                     null)
}


/**
 * The handler for previous page click event
 */
function change_select_to_previous(){
    var previous_page_index = parseInt($("#select_page").val()) - 1;
    if(previous_page_index >= 0){
        $("#select_page").val(previous_page_index);
        change_select_index(previous_page_index);
    }
}


/**
 * The handler for next page click event
 * parseInt解析一个字符串，返回一个整数
 */
function change_select_to_next(){
    var next_page_index = parseInt($("#select_page").val()) + 1;
    if(next_page_index < parseInt($("#text_page_count").text())){
        $("#select_page").val(next_page_index);
        change_select_index(next_page_index);
    }
}

 function reply_number(){
        $.ajax({
              url: rest_api.get_url_by_resource_name("BORROW_RECORD") ,
            type: "GET",
         //   data:{},
            data:{'status':1},
            dataType: "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (tt) {
                var json =eval(tt);
                var num1=0;
               // $(".menu").clean();
                document.getElementById('page1').innerHTML=json.length;
            },

                error:function (data, textStatus,
                                errorThrown) {
                 layer.alert('ajax错误',
                      {icon: 2},
                      function () {
                      return  window.location.reload();
                      });
                   // alert("ajax错误！");
                }
      })
   }

var dataObject = [];
// 设备信息数据table
function equipment_info() {
	dataObject = [];
	$.ajax({
		        type : 'get',
               url: rest_api.get_url_by_resource_name("EQUIPMENT"),
				dataType : 'json',
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
				         },
                                {
					           targets: [5],
					      render: function(data, type, row, meta) {
						    return '<span><a title="修改" href="javascript:;" onclick="modify()">修改</a></span>'+
                                '<span><a title="删除" href="javascript:;" onclick="delete1()">删除</span>';
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
					   layer.alert('ajax错误',
                      {icon: 2},
                      function () {
                      return  window.location.reload();
                      });
				}
			});
}




/**
 * To display equipments info in table named "equipment_info"
 * @param {object} data: the equipment lists to be displayed
 */
function display_data(data){
    $("#equipment_info tbody").empty()
    for(var i = 0; i < data.length; i++){
        var status = data[i].status == 1? "在库":"不在库";
        str="<tr>" +
            "<td>" + data[i].sn+ " </td>"+
            "<td> "+ data[i].name + "</td>" +
            "<td>" + status + "</td>" +
            "<td>" + data[i].location + "</td>" +
            "<td>"+ data[i].remark + "</td>"+
            "<td><span> <a href=javascript:; onclick=modify()>修改</a></span></span>"+
            "<span> <a href=javascript:; onclick=delete1()>删除</a></span></td>";
        $("#equipment_info tbody").append(str)
    }
}
/** modify**/
 function modify() {
         function $(sId) {

             return document.getElementById(sId);
         }
         var oTab = $("tabTest");
         for (var i = 0; i < oTab.rows.length; i++) {
             oTab.rows[i].onclick = function () {
                 //alert("这是第" + this.rowIndex + "行");
                 //var m=
               //  var sn=oTab.rows[this.rowIndex-1].cells[0].val();
                 var sn = oTab.rows[this.rowIndex - 1].cells[0].innerHTML;
                 //location.href="equipment_info_update.html?"+"sn="+encodeURI(sn);
                 location.href = "equipment_info_update?" + "sn=" + encodeURI(sn);
             };

         }

     }

/** delete**/

 function delete1(){
         function $(sId) {
             return document.getElementById(sId);
         }

         var oTab = $("tabTest");
         for (var i = 0; i < oTab.rows.length; i++) {
             oTab.rows[i].onclick = function () {
                // alert("这是第" + this.rowIndex + "行");
                 var sn = oTab.rows[this.rowIndex - 1].cells[0].innerHTML;
                 d(sn);//传入sn参数。
             };

         }

     }

function d(sn) {
         var sn = sn;
         //confirm_ = window.confirm("你确定要删除这条信息吗？");
         layer.confirm('你确定要删除这条消息吗？',{
              btn:['确定', '取消'],
            yes:  function () {
                $.ajax({
                    url: rest_api.get_url_by_resource_name("EQUIPMENT") + sn,
                    type: "delete",
                    // data: {"sn": sn},
                    async: true,
                    dataType: "json",
                    success: function (tt) {
                        console.log(tt);
                        if (tt == true) {
                            layer.msg('删除成功', {
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
                            layer.alert('删除失败',
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
       /*  if (confirm_) {
             $.ajax({
                 url: rest_api.get_url_by_resource_name("EQUIPMENT") + sn,
                 type: "delete",
                // data: {"sn": sn},
                  async : true,
                  dataType: "json",
                 success: function (tt) {
                     console.log(tt);
                        if(tt==true) {
                  layer.msg('删除成功', {
                                 icon: 1,
                             time: 2000 //2秒关闭（默认是3秒）
                          },
                      function(){
                      layer.closeAll();
                  return  window.location.reload();
                     }
                     );}
              else
              layer.alert('删除失败',
                      {icon: 2},
                      function () {
                      return  window.location.reload();
                      });
                  //  if (tt == true)
                    // alert("删除成功！");
                   // else alert("删除失败！");
                     // window.location.reload();
                     //alert(123);
                 },
                 error: function (data, textStatus,
                                  errorThrown) {
                     layer. alert('ajax错误！',{icon: 2});
                      window.location.reload();
                 }
             })
         }*/
     }

