<script>
let sharePointShout = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

sharePointShout.lang = 'en-US';

// Run continously without stopping
sharePointShout.continuous = true; 

// Show the little bits that is collected
sharePointShout.interimResults = true;

// How many tries to we give the browser?
sharePointShout.maxAlternatives = 5;

sharePointShout.start();


// When the browser is done with your talking, this function is run
sharePointShout.onresult = function(event) {
	
	var textBox = document.getElementById('textBox');	

	textBox.innerHTML = event.results[0][0].transcript;

    console.log('You said: ', event.results[0][0].transcript);

	

   // console.log(event.results);

    
};


</script>
<h1 id="textBox" contenteditable>test</h1>