
chrome.storage.sync.get('enable', function(val){
	if(val['enable'])
		$("html").invisible();
});
// Hide html content till spoiler are not hidden

