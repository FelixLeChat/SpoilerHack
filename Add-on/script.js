
// parse given dom element into phrases and then hide content if they contain spoilers
function HideSpoiler(domElementList){

    chrome.storage.local.get({block: []}, function (result) {
        var userList = result.block;
        console.log(userList);

      for ( var i = 0; i < domElementList.length; i++ ){
        var html = domElementList[i].innerHTML;

        // parse HTML to find phrases
        var phrases =  html.match(/([^.,?!;:-]+[.,?!;:-])/g);
        var text = "";



        if(phrases != null){
            for(var j = 0; j < phrases.length; j++){
		  		var spoilerPhrase = phrases[j];
		  		$.get("http://localhost:8080/v1/functions/princess_classifier_api/application?input={"x":"'+spoilerPhrase+'"}", function(val) {

                // TODO : Check for spoiler in phrase

                var blockPhrase = false;

                // Check for user blocked list
                for(var k=0; k < userList.length; k++){
                    if(spoilerPhrase.indexOf(userList[k]) > -1)
                    {
                        text += "<div class=\"spoiler\">" + spoilerPhrase + "</div>";
                        blockPhrase = true;
                        k = userList.length;
                    }
                }

				if(val.output.spoiler[1][0] > -0.2637063264846802 && !blockPhrase) {
					text += "<div class=\"spoiler\">" + spoilerPhrase + "</div>";
					blockPhrase = true;
				}


                if(!blockPhrase){
                    text += BasicCheck(spoilerPhrase);
				}


	            if(text != "")
    	            domElementList[i].innerHTML = text;
				});
			}
		}
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

function CheckSpoiler(phrase)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.example.com/", false);
    xhr.send();
    return xhr.responseText;
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
		HideSpoiler($("ul"));
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
