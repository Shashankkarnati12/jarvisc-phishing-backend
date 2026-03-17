from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import datetime
import socket
import ssl

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load("models/phishing_model.pkl")

# -------------------------------
# Helper: SSL Check
# -------------------------------
def check_ssl(url):
    try:
        hostname = url.replace("https://", "").replace("http://", "").split("/")[0]
        context = ssl.create_default_context()
        with socket.create_connection((hostname, 443), timeout=3) as sock:
            with context.wrap_socket(sock, server_hostname=hostname):
                return "Valid SSL"
    except:
        return "Invalid SSL"

# -------------------------------
# Helper: Domain Age (simple fallback)
# -------------------------------
def get_domain_age(url):
    try:
        # fallback dummy logic (works for demo)
        if "google" in url:
            return 5000
        elif "facebook" in url:
            return 4000
        else:
            return 5
    except:
        return 0

# -------------------------------
# Feature Extraction
# -------------------------------
def extract_features(url):
    return {
        "url_length": len(url),
        "has_https": 1 if url.startswith("https") else 0,
        "dot_count": url.count("."),
        "slash_count": url.count("/"),
        "has_ip": 1 if any(c.isdigit() for c in url) else 0,
        "has_at": 1 if "@" in url else 0
    }

# -------------------------------
# ROUTES
# -------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "JARVIS-C Phishing Detection API",
        "status": "running"
    })

@app.route("/scan", methods=["POST"])
def scan():
    try:
        data = request.json
        url = data.get("url")

        if not url:
            return jsonify({"error": "No URL provided"})

        features = extract_features(url)
        df = pd.DataFrame([features])

        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0][1] * 100

        ssl_status = check_ssl(url)
        domain_age = get_domain_age(url)

        # Risk score
        risk_score = int(probability)
        if ssl_status == "Invalid SSL":
            risk_score += 10

        final_result = "PHISHING WEBSITE" if risk_score >= 50 else "SAFE WEBSITE"

        return jsonify({
            "final_result": final_result,
            "risk_score": risk_score,
            "probability": round(probability, 2),
            "ssl_status": ssl_status,
            "domain_age_days": domain_age
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(port=10000)