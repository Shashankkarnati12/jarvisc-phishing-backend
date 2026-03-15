chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "showSafe") {

        const box = document.createElement("div");

        box.innerHTML = `
        <div style="
        position:fixed;
        bottom:20px;
        right:20px;
        background:#2ecc71;
        color:white;
        padding:12px;
        border-radius:8px;
        font-size:14px;
        z-index:999999;">
        ✅ SAFE WEBSITE
        </div>
        `;

        document.body.appendChild(box);

        setTimeout(()=>{
            box.remove();
        },4000);

    }

});