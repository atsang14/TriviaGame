	// var timerStart		= 10;			// how long the timeRemaining should be
	// var timer2Start		= 5;
	var time;
	var time2;
	var correctAnswer	= 0;
	var incorrectAnswer	= 0;
	var unAnswered		= 0;
	var j 				= 0;			// this is used to loop through the prompts array
	var Question1		= {
		question: 'How many legs does the Legs of Man have?',
		answers: ['3','2','1','4'],
		theAnswer: '3',
		gifUrlWrong: 'https://media.giphy.com/media/FAx0A9azPd6Hm/giphy.gif',
		gifUrlCorrect: 'https://media1.giphy.com/media/26uTqJWUxDMgWc5pu/giphy.gif'
	}
	var	Question2		= {
		question: 'How tall am i?',
		answers: ['5ft','6ft','4ft','7ft'],
		theAnswer: '4ft',
		gifUrlWrong: 'https://media3.giphy.com/media/4OJFCEeGzYGs0/giphy.gif',
		gifUrlCorrect: 'https://media1.giphy.com/media/26uTqJWUxDMgWc5pu/giphy.gif'
	}
	var testScore		= {
		question: 'All done, heres how you did!',
		correct_answer: 0,
		incorrectAnswer: 0,
		unAnswered: 0
	}

	var prompts		= [Question1, Question2];
	
	$('.container').hide();

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
		var userAnswer = $(this).text();
		var answer = prompts[j].theAnswer;
		var target2 		= $('#hiddenTimer').text();
		clearInterval(time);
		checkAnswer(answer, userAnswer);
	})







	// Spencer Compton, Pitt the Younger, Arthur Balfour, Edward Heath
	// start game
	function startGame(){
		$('.container').show();
		$('.testScore').hide();
		$('.question').text(prompts[j].question);	
		for(var i = 0; i<prompts[j].answers.length;i++){
			$('#answer'+(i+1)).text(prompts[j].answers[i]);
		}
		timer();
		
	}

	// check if answer is correct or not and 
	// changes game according on answer.
	// arguments answerToGuess holds the correct answer
	// while theUserAnsewr text() of the button the user pressed
	function checkAnswer(answerToGuess, theUserAnswer){
		// if answer is correct
		if( theUserAnswer == answerToGuess){
			won();
		// if the answer is not correct
		}else{
			loss();
		}
		
		$('.gameContainer').hide();
	} 

	// this function takes an argument of a specific timer name
	// this is used so that you can make unique timers.
	function timer(){
		var timerStart = 10
		$('#timeRemaining').text(timerStart--);
		time = setInterval(
			function(){
				if(timerStart >= 0){
					$('#timeRemaining').text(timerStart--);
				}else{
					unAnswered++;
					$('.gameContainer').hide();
					$('.outsideGame').show();
					clearInterval(time);
					$('#text').text('Out of Time!');
					$('#answerCheck').text('The Correct Answer Was: '+prompts[j].theAnswer);
					timer2();
			}
	 	}, 1000);
	}

	function timer2(){
		var timer2Start		= 5;
		$('#hiddenTimer').text(timer2Start--);
		$('#gameContainer').hide()
		time2 = setInterval(
			function(){
				if(timer2Start >= 0){
					$('#hiddenTimer').text(timer2Start--);
				}else{
					clearInterval(time2);
					$('.gameContainer').show()
					$('.outsideGame').hide();
					checkPlayAgain();
				}
		},1000)
	}

	function checkPlayAgain(){
		if(j<prompts.length){
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

		}
	}

	function won(){
		$('.outsideGame').show();
		$('#text').text('Correct!');
		timer2();
		debugger;
		$('#image').attr('src', prompts[j].gifUrlCorrect);
		correctAnswer++;
		j++;
	}

	function loss(){
		$('.outsideGame').show();
		$('#answerCheck').text('The Correct Answer Was: ' + prompts[j].theAnswer);
		$('#image').attr('src', prompts[j].gifUrlWrong);
		incorrectAnswer++;
		timer2();
		j++;
	}





















