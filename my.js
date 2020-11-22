var gamepaused=0;
var hours =0;
var mins =0;
var seconds =0;
var wrongattempts=0;
var if_reset_progress=0;
var increment_val=1;
var time_alloted=10;
var timer = time_alloted;
var prog_recursion;
var current_progress;
var totlen;

var myQuiz={
	correctTally: 0,
    currentQuestion: 0,
	questionList:[{
			"question": "Jharkhand",
			"correct": "IN-JH"
		  },
		  {
			"question": "Maharastra",
			"correct": "IN-MH"
		  },
		  {
			"question": "Gujarat",
			"correct": "IN-GJ"
		  },
		  {
			"question": "Nagaland",
			"correct": "IN-NL"
		  },
		  {
			"question": "Punjab",
			"correct": "IN-PB"
		  },
		  {
			"question": "J&K",
			"correct": "IN-JK"
		  },
		  {
			"question": "West Bengal",
			"correct": "IN-WB"
		  },
		  {
			"question": "Uttrakhand",
			"correct": "IN-UT"
		  },
		  {
			"question": "Uttar Pradesh",
			"correct": "IN-UP"
		  },
		  {
			"question": "Tripura",
			"correct": "IN-TR"
		  },
		  {
			"question": "Tamil Nadu",
			"correct": "IN-TN"
		  },
		  {
			"question": "Telangana",
			"correct": "IN-TG"
		  },
		  {
			"question": "Sikkim",
			"correct": "IN-SK"
		  },
		  {
			"question": "Rajasthan",
			"correct": "IN-RJ"
		  },
		  {
			"question": "Puducherry",
			"correct": "IN-PY"
		  },
		  {
			"question": "Mizoram",
			"correct": "IN-MZ"
		  }]
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
   // Fisher-Yates (aka Knuth) Shuffle
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startTimer(){
  timex = setTimeout(function(){
      seconds++;
    if(seconds >59){seconds=0;mins++;
       if(mins>59) {
       mins=0;
	   // Time limit exceed : Game Over : Genrate end signal
       }
                       
    if(mins<10){                     
      $("#mins").text('0'+mins+':');}       
       else $("#mins").text(mins+':');
                   }    
    if(seconds <10) {
      $("#seconds").text('0'+seconds);} else {
      $("#seconds").text(seconds);
      }
     
    
      startTimer();
  },1000);
}

function blink_text(){
   $('#questiontext').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(200, function() {
		// $('#quesmark').addClass('blink_me');
	});
}

$(document).ready(function(){


  $("#playbtn").click(function(){
  	myQuiz.questionList = shuffle(myQuiz.questionList);
    $('#beginscene').fadeOut(250, function() {
		$('#gameplay').css('display','block');
		let currentq = myQuiz.questionList[myQuiz.currentQuestion];
		$('#questiontext').text(currentq.question);	
		blink_text();
		startTimer();
		totlen = myQuiz.questionList.length;
		$('#score').text('0 / '+totlen);
	});
  });


  $("path").click(function(e) {
	if (myQuiz.currentQuestion<myQuiz.questionList.length){
			var choice = $(this).attr('id');
			$('#info_box').css('display','block');
			$('#info_box').css('top',e.pageY-$('#info_box').height()-25);
			$('#info_box').css('left',e.pageX-($('#info_box').width())/2);
			if (choice === myQuiz.questionList[myQuiz.currentQuestion].correct){ // condition to check if the answer is the same as the user choice
				$('#info_box').css('background-color','#99ffbb');
				$('#info_box').html('<div>'+$(this).attr('title')+'</div>');
				var xPos = e.clientX, yPos = e.clientY;
				// $('.ripple').css({
				// 	top: yPos-$('.ripple').height()/2,
				// 	left: xPos-$('.ripple').height()/2
				// }).addClass('newactive');
				
				$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).removeClass("flashing");
				myQuiz.currentQuestion++;
				myQuiz.correctTally++;
				wrongattempts=0;
				// clearInterval(current_progress);
				// $('#scorenow').text(myQuiz.correctTally);
				if (myQuiz.currentQuestion < myQuiz.questionList.length){
					let nextq = myQuiz.questionList[myQuiz.currentQuestion];
					$('#score').text(myQuiz.correctTally+' / '+totlen);
					setTimeout(function(){
					// 		current_progress = countdown(1,10,0);
							$('#info_box').css('display','none');
							$('#questiontext').text(nextq.question);
							blink_text();
					}, 250);
				}
				else{
					setTimeout(function(){
							$('#info_box').css('display','none');
							// clearTimeout(timex);
							$('#score').text('You scored '+ myQuiz.correctTally+'/'+totlen);
							$('#questiontext').html('Game Over!');
					}, 500);
				}
			}
			else{
				$('#info_box').css('background-color','#ff8566');
				$('#info_box').html('<div>'+$(this).attr('title')+'</div>');
				$('#info_box').addClass('ahashakeheartache');
				// myQuiz.correctTally = myQuiz.correctTally-0.25;
				wrongattempts = wrongattempts+1;
				// $('#score').text(myQuiz.correctTally);
				setTimeout(function(){
						$('#info_box').removeClass('ahashakeheartache');
						$('#info_box').css('display','none');
						if (wrongattempts>=3){
							console.log('sdsds');
							$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).addClass("flashing");
						}
				}, 500);
			}
		}	
	});

  	(function() {
	  var el = document.querySelector("#IndiaMap");
	  var mc = new Hammer(el, {
	    domEvents: true
	  });

	  var currentScale = 1;
	  var currentLeft = 0;
	  var currentTop = 0;

	  // zoom
	  mc.get("pinch").set({ enable: true });
	  mc.on("pinchstart", function(ev) {
	    // on pinch zoom we eliminate the panning event listener
	    //so that we dont have that weird movement after we end pinching
	    mc.off("pan");
	  });
	  mc.on("pinch", function(ev) {
	    el.style.transform =
	      "scale(" +
	      currentScale * ev.scale +
	      ") translate(" +
	      currentLeft +
	      "px," +
	      currentTop +
	      "px)";
	  });
	  mc.on("pinchend", function(ev) {
	    currentScale = currentScale * ev.scale;

	    // once we have ended pinch zooming we fire off the panning event once again
	    window.setTimeout(hammerPan, 50);
	  });

	  // panning function
	  function hammerPan() {
	    mc.on("pan", function(ev) {
	      el.style.transform =
	        "scale(" +
	        currentScale +
	        ") translate(" +
	        (currentLeft + ev.deltaX / currentScale) +
	        "px," +
	        (currentTop + ev.deltaY / currentScale) +
	        "px)";
	    });
	  }

	  hammerPan();
	  mc.on("panend", function(ev) {
	    currentLeft = currentLeft + ev.deltaX / currentScale;
	    currentTop = currentTop + ev.deltaY / currentScale;
	  });

	  //reset button
	  document.querySelector("#resetloc").addEventListener("click", function() {
	    el.style.transform = "scale(1) translate(0,0)";

	    currentScale = 1;
	    currentLeft = 0;
	    currentTop = 0;
	  });
	})();

});