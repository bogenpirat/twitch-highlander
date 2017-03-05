var btn = document.querySelector("#enabled");

chrome.storage.local.get(function(settings) {
	btn.textContent = settings.enabled !== false ? "enabled" : "disabled";
});

btn.addEventListener("click", function(ev) {
	btn.textContent = btn.textContent == "enabled" ? "disabled" : "enabled";
	
	chrome.storage.local.set({ "enabled": btn.textContent == "enabled" });
});