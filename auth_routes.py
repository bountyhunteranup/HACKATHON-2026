from flask import Blueprint, request, jsonify

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/api/login", methods=["POST"])
def login():

    data = request.json
    username = data.get("username")
    password = data.get("password")

    # demo login
    if username == "admin" and password == "1234":
        return jsonify({
            "status": "success"
        })

    return jsonify({
        "status": "failed"
    })