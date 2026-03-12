document.getElementById("scanBtn").addEventListener("click", function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        let url = tabs[0].url;

        fetch("https://jarvisc-phishing-backend.onrender.com/scan", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: url })
})
.then(response => response.json())
.then(data => {

    console.log("Backend Response:", data);

    let resultDiv = document.getElementById("result");

    if (data.error) {
        resultDiv.innerHTML = "<p style='color:red'>Backend Error</p>";
        return;
    }

    if (data.final_result === "PHISHING WEBSITE") {

        resultDiv.innerHTML =
        `<h3 style="color:red">🚨 PHISHING WEBSITE</h3>
        <p><b>Risk Score:</b> ${data.risk_score}</p>
        <p><b>ML Probability:</b> ${data.probability}%</p>`;

    } else {

        resultDiv.innerHTML =
        `<h3 style="color:green">SAFE WEBSITE</h3>
        <p><b>Risk Score:</b> ${data.risk_score}</p>`;

    }

})
.catch(error => {

    console.log("Fetch Error:", error);

    document.getElementById("result").innerHTML =
    "<p style='color:red'>Cannot connect to backend</p>";

});

    });

});