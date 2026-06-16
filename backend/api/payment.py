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

payment_bp = Blueprint("payment")

PAYING_METHODS = {"MobilePay", "GooglePay", "ApplePay", "Betalingskort"}

@payment_bp.post("/api-add-paymentmethod")
def api_add_paymentmethod():
    try:
        #TODO Validate
        user_pk = session.get("user_pk")
        if not user_pk:
            return jsonify({"msg" : "Du er ikke logget på"}), 401
        
        payment_title = request.form.get("payment_methods").strip()
        if payment_title not in PAYING_METHODS:
            return jsonify({"msg" : "Ugyldig betalingsmetode"}), 400
        
        
    except Exception as ic:
        pass
    finally:
        pass