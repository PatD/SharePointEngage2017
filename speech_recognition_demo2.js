'use strict';

// Start Recording Button!
let startRecordingButton = document.getElementById("startRecordingButton");




function speechRecognitionDemo(){
	
	// Test for SpeechRecognition capability
	if(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition){
		
		// Notify the user that SpeechRecognition is supported
		SP.UI.Notify.addNotification("SpeechRecognition Supported", false);
	
	
	
	
		// Function that records speech and puts into text box
		let startSpeechRegcognition = function(){
		
			// Text area!
			let speechRecognitionTextArea = document.getElementById("speechRecognitionTextArea");
		
		
			// Creates a new SpeechRecognition Object
			let sharePointShout = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
		
			sharePointShout.lang = 'en-US';
			
			// Run continously without stopping
			// sharePointShout.continuous = true; 
			
			// Show the little bits that is collected
			sharePointShout.interimResults = true;
			
			sharePointShout.maxAlternatives = 5;
			
			sharePointShout.start();
			
			
			// When the browser is done with your talking, this function is run
			sharePointShout.onresult = function(event) {
				
			    console.log('You said: ', event.results[0][0].transcript);
			    
			    speechRecognitionTextArea.value = event.results[0][0].transcript;
			    
			    SP.UI.Notify.addNotification(event.results[0][0].transcript, false);
			};
	
	
	
	/*
	
			// Tells us when things are happening	
			[
			 'onaudiostart',
			 'onaudioend',
			 'onend',
			 'onerror',
			 'onnomatch',
			 'onresult',
			 'onsoundstart',
			 'onsoundend',
			 'onspeechend',
			 'onstart'
			].forEach(function(eventName) {
			    recognition[eventName] = function(e) {
			        console.log(eventName, e);
			    };
			});
		
	
			*/
		};
	
		// Event handler for click Button
		startRecordingButton.addEventListener("click",function(e){
		
			// Stop button from submitting form
			e.preventDefault();
			
			// Start speech recognition
			startSpeechRegcognition();
		
		});
	

	}; // If statement wrappers
	
}; // speechRecognitionDemo function







// Waits for sp.js file to load, so we can use notifications	
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', speechRecognitionDemo);
