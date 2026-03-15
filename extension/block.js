const params = new URLSearchParams(window.location.search);

document.getElementById("risk").innerText = params.get("risk") || "N/A";
document.getElementById("ml").innerText = params.get("ml") || "N/A";
document.getElementById("ssl").innerText = params.get("ssl") || "N/A";
document.getElementById("age").innerText = params.get("age") || "N/A";
document.getElementById("vtm").innerText = params.get("vtm") || "0";
document.getElementById("vts").innerText = params.get("vts") || "0";

document.getElementById("backBtn").addEventListener("click", () => {
    history.back();
});