from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from features import extract_features, check_domain_age, check_ssl_certificate

app = Flask(__name__)
CORS(app)

# Load ML model
model = joblib.load("models/phishing_model.pkl")


# Home route (for testing backend)
@app.route("/")
def home():
    return jsonify({
        "message": "JARVIS-C Phishing Detection API",
        "status": "running",
        "endpoint": "/scan",
        "method": "POST"
    })


# Main scan API
@app.route("/scan", methods=["POST"])
def scan():
    try:
        data = request.json
        url = data.get("url")

        if not url or not url.startswith(("http://", "https://")):
            return jsonify({"error": "Invalid URL"})

        # =========================
        # 1. Feature Extraction
        # =========================
        features = extract_features(url)
        feature_df = pd.DataFrame([features])

        # =========================
        # 2. ML Prediction
        # =========================
        prediction = model.predict(feature_df)[0]

        proba = model.predict_proba(feature_df)[0]
        probability = proba[1] * 100   # phishing probability %

        # =========================
        # 3. Security Checks
        # =========================
        ssl_status = check_ssl_certificate(url)
        domain_age = check_domain_age(url)

        # =========================
        # 4. Risk Score Calculation
        # =========================
        risk_score = int(probability)

        # Add SSL risk
        if ssl_status == "Invalid SSL":
            risk_score += 10

        # Add domain age risk
        if domain_age != -1 and domain_age < 30:
            risk_score += 10

        # Limit score
        if risk_score > 100:
            risk_score = 100

        # =========================
        # 5. Final Decision
        # =========================
        if risk_score >= 50:
            final_result = "PHISHING WEBSITE"
        else:
            final_result = "SAFE WEBSITE"

        # =========================
        # 6. Response
        # =========================
        result = {
            "final_result": final_result,
            "risk_score": risk_score,
            "probability": round(probability, 2),
            "ssl_status": ssl_status,
            "domain_age_days": domain_age
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})


# Run server
import os
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)