chrome.runtime.onMessage.addListener((message) => {

    if (message.action !== "showSafe") return;

    const data = message.result;

    const box = document.createElement("div");

    box.innerHTML = `
    <div style="
        position:fixed;
        bottom:20px;
        right:20px;
        background:#2ecc71;
        color:white;
        padding:14px;
        border-radius:8px;
        z-index:999999;
    ">
    ✅ SAFE WEBSITE <br><br>
    Risk Score: ${data.risk_score} <br>
    ML Probability: ${data.probability} <br>
    SSL Status: ${data.ssl_status} <br>
    Domain Age: ${data.domain_age_days} days
    </div>
    `;

    document.body.appendChild(box);
});