

function isInUserList(userList, phrase) {
	userList.forEach(function(bannedWord) {
		if(phrase.indexOf(bannedWord) > -1) {
			return true
		}
	});
	return false;
}

function findSentences(html) {
	var sentences =  html.match(/([^.,?!;:-]+[.,?!;:-])/g);
	sentences = String(sentences).split('<').join('').split('"').join('').split('>');
	return sentences;
}

// parse given dom element into phrases and then hide content if they contain spoilers
function HideSpoiler(domElementList){
    chrome.storage.local.get({block: []}, function (result) {
        var userList = result.block;

        $.each(domElementList, function(index, domElement) {
			var html = domElement.innerHTML;
			var sentences = findSentences(html);
			if(!sentences) return;

			sentences.forEach(function(sentence) {
				sentence = sentence.trim();
				if (!sentence) return;

				// Check in the user blocked list first
				if (isInUserList(userList, sentence)) {
                    domElement.innerHTML = "<div class=\"spoiler\">" + sentence + "</div>";
                    return;
				}

                // If unsuccessful, check on our model
                $.ajax({
                    url:'https://spoilerhack.tech/is-spoiler',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({sentence: sentence}),
                    dataType: 'json',
                    success: function(data) {
                        if(data) {
                            domElement.innerHTML = "<div class=\"spoiler\">" + sentence + "</div>";
                        }
                    }
                });
			});
		});
	});
}

// Basic function to hide phrases with certains words in them
function BasicCheck(spoilerPhrase){
    var spoilers = ["die","death","kill","reveal",'curse'," turns out "," ending "," out that "," sex "," kiss", 'ressurect', 'confrontation', 'evil', 'defeat', 'enroll', 'killing', 'child', 'marries', 'murder', 'dating', 'destroy'];
	var characters = ['harry', 'potter', 'ron', 'weasley', 'hermione', 'granger', 'lord', 'voldemort', 'albus', 'dumbledore',"dumbledore's", 'severus', 'snape', 'rubeus', 'hagrid', 'draco', 'malfoy', "supporting hogwarts staff", "order of the phoenix dumbledore's", 'death daters', 'ginny', 'horecrux']

    var spoilerHeader = "<div class=\"spoiler\">";
    var spoilerFooter = "</div>";

    console.log(spoilerPhrase);

    // check spoiler list
    for(var i=0; i < spoilers.length; i++){
        if(spoilerPhrase.toLowerCase().indexOf(spoilers[i]) > -1){
			//for(var j = 0; j < characters.length; j++) {
				//if(spoilerPhrase.toLowerCase().indexOf(characters[j]) > -1){
					return spoilerHeader + spoilerPhrase + spoilerFooter;
				//}
			//}
		}
    }
    return spoilerPhrase;
}

chrome.storage.sync.get('enable', function(val){
	if(val['enable']) {

		// Hide in all sort of div
		HideSpoiler($("p"));
		//HideSpoiler($('a'));
		//HideSpoiler($("h1"));
		//HideSpoiler($("h2"));
		//HideSpoiler($("h3"));
		//HideSpoiler($("span"));
		//HideSpoiler($("ul"));
		//HideSpoiler($("a"));
		//HideSpoiler($("div"));
		//HideSpoiler($("code"));
		//HideSpoiler($("label"));
		//HideSpoiler($("input"));

		// Show transformed page
		$("html").visible();
	}
});


// Check for api
//console.log(CheckSpoiler("John Snow dies."));
