const currentUrl = window.location.href;

function autoScan() {

fetch("http://127.0.0.1:10000/predict", {
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

if(data.final_result === "PHISHING"){

window.location.href = chrome.runtime.getURL("block.html");

}

})

.catch(error => console.log(error));

}

autoScan();
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "phishingWarning") {

        console.log("Phishing detected:", message.result);

        window.location.href = chrome.runtime.getURL("block.html");

    }

});