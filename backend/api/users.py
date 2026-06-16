from utils import config
from utils import regex
# Importeres Blueprint for at splitte routes op i opdelte filer
from flask import Blueprint, jsonify, request, session, redirect, render_template #type: ignore
from werkzeug.security import generate_password_hash, check_password_hash #type: ignore
from icecream import ic #type: ignore
from utils import no_cache
from utils import regex

#JWT
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity #type: ignore


import uuid
import time

# import for email
import os
from dotenv import load_dotenv       #type: ignore        
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


ic.configureOutput(prefix="⋆౨ৎ˚⟡˖ ࣪ ⊹ ࣪ ˖ ⋆౨ৎ˚⟡˖ ࣪ ⊹ ࣪ ˖ ☆ﾐ(o\*･ω･)ﾉ | ", includeContext=True)

# Her bliver vores blueprint lavet, hvor vi bruger
# users_bp som en slags label på vores tegning. navnet er vores første arg. 
# __name__ bruges til at finde vores templates/statics.

# Med Blueprint bliver alle routes automatisk url_prefix
users_bp = Blueprint("users", __name__)
# det lort vil ikke. Nu har den sku min data.
load_dotenv()


########################_____SESSION_____########################
@users_bp.get("/api-user")
@no_cache.no_cache
def api_user():
    try:
        user_pk = session.get("user_pk", "")
        if not user_pk: 
            return jsonify({"msg" : "Could not find user"}), 401
        
        q = """SELECT user_pk, user_fullname, user_email, user_phonenumber, user_address, user_created_at, user_img_key
               FROM users
               WHERE user_pk = %s AND user_deleted_at = 0"""
        
        db, cursor = config.db()
        cursor.execute(q, (user_pk,))
        user = cursor.fetchone()
        if not user: 
            session.clear()
            return jsonify({"msg" : "Could not find user"}), 401
        
        return jsonify({"user" : user}), 200
    except Exception as ex:
        ic(ex)
        return jsonify({"msg" : "Server Whoops"}), 500
    finally:
        if "db" in locals(): db.close()
        if "cursor" in locals(): cursor.close()


########################_____SIGNUP_____########################

@users_bp.post("/api-signup")
@no_cache.no_cache
def api_create_user():
    try:
        #Validate data
        user_pk = uuid.uuid4().hex
        user_fullname = regex.validate_user_fullname()
        user_password = regex.validate_user_password()
        user_email = regex.validate_user_email()
        user_phonenumber = regex.validate_user_phonenumber()
        user_address = regex.validate_user_address()
        # fortæller at adgangskoden skal være skjult i db
        user_hashed_password = generate_password_hash(user_password)
        
        #validate the user for email
        user_verification_key = uuid.uuid4().hex
        
        # epoch / timestamp
        user_created_at = int(time.time())+7200
        
        # define db & cursor
        db, cursor = config.db()
        #query 
        # add verification key to the query
        q = """INSERT INTO users (user_pk, user_fullname, user_verification_key, user_reset_password_key, user_phonenumber, user_email, user_password, user_address, user_created_at, user_updated_at, user_deleted_at, user_img_key) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 0, 0, '')"""
        cursor.execute(q, (user_pk,user_fullname, user_verification_key, "", user_phonenumber,user_email,user_hashed_password,user_address,user_created_at))
        db.commit()
        
        html = render_template("email_verification.html", user_verification_key=user_verification_key)
        
        send_email(user_email, html)
        return jsonify({"msg" : "Please check your email."}), 200
    except Exception as ex:
        # Errors
        ic(ex)
        message = str(ex)   
        #Validering for fulde navn. Her laves dictionaries. 
        if "company_exception in user_fullname" in message:
            return jsonify({"tooltip" : "user_fullname", "error" : f"Fulde navn skal være mellem {regex.USER_FULLNAME_MIN} og {regex.USER_FULLNAME_MAX} characters tegn"}), 400
        #Validering for email
        if "company_exception in user_email" in message:
            return jsonify({"tooltip" : "user_email","error" : f"Indtast venligst gyldig email adresse"}), 400
        #Validering for password
        if "company_exception in user_password" in message:
            return jsonify({"tooltip" : "user_password", "error" : f"Adgangskode skal indeholde mellem {regex.USER_PASSWORD_MIN} og {regex.USER_PASSWORD_MAX} tegn"}), 400
        #Validering for mobilnummer
        if "company_exception in user_phonenumber" in message:
            return jsonify({"tooltip" : "user_phonenumber","error" : f"Telefonummer skal indholde mellem {regex.USER_PHONENUMBER_MIN} og {regex.USER_PHONENUMBER_MAX} tegn"}), 400
        
        # Server error ( det din skyld at det ikke virker )
        return jsonify({"msg" : "Server Error"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()


@users_bp.get("/api-verify/<key>")
@no_cache.no_cache
def api_verify_account(key):
    try:
        # TODO: Validate the key
        key = uuid.uuid4().hex
        # TODO: Connect to the DB
        db, cursor = config.db()
        # TODO: Update the verified_at column
        verified_at = int(time.time())
        # TODO: Update the verification_key column
        q = """UPDATE users SET user_verified_at = %s, user_verification_key= %s WHERE user_verification_key = %s"""
        cursor.execute(q, (verified_at, key))
        db.commit()
        return jsonify({"message" : "Yay, its verified. Go wash ur car"}), 201
    except Exception as ex: 
        ic(ex)
        return jsonify({"message" : "Verification failed :( )"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()  


########################_____LOGIN_____########################
@users_bp.post("/api-login")
@no_cache.no_cache
def api_user_login():
    try:
        #validate data
        user_email = regex.validate_user_email()
        user_password = regex.validate_user_password()
        db, cursor = config.db()
        
        #query
        q ="""SELECT * FROM users WHERE user_email = %s"""
        
        cursor.execute(q, (user_email,))
        
        # fetch user from the db
        user = cursor.fetchone()
        #wrong user
        if not user: 
            return jsonify({"msg" : "invalid credentials"}), 400
        #wrong password
        if not check_password_hash(user["user_password"], user_password):
            return jsonify({"msg" : "invalid credentials"}), 400


        user.pop("user_password")
        session["user_pk"] = user["user_pk"]
        access_token = create_access_token(identity=user["user_pk"])
        return jsonify({"msg" : "You're logged in :)", "token" : access_token}), 200
        
    except Exception as ex: 
        ic(ex)
        return jsonify({"msg" : "oh noooooo :( )"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()
        
### LOGOUT ###
@users_bp.post('/logout')
def logout():
    try:
        session.clear()
        return jsonify({"msg" : "du er nu loggede ud"}), 204
    except Exception as ex: 
        ic(ex)
        return "haha u can't figure out to logout. sad."        

########################_____FORGET & RESET PASSWORD_____########################

# Brugeren glemmer password & skal skrive email og POST
@users_bp.post("/forgot-password")
def forgot_password():
    try:
        reset_key = uuid.uuid4().hex
        email = regex.validate_user_email()
        db, cursor = config.db()

        # 1) Tjek først om emailen findes
        cursor.execute(
            "SELECT user_pk FROM users WHERE user_email = %s",
            (email,)
        )
        row = cursor.fetchone()
        if not row:
            return jsonify({"msg": "Email findes ikke :("}), 400

        # 2) Gem reset-nøglen på brugeren
        cursor.execute(
            "UPDATE users SET user_reset_password_key = %s WHERE user_email = %s",
            (reset_key, email)
        )
        db.commit()

        # 3) Send email med linket
        html = render_template("email_forgot_password.html", reset_key=reset_key)
        send_email(email, html)

        return jsonify({"msg": "Email er blevet hentet :)"}), 200

    except Exception as ex:
        ic(ex)
        if "company_exception" in str(ex):
            return jsonify({"msg": "Invalid email"}), 400
        return jsonify({"msg": "Server error"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()        
# Der bliver sendt en email ud til brugeren med en unikt link med send_email() funktionen
# Brugeren har så her mulighed for at kunne nulstille password

# Når brugeren klikker på linket kommer der en GET request & ser en ny form
@users_bp.get("/reset-password/<key>")
def show_reset_password(key):
    try:
        #validate data
        key=regex.validate_uuid4(key)
        email = regex.validate_user_email()
        
        db, cursor = config.db()
        #query
        q = """SELECT user_reset_password_key FROM users WHERE user_reset_password_key = %s"""
        cursor.execute(q,(key,))
        row = cursor.fetchone()
        
        html = render_template("email_verification.html")
        
        # Hvis den ikke kan finde reset_password_key
        if not row:
            return jsonify({"msg" : "Aww.. :( "}),400
        
        send_email(email, html, "Reset password yay")
        
    except Exception as ex:
        ic(ex)
    finally:
        if "db" in locals(): db.close()
        if "cursor" in locals(): cursor.close()


# brugeren skriver den nye password ind med POST og bliver opdateres i DB
@users_bp.patch("/reset-password")
def reset_password():
    try:
        #validate data
        key = regex.validate_uuid4(request.form.get("key", ""))
        password = regex.validate_user_password()
        confirm_new_password = request.form.get("confirm_password", "").strip()
        password_hashed = generate_password_hash(password)
        
        db, cursor = config.db()
        
        q = """UPDATE users SET user_password = %s, user_reset_password_key = %s, user_updated_at = %s WHERE user_reset_password_key = %s"""
        #If the password doesn't match
        if confirm_new_password != password:
            return "Passwords don't match", 400
        
        cursor.execute(q, (password_hashed, "", int(time.time()), key))
        db.commit()
        return jsonify({"msg" : "Your password has been changed"}), 200
        
    except Exception as ex:
        ic(ex)
        
        return jsonify({"msg" : "key expired"}), 500
    finally:
        if "db" in locals(): db.close()
        if "cursor" in locals(): cursor.close()
        
########################_____SEND EMAIL_____########################

def send_email(to_email, html): 
    # create gmail
    sender_email =os.getenv("SENDER_EMAIL") 
    password =os.getenv("SENDER_EMAIL_PASSWORD")
    
    #The user whos receives the password 
    receiver_email = to_email
    
    #Creating the email msg
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = to_email
    message['Subject'] = "Verify your account here"
    
    message.attach(MIMEText(html, "html"))
    
    # Connecting to gmails smtp server and send the email
    with smtplib.SMTP(os.getenv("SMTP_HOST", "smtp.gmail.com"), int(os.getenv("SMTP_PORT", "587"))) as server:
        server.starttls() #this secures the connection
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        ic("Email sent :) ")

########################_____UPDATE USER_____########################

@users_bp.patch("/api-user")
@no_cache.no_cache
def update_user():
    try:
        # Tjek session FØRST — fejler ud tidligt hvis ikke logget ind
        user_pk = session.get("user_pk")
        if not user_pk:
            return jsonify({"msg": "Du er ikke logget på"}), 401

        # Validér data
        user_fullname = regex.validate_user_fullname()
        user_email = regex.validate_user_email()
        user_phonenumber = regex.validate_user_phonenumber()
        user_address = regex.validate_user_address()
        updated_at = int(time.time())

        db, cursor = config.db()

        q = """UPDATE users 
       SET user_fullname = %s, user_email = %s, user_phonenumber = %s, 
           user_address = %s, user_updated_at = %s 
       WHERE user_pk = %s"""
        cursor.execute(q, (user_fullname, user_email, user_phonenumber, user_address, updated_at, user_pk))

        if cursor.rowcount == 0:
            return jsonify({"msg": "User not found"}), 404

        db.commit()
        return jsonify({"msg": "Profil er nu blevet opdateret"}), 200

    except Exception as ur_mum:
        ic(ur_mum)
        message = str(ur_mum)
        if "company_exception in user_fullname" in message:
            return jsonify({"tooltip": "user_fullname", "error": f"Fulde navn skal være mellem {regex.USER_FULLNAME_MIN} og {regex.USER_FULLNAME_MAX} tegn"}), 400
        if "company_exception in user_email" in message:
            return jsonify({"tooltip": "user_email", "error": "Indtast venligst en gyldig email"}), 400
        if "company_exception in user_phonenumber" in message:
            return jsonify({"tooltip": "user_phonenumber", "error": f"Telefonnummer skal være mellem {regex.USER_PHONENUMBER_MIN} og {regex.USER_PHONENUMBER_MAX} tegn"}), 400
        if "company_exception in user_address" in message:
            return jsonify({"tooltip": "user_address", "error": f"Adresse skal være mellem {regex.USER_ADDRESS_MIN} og {regex.USER_ADDRESS_MAX} tegn"}), 400
        return jsonify({"msg": "Server error"}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close() 

########################_____DELETE USER_____########################
@users_bp.delete('/delete-user')
@jwt_required()
def delete_user():
    try:
        ic("Session keys:", list(session.keys()))
        user_pk = get_jwt_identity()
        if not user_pk:
            return jsonify({"msg" : "Du er ikke loggede på"}), 401
        
        deleted_at = int(time.time())
        
        db, cursor = config.db()
        q = """ UPDATE users SET user_deleted_at = %s WHERE user_pk = %s """
        cursor.execute(q,(deleted_at, user_pk))
        
        
        db.commit()
        session.clear()
        
        return jsonify({"msg" : "Profil er nu blevet slettet"}), 200
    except Exception as ex:
        ic(ex)
        return jsonify({"msg" : "Server Whoops"}),500        
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()
        
        
########################_____UPLOAD FILE_____########################
UPLOAD_FOLDER = "./static/uploads"

@users_bp.post("/api-user/avatar")
@no_cache.no_cache
def upload_avatar():
    try:
        user_pk = session.get("user_pk")
        if not user_pk:
            return jsonify({"msg": "Du er ikke logget på"}), 401

        file = request.files["avatar"]
        file_key = f"{uuid.uuid4().hex}_{file.filename}"
        path = f"{UPLOAD_FOLDER}/{file_key}"

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        db, cursor = config.db()
        cursor.execute(
            "UPDATE users SET user_img_key = %s WHERE user_pk = %s",
            (file_key, user_pk),
        )
        db.commit()
        file.save(path)

        return jsonify({"msg": "Avatar opdateret"}), 200
    except Exception as ex:
        ic(ex)
        return jsonify({"msg": str(ex)}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()
        
@users_bp.get("/api-test")
@no_cache.no_cache
def test():
    try:
        pass
    except Exception as ur_mum: 
        ic(ur_mum)
    finally: 
        pass