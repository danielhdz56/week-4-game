//Global Variables
var myPlayer;
var myOpponent;
var pickedPlayer = false;
var pickedOpponent = false;
var i = 1;
//this is an array with four objects
var characters = [ {
	id: 0,
	name: "Obi-Wan Kenobi",
	life: 100,
	attack: 10,
	computerAttack: 25
}, {
	id: 1,
	name: "Boba Fett",
	life: 100,
	attack: 10,
	computerAttack: 25
}, {
	id: 2,
	name: "Anakin Skywalker",
	life: 100,
	attack: 10,
	computerAttack: 25
}, {
	id: 3,
	name: "R2D2",
	life: 100,
	attack: 10,
	computerAttack: 25
}];
$('.characters').hover(
	function() {
		$(this).find('.destroy').show();
	}, function() {
		$(this).find('.destroy').hide();
	}
);
function characterSettingClick() {
	$(document).on('click', '.characters', function(){
		if(!pickedPlayer) {
			myPlayer = $(this).attr('id');
			$(this).siblings().addClass('enemy');
			$('.characters').toggleClass('m-0a');	
			$(this).siblings().appendTo('#enemyBoard');
			$('#enemies').show();
			$(this).removeClass('characters');
			pickedPlayer = true;
			console.log("myPlayer has the following id: " + myPlayer);
			myPlayer = characters[myPlayer];
			console.log(myPlayer);
		}
		else if(pickedPlayer && !pickedOpponent) {
			myOpponent = $(this).attr('id');
			$(this).siblings().addClass('benched');
		  	$(this).siblings().appendTo('#benchedBoard');
		 	$('#attack').show();
		 	$('#bench').show();
			pickedOpponent = true;
			console.log("myOpponent has the following id: " + myOpponent);
			myOpponent = characters[myOpponent];
			console.log(myOpponent.life);
		}
	});
}
characterSettingClick();

function combatAttackClick() {
	$('#attack').click(function() {
		//Player attacking opponent it is important that the variable i is defined at the Global Scope or else it will always reset on click
		myOpponent.life = myOpponent.life - (myPlayer.attack * i);
		i++;
		$('#' + myOpponent.id).find("p").html("Life: " + myOpponent.life);
		if( myOpponent.life <= 0) {
			$('#' + myOpponent.id).remove();
		}
		//Opponent attacking player
		myPlayer.life = myPlayer.life - myOpponent.computerAttack;
		$('#' + myPlayer.id).find("p").html("Life: " + myPlayer.life);
	});
}
combatAttackClick();