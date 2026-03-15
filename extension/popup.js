chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    const url = tabs[0].url;

    fetch("https://jarvisc-phishing-backend.onrender.com/scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({url: url})
    })

    .then(response => response.json())

    .then(data => {

        const resultDiv = document.getElementById("result");

        if(data.final_result === "PHISHING WEBSITE"){

            resultDiv.innerText = "⚠ PHISHING";
            resultDiv.style.color = "red";

        } else {

            resultDiv.innerText = "✅ SAFE";
            resultDiv.style.color = "green";

        }

    })

    .catch(err => {

        document.getElementById("result").innerText = "Error scanning";

    });

});