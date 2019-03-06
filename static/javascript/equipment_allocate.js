var dataObject = [];
// 设备信息数据table
function equipment_allocate() {
	dataObject = [];
	var sn;
	var equipment={"sn":sn};
	$.ajax({
		        type : 'get',
                url: rest_api.get_url_by_resource_name("BORROW_RECORD")+'waiting/2',
				dataType : 'json',
               // data:{'status':2,"equipment":equipment},
               contentType : 'application/json; charset=UTF-8',
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
                                 {data:'username',defaultContent:""},
							     {data:'eq_name',defaultContent:""},
								  {data:'number'},
                                 {data:'domain_id'},
							      {data:'time'}],
                            columnDefs : [
                                {
				            	targets : [ 0 ],
                                data:"id"
					           //  orderable : false,
				     	      //    render : function(id, type, row, meta) {
					               // 	return '<input id=' + id
							  	  //   + ' type="checkbox"+" class="checkbox" name="checkbox" value=' + id
						 	  	  //   + '>';
					               //  }
			                	},
                                {
                                    targets: [1],
                                     data:"username",

                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [2],
                                   data:"eq_name",
                                 //  width:'10%',
                                   orderable:false
				           },
								{
                                    targets: [3],
                                   data:"number",
                                 //  width:'10%',
                                   orderable:false
				           },
                                {   targets: [4],
                                    data:"domain_id",
                             //width:'10%',
                                   orderable:false
			            	},
                                {
                                    targets: [5],
                                   data:"time",
                                   orderable:true
				         },
                                {
                                    //  " <td><span> <a href=#  style="+"color:#d2d6de "+">同意</a></span></span>"+
               //    " <span> <a href=javascript:; onclick=distribute()>分配设备</a></span></span></td></tr>";
					           targets: [6],
					      render: function(data, type, row, meta) {
						    return '<span><a title="同意" href="#" style="color: #d2d6de">同意</a></span>'+
                                '<span><a title="分配设备" href="javascript:;" onclick="distribute_equipment()">分配设备</a></span>'
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



function distribute_equipment() {
        function $(sId) {

            return document.getElementById(sId);
        }

        var oTab = $("tabTest");
        for (var i = 0; i < oTab.rows.length; i++) {
            oTab.rows[i].onclick = function () {
                var type;
               // alert("这是第" + this.rowIndex + "行");
                //var m=
			//	var idcell=oTab[this.rowIndex-1].getElementsByName('checkbox');
              //  var id = idcell.cells[0].value;
				var id=oTab.rows[this.rowIndex-1].cells[0].innerHTML;
             //   console.log(id);
                var username=oTab.rows[this.rowIndex-1].cells[1].innerHTML;
                var eq_name=oTab.rows[this.rowIndex-1].cells[2].innerHTML;
                var number=oTab.rows[this.rowIndex-1].cells[3].innerHTML;
                var domainID=oTab.rows[this.rowIndex-1].cells[4].innerHTML;
                var mailbox=oTab.rows[this.rowIndex-1].cells[5].innerHTML;
                //  if (oTab.rows[this.rowIndex-1].cells[5].value == "已借") {
              //  type=1;
              //    } else type=0;
               // var time =oTab.rows[this.rowIndex-1].cells[6].innerHTML;
                location.href = "distribution_eq?" + "id="+encodeURI(id)+"username="+encodeURI(username)+"eq_name="+encodeURI(eq_name)+"number="+encodeURI(number)+"domainID="+encodeURI(domainID)+"mailbox="+encodeURI(mailbox);
                //location.href = "{{url_for('H_modifyInfo')}}?" + "sn=" + encodeURI(sn);
                //  location.href="H_modifyInfo1.html?"+"sn="+encodeURI(sn);
               // alert(sn);
            };

        }

    }


