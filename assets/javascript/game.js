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
	hp: 100,
	attack: 15,
	computerAttack: 7
}, {
	id: 1,
	name: "Boba Fett",
	img: "assets/images/bPlayer.svg",
	hp: 120,
	attack: 8,
	computerAttack: 15
}, {
	id: 2,
	name: "Anakin Skywalker",
	img: "assets/images/dvPlayer.svg",
	hp: 165,
	attack: 4,
	computerAttack: 20
}, {
	id: 3,
	name: "R2D2",
	img: "assets/images/rPlayer.svg",
	hp: 180,
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
		var hp = $('<h3>');
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
		hp.text('HP: ' + characters[j].hp);
		hp.appendTo(overlay)	
	}
}
startGame();
//Hover, remember that the hovering is attached to the element, not the character class
//This means that when I remove the character class from them they will still have the hovering capability

	$('.characters').hover(
		function() {
			$(this).find('.box-img-overlay').show();
		}, function() {
			$(this).find('.box-img-overlay').hide();
		}
	);

//CharacterSettingClick
function characterSettingClick() {
	$(document).on('click', '.characters', function() {
	$(this).unbind("mouseenter");		
	//Will only run if I haven't picked a player
		if(!pickedPlayer) {
			$(this).off('hovering');
			$('#enemyBoard').show();
			$(this).removeClass('characters');
			pickedPlayer = true;
			$(this).siblings().appendTo($('#enemies'));
			//Got the id attribute of whatever characther i clicked and passed it to myPlayer
			myPlayer = $(this).attr('id');
			//I then targeted the heading, chooseTextCharacter, and replaced by the name of the characther I chose
			$('#chooseTextCharacter').text(characters[myPlayer].name);
			$('#hpTextCharacter').text("HP: " + characters[myPlayer].hp);
		//Will only run if I have picked a player and if I haven't picked an Opponent
		} else if(pickedPlayer && !pickedOpponent) {
			$('#benchedBoard').show();
			$('#attack').show();
			myOpponent = $(this).attr('id');
			$('#chooseTextOpponent').text(characters[myOpponent].name);
			$('#hpTextOpponent').text("HP: " + characters[myOpponent].hp);
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
		characters[myOpponent].hp = characters[myOpponent].hp - i * characters[myPlayer].attack;
		$('#hpTextOpponent').text("HP: " + characters[myOpponent].hp);
		// if (characters[myOpponent].hp <= 0 && )
		i++;
		if(characters[myOpponent].hp <= 0) {
			if($('.characters').length === 1) {
				$('#attack').hide();
				$('#chooseTextOpponent').hide();
				$('#chooseTextCharacter').text(characters[myPlayer].name + " Wins");
			}
			$('#hpTextOpponent').text("");
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
			}
			$('.characters').appendTo($('#enemies'));
		} else {
			//Opponent attacking player
			characters[myPlayer].hp = characters[myPlayer].hp - characters[myOpponent].computerAttack;
			$('#hpTextCharacter').text("HP: " + characters[myPlayer].hp);
			if(characters[myPlayer].hp <= 0) {
				$('#lifeTextCharacter').text("");
				$('#attack').hide();
				$('#characterBoard').hide();
				$('#benchedBoard').hide();
				$('#chooseTextOpponent').text(characters[myOpponent].name + " DEFEATED YOU!");
			}
		}	
	});
}
combatAttackClick();