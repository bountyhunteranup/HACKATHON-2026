from flask import Blueprint, request, jsonify

route_routes = Blueprint("route_routes", __name__)

# simple demo locations
locations = {
    "kankanady": [12.8698, 74.8451],
    "hampankatta": [12.8690, 74.8429],
    "surathkal": [13.0080, 74.7955],
    "lalbagh": [12.8926, 74.8446],
    "kadri": [12.8876, 74.8560]
}

@route_routes.route("/api/route", methods=["POST"])
def get_route():

    data = request.json

    start = data.get("start")
    end = data.get("end")

    # convert to lowercase
    start = start.lower()
    end = end.lower()

    # check if location exists
    if start not in locations or end not in locations:
        return jsonify({
            "status": "error",
            "message": "Location not found"
        })

    # send coordinates back
    return jsonify({
        "status": "success",
        "start": locations[start],
        "end": locations[end]
    })