/* Javascript for quickReader app */



var QuickReader = (function() {
	var app = {};

	var str = "This is a paragraph of text. I need a lot so I can test with.";
	var str2 = "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats—the hobbit was fond of visitors. The tunnel wound on and on, going fairly but not quite straight into the side of the hill—The Hill, as all the people for many miles round called it—and many little round doors opened out of it, first on one side and then on another. No going upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden, and meadows beyond, sloping down to the river.";
	var text = str2.split(' ');
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

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}


function wikiTest( queryText ) {
	var queryEndPt = "http://en.wikipedia.org/w/api.php?";
	var format = "format=json";
	var action = "action=query";
	var rvprop = "rvprop=content";
	var titles = "titles=Peter Pan";

	var fullString = queryEndPt + format + "&" + action + "&" + rvprop + "&" + titles;
	var fullURL = encodeURI(fullString);

	return fullURL;

	// encodeURI();
}




window.onload = function() {
	console.log(QuickReader);
	
	init();

	var request = makeHttpObject();
	request.open('GET', wikiTest(""));
	request.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
    		console.log('response: ' + this.responseText);
  		}
	};
	request.send(null);
	console.log(request.responseText);
	

};





