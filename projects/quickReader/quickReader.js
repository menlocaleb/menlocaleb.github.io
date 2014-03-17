/* Javascript for quickReader app */



var QuickReader = (function() {
	var app = {};

	var str = "This is a paragraph of text. I need a lot so I can test with.";
	var text = str.split(' ');
	var textIndex = 0;
	var interval;
	var timer;
	var running;
	var containerId;

	var showNextWord = function() {
		if (textIndex < text.length) {
			console.log(text[textIndex]);
			document.getElementById(containerId).innerHTML = text[textIndex];
			textIndex = textIndex + 1;
		} else {
			app.stop();
		}
		
	}


	app.setContainer = function( id ) {
		containerId = id;
	}
	
	app.setInterval = function( newInterval ) {

		interval = newInterval;


		if (timer) {
			window.clearInterval(timer);
			timer = undefined;
		}

		if (running) {
			timer = window.setInterval(showNextWord, newInterval);
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



	return app;

}());














window.onload = function() {
	console.log(QuickReader);
	
	QuickReader.setContainer("reading-text");
	QuickReader.setInterval(500);
	QuickReader.start();
	//QuickReader.stop();
};





