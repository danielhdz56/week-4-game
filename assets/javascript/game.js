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
	img: "assets/images/bkPlayer.svg",
	life: 100,
	attack: 15,
	computerAttack: 7
}, {
	id: 1,
	name: "Boba Fett",
	img: "assets/images/bPlayer.svg",
	life: 120,
	attack: 8,
	computerAttack: 15
}, {
	id: 2,
	name: "Anakin Skywalker",
	img: "assets/images/dvPlayer.svg",
	life: 165,
	attack: 4,
	computerAttack: 20
}, {
	id: 3,
	name: "R2D2",
	img: "assets/images/rPlayer.svg",
	life: 180,
	attack: 3,
	computerAttack: 25
}];
//Creating the characters
function startGame() {
	for(j = 0; j < characters.length; j++) {
		var charactherChoices = $('<div>');
		var box = $('<div>');
		var img = $('<img>');
		var overlay = $('<div>');
		var name = $('<h3>');
		var life = $('<p>');
		charactherChoices.attr('id', j);
		charactherChoices.addClass('col-3 characters');
		charactherChoices.appendTo('#characters');
		box.addClass('box');
		box.appendTo(charactherChoices);
		img.addClass('img-fluid');
		//can you put more attributes in one line?
		img.attr('src', characters[j].img);
		img.attr('alt', characters[j].name);
		img.appendTo(box);
		overlay.addClass('box-img-overlay');
		overlay.hide();
		overlay.appendTo(box);
		name.addClass('box-title');
		name.text(characters[j].name);
		name.appendTo(overlay);
		life.text('Life: ' + characters[j].life);
		life.appendTo(overlay)	
	}
}
startGame();
//Hover, remember that the hovering is attached to the element, not the character class
//This means that when I remove the character class from them they will still have the hovering capability
function hovering() {
	$('.characters').hover(
		function() {
			$(this).find('.box-img-overlay').show();
		}, function() {
			$(this).find('.box-img-overlay').hide();
		}
	);
}
hovering();
//CharacterSettingClick
function characterSettingClick() {
	$(document).on('click', '.characters', function() {
		//Will only run if I haven't picked a player
		if(!pickedPlayer) {
			$('#enemyBoard').show();
			$(this).removeClass('characters');
			pickedPlayer = true;
			$(this).siblings().appendTo($('#enemies'));
			//Got the id attribute of whatever characther i clicked and passed it to myPlayer
			myPlayer = $(this).attr('id');
			//I then targeted the heading, chooseTextCharacter, and replaced by the name of the characther I chose
			$('#chooseTextCharacter').text(characters[myPlayer].name);
		//Will only run if I have picked a player and if I haven't picked an Opponent
		} else if(pickedPlayer && !pickedOpponent) {
			$('#benchedBoard').show();
			$('#attack').show();
			myOpponent = $(this).attr('id');
			$('#chooseTextOpponent').text(characters[myOpponent].name)
			$(this).siblings().addClass('benchedEnemies');
			$(this).siblings().addBack().removeClass('characters');
			$(this).siblings().appendTo($('#benched'));
		}
	})
}
characterSettingClick();
//Combat
function combatAttackClick() {
	$('#attack').click(function() {
		//Player attacking opponent it is important that the variable i is defined at the Global Scope or else it will always reset on click
		characters[myOpponent].life = characters[myOpponent].life - i * characters[myPlayer].attack;
		// if (characters[myOpponent].life <= 0 && )
		i++;
		$('#' + myOpponent).find('p').text('Life: ' + characters[myOpponent].life)
		if(characters[myOpponent].life <= 0) {
			if($('.characters').length === 1) {
				console.log("hello World!");
				$('#attack').hide();
				$('#chooseTextOpponent').hide();
				$('#chooseTextCharacter').text(characters[myPlayer].name + " Wins");
			}
			$('#' + myOpponent).remove();
			$('.benchedEnemies').addClass('characters');
			$('#benchedBoard').hide();
			if($('div.benchedEnemies').length === 1) {
				myOpponent = $('.benchedEnemies').attr('id');
				$('#chooseTextOpponent').text(characters[myOpponent].name);
				$('.characters').removeClass('benchedEnemies');
				//This makes it so the click doesn't work for the last enemy
				pickedOpponent = true;
				console.log("Hello1");
			}
			else if($('.characters').length !== 0) {
				$('#chooseTextOpponent').text("Choose Another Opponent");
				$('.characters').removeClass('benchedEnemies');
				$('#attack').hide();
				console.log("Hello2")
			}
			$('.characters').appendTo($('#enemies'));
		} else {
			//Opponent attacking player
			characters[myPlayer].life = characters[myPlayer].life - characters[myOpponent].computerAttack;
			myPlayer.life = myPlayer.life - myOpponent.computerAttack;
			$('#' + myPlayer).find('p').text('Life: ' + characters[myPlayer].life);
			if(characters[myPlayer].life <= 0) {
				console.log("I have lost!");
				$('#attack').hide();
				$('#characterBoard').hide();
				$('#benchedBoard').hide();
				$('#chooseTextOpponent').text(characters[myOpponent].name + " DEFEATED YOU!");
			}
		}	
	});
}
combatAttackClick();