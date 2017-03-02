chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.tabs.query({}, function(tabs) {
		tabs.forEach(function(tab) {
			if(tab.id !== sender.tab.id) {
				//console.log("sending stfu from " + sender.tab.url + " to " + tab.url);
				chrome.tabs.sendMessage(tab.id, request, function(response) {});
			}
		});
	});
	sendResponse({});
});
