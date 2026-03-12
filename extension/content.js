const currentUrl = window.location.href;

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

            showPhishingWarning(data);

        }

    })
    .catch(error => {
        console.error("Scan Error:", error);
    });

}


function showPhishingWarning(data){

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "#b71c1c";
    overlay.style.color = "white";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.textAlign = "center";
    overlay.style.fontFamily = "Arial";

    overlay.innerHTML = `
        <h1 style="font-size:40px;">⚠ Deceptive Site Ahead</h1>

        <p style="font-size:18px; max-width:600px;">
        Attackers on this website may try to steal your information 
        (like passwords, messages, or credit card details).
        </p>

        <p style="margin-top:20px;">
        <b>Risk Score:</b> ${data.risk_score} <br>
        <b>ML Probability:</b> ${data.probability}%
        </p>

        <button id="leaveSite"
        style="
        margin-top:30px;
        padding:12px 20px;
        font-size:16px;
        border:none;
        background:black;
        color:white;
        cursor:pointer;
        ">
        Go Back to Safety
        </button>
    `;

    document.body.appendChild(overlay);

    document.getElementById("leaveSite").onclick = function(){
        window.history.back();
    };

}


// Run automatically when page loads
window.addEventListener("load", autoScan);