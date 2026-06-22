from flask import request, make_response
import mysql.connector
import os
from functools import wraps


def db():
    try:
        db = mysql.connector.connect(
            host = os.getenv("DB_HOST"),
            user = os.getenv("DB_USER"),  
            password = os.getenv("DB_PASSWORD"),
            database = os.getenv("DB_NAME")
        )
        cursor = db.cursor(dictionary=True)
        return db, cursor
    except Exception as e:
        print(e, flush=True)
        raise Exception("Database under maintenance", 500)