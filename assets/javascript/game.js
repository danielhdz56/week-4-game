//Gradient Background
var graminInstance = new Granim( {
	element: '#canvas-radial',
	name: 'radial-gradient', 
	direction: 'radial',
	opacity: [1, 1],
	isPausedWhenNotInView: true,
	states: {
		"default-state": {
			gradients: [
				['#000046', '#1CB5E0'],
				['#1CB5E0', '#000046'],
			]
		}
	}
});
//Theme Song
myAudio = new Audio('assets/audio/101-opening.mp3'); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();
//Global Variables
//Although the variables aren't declared to a specific value, this allows us to update any changes made inside blocks of code at the Global level. 
var myPlayer;
var myOpponent;
var pickedPlayer;
var pickedOpponent;
var attackMultiplier;
var characters;
//Creating the characters
function startGame() {
	$('#characterBoard').empty();
	$('#enemyBoard').empty();
	$('#benchedBoard').empty();
	characters = [ {
		id: 0,
		name: "Meowth",
		img: "assets/images/meowth.svg",
		hp: 100,
		attack: 15,
		computerAttack: 7,
		animation: "assets/images/fireball.gif",
		animationName: "fireball"
	}, {
		id: 1,
		name: "Pikachu",
		img: "assets/images/pikachu.svg",
		hp: 120,
		attack: 8,
		computerAttack: 15
	}, {
		id: 2,
		name: "Snorlax",
		img: "assets/images/snorlax.svg",
		hp: 165,
		attack: 4,
		computerAttack: 20
	}, {
		id: 3,
		name: "Dratini",
		img: "assets/images/dratini.svg",
		hp: 180,
		attack: 3,
		computerAttack: 25
	}];
	attackMultiplier = 1;
	pickedPlayer = false;
	pickedOpponent = false;
	//This sets up the characther screen
	var chooseTextCharacter = $('<h2>');
	var character = $('<div>');
	var hpTextCharacter = $('<h2>');
	chooseTextCharacter.attr('id', "chooseTextCharacter");
	chooseTextCharacter.addClass('text-center');
	chooseTextCharacter.text("CHOOSE A POKEMON")
	chooseTextCharacter.appendTo('#characterBoard');
	character.attr('id', "characters");
	character.addClass('row');
	character.appendTo('#characterBoard');
	hpTextCharacter.attr('id', "hpTextCharacter");
	hpTextCharacter.addClass('text-center');
	hpTextCharacter.appendTo('#characterBoard');
	for(i = 0; i < characters.length; i++) {
		var charactherChoices = $('<div>');
		var box = $('<div>');
		var img = $('<img>');
		var overlay = $('<div>');
		var name = $('<h3>');
		var hp = $('<h3>');
		charactherChoices.attr('id', i);
		charactherChoices.addClass('col-3 characters');
		charactherChoices.appendTo('#characters');
		box.addClass('box');
		box.appendTo(charactherChoices);
		img.addClass('img-fluid');
		//can you put more attributes in one line?
		img.attr('src', characters[i].img);
		img.attr('alt', characters[i].name);
		img.appendTo(box);
		overlay.addClass('box-img-overlay');
		overlay.hide();
		overlay.appendTo(box);
		name.addClass('box-title');
		name.text(characters[i].name);
		name.appendTo(overlay);
		hp.text('HP: ' + characters[i].hp);
		hp.appendTo(overlay)	
	}
	//This goes inside the start game function because if it didn't it would not apply the hover event when the game is reset.
	$('.characters').hover(
		function() {
			$(this).find('.box-img-overlay').show();
		}, function() {
			$(this).find('.box-img-overlay').hide();
		}
	);
}
startGame();
//Hover, remember that the hovering is attached to the element, not the character class
//This means that when I remove the character class from them they will still have the hovering capability



//CharacterSettingClick
function characterSettingClick() {
	$(document).on('click', '.characters', function() {
	$(this).unbind("mouseenter");		
	//Will only run if I haven't picked a player
		if(!pickedPlayer) {
			var chooseTextOpponent = $('<h2>');
			var enemies = $('<div>');
			var hpTextOpponent = $('<h2>');
			chooseTextOpponent.attr('id', "chooseTextOpponent");
			chooseTextOpponent.addClass('text-center');
			chooseTextOpponent.text("CHOOSE AN OPPONENT")
			chooseTextOpponent.appendTo('#enemyBoard');
			enemies.attr('id', "enemies");
			enemies.addClass('row');
			enemies.appendTo('#enemyBoard');
			hpTextOpponent.attr('id', "hpTextOpponent");
			hpTextOpponent.addClass('text-center');
			hpTextOpponent.appendTo('#enemyBoard');
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
			var benchedText = $('<h2>');
			var benched = $('<div>');
			benchedText.addClass('text-center');
			benchedText.text("BENCHED");
			benchedText.appendTo('#benchedBoard');
			benched.attr('id', 'benched');
			benched.addClass('row');
			benched.appendTo('#benchedBoard');
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
	$('#battle').click(function() {
		//Player attacking opponent it is important that the variable i is defined at the Global Scope or else it will always reset on click
		characters[myOpponent].hp = characters[myOpponent].hp - attackMultiplier * characters[myPlayer].attack;
		$('#hpTextOpponent').text("HP: " + characters[myOpponent].hp);
		attackMultiplier++;
		if(characters[myOpponent].hp <= 0) {
			if($('.characters').length === 1) {
				$('#attack').hide();
				$('#chooseTextOpponent').hide();
				$('#chooseTextCharacter').text(characters[myPlayer].name + " Wins");
				$('#reset').show();
			}
			$('#hpTextOpponent').text("");
			//This removes the defeated enemy from the DOM completely.
			$('#' + myOpponent).remove();
			$('.benchedEnemies').addClass('characters');
			if($('div.benchedEnemies').length === 1) {
				myOpponent = $('.benchedEnemies').attr('id');
				$('#hpTextOpponent').text("HP: " + characters[myOpponent].hp);
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
			//This makes sure that the benched board is constantly being emptied to make sure that there is nothing there when an opponent dies.
			$('#benchedBoard').empty();
		} else {
			//Opponent attacking player
			characters[myPlayer].hp = characters[myPlayer].hp - characters[myOpponent].computerAttack;
			$('#hpTextCharacter').text("HP: " + characters[myPlayer].hp);
			if(characters[myPlayer].hp <= 0) {
				$('#lifeTextCharacter').text("");
				$('#attack').hide();
				//This removes the player along with his life and name from the DOM completely.
				$('#characterBoard').empty();
				$('#chooseTextOpponent').text(characters[myOpponent].name + " DEFEATED YOU!");
				$('#reset').show();
			}
		}	
	});
}
combatAttackClick();
function resetGame() {
	$('#revive').click(function() {
		startGame();
		$('#reset').hide();
	});
}
resetGame();

