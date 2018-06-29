	var timerStart		= 5;
	var time 	  		= 0;
	var j 				= 0;
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

	$(document).on('keypress',function(event){
		if(event.key == 'Enter'){
			$('.container').show();
			startGame();
		}
	});

	//Spencer Compton, Pitt the Younger, Arthur Balfour, Edward Heath
	// start game
	function startGame(){
		$('.question').text(prompts[j].question);
		
		for(var i = 0; i<prompts[j].answers.length;i++){
			$('#answer'+(i+1)).text(prompts[j].answers[i]);
		}
		
		timer();
	}

	$(document).on('click','.option',function(){
		userAnswer = $(this).text();
		answer = prompts[j].theAnswer;
		checkAnswer(answer, userAnswer);
	})

	// check if answer is correct or not and 
	// changes game according on answer
	function checkAnswer(answerToGuess, theUserAnswer){
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

	// this function starts the timer
	function timer(){
		$('#timeRemaining').text(timerStart--);
		time = setInterval(
			function(){
				if(timerStart >= 0){
				$('#timeRemaining').text(timerStart--);
			}else{
				$('.gameContainer').hide();
				clearInterval(time);
			}
	 	}, 1000);
	}

	// function timer2(){
	// 	time2= setInterval(
	// 		function(){
	// 			if(timerStart2 >= 0){
	// 			$('#timeRemaining').text(timerStart2--);
	// 		}else{
	// 			$('.gameContainer').hide();
	// 			clearInterval(time2);
	// 		}
	//  	}, 1000);
	// }