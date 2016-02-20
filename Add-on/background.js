var IsEnabled = false;
var EnabledImage = "Spoiler.png";
var DisabledImage = "SpoilerDis.png";

function updateIcon() {
	chrome.storage.sync.get('enable', function(val) {
		toggle = !val['enable'];
		if(toggle) {
			// caller le script pour tout cacher
		}
		chrome.storage.sync.set({'enable':toggle});
		alert(val['enable']);
	});
	//IsEnabled = !IsEnabled;
	//var path = DisabledImage;
	//if(IsEnabled)
	//	path = EnabledImage;*/

	//chrome.browserAction.setIcon({path:path});
}



chrome.browserAction.onClicked.addListener(updateIcon);

