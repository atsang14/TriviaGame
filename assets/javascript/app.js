	var theUrl 			= 'https://opentdb.com/api.php?amount=10'; // trivia API link
	var time;							// This variable is used to reference specific timer
	var time2;							// This variable is used to reference another specific timer
	var correctAnswer	= 0;
	var incorrectAnswer	= 0;
	var unAnswered		= 0;
	var j 				= 0;			// this is used to loop through the prompts array
	var testScore		= {
		question: 'All done, heres how you did!',
		correct_answer: 0,
		incorrectAnswer: 0,
		unAnswered: 0
	}

	var prompts		= [];				// this array will hold all the objects from the API

	// after using this ajax function, 
	// .then runs a function that will copy all the neccessary keys in the objects into 
	// prompts array
	$.ajax({
		url: theUrl
	}).then(function(res) {
		var results = res.results; // array that contains all the questions.

		for(var k = 0; k < results.length; k++){
			
			prompts.push(results[k]);
			prompts[k].answers = prompts[k].incorrect_answers;
			prompts[k].theAnswers = prompts[k].correct_answer;
			prompts[k].answers.push(prompts[k].theAnswers);

		}		

	});
	
	$('.container').hide();
	$('#hiddenTimer').hide();
	// on pressing 'Enter', show the container
	// and then start game.
	$(document).on('keypress',function(event){
		if(event.key == 'Enter'){
			startGame();
		}
	});

	// when clicking a button with class 'option',
	// that becomes the user's answer and timer stops
	$(document).on('click','.option',function(){
		var userAnswer 	= $(this).text();
		var answer 		= prompts[j].theAnswers;
		var target2 	= $('#hiddenTimer').text();
		clearInterval(time);
		checkAnswer(answer, userAnswer);
	})

	// Spencer Compton, Pitt the Younger, Arthur Balfour, Edward Heath
	// start game
	function startGame() {
		$('.container').show();
		$('.testScore').hide();
		$('.gameContainer').show();
		$('.buttonContainer').text('');

		// $('.question').text(prompts[j].question);	
		// for(var i = 0; i<prompts[j].answers.length;i++){
		// 	$('#answer'+(i+1)).text(prompts[j].answers[i]);
		// }
		$('.question').text(prompts[j].question);
		for(var i = 0; i < prompts[j].answers.length; i++) {			
			var button = $('<button>').attr('class','option').attr('id', 'answer'+i);
			button.text(prompts[j].answers[i]);
			$('.buttonContainer').append(button);
		}
		
		timer();
	}

	// check if answer is correct or not and 
	// changes game according on answer.
	// arguments answerToGuess holds the correct answer
	// while theUserAnsewr text() of the button the user pressed
	function checkAnswer(answerToGuess, theUserAnswer) {
		// if answer is correct
		if( theUserAnswer == answerToGuess) {
			won();
		// if the answer is not correct
		}else if (theUserAnswer != answerToGuess){
			loss();
		}
		
		$('.gameContainer').hide();
	} 

	// this function takes an argument of a specific timer name
	// this is used so that you can make unique timers.
	function timer() {
		var timerStart = 5;
		$('#timeRemaining').text(timerStart--);
		time = setInterval(
			function() {
				if(timerStart >= 0) {
					$('#timeRemaining').text(timerStart--);
				}else{
					unAnswered++;
					j++;
					$('.gameContainer').hide();
					$('.outsideGame').show();
					clearInterval(time);
					$('#text').text('Out of Time!');
					$('#answerCheck').text('The Correct Answer Was: '+prompts[j].theAnswers);
					$('#image').attr('src', 'https://media3.giphy.com/media/1j9lR5RXCgxAnD74dC/giphy.gif');
					timer2();
			}
	 	}, 1000);
	}

	// timer2() incorporates a second timer after a user makes an initial guess.
	// This serves the purpose of how long the '.outsideGame' div should last for
	function timer2() {
		var timer2Start		= 3;
		$('#hiddenTimer').text(timer2Start--);
		$('#gameContainer').hide()
		time2 = setInterval(
			function() {
				if(timer2Start >= 0) {
					$('#hiddenTimer').text(timer2Start--);
				}else{
					clearInterval(time2);
					$('.gameContainer').show()
					$('.outsideGame').hide();
					checkPlayAgain();
				}
		},1000);
	}

	// this function checks the conditions if we should play again
	// if the loop variable 'j' is less than the length of the array,
	// then we should continue playing. If not, then we show the testScore page
	function checkPlayAgain() {
		if(j<prompts.length) {
			startGame();
		} else {
			// create reset function and then call here
			$('.gameContainer').hide();
			$('.outsideGame').hide();
			$('.testScore').show();
			testScore.correctAnswer 	= correctAnswer;
			testScore.incorrectAnswer 	= incorrectAnswer;
			testScore.unAnswered		= unAnswered;
			$('#prompt').text(testScore.question);
			$('#correct').text(testScore.correctAnswer);
			$('#incorrect').text(testScore.incorrectAnswer);
			$('#unanswered').text(testScore.unAnswered)
			$('restorePage').show();
		}
	}

	// this function changes the '.outsideGame' div to indicate the user has won
	function won() {
		$('#text').text('Correct!');
		$('#answerCheck').text('');
		$('.outsideGame').show();
		timer2();
		$('#image').attr('src', 'https://media1.giphy.com/media/26uTqJWUxDMgWc5pu/giphy.gif'); // prompts[j].gifUrlCorrect);
		correctAnswer++;
		j++;
	}

	// this function changes the '.outsideGame' div to indicate the user has lost
	function loss() {
		$('#text').text('Nope!');
		$('.outsideGame').show();
		$('#answerCheck').text('The Correct Answer Was: ' + prompts[j].theAnswers);
		$('#image').attr('src', 'https://media3.giphy.com/media/4OJFCEeGzYGs0/giphy.gif');// prompts[j].gifUrlWrong);
		incorrectAnswer++;
		timer2();
		j++;
	}

	// Reset function
	$(document).on('click','#restorePage', function() {
		correctAnswer	= 0;
		incorrectAnswer	= 0;
		unAnswered 		= 0;
		j 				= 0;
		startGame();
	})