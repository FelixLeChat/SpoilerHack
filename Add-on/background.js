var IsEnabled = false;
var EnabledImage = "Spoiler.png";
var DisabledImage = "SpoilerDis.png";

function updateIcon() {

	IsEnabled = !IsEnabled;
	var path = DisabledImage;
	if(IsEnabled)
		path = EnabledImage;

	chrome.browserAction.setIcon({path:path});
}

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();