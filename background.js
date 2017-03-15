chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var response = {};
	
	switch(request.message) {
		case "STFU":
			chrome.tabs.query({}, function(tabs) {
				tabs.forEach(function(tab) {
					if(tab.id !== sender.tab.id) {
						console.log("silence request from " + sender.tab.url + " to " + tab.url);
						chrome.tabs.sendMessage(tab.id, request, function(resp) {});
					}
				});
			});
			break;
	}
	
	sendResponse(response);
});
