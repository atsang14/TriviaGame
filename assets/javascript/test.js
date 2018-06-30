	var timerStart		= 5;			// how long the timeRemaining should be
	var time 	  		= 0;			// this holds the timer specificly for the #timeRemaining
	var j 				= 0;			// this is used to loop through the prompts array
	var target = $('#timeRemaining');	// location for timer
	var Question1		= {
		question: 'How many legs does the Legs of Man have?',
		answers: ['3','2','1','4'],
		theAnswer: '3',
		gifUrlWrong: 'https://media.giphy.com/media/FAx0A9azPd6Hm/giphy.gif'
	}
	var	Question2		= {
		question: 'How tall am i?',
		answers: ['5ft','6ft','4ft','7ft'],
		theAnswer: '4ft',
		gifUrlWrong: 'https://media3.giphy.com/media/4OJFCEeGzYGs0/giphy.gif'
	}

	var prompts		= [Question1, Question2]
	
	$('.container').hide();

	// on pressing 'Enter', show the container
	// and then start game.
	$(document).on('keypress',function(event) {
		debugger;
		if(event.key == 'Enter'){
			$('.container').show();
			startGame();
		}
	});

	// when clicking a button with class 'option',
	// that becomes the user's answer
	$(document).on('click','.option',function() {
		debugger;
		var userAnswer = $(this).text();
		var answer = prompts[j].theAnswer;
		checkAnswer(answer, userAnswer);
	})


	//Spencer Compton, Pitt the Younger, Arthur Balfour, Edward Heath
	// start game
	function startGame() {
		debugger;
		$('.question').text(prompts[j].question);	
		for(var i = 0; i<prompts[j].answers.length;i++){
			$('#answer'+(i+1)).text(prompts[j].answers[i]);
		}

		timer(time, timerStart, target);
	}

	// check if answer is correct or not and 
	// changes game according on answer.
	// arguments answerToGuess holds the correct answer
	// while theUserAnsewr text() of the button the user pressed
	function checkAnswer(answerToGuess, theUserAnswer) {
		debugger;
		// if answer is correct
		if( theUserAnswer == answerToGuess){
			alert('hi');
			clearInterval(time);
			j++;
			if(j<prompts.length){
				startGame();
			}else{
				// here we want to show if somebody is wrong
				// and thenn call a function
				return;
			}
		} 
		// if answer is not correct
		else {
			$('#image').attr('src', prompts[j].gifUrlWrong);
			clearInterval(time);
			j++;
			if(j<prompts.length){
				startGame();
			}else{
				return;
			}
		}
	}

	// this function takes an argument of a specific timer name
	// this is used so that you can make unique timers.
	function timer(pickTimer, timerStart, targetLocation) {
		targetLocation.text(timerStart--);
		pickTimer = setInterval(
			function(){
				if(timerStart >= 0){
					targetLocation.text(timerStart--);
				}else{
					$('.gameContainer').hide();
					clearInterval(pickTimer);
					$('#text').text('Out of Time!');
					$('#answerCheck').text('The Correct Answer Was: '+prompts[j].theAnswer);
					j++
			}
	 	}, 1000);
	}



