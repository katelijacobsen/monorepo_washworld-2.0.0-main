from flask import request
import re

##########################################################################################################################################################################

# 0 to 9 letters a to f
REGEX_UUID4 = "^[0-9a-f]{32}$"
def validate_uuid4(uuid4):
    uuid = uuid4.strip()
    if not re.match(REGEX_UUID4, uuid):
        raise Exception("company_exception uuid4 invalid")
    return uuid

##########################################################################################################################################################################

USER_FULLNAME_MIN = 2
USER_FULLNAME_MAX = 255
REGEX_USER_FULLNAME = f"^.{{{USER_FULLNAME_MIN},{USER_FULLNAME_MAX}}}$"

def validate_user_fullname():
    user_fullname = request.form.get("user_fullname", "").strip()
    if not re.match(REGEX_USER_FULLNAME,user_fullname):
        raise Exception("company_exception in user_fullname")
    return user_fullname

##########################################################################################################################################################################

USER_ADDRESS_MIN = 2
USER_ADDRESS_MAX = 255
REGEX_USER_ADDRESS = f"^.{{{USER_ADDRESS_MIN},{USER_ADDRESS_MAX}}}$"

def validate_user_address():
    user_address = request.form.get("user_address", "").strip()
    if not re.match(REGEX_USER_ADDRESS,user_address):
        raise Exception("company_exception in user_address")
    return user_address

################################################################################################################################################################################

USER_PHONENUMBER_MIN = 4
USER_PHONENUMBER_MAX = 16
REGEX_USER_PHONENUMBER = f"^.{{{USER_PHONENUMBER_MIN},{USER_PHONENUMBER_MAX}}}$" 

def validate_user_phonenumber():
    user_phonenumber = request.form.get("user_phonenumber", "").strip()
    if not re.match(REGEX_USER_PHONENUMBER,user_phonenumber):
        raise Exception("company_exception in user_phonenumber")
    return user_phonenumber

################################################################################################################################################################################

REGEX_EMAIL = "^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"
def validate_user_email():
    user_email = request.form.get("user_email", "").strip()
    if not re.match(REGEX_EMAIL, user_email):
        raise Exception("company_exception in user_email")
    return user_email

#################################################################################################################################################################################

USER_PASSWORD_MIN = 8
USER_PASSWORD_MAX = 50
REGEX_USER_PASSWORD = f"^.{{{USER_PASSWORD_MIN},{USER_PASSWORD_MAX}}}$"

def validate_user_password():
    user_password = request.form.get("user_password", "").strip()
    if not re.match(REGEX_USER_PASSWORD, user_password):
        raise Exception("company_exception in user_password")
    return user_password

##################################################################################################################################################################################

CAR_LICENSPLATE_MIN = 2
CAR_LICENSPLATE_MAX = 10
REGEX_CAR_LICENSEPLATE = f"^.{{{CAR_LICENSPLATE_MIN},{CAR_LICENSPLATE_MAX}}}$"

def validate_car_licenseplate():
    car_licenseplate = request.form.get("car_licenseplate", "").strip()
    if not re.match(REGEX_CAR_LICENSEPLATE, car_licenseplate):
        return Exception("company_exception in car_licenseplate")
    return car_licenseplate

##################################################################################################################################################################################

LOCATION_TITLE_MIN = 2
LOCATION_TITLE_MAX = 255
REGEX_LOCATION_TITLE = f"^.{{{LOCATION_TITLE_MIN},{LOCATION_TITLE_MAX}}}$"

def validate_location_title():
    location_max= request.form.get("location_max","").strip()
    location_in_use= request.form.get("location_in_use","").strip()

    if not re.match(REGEX_LOCATION_TITLE, location_max):
        raise Exception("company_exception in location_max")
    
    # for at være sikker på at max ikke er mindre end in_use
    if location_in_use > location_max:
        raise Exception("company_exception in location_max")

    return location_max

###########################################################################################

LOCATION_MIN = 1
LOCATION_MAX = 2
REGEX_LOCATION_AMOUNT = f"^\d+$"

def validate_location_max():
    location_max= request.form.get("location_max","").strip()
    location_in_use= request.form.get("location_in_use","").strip()

    if not re.match(REGEX_LOCATION_AMOUNT, location_max):
        raise Exception("company_exception in location_max")
    
    # for at være sikker på at max ikke er mindre end in_use
    if location_in_use > location_max:
        raise Exception("company_exception in location_max")

    return location_max


def validate_location_in_use():
    location_in_use= request.form.get("location_in_use","").strip()
    location_max= request.form.get("location_max","").strip()

    if not re.match(REGEX_LOCATION_AMOUNT, location_in_use):
        raise Exception("company_exception in location_in_use")
    
    # for at være sikker på at in_use ikke er større end max
    if location_in_use < location_max:
        raise Exception("company_exception in location_in_use")

    return location_in_use

###########################################################################################

REGEX_LATITUDE = f"^-?\d{1,2}(\.\d{1,6})?$"

def validate_location_latitude():
    location_latitude = request.form.get("location_latitude","").strip()

    if not re.match(REGEX_LATITUDE, location_latitude):
        raise Exception("company_exception in location_latitude")

    return location_latitude

###########################################################################################

REGEX_LONGTITUDE = f"^-?\d{1,3}(\.\d{1,6})?$"

def validate_location_longtitude():
    location_longtitude = request.form.get("location_longtitude","").strip()

    if not re.match(REGEX_LONGTITUDE, location_longtitude):
        raise Exception("company_exception in location_longtitude")

    return location_longtitude

###########################################################################################

LOCATION_CITY_MIN = 2
LOCATION_CITY_MAX = 255
REGEX_CITY = f"^.{{{LOCATION_CITY_MIN},{LOCATION_CITY_MAX}}}$"

def validate_location_city():
    location_city= request.form.get("location_city","").strip()

    if not re.match(REGEX_CITY, location_city):
        raise Exception("company_exception in location_city")

    return location_city

###########################################################################################

LOCATION_ADRESS_MIN = 2
LOCATION_ADRESS_MAX = 255
REGEX_ADDRESS = f"^.{{{LOCATION_ADRESS_MIN},{LOCATION_ADRESS_MAX}}}$"

def validate_location_address():
    location_address= request.form.get("location_address","").strip()

    if not re.match(REGEX_ADDRESS, location_address):
        raise Exception("company_exception in location_address")

    return location_address

###########################################################################################

LOCATION_SELFWASH_MAX_MIN = 1
LOCATION_SELFWASH_MAX_MAX = 2
REGEX_LOCATION_SELFWASH_MAX = f"^.{{{LOCATION_SELFWASH_MAX_MIN},{LOCATION_SELFWASH_MAX_MAX}}}$"

def validate_location_selfwash_max():
    location_selfwash_max = request.form.get("location_selfwash_max", "").strip()

    if not re.match(REGEX_LOCATION_SELFWASH_MAX, location_selfwash_max):
        raise Exception("company_exception in location_selfwash_max")

    return location_selfwash_max


LOCATION_SELFWASH_IN_USE_MIN = 1
LOCATION_SELFWASH_IN_USE_MAX = 2
REGEX_LOCATION_SELFWASH_IN_USE = f"^.{{{LOCATION_SELFWASH_IN_USE_MIN},{LOCATION_SELFWASH_IN_USE_MAX}}}$"

def validate_location_selfwash_in_use():
    location_selfwash_in_use = request.form.get("location_selfwash_in_use", "").strip()
    location_selfwash_max = request.form.get("location_selfwash_max", "").strip()

    if not re.match(REGEX_LOCATION_SELFWASH_IN_USE, location_selfwash_in_use):
        raise Exception("company_exception in location_selfwash_in_use")
    
    if location_selfwash_max < location_selfwash_in_use:
        raise Exception("company_exception in location_selfwash_in_use")

    return location_selfwash_in_use

#################################################################################################

LOCATION_CARWASH_MAX_MIN = 1
LOCATION_CARWASH_MAX_MAX = 2
REGEX_LOCATION_CARWASH_MAX = f"^.{{{LOCATION_CARWASH_MAX_MIN},{LOCATION_CARWASH_MAX_MAX}}}$"

def validate_location_carwash_max():
    location_carwash_max = request.form.get("location_carwash_max", "").strip()

    if not re.match(REGEX_LOCATION_CARWASH_MAX, location_carwash_max):
        raise Exception("company_exception in location_carwash_max")

    return location_carwash_max


LOCATION_CARWASH_IN_USE_MIN = 1
LOCATION_CARWASH_IN_USE_MAX = 2
REGEX_LOCATION_CARWASH_IN_USE = f"^.{{{LOCATION_CARWASH_IN_USE_MIN},{LOCATION_CARWASH_IN_USE_MAX}}}$"

def validate_location_carwash_in_use():
    location_carwash_in_use = request.form.get("location_carwash_in_use", "").strip()
    location_carwash_max = request.form.get("location_carwash_max", "").strip()

    if not re.match(REGEX_LOCATION_CARWASH_IN_USE, location_carwash_in_use):
        raise Exception("company_exception in location_carwash_in_use")
    
    if location_carwash_max < location_carwash_in_use:
        raise Exception("company_exception in location_selfwash_in_use")

    return location_carwash_in_use

#################################################################################################################################
LOCATION_INSIDECLEAN_MAX_MIN = 1
LOCATION_INSIDECLEAN_MAX_MAX = 2
REGEX_LOCATION_INSIDECLEAN_MAX = f"^.{{{LOCATION_INSIDECLEAN_MAX_MIN},{LOCATION_INSIDECLEAN_MAX_MAX}}}$"

def validate_location_insideclean_max():
    location_insideclean_max = request.form.get("location_insideclean_max", "").strip()

    if not re.match(REGEX_LOCATION_INSIDECLEAN_MAX, location_insideclean_max):
        raise Exception("company_exception in location_insideclean_max")

    return location_insideclean_max


LOCATION_INSIDECLEAN_IN_USE_MIN = 1
LOCATION_INSIDECLEAN_IN_USE_MAX = 2
REGEX_LOCATION_INSIDECLEAN_IN_USE = f"^.{{{LOCATION_INSIDECLEAN_IN_USE_MIN},{LOCATION_INSIDECLEAN_IN_USE_MAX}}}$"

def validate_location_insideclean_in_use():
    location_insideclean_in_use = request.form.get("location_insideclean_in_use", "").strip()

    if not re.match(REGEX_LOCATION_INSIDECLEAN_IN_USE, location_insideclean_in_use):
        raise Exception("company_exception in location_insideclean_in_use")

    return location_insideclean_in_use