chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "phishingWarning") {

        let warning = document.createElement("div");

        warning.innerHTML = `
        <div style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#8B0000;
        color:white;
        z-index:999999;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-family:Arial;
        text-align:center;
        ">

        <h1 style="font-size:45px;">⚠ SECURITY WARNING</h1>

        <h2>Phishing Website Detected</h2>

        <p style="font-size:20px;">
        Risk Score: ${message.result.risk_score}
        </p>

        <p style="max-width:600px;">
        This website has been identified as a potential phishing site.
        Entering passwords or personal information may compromise your security.
        </p>

        <button onclick="window.history.back()" style="
        padding:12px 20px;
        font-size:18px;
        margin-top:20px;
        cursor:pointer;
        ">
        Go Back To Safety
        </button>

        </div>
        `;

        document.body.appendChild(warning);

    }

});