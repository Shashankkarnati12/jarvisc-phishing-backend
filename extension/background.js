chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status === "complete" && tab.url) {

        fetch("https://jarvisc-phishing-backend.onrender.com/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: tab.url })
        })
        .then(res => res.json())
        .then(data => {

            console.log("Scan Result:", data);

            if (data.final_result === "PHISHING WEBSITE") {

                chrome.tabs.update(tabId, {
                    url: chrome.runtime.getURL("block.html") +
                    "?risk=" + data.risk_score +
                    "&ml=" + data.probability +
                    "&ssl=" + data.ssl_status +
                    "&age=" + data.domain_age_days
                });

            } else {

                chrome.tabs.sendMessage(tabId, {
                    action: "showSafe",
                    result: data
                });

            }

        });
    }
});