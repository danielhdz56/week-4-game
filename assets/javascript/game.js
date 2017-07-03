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
var pickedPlayer;
var myPokemon;
var myOpponent;
var pickedPokemon;
var pickedOpponent;
var attackMultiplier;
var players;
var pokemons;
//Creating the pokemons
function startGame() {
	$('#playerBoard').empty();
	$('#pokemonBoard').empty();
	$('#enemyBoard').empty();
	$('#benchedBoard').empty();
	players = [ {
		gender: "male",
		img: "assets/images/player.svg"
	}, {
		gender: "female",
		img: "assets/images/player2.svg"
	
	}];
	pokemons = [ {
		id: 0,
		name: "Meowth",
		img: "assets/images/meowth.svg",
		hp: 100,
		attack: 15,
		computerAttack: 7,
		pokeball: "assets/images/pokeball.svg"
	}, {
		id: 1,
		name: "Pikachu",
		img: "assets/images/pikachu.svg",
		hp: 120,
		attack: 8,
		computerAttack: 15,
		pokeball: "assets/images/superball.svg"
	}, {
		id: 2,
		name: "Snorlax",
		img: "assets/images/snorlax.svg",
		hp: 165,
		attack: 4,
		computerAttack: 20,
		pokeball: "assets/images/ultra-ball.svg"
	}, {
		id: 3,
		name: "Dratini",
		img: "assets/images/dratini.svg",
		hp: 180,
		attack: 3,
		computerAttack: 25,
		pokeball: "assets/images/mega-ball.svg"
	}];
	attackMultiplier = 1;
	pickedPokemon = false;
	pickedOpponent = false;
	pickedPlayer = false;
	var chooseTextPlayer = $('<h2>');
	var player = $('<div>');
	chooseTextPlayer.attr('id', "chooseTextPlayer");
	chooseTextPlayer.addClass('text-center');
	chooseTextPlayer.text("CHOOSE A PLAYER");
	chooseTextPlayer.appendTo('#playerBoard');
	player.addClass('row');
	player.appendTo('#playerBoard');
	for (i = 0; i < players.length; i++) {
		var playerChoices = $('<div>');
		var img = $('<img>');
		playerChoices.attr('id', players[i].gender);
		playerChoices.addClass('col-6');
		playerChoices.appendTo(player);
		img.addClass('player d-block mx-auto');
		img.attr('src', players[i].img);
		img.attr('alt', players[i].gender);
		img.attr('width', '50%');
		img.appendTo(playerChoices);
	}
}
startGame();
//Hover, remember that the hovering is attached to the element, not the pokemon class
//This means that when I remove the pokemon class from them they will still have the hovering capability
function playerSettingClick() {
	$(document).on('click', '.player', function() {
		if(!pickedPlayer) {
			$('.player').removeClass('player');
			chooseTextPlayer.remove();
			//This checks whether you picked a female. If you did then it will insert it before the male characther
			if($(this).parent('#female').length){
				$(this).insertBefore('#male');
			} 
			//This sets up the pokemon screen
			var chooseTextPokemon = $('<h2>');
			var pokemon = $('<div>');
			var hpTextPokemon = $('<h2>');
			chooseTextPokemon.attr('id', "chooseTextPokemon");
			chooseTextPokemon.addClass('text-center');
			chooseTextPokemon.text("CHOOSE A POKEMON")
			chooseTextPokemon.appendTo('#pokemonBoard');
			pokemon.attr('id', "pokemons");
			pokemon.addClass('row');
			pokemon.appendTo('#pokemonBoard');
			hpTextPokemon.attr('id', "hpTextPokemon");
			hpTextPokemon.addClass('text-center');
			hpTextPokemon.appendTo('#pokemonBoard');
			for(j = 0; j < pokemons.length; j++) {
				var pokemonChoices = $('<div>');
				var box = $('<div>');
				var img1 = $('<img>');
				var overlay = $('<div>');
				var name = $('<h3>');
				var hp = $('<h3>');
				pokemonChoices.attr('id', j);
				pokemonChoices.addClass('col-3 pokemons');
				pokemonChoices.appendTo('#pokemons');
				box.addClass('box');
				box.appendTo(pokemonChoices);
				img1.addClass('img-fluid');
				//can you put more attributes in one line?
				img1.attr('src', pokemons[j].pokeball);
				img1.attr('alt', pokemons[j].name);
				img1.appendTo(box);
				overlay.addClass('box-img-overlay');
				overlay.hide();
				overlay.appendTo(box);
				name.addClass('box-title');
				name.text(pokemons[i].name);
				name.appendTo(overlay);
				hp.text('HP: ' + pokemons[j].hp);
				hp.appendTo(overlay)	
			}
			//This goes inside the start game function because if it didn't it would not apply the hover event when the game is reset.
			$('.pokemons').hover(
				function() {
					$(this).find('.img-fluid').attr('src', pokemons[$(this).attr('id')].img);
					$(this).find('.box-img-overlay').show();
				}, function() {
					$(this).find('.box-img-overlay').hide();
					$(this).find('.img-fluid').attr('src', pokemons[$(this).attr('id')].pokeball);
				}
			);	
		}
	});
}
playerSettingClick();
//PokemonSettingClick
function pokemonSettingClick() {
	$(document).on('click', '.pokemons', function() {
	$(this).unbind("mouseleave");		
	//Will only run if I haven't picked a Pokemon
		if(!pickedPokemon) {
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
			$(this).removeClass('pokemons');
			pickedPokemon = true;
			$(this).siblings().appendTo($('#enemies'));
			//Got the id attribute of whatever pokemon i clicked and passed it to myPokemon
			myPokemon = $(this).attr('id');
			//I then targeted the heading, chooseTextPokemon, and replaced by the name of the pokemon I chose
			$('#chooseTextPokemon').text(pokemons[myPokemon].name);
			$('#hpTextPokemon').text("HP: " + pokemons[myPokemon].hp);
		//Will only run if I have picked a Pokemon and if I haven't picked an Opponent
		} else if(pickedPokemon && !pickedOpponent) {
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
			$('#chooseTextOpponent').text(pokemons[myOpponent].name);
			$('#hpTextOpponent').text("HP: " + pokemons[myOpponent].hp);
			$(this).siblings().addClass('benchedEnemies');
			$(this).siblings().addBack().removeClass('pokemons');
			$(this).siblings().appendTo($('#benched'));
		}
	})
}
pokemonSettingClick();
//Combat
function combatAttackClick() {
	$('#battle').click(function() {
		//Pokemon attacking opponent it is important that the variable i is defined at the Global Scope or else it will always reset on click
		pokemons[myOpponent].hp = pokemons[myOpponent].hp - attackMultiplier * pokemons[myPokemon].attack;
		$('#hpTextOpponent').text("HP: " + pokemons[myOpponent].hp);
		attackMultiplier++;
		//This will only occur if a pokemon has less than 0 health
		if(pokemons[myOpponent].hp <= 0) {
			if($('.pokemons').length === 1) {
				$('#attack').hide();
				$('#chooseTextOpponent').hide();
				$('#chooseTextPokemon').text(pokemons[myPokemon].name + " Wins");
				$('#reset').show();
			}
			$('#hpTextOpponent').text("");
			//This removes the defeated enemy from the DOM completely.
			$('#' + myOpponent).remove();
			$('.benchedEnemies').addClass('pokemons');
			//This will only occur if it is the last enemy
			if($('div.benchedEnemies').length === 1) {
				myOpponent = $('.benchedEnemies').attr('id');
				//This makes it so the last enemy shows up as a pokemon and not a pokeball
				$('.benchedEnemies').find('.img-fluid').attr('src', pokemons[myOpponent].img);
				$('.pokemons').unbind("mouseleave");
				$('#hpTextOpponent').text("HP: " + pokemons[myOpponent].hp);
				$('#chooseTextOpponent').text(pokemons[myOpponent].name);
				$('.pokemons').removeClass('benchedEnemies');
				//This makes it so the click doesn't work for the last enemy
				pickedOpponent = true;
			}
			else if($('.pokemons').length !== 0) {
				$('#chooseTextOpponent').text("Choose Another Opponent");
				$('.pokemons').removeClass('benchedEnemies');
				$('#attack').hide();
			}
			$('.pokemons').appendTo($('#enemies'));
			//This makes sure that the benched board is constantly being emptied to make sure that there is nothing there when an opponent dies.
			$('#benchedBoard').empty();
		} else {
			//Opponent attacking Pokemon
			pokemons[myPokemon].hp = pokemons[myPokemon].hp - pokemons[myOpponent].computerAttack;
			$('#hpTextPokemon').text("HP: " + pokemons[myPokemon].hp);
			if(pokemons[myPokemon].hp <= 0) {
				$('#lifeTextPokemon').text("");
				$('#attack').hide();
				//This removes the Pokemon along with his life and name from the DOM completely.
				$('#pokemonBoard').empty();
				$('#chooseTextOpponent').text(pokemons[myOpponent].name + " DEFEATED YOU!");
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

