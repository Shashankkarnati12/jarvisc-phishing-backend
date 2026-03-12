const currentUrl = window.location.href;

// ---------- AUTOMATIC SCAN ----------
function autoScan() {

    fetch("https://jarvisc-phishing-backend.onrender.com/scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: currentUrl
        })
    })
    .then(response => response.json())
    .then(data => {

        console.log("Auto Scan Result:", data);

        if(data.final_result === "PHISHING WEBSITE"){

            alert(
                "⚠ PHISHING WEBSITE DETECTED!\n\n" +
                "Risk Score: " + data.risk_score +
                "\nProbability: " + data.probability + "%"
            );

        }

    })
    .catch(error => {
        console.error("Scan Error:", error);
    });

}

// Run automatically when page loads
window.addEventListener("load", autoScan);