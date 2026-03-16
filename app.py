from flask import Flask
from flask_cors import CORS
from auth_routes import auth_routes
from route_routes import route_routes
from safety_routes import safety_routes

app = Flask(__name__)
CORS(app)

# register authentication routes
app.register_blueprint(auth_routes)

# to get routes
app.register_blueprint(route_routes)

# to calculate safety score
app.register_blueprint(safety_routes)


@app.route("/")
def home():
    return {"message": "SafeRoute AI backend running"}


@app.route("/health")
def health():
    return {"status": "API running"}


if __name__ == "__main__":
    app.run(debug=True)