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

function blockContent(info,tab) {
	chrome.storage.local.get({block: []}, function (result) {

		var val = result.block;
		console.log(val);

		var selectedText = info.selectionText;
		var phrases = selectedText.match(/([^.,?!;:-]+)/g);
		if(phrases != null){
        	for(var j = 0; j < phrases.length; j++){
        		val.push(phrases[j]);
        	}
        }

		chrome.storage.local.set({block: val}, function () {});
		console.log(val);
		chrome.tabs.reload();
	});
 };

 function resetBlockContent(info,tab) {

 	chrome.storage.local.set({block: []}, function () {});
 	chrome.tabs.reload();
 };

chrome.contextMenus.create({
 title: "Block selected Text",
 contexts:["selection"],
 onclick: blockContent
}, function() {
	console.log("listener installed");
	if (chrome.extension.lastError) {
		console.log("lastError:" + chrome.extension.lastError.message);
	}
});

chrome.contextMenus.create({
 title: "Reset blocked content",
 contexts:["all"],
 onclick: resetBlockContent
}, function() {
	console.log("listener installed");
	if (chrome.extension.lastError) {
		console.log("lastError:" + chrome.extension.lastError.message);
	}
});