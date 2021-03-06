$( document ).ready(function() {
    $('#quesmark').addClass('blink_me');
});


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
   $('#quesmark').removeClass('blink_me');
   $('#interactcont').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(200, function() {
		$('#quesmark').addClass('blink_me');
	});
}


function countdown(varone,vartwo,via_resume){
	increment_val = varone;
	$('#progressBar > div').css('background-color','yellow');
	if(via_resume==0){
		time_alloted = vartwo;
		timer = time_alloted;
		$('#progressBar').find('div').animate({ width: $('#progressBar').width()},100);
	}
	timer_id = setInterval(reduce_time, 1000);
	return timer_id;
}

function reduce_time(){
	timer=timer-increment_val;
	if(timer>=0){
		var progressBarWidth = timer * $('#progressBar').width() / time_alloted;
		if(timer<=2){
			$('#progressBar > div').css('background-color','red');
		}
		else{
			$('#progressBar > div').css('background-color','yellow');
		}
		$('#progressBar').find('div').animate({ width: progressBarWidth}, 500);
	}
	else{
		$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).addClass("flashing");
	}
}

$('#play-btn').click(function(e){
  myQuiz.questionList = shuffle(myQuiz.questionList);
  $('#intro').fadeOut(250, function() {
		$('#gameplay').css('display','block');
		let currentq = myQuiz.questionList[myQuiz.currentQuestion];
		$('#interactcont').text(currentq.question);
		blink_text();
		current_progress = countdown(1,10,0);
		startTimer();		
	});
});


$('#mainbtn').click(function(){
	$('.overlay').toggleClass('targetpop');
	clearTimeout(timex);
	clearInterval(current_progress);
	gamepaused=1;
	$('#interactcont').html('Game Paused!');
});

$('#settings').click(function(){
	$('.settings_icon').toggleClass("down");
	if($('#content_settings').css('display')==='none'){
		$('#setting_label').css('color','red');
		$('#content_settings').fadeIn(500);
	}
	else{
		$('#setting_label').css('color','black');
		$('#content_settings').fadeOut(500);
	}
});

$('#resume').click(function(){
	$('.overlay').toggleClass('targetpop');
	gamepaused=0;
	let currentq = myQuiz.questionList[myQuiz.currentQuestion];
	$('#interactcont').text(currentq.question);
	startTimer();
	current_progress = countdown(1,10,1);
});

$('#restart').click(function(){
	clearTimeout(timex);
	clearInterval(current_progress);
	gamepaused=0;
	gamepaused=0;
	hours =0;
	mins =0;
	seconds =0;
	wrongattempts=0;
	increment_val=1;
	time_alloted=10;
	timer = time_alloted;
	$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).removeClass("flashing");
	myQuiz.currentQuestion=0;
	myQuiz.correctTally=0;
	$('#scorenow').text(myQuiz.correctTally);
	$("#seconds").text('0'+seconds);
	$("#mins").text('0'+mins+':');
	$('.overlay').toggleClass('targetpop');
	$('#gameplay').fadeOut(250, function() {
		$('#intro').css('display','block');		
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
			$('#info_box').html('<div><b>CORRECT !</b></br>'+$(this).attr('title')+'</div>');
			var xPos = e.clientX, yPos = e.clientY;
			$('.ripple').css({
				top: yPos-$('.ripple').height()/2,
				left: xPos-$('.ripple').height()/2
			}).addClass('active');
			
			$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).removeClass("flashing");
			myQuiz.currentQuestion++;
			myQuiz.correctTally++;
			wrongattempts=0;
			clearInterval(current_progress);
			$('#scorenow').text(myQuiz.correctTally);
			if (myQuiz.currentQuestion < myQuiz.questionList.length){
				let nextq = myQuiz.questionList[myQuiz.currentQuestion];
				$('#scorenow').text(myQuiz.correctTally);
				setTimeout(function(){
						current_progress = countdown(1,10,0);
						$('#info_box').css('display','none');
						$('#interactcont').text(nextq.question);
						blink_text();
				}, 250);
			}
			else{
				setTimeout(function(){
						$('#info_box').css('display','none');
						clearTimeout(timex);
						$('#score').text('You scored '+ myQuiz.correctTally);
						$('#progressBar').find('div').animate({ width: $('#progressBar').width()}, 50);
						$('#interactcont').html('Thanks for Playing!');
				}, 500);
			}
		}
		else{
			$('#info_box').css('background-color','#ff8566');
			$('#info_box').html('<div><b>WRONG !</b></br>'+$(this).attr('title')+'</div>');
			$('#info_box').addClass('ahashakeheartache');
			myQuiz.correctTally = myQuiz.correctTally-0.25;
			wrongattempts = wrongattempts+1;
			$('#scorenow').text(myQuiz.correctTally);
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

$(".ripple").on('animationend webkitAnimationEnd oAnimationEnd oanimationend MSAnimationEnd', 
function() {
 $('.ripple').removeClass('active');
}); 

$( function() {
	var spinner1 = $( "#spinner1" ).spinner();
	spinner1.spinner('option', 'min', 0);
	spinner1.spinner('option', 'max', 300);
	spinner1.spinner( "value", 10 );
});
$( function() {
	var spinner2 = $( "#spinner2" ).spinner();
	spinner2.spinner('option', 'min', 0);
	spinner2.spinner('option', 'max', 100);
	spinner2.spinner( "value", 100);
});
$( function() {
	var spinner3 = $( "#spinner3" ).spinner();
	spinner3.spinner('option', 'min', 1);
	spinner3.spinner( "value", 1 );
});
$( function() {
	var spinner4 = $( "#spinner4" ).spinner();
	spinner4.spinner('option', 'min', 0);
	spinner4.spinner('option', 'max', 100);
	spinner4.spinner( "value", 25 );
});

$('#spinner1_toggle').click(function(){
	var spinner1 = $( "#spinner1" ).spinner();
	if ( spinner1.spinner( "option", "disabled" ) ) {
		spinner1.spinner( "enable" );
	} else {
		spinner1.spinner( "disable" );
	}
});
$('#spinner2_toggle').click(function(){
	var spinner2 = $( "#spinner2" ).spinner();
	if ( spinner2.spinner( "option", "disabled" ) ) {
		spinner2.spinner( "enable" );
	} else {
		spinner2.spinner( "disable" );
	}
});
$('#spinner4_toggle').click(function(){
	var spinner4 = $( "#spinner4" ).spinner();
	if ( spinner4.spinner( "option", "disabled" ) ) {
		spinner4.spinner( "enable" );
	} else {
		spinner4.spinner( "disable" );
	}
});

var requestFullscreen = function (ele) {
	if (ele.requestFullscreen) {
		ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};

var exitFullscreen = function () {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};


// var fsDocButton = document.getElementById('fullscreen_button');
// var fsExitDocButton = document.getElementById('exitfull_button');


// (function() {
//   var el = document.querySelector("#map");
//   var mc = new Hammer(el, {
//     domEvents: true
//   });

//   var currentScale = 1;
//   var currentLeft = 0;
//   var currentTop = 0;

//   // zoom
//   mc.get("pinch").set({ enable: true });
//   mc.on("pinchstart", function(ev) {
//     // on pinch zoom we eliminate the panning event listener
//     //so that we dont have that weird movement after we end pinching
//     mc.off("pan");
//   });
//   mc.on("pinch", function(ev) {
//     el.style.transform =
//       "scale(" +
//       currentScale * ev.scale +
//       ") translate(" +
//       currentLeft +
//       "px," +
//       currentTop +
//       "px)";
//   });
//   mc.on("pinchend", function(ev) {
//     currentScale = currentScale * ev.scale;

//     // once we have ended pinch zooming we fire off the panning event once again
//     window.setTimeout(hammerPan, 50);
//   });

//   // panning function
//   function hammerPan() {
//     mc.on("pan", function(ev) {
//       el.style.transform =
//         "scale(" +
//         currentScale +
//         ") translate(" +
//         (currentLeft + ev.deltaX / currentScale) +
//         "px," +
//         (currentTop + ev.deltaY / currentScale) +
//         "px)";
//     });
//   }

//   hammerPan();
//   mc.on("panend", function(ev) {
//     currentLeft = currentLeft + ev.deltaX / currentScale;
//     currentTop = currentTop + ev.deltaY / currentScale;
//   });

//   //reset button
//   document.querySelector("#adjust_button").addEventListener("click", function() {
//     el.style.transform = "scale(1) translate(0,0)";

//     currentScale = 1;
//     currentLeft = 0;
//     currentTop = 0;
//   });
// })();
