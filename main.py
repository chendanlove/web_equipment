# -*- coding:utf-8 -*-

from flask import Flask, render_template, session,redirect,url_for,request

# from flask_session import Session
from flask_cas import CAS
from flask_cas import login_required
from config import Config
from log import log_execution_time

import ssl
import requests


ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)
app.config.update(Config.CAS_CONFIG)

# Session(app)
cas = CAS(app)
config = Config()


@login_required
@log_execution_time(request)
def route_root():
    domain_id = cas.attributes['cas:userMis']
    user = cas.attributes['cas:userName']
    email = cas.attributes['cas:email']

    url = Config.get_url(resource="administrator")
    url += domain_id
    respose = requests.get(url)
    data = respose.json()
    if data.get('domain_id',None)==domain_id:
        return render_template('admin_index.html',user=user,loginname=domain_id,email=email,config=config)
    else:
        return render_template('equipment_available_for_user.html', user=user, loginname=domain_id, email=email)


@app.route("/equipment_available")
@login_required
@log_execution_time(request)
def equipment_available():
    user = cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    email = cas.attributes['cas:email']
    return  render_template('equipment_available.html',user=user,loginname=loginname,email=email)


@app.route("/equipment_allocate")
@login_required
@log_execution_time(request)
def equipment_allocate():
    user=cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    email = cas.attributes['cas:email']
    return  render_template('equipment_allocate.html',user=user,loginname=loginname,email=email)


@app.route("/distribution_eq")
@login_required
@log_execution_time(request)
def distribution_eq():
    user=cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    email = cas.attributes['cas:email']
    return  render_template('distribution_eq.html',user=user,loginname=loginname,email=email)


@app.route("/equipment_add",methods=['GET','POST'])
@login_required
@log_execution_time(request)
def equipment_add():
    user=cas.attributes['cas:userName']
    return  render_template('equipment_add.html',user=user)
        # username=cas.use
# @app.route("/login",methods=['GET','POST'])
# def login():
#     user=cas.attributes['cas:userName']
#     return  render_template('login.html',user=user)
#         # username=cas.use


@app.route("/equipment_info_update",methods=['GET','PUT','POST'])
@login_required
@log_execution_time(request)
def equipment_info_update():
    user=cas.attributes['cas:userName']
    return  render_template('equipment_info_update.html',user=user)


@app.route("/equipment_status",methods=['GET','POST','DELETE','PUT'])
@login_required
@log_execution_time(request)
def equipment_status():
    user = cas.attributes['cas:userName']
    return render_template('equipment_status.html', user=user)

@app.route("/user_display_return",methods=['GET','POST','DELETE','PUT'])
@login_required
@log_execution_time(request)
def user_display_return():
    user = cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    return render_template('user_display_return.html', user=user,loginname=loginname)

@app.route("/equipment_return",methods=['GET','POST','DELETE','PUT'])
@login_required
@log_execution_time(request)
def equipment_return():
    user = cas.attributes['cas:userName']
    return render_template('equipment_return.html', user=user)


@app.route("/equipment_status_update")
@login_required
@log_execution_time(request)
def equipment_status_update():
    user = cas.attributes['cas:userName']
    return render_template('equipment_status_update.html', uH_eqinfoser=user)

@app.route("/H_modifyInfo")
@login_required
@log_execution_time(request)
def H_modifyInfo():
    user = cas.attributes['cas:userName']
    return render_template('H_modifyInfo1.html', user=user)


@app.route("/equipment_all")
@login_required
@log_execution_time(request)
def equipment_all():
    user = cas.attributes['cas:userName']
    return render_template('equipment_all.html', user=user)

@app.route("/user_equipment_all")
@login_required
@log_execution_time(request)
def user_equipment_all():
    user = cas.attributes['cas:userName']
    return render_template('user_equipment_all.html', user=user)

@app.route("/Uh_lendeqinfo")
@login_required
@log_execution_time(request)
def Uh_lendeqinfo():
    user = cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    email = cas.attributes['cas:email']
    return render_template('user_lend_current.html', user=user, loginname=loginname, email=email)


@app.route("/user_equipment_lend",methods=['GET','POST'])
@login_required
@log_execution_time(request)
def user_equipment_lend():
    user=cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    email = cas.attributes['cas:email']
    return render_template('user_equipments_lend.html', user=user, loginname=loginname, email=email)


@app.route("/user_lent_history")
@login_required
@log_execution_time(request)
def user_lent_history():
    user = cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    return render_template('user_lend_historty_all.html', user=user, loginname=loginname)


@app.route("/reply_eq")
@login_required
@log_execution_time(request)
def reply_eq():
    user = cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    return render_template('reply_eq.html', user=user, loginname=loginname)


@app.route("/user_lend_record")
@login_required
@log_execution_time(request)
def lendrecord():
    user = cas.attributes['cas:userName']
    loginname = cas.attributes['cas:userMis']
    return render_template('user_equipments_lend_record.html',user=user,loginname=loginname)

@app.route('/test')
def test_print():
    return "Test"

#@app.route('/logout')
#@login_required
#@log_execution_time(request)
#def logout():
#   return redirect(url_for('route_root'))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8080", debug=True)
