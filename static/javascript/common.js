/**
 * Encapsulation for Rest API config
 */
function RestApi(){
     this.REST_API_ROOT_URL="http://10.30.47.141:5000";
    

    this.REST_API_INTERFACE = {
        "ADMINISTRATOR": "/administrator/",
        "BORROW_RECORD": "/borrow_record/",
        "RETURN_RECORD": "/return_record/",
        "EQUIPMENT": "/equipment/",
        "EQUIPMENT_COUNT": "/equipment/count/"
    };
    this.get_url_by_resource_name = get_url_by_resource_name
    function get_url_by_resource_name(resource_name){
        return this.REST_API_ROOT_URL + this.REST_API_INTERFACE[resource_name]
    }
}
rest_api = new RestApi()


/**
 * Encapsulation for UI config
 */
function UiConfig(){
    this.record_number_per_page = 3;
}
ui_config = new UiConfig()

/*need how many lend*/
function waiting_assign(){

        $.ajax({
             url: rest_api.get_url_by_resource_name("BORROW_RECORD")+'waiting/2',
            //  url: rest_api.get_url_by_resource_name("BORROW_RECORD") ,
         //   url:" http://10.30.38.177:5000/manager/select/all/waiting/assign/",
            type: "GET",
         //   data:{},
          //  data:{"status":2},
            dataType: "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (tt) {
               // var json =eval(tt);
                var num1=0;
               // $(".menu").clean();
                document.getElementById('number').innerHTML=tt.length;
            },

                error:function (data, textStatus,
                                errorThrown) {
                    alert("错误！");
                }
      })
   }

/**
 * To query equipments count
 * @param {function} call_back: the call back function to handle the returned data
 */
 function query_equipments_count(call_back, name){
    var query_condition = {"name" : name}
    $.ajax({
        url: rest_api.get_url_by_resource_name("EQUIPMENT_COUNT"),
        type: "GET",
        data: query_condition,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus) {
            if(call_back !== null){
                call_back(data);
            }
        },
        error: function (request, testStatus, errorThrown){
            return null;
        }
    })
 }


/**
 * To query all equipments
 * @param {function} call_back: the call back function to handle the returned data
 * @param {number} offset: from where, to query the equipments
 * @param {string} name: the name of equipment to query
 * @param {string} location: the location of equipment to query
 */
function query_equipments(call_back, offset, name, location) {
    var query_condition = new Object;
    if(offset && offset != null && offset != 0) {
        query_condition['offset'] = offset;
    }
    if(name && name != null) {
        var name1;
        if (name=="host") name1="主机";
        if(name=="laptop") name1="笔记本电脑";
        if(name=="monitor") name1="显示器";
        if(name=="video_card") name1="显卡";
        query_condition['name'] = name1;
    }
    if(location && location != null) {
        query_condition['location'] = location;
    }
    query_condition['number'] = ui_config.record_number_per_page;
    $.ajax({
        url: rest_api.get_url_by_resource_name("EQUIPMENT"),
        type: "GET",
        data: query_condition,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus) {
            if(call_back !== null){
                call_back(data);
            }
        },
        error: function (request, testStatus, errorThrown){
            return null;
        }
    })
}


/**
 * To query single equipment
 * @param {function} call_back: the call back function to handle the returned data
 * @param {string} sn: the sn of equipment to query
 */
function query_single_equipment(call_back, sn) {
    var query_condition = {'sn': sn}
    $.ajax({
        url: rest_api.get_url_by_resource_name("EQUIPMENT"),
        type: "GET",
        data: query_condition,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus) {
            if(call_back !== null){
                call_back(data);
            }
        },
        error: function (request, testStatus, errorThrown){
        }
    })
}


/**
 * To modify single equipment
 * @param {function} call_back: the call back function to handle the returned data
 * @param {string} sn: the sn of equipment to modify
 * @param {string} name: the name of equipment to modify
 * @param {string} location: the sn of equipment to modify
 * @param {string} remark: the remark of equipment to modify
 * @param {string} status: the status of equipment to modify. 0: lent out, 1: in house
 * @param {string} domain_id: the domain_id of lender to modify
 */
function modify_single_equipment(call_back, sn, name, location, remark, status, domain_id) {
    if(!sn || sn == null){
        return;
    }
    var body = new Object;
    if(name && name != null) {
        body['name'] = name;
    }
    if(location && location != null) {
        body['location'] = location;
    }
    if(remark && remark != null) {
        body['remark'] = remark;
    }
    if(status && status != null) {
        body['status'] = status;
    }
    if(domain_id && domain_id != null) {
        body['domain_id'] = domain_id;
    }
    $.ajax({
        url: rest_api.get_url_by_resource_name("EQUIPMENT") + sn,
        type: "PUT",
        data: body,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (data, textStatus) {
            if(call_back !== null){
                call_back(data);
            }
        },
        error: function (request, testStatus, errorThrown){
        }
    })
}


/**
 * To add a new equipment
 * @param {function} call_back: the call back function to handle the returned data
 * @param {string} sn: the sn of equipment to modify
 * @param {string} name: the name of equipment to modify
 * @param {string} location: the sn of equipment to modify
 * @param {string} remark: the remark of equipment to modify
 */
function add_single_equipment(call_back, sn, name, location, remark) {
    var body = new Object;
    //if (sn!=null)
    if(sn && sn != null)
    { body['sn'] = sn;}
     body['name'] = name;
     body['location'] = location;
     body['remark'] = remark;
    $.ajax({
        url: rest_api.get_url_by_resource_name("EQUIPMENT"),
        type: "POST",
        data: body,
         cache:true,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (data, textStatus) {
            var data1=eval(data);
             //console.log(data1);
             if(data1==true) {
                  layer.msg('添加成功', {
                  icon: 1,
                 time: 2000 //2秒关闭（默认是3秒）
                  }, function(){
                     layer.closeAll();
                return  window.location.reload();
              });}
              else
              layer.alert('重复的sn,添加失败',
                      {icon: 2},
                      function () {
                      return  window.location.reload();

                      });
               /*  layer.open({
                 type: 1,
               // offset: 't', //具体配置参考：offset参数项
               content: '<div style="padding: 20px 80px;">添加成功</div>',
                btn: '关闭',
              btnAlign: 'c', //按钮居中
             shade: 0, //不显示遮罩
          yes: function(){
              layer.closeAll();
             return window.location.reload();
             }
       });*/

            if(call_back !== null){
                  call_back(data);
                }


        },
        error: function (request, testStatus, errorThrown){
            layer.alert('ajax错误',{icon: 2});
            return false;
        }
    })
}


/**
 * To delete single equipment
 * @param {function} call_back: the call back function to handle the returned data
 * @param {string} sn: the sn of equipment to delete
 */
function delete_single_equipment(call_back, sn) {
    $.ajax({
        url: rest_api.get_url_by_resource_name("EQUIPMENT") + sn,
        type: "DELETE",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus) {
            if(call_back !== null){
                call_back(data);
            }
        },
        error: function (request, testStatus, errorThrown){
        }
    })
}
