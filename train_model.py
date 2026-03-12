import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from src.features import extract_features

print("Starting training...")

# Load CSV
df = pd.read_csv("history.csv")

# Keep needed columns
df = df[["URL", "Result"]]

# Convert text to numeric label
def convert_label(result):
    result = str(result).lower()
    if "phishing" in result or "threat" in result:
        return 1
    else:
        return 0

df["label"] = df["Result"].apply(convert_label)

# Extract features
feature_list = []

for url in df["URL"]:
    feature_list.append(extract_features(url))

X = pd.DataFrame(feature_list)
y = df["label"]

# Train model
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier()
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "models/phishing_model.pkl")

print("Model saved successfully!")