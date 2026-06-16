from utils import config
from utils import regex
# Importeres Blueprint for at splitte routes op i opdelte filer
from flask import Blueprint, jsonify, request, session #type: ignore
from icecream import ic #type: ignore

#JWT
#from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

import uuid
import time
import os

UPLOAD_FOLDER = "./static/uploads"

ic.configureOutput(prefix="⋆౨ৎ˚⟡˖ ࣪ ⊹ ࣪ ˖ ⋆౨ৎ˚⟡˖ ࣪ ⊹ ࣪ ˖ ☆ﾐ(o\*･ω･)ﾉ ❤️ | ", includeContext=True)

# Her bliver vores blueprint lavet, hvor vi bruger
# users_bp som en slags label på vores tegning. navnet er vores første arg. 
# __name__ bruges til at finde vores templates/statics.

# Med Blueprint bliver alle routes automatisk url_prefix
cars_bp = Blueprint("cars", __name__)

#ADD_CAR###############################################################
@cars_bp.post("/api-create-car")
def api_create_car():
    try:
        user_pk = session.get("user_pk")        
        if not user_pk:
            return jsonify({"msg" : "Du er ikke logget på"}), 401 #not authorized
        
        car_pk = uuid.uuid4().hex
        user_car_pk = uuid.uuid4().hex
        car_licenseplate = regex.validate_car_licenseplate()
        car_created_at = int(time.time())
        car_image = ""
        
        file = request.files.get("car_image")           # None hvis intet sendt
        if file and file.filename:
            car_image = f"{file.filename}_{uuid.uuid4().hex}"

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        #queries
        q_car = """INSERT INTO cars
                   (car_pk, car_licenseplate, car_most_recent_wash,
                    car_image, car_created_at, car_updated_at, car_deleted_at)
               VALUES (%s, %s, %s, %s, %s, %s, %s)"""
               
        q_user_car = """INSERT INTO user_car
                   (user_car_pk, user_fk, car_fk,
                    user_car_created_at, user_car_updated_at, user_car_deleted_at)
               VALUES (%s, %s, %s, %s, %s, %s)"""
    
        db, cursor = config.db()
        
        cursor.execute(q_car,(car_pk, car_licenseplate, 0, car_image, car_created_at, 0, 0))
        cursor.execute(q_user_car,(user_car_pk, user_pk, car_pk, str(car_created_at), 0, 0))
        
        db.commit()
        
        if file and file.filename:
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            file.save(f"{UPLOAD_FOLDER}/{car_image}")
        
        return jsonify({"msg" : "Bil er blevet tilføjet"}), 201 #because we are creating
    except Exception as ex:
        ic(ex)
        message = str(ex)
        if "company_exception in car_licenseplate" in message:
            return jsonify({"tooltip": "car_licenseplate", "error": "Ugyldig nummerplade"}), 400
        if "Duplicate" in message:
            return jsonify({"msg": "Bilen er allerede registreret"}), 409
        return jsonify({"msg": "Kunne ikke tilføje bil"}), 400

    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()
        
#GET_ALL_USERS_CAR#####################################################          
@cars_bp.get("/api-get-cars")
def api_get_cars():
    try:
        user_pk = session.get("user_pk")
        if not user_pk:
            return jsonify({"msg": "Du er ikke logget på"}), 401

        q = """SELECT cars.car_pk, cars.car_licenseplate, cars.car_image, cars.car_most_recent_wash FROM cars INNER JOIN user_car ON user_car.car_fk = cars.car_pk WHERE user_car.user_fk = %s AND user_car.user_car_deleted_at = '0'"""

        db, cursor = config.db()
        cursor.execute(q, (user_pk,))
        cars = cursor.fetchall()

        return jsonify({"cars": cars}), 200
    except Exception as ex:
        ic(ex)
        return jsonify({"msg": "Kunne ikke hente biler"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()

#DELETE_CAR############################################################         
@cars_bp.delete("/delete-car/<car_pk>")
def delete_car(car_pk):
    try:
        user_pk = session.get("user_pk")
        if not user_pk:
            return jsonify({"msg" : "Du er ikke logget på"}), 401
        deleted_at = int(time.time())
        
        db, cursor = config.db()
        q ="""UPDATE user_car SET user_car_deleted_at = %s WHERE car_fk = %s AND user_fk = %s AND user_car_deleted_at = '0'"""
        cursor.execute(q, (deleted_at, car_pk, user_pk))
        
        db.commit()
        return jsonify({"msg" : "Bil er blevet fjernet"}), 200
    except Exception as ex: 
        ic(ex)
        return jsonify({"msg" : "Kunne ikke fjerne bilen"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()
     
#RESTORE_CAR###########################################################       
@cars_bp.patch("/restore-car/<car_pk>")
def restore_car(car_pk):
    try:
        user_pk = session.get("user_pk")
        if not user_pk:
            return jsonify({"msg": "Du er ikke logget på"}), 401

        db, cursor = config.db()
        q = """UPDATE user_car SET user_car_deleted_at = '0'
               WHERE car_fk = %s AND user_fk = %s"""
        cursor.execute(q, (car_pk, user_pk))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"msg": "Bil ikke fundet"}), 404
        return jsonify({"msg": "Bil er gendannet"}), 200
    except Exception as ex:
        ic(ex)
        return jsonify({"msg": "Kunne ikke gendanne bil"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()