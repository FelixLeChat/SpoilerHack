
// parse given dom element into phrases and then hide content if they contain spoilers
function HideSpoiler(domElementList){

  for ( var i = 0; i < domElementList.length; i++ ){
    var html = domElementList[i].innerHTML;

    // parse HTML to find phrases
    var phrases =  html.match(/([^.,?!;:-]+[.,?!;:-])/g);
    var text = "";

    if(phrases != null){
        for(var j = 0; j < phrases.length; j++){

            // TODO : Check for spoiler in phrase
            var spoilerPhrase = phrases[j];
            text += BasicCheck(spoilerPhrase);
        }

        if(text != "")
            domElementList[i].innerHTML = text;
      }
    }
}

// Basic function to hide phrases with certains words in them
function BasicCheck(spoilerPhrase){
    var spoilers = [" die "," death"," kill"," revealed "," turns out "," ending "," finale"," out that "," sex"," kiss"];

    var spoilerHeader = "<div class=\"spoiler\">";
    var spoilerFooter = "</div>";

    for(var i=0; i < spoilers.length; i++){
        if(spoilerPhrase.toLowerCase().indexOf(spoilers[i]) > -1)
            return spoilerHeader + spoilerPhrase + spoilerFooter;
    }
    return spoilerPhrase;
}

function CheckSpoiler(phrase)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.example.com/", false);

    /*xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // innerText does not let the attacker inject HTML elements.
        console.log(xhr.responseText);
      }
    }*/
    xhr.send();
    return xhr.responseText;
}

chrome.storage.sync.get('enable', function(val){
	if(val['enable']) {

		// Hide in all sort of div
		HideSpoiler($("p"));
		//HideSpoiler($("h1"));
		//HideSpoiler($("h2"));
		//HideSpoiler($("h3"));
		//HideSpoiler($("span"));
		//HideSpoiler($("li"));
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
console.log(CheckSpoiler("John Snow dies."));