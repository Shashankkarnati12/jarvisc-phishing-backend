chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "showSafe") {

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
        font-size:13px;
        z-index:999999;
        width:220px;
        box-shadow:0 0 10px rgba(0,0,0,0.3);
        ">

        <b>&#9989; SAFE WEBSITE</b>

        Risk Score: ${data.risk_score}<br>
        ML Probability: ${data.probability}<br>
        SSL Status: ${data.ssl_status}<br>
        Domain Age: ${data.domain_age_days} days<br>
        VT Malicious: ${data.vt_malicious}<br>
        VT Suspicious: ${data.vt_suspicious}

        </div>
        `;

        document.body.appendChild(box);

        setTimeout(()=>{
            box.remove();
        },6000);

    }

});