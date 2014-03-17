/* Javascript for quickReader app */



var QuickReader = (function() {
	var app = {};

	var str = "This is a paragraph of text. I need a lot so I can test with.";
	var text = str.split(' ');
	var textIndex = 0;
	var interval;
	var timer;
	var minuteToMilliseconds = 60000;
	var running = false;
	var containerId;

	var getWord = function() {
		var word = text[textIndex];
		if (word.length > 2) {
			var midPt = Math.floor((word.length-1)/2);
			return word.substr(0,midPt) + '<span class="highlight-text">' + word.substr(midPt,1) + "</span>" + word.substr(midPt+1);
		} else {
			return word;
		}
		
	}

	var showNextWord = function() {
		if (textIndex < text.length) {
			document.getElementById(containerId).innerHTML = getWord();
			textIndex = textIndex + 1;
		} else {
			app.stop();
		}
		
	}


	app.isRunning = function() {
		return running;
	}

	app.setContainer = function( id ) {
		containerId = id;
	}
	
	app.setInterval = function( newInterval ) {

		interval = (1 / newInterval) * minuteToMilliseconds;


		if (timer) {
			window.clearInterval(timer);
			timer = undefined;
		}

		if (running) {
			timer = window.setInterval(showNextWord, interval);
		}

		
	}

	app.start = function() {
		if (!containerId) {
			return;
		}

		if (!timer) {
			timer = window.setInterval(showNextWord, interval);
		}

		running = true;
	};

	app.stop = function() {
		if (timer) {
			window.clearInterval(timer);
			timer = undefined;
		}

		running = false;
		console.log("Stopped.");
	}

	app.reset = function() {
		textIndex = 0;
		// if app is paused, reset screen to first word
		if (!running) {
			showNextWord();
		}
	}


	return app;

}());





function init() {
	var element = document.getElementById("start-stop-button");
	element.onclick = function() {
		if (QuickReader.isRunning()) {
			QuickReader.stop();
			this.innerHTML = "Start";
			this.style.background = "green";
		} else {
			QuickReader.start();
			this.innerHTML = "Stop";
			this.style.background = "red";
		}
	};

	document.getElementById("reset-button").onclick = function() {
		document.getElementById("start-stop-button").onclick;
		QuickReader.reset();
		document.getElementById("start-stop-button").onclick;
	}


	var wpmInput = document.getElementById("wpm");
	wpmInput.onchange = function() {
		var wpm = document.getElementById("wpm").value;
		if (!isNaN(wpm)) {
			QuickReader.setInterval(wpm);
		}
	}
	wpmInput.value = 250;


	QuickReader.setContainer("reading-text");
	QuickReader.setInterval(250);
}





window.onload = function() {
	console.log(QuickReader);
	
	init();
	

};





