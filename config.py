# -*- coding:utf-8 -*-
import os


class Config(object):
    """
    Config for frontend
    """
    REST_API_ROOT_URL = "http://10.30.47.141:5000"
    

    REST_API_INTERFACE = {
        "administrator": "/administrator/",
        "borrow_record": "/borrow_record/",
        "return_record": "/return_record/",
        "equipment": "/equipment/",
        "equipment_count": "/equipment/count/"
    }
    
    CAS_CONFIG = {
        "CAS_SERVER": "https://10.30.60.116",
        "SECRET_KEY": os.urandom(24),
        "SESSION_TYPE": "filesystem",
        "CAS_LOGIN_ROUTE": "login",
        "CAS_LOGOUT_ROUTE": "logout",
        "CAS_VALIDATE_ROUTE": "serviceValidate",
        "CAS_AFTER_LOGIN": "route_root",
        "CAS_AFTER_LOGOUT": "route_root"
    }

    UI_CONFIG = {
        "record_number_per_page": 3,
    }

    @classmethod
    def get_url(cls, resource):
        """
        Get the url for resource
        :param resource:  resource provided by backend, also defined in above REST_API_INTERFACE
        :return: url
        """
        if resource not in Config.REST_API_INTERFACE:
            raise Exception("Resource %s was not supported")

        url = Config.REST_API_ROOT_URL + Config.REST_API_INTERFACE[resource]
        return url

    @classmethod
    def format_query_args(cls, **kwargs):
        """
        format query args
        :param kwargs:
        :return:
        """
        pass
