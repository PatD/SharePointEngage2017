'use strict';

// Assumes PNP-CORE JS	https://github.com/SharePoint/PnP-JS-Core
// Assume ANNYANG.JS	https://github.com/TalAter/annyang

// The Start Recording button.  
let startRecordingButton = document.getElementById("startRecordingButton");

// Name of the SharePoint list we're writing stuff to
let _sharePointListName = "ShoutList";




// Function to write list items. Expects two strings and writes them to a SharePoint list
function writeStringToList(_titleToWrite,_varietyToWrite){

	// Use SharePoint JS PNP-Core Javascript library to POST data
	$pnp.sp.web.lists.getByTitle(_sharePointListName).items.add({
		
		// The values passed in from the function,
		// mapped to columns

		Title: _titleToWrite,
		Variety: _varietyToWrite

	// Promise, so let's tell the user when it's done:
	}).then(addedItem => {

		// Inform the user of the list item added
		SP.UI.Notify.addNotification("We just wrote " + _titleToWrite + " and " + _varietyToWrite + " to the " + _sharePointListName + " list.", false);

	});

}; // writeStringToList




// Function that starts speech recording, puts it in 2 seperate input fields
// ... and passes it to writeStringToList function
let listenForListItemSpeech = function(){
	
	if(annyang){
		
		// Holds our text to write to list
		let spokenTitle;
		let spokenVariety;

		// Signals to our user that we're starting a new list item entry
		var startEntry = function() {
			SP.UI.Notify.addNotification("New Entry Started", false);
		};

		// Stores the title of the list item
		var createTitle = function(listTitle) {
			// console.log("passed value is " + listTitle );
			spokenTitle = listTitle;
			SP.UI.Notify.addNotification(spokenTitle, false);
		};

		// Stores the variety column of the list item
		var createVariety = function(listVariety) {
			// console.log("passed value is " + listVariety );
			spokenVariety = listVariety;
			SP.UI.Notify.addNotification(spokenVariety, false);
		};

		// Writing our entry to our SharePoint list
		var saveEntry = function() {
			writeStringToList(spokenTitle,spokenVariety);
			SP.UI.Notify.addNotification("Saving Entry", false);
		};





		var commands = {
			'start entry': startEntry,

			// annyang will capture anything after a splat (*) and pass it to the function.
			// ... so saying "Title tomato" will capture the word tomato
		
			'title *listTitle': createTitle,

			'variety *listVariety': createVariety,

			'save entry': saveEntry

			
		};


		// OPTIONAL: activate debug mode for detailed logging in the console
		annyang.debug();

		// Add our commands to annyang
		annyang.addCommands(commands);

		// Start listening. You can call this here, or attach this call to an event, button, etc.
		annyang.start();


	}
	else{
		SP.UI.Notify.addNotification("annyang not available", false);
	}



}; // listenForListItemSpeech







function initRecognition(){
	

	// Event handler for Start Recording Button
	startRecordingButton.addEventListener("click",function(event){
		
		// Stop button from submitting form
		event.preventDefault();
		
		// Test for SpeechRecognition support
		if(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition){
		
			SP.UI.Notify.addNotification("SpeechRecognition started", false);
		
			// Start speech recognition
			listenForListItemSpeech();	
		
		} 
		else{
			// Notify users w/out SpeechRecognition support
			SP.UI.Notify.addNotification("SpeechRecognition not supported", false);
			
		}; 
	
	});
};

// Runs everything after core.js is loaded
ExecuteOrDelayUntilScriptLoaded(initRecognition,"core.js");