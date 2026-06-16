from utils import config
# Importeres Blueprint for at splitte routes op i opdelte filer
from flask import Blueprint, jsonify, request, session, redirect #type: ignore
from icecream import ic #type: ignore

from utils import regex
from utils import no_cache

import uuid
import time


ic.configureOutput(prefix="______________ | ", includeContext=True)

# Her bliver vores blueprint lavet, hvor vi bruger
# users_bp som en slags label på vores tegning
locations_bp = Blueprint("locations", __name__)


########################_____Create locations_____########################

@locations_bp.post("/api-create-location")
def api_create_location():
    try:
        # Henter dataen som er sendt som JSON fra Postman/frontend
        data = request.get_json()

        #Validating ever data that goes to the database.
        location_pk = uuid.uuid4().hex
        location_title = regex.validate_location_title
        location_latitude = regex.validate_location_latitude
        location_longtitude = regex.validate_location_longtitude
        location_city = regex.validate_location_city
        location_address = regex.validate_location_address

        # Hent værdien med navnet "location_status_pk" fra den JSON-data, som Postman/frontend har sendt, og gem den i variablen location_status_fk
        location_status_fk = regex.validate_uuid4(data.get("location_status_pk"))
        location_created_at = int(time.time())
        location_updated_at = 0
        location_deleted_at = 0
        location_selfwash_max = regex.validate_location_selfwash_max
        location_selfwash_in_use = regex.validate_location_selfwash_in_use
        location_carwash_max = regex.validate_location_carwash_max
        location_carwash_in_use = regex.validate_location_carwash_in_use
        location_insideclean_max = regex.validate_location_insideclean_max
        location_insideclean_in_use = regex.validate_location_insideclean_in_use

        db, cursor = config.db()
        q= """INSERT INTO locations
        (location_pk,
        location_title,
        location_latitude,
        location_longtitude,
        location_city,
        location_address,
        location_status_fk,
        location_created_at,
        location_updated_at,
        location_deleted_at,
        location_selfwash_max,
        location_carwash_max,
        location_insideclean_max,
        location_selfwash_in_use,
        location_carwash_in_use,
        location_insideclean_in_use
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """

        cursor.execute(q, (location_pk, location_title, location_latitude, location_longtitude, location_city, location_address, location_status_fk, location_created_at, location_updated_at, location_deleted_at, location_selfwash_max, location_carwash_max, location_insideclean_max,location_selfwash_in_use, location_carwash_in_use, location_insideclean_in_use ))
        
        db.commit()
        return jsonify({"msg" : "hurray you have created a location, good job buddy"}), 200

    except Exception as ex:
        ic(ex)

        #Worst case scenario
        return jsonify({"error": "well fuck me sideways ..."}), 400

    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()



########################_____Read locations_____########################

@locations_bp.get("/api-get-all-locations")
@no_cache.no_cache
def show_locationslist():
    try:
        db, cursor = config.db()
        q = "SELECT * FROM locations"

        cursor.execute(q)
        all_locations = cursor.fetchall()

        return jsonify({"locations":all_locations}), 200
    
    except Exception as ex:
        ic(ex)
        return ("ups ... ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻"), 500
    
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()
        


@locations_bp.get("/api-get-location/<location_pk>")
@no_cache.no_cache
def api_get_location(location_pk):
    try:
        #TODO Validate the data
        location_pk = regex.validate_uuid4(location_pk)
        #TODO Connect to DB & add query
        db, cursor = config.db()
        q = "SELECT * FROM locations WHERE location_pk = %s"
        #TODO execute tuple and fetch one of the locations
        cursor.execute(q,(location_pk,))
        location = cursor.fetchone()
        #Cannot find location
        if not location:
            return jsonify({"msg" : "Kan ikke finde vaskehallen"}), 404
        #Location has been found
        return jsonify({"location" : location}), 200
    except Exception as ex:
        #TODO Handling Server Error with a dictionary
        ic(ex)
        return jsonify({"msg" : "Server Error"}), 500
    finally:
        #TODO Keeps running
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()