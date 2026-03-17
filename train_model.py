import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Dummy dataset
data = pd.DataFrame({
    "url_length": [10, 200, 50, 150],
    "has_https": [1, 0, 1, 0],
    "dot_count": [2, 5, 3, 6],
    "slash_count": [1, 10, 2, 12],
    "has_ip": [0, 1, 0, 1],
    "has_at": [0, 1, 0, 1],
    "label": [0, 1, 0, 1]
})

X = data.drop("label", axis=1)
y = data["label"]

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "models/phishing_model.pkl")

print("Model trained ✅")