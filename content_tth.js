var isTwitchStreamPage = document.querySelector("meta[content*='twitch://stream']") || document.querySelector("#video-playback") ? true : false;
var STFU_MSG = "STFU";

if(isTwitchStreamPage) {
	/*
	 *	register a listener that listens for the STFU message from other tabs
	 *	telling it to STFU, naturally
	 */
	chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
		if(msg.message == STFU_MSG) {
			chrome.storage.local.get(function(settings) {
				if(settings.enabled !== false) {
					mute();
				}
			});
		}
	});

	/*
	 *	take control if the tab is brought to front
	 */
	window.addEventListener("focus", function(ev) {
		chrome.storage.local.get(function(settings) {
			if(settings.enabled !== false) {
				takeControl();
			}
		});
	});

	/* 
	 *	content script runs after document onload has fired (as per manifest),
	 *	so if the tab is visible and is a twitch tab, take control
	 */
	if(document.visibilityState == "visible") {
		chrome.storage.local.get(function(settings) {
			if(settings.enabled !== false) {
				takeControl();
			}
		});
	}
	
	/*
	 *	if we're closing the tab, were active and localStorage says we were
	 *	muted, correct the record (that stems from another tab)
	 */
	window.addEventListener("beforeunload", function (e) {
		if(document.visibilityState == "visible" && localStorage.getItem("muted") == "true" && !isMuted()) {
			chrome.storage.local.get(function(settings) {
				if(settings.enabled !== false) {
					localStorage.setItem("muted", "false");
				}
			});
		}
	});
}

function takeControl() {
	//console.log("taking control"); // TODO:DEBUGGING
	
	chrome.runtime.sendMessage({"message": STFU_MSG});
	
	unmute();
}

function unmute() {
	if(isMuted()) {
		var muteBtn = document.querySelector("button.js-control-volume");
		if(muteBtn) {
			muteBtn.click();
		}
	}
}

function mute() {
	if(!isMuted()) {
		var muteBtn = document.querySelector("button.js-control-volume");
		if(muteBtn) {
			muteBtn.click();
		}
	}
}

function isMuted() {
	return document.querySelector(".player[data-muted=false]") ? false : true;
}