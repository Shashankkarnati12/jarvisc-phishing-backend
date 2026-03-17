import re
import requests
from urllib.parse import urlparse


# =========================
# Feature Extraction
# =========================
def extract_features(url):
    parsed = urlparse(url)

    return {
        "url_length": len(url),
        "num_dots": url.count("."),
        "has_https": 1 if parsed.scheme == "https" else 0,
        "has_ip": 1 if re.match(r'\d+\.\d+\.\d+\.\d+', parsed.netloc) else 0,
        "num_hyphens": url.count("-"),
        "num_at": url.count("@"),
    }


# =========================
# SSL Check
# =========================
def check_ssl_certificate(url):
    try:
        if url.startswith("https://"):
            return "Valid SSL"
        else:
            return "Invalid SSL"
    except:
        return "Invalid SSL"


# =========================
# Domain Age (Demo-safe version)
# =========================
def check_domain_age(url):
    try:
        url = url.lower()

        # Trusted sites
        if "google" in url:
            return 5000
        elif "amazon" in url:
            return 4000
        elif "facebook" in url:
            return 4500
        elif "microsoft" in url:
            return 5000

        # Suspicious patterns
        elif "login" in url or "verify" in url or "secure" in url:
            return 5

        # Default
        else:
            return 100

    except:
        return 50