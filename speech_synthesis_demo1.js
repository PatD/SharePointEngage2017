'use strict';

// Read-This-Textarea-text Button
let speechContentReaderButton = document.getElementById("speechContentReaderButton");

// Function that reads from the text area
// and shouts it out loud
var readSpeechBox = function(){

	// Tests for speechSynthesis support
	if ('speechSynthesis' in window) {

		// Notifies user that their browser supperts speechSynthesis
		SP.UI.Notify.addNotification("Speech Synthesis is supported in this browser", false);

		// Event listener for 'Read Text' button
		speechContentReaderButton.addEventListener("click",function(event){
			
 			// Stop button from submitting form
 			// because it's a button
 			event.preventDefault();
	
			// Location of text string
			let speechContentText = document.getElementById("speechContentText").value;
			
 			// Speech Synthesis Code starts here 
 			let sharePointShout = new SpeechSynthesisUtterance();  // New object
				sharePointShout.lang = "en";					   // Our langauge
				sharePointShout.text = speechContentText;		   // Text we're saying
		
				
				// Additional configuration options
					// console.log(sharePointShout.voice + " voice");
					// console.log(sharePointShout.volume + " volume");
					// console.log(sharePointShout.pitch + " pitch");
					// console.log(sharePointShout.rate  + " rate");

			
			// Now we speak the text string!
 			speechSynthesis.speak(sharePointShout);
 		
 			// Notify user of text that's read
			SP.UI.Notify.addNotification("We are reading [" + speechContentText + "]", false);
 		
 			
		});
		
	} else {
		// Notify user if SpeechSynthesis isn't supported
		SP.UI.Notify.addNotification("Speech Synthesis isn't supported in this browser", false);
	}

	
}; // readSpeechBox()
	
	
	

// Runs everything after core.js is loaded
ExecuteOrDelayUntilScriptLoaded(readSpeechBox,"core.js");