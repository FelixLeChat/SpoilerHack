var EnabledImage = "Spoiler.png";
var DisabledImage = "SpoilerDis.png";

function updateIcon() {

	// Change local storage value for enabled
	chrome.storage.sync.get('enable', function(val) {
		toggle = !val['enable'];
		chrome.storage.sync.set({'enable':toggle});
		//alert(val['enable']);

		// reload tabs
		chrome.tabs.reload();

		// Change icon
		if(toggle){
			chrome.browserAction.setIcon({path:{
			    19: "SP19.png",
			    38: "SP38.png"
			}});
		}
		else{
			chrome.browserAction.setIcon({path:{
			    19: "SPD19.png",
			    38: "SPD38.png"
			}});
		}
	});
}

chrome.browserAction.onClicked.addListener(updateIcon);