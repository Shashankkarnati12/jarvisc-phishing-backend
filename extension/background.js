chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status === "complete" && tab.url) {

        fetch("https://jarvisc-phishing-backend.onrender.com/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: tab.url
            })
        })
        .then(response => response.json())
        .then(data => {

            console.log("Scan Result:", data);

            if (data.final_result === "PHISHING WEBSITE") {

                chrome.tabs.update(tabId, {
                    url: chrome.runtime.getURL("block.html") +
                    "?risk=" + data.risk_score +
                    "&ml=" + data.probability +
                    "&ssl=" + data.ssl_status +
                    "&age=" + data.domain_age_days +
                    "&vtm=" + data.vt_malicious +
                    "&vts=" + data.vt_suspicious
                });

            } else {

                chrome.tabs.sendMessage(tabId, {
                    action: "showSafe",
                    result: data
                });

            }

        })
        .catch(error => console.log("Scan Error:", error));

    }

});