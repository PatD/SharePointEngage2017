'use strict';

// Start Recording Button!
let startRecordingButton = document.getElementById("startRecordingButton");


// Receive a string, adds it to a k= string in the URL
// If there's a Search Results web part on the 
// page, it will update the results based on this
function updateSearchResults(ourResult){
	var _ourResult = ourResult;
    window.location.hash = 'k=' + _ourResult;
    SP.UI.Notify.addNotification("We searched for" + _ourResult, false);	 
};



function startSpeechRegcognition(){

	// Test for SpeechRecognition capability
	if(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition){

		// Text area!
		let speechRecognitionTextArea = document.getElementById("speechRecognitionTextArea");
	
		// Creates a new SpeechRecognition Object
		let sharePointShout = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	

		sharePointShout.lang = 'en-US';
		
		// We only want the final result this time
		// sharePointShout.continuous = true; 
	
		sharePointShout.interimResults = false;
		sharePointShout.maxAlternatives = 5;
		
		sharePointShout.start();
		
		
		// When the browser is done with your talking, this function is run
		sharePointShout.onresult = function(event) {
			
		    // Puts spoken text in textarea
		    speechRecognitionTextArea.value = event.results[0][0].transcript;
		    
		    // Displayes on screen
		    SP.UI.Notify.addNotification(event.results[0][0].transcript, false);
		    
		    // Passes to function to perform search
		    updateSearchResults(event.results[0][0].transcript);
		    
		};


	}; // if wrapper

}; //startSpeechRegcognition








// Event handler for click Button
startRecordingButton.addEventListener("click",function(event){
	
	// Stop button from submitting form
 	event.preventDefault();
	
	// Start speech recognition
	startSpeechRegcognition();
	
	SP.UI.Notify.addNotification("Mic is hot", false);	 

});
