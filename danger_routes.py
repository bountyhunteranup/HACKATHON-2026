from flask import Blueprint, jsonify

danger_routes = Blueprint("danger_routes", __name__)

danger_zones = [

{
"name": "Isolated Road - Kadri",
"coords": [12.8890, 74.8585],
"risk": "High Risk Area"
},

{
"name": "Dark Street - Lalbagh",
"coords": [12.8935, 74.8420],
"risk": "Low Lighting Area"
},

{
"name": "Silent Area - Surathkal",
"coords": [13.0100, 74.7920],
"risk": "Less Crowd at Night"
}

]

@danger_routes.route("/api/danger_zones", methods=["GET"])
def get_danger_zones():

    return jsonify({
        "status":"success",
        "zones": danger_zones
    })