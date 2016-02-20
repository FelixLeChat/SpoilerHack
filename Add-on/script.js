function HideSpoiler(domElementList){

  for ( var i = 0; i < domElementList.length; i++ ){
    var html = domElementList[i].innerHTML;

    // parse HTML to find phrases
    var phrases =  html.match(/([^.?!]+[.?!])/g);
    var text = "";

    if(phrases != null){
        for(var j = 0; j < phrases.length; j++){

            // TODO : Check for spoiler in phrase
            var spoilerPhrase = phrases[j];
            text += spoilerPhrase;
        }

        if(text != "")
            domElementList[i].innerHTML = text;
      }
    }
}


// Hide in all sort of div
HideSpoiler($("p"));
HideSpoiler($("h1"));
HideSpoiler($("h2"));
HideSpoiler($("h3"));
//HideSpoiler($("span"));
HideSpoiler($("li"));
HideSpoiler($("a"));
//HideSpoiler($("div"));
HideSpoiler($("code"));
HideSpoiler($("label"));
//HideSpoiler($("input"));

// Show transformed page
$("html").visible();


/* Get request
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
    document.getElementById("resp").innerText = xhr.responseText;
  }
}
xhr.send();
*/