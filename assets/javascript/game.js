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
var pickedTeam;
var myPokemon;
var myOpponent;
var pickedPokemon;
var pickedOpponent;
var attackMultiplier;
var players;
var pokemons;
//Creating the pokemons
function startGame() {
	$('#navLeft').remove();
	$('#navRight').remove();
	$('#navbars-and-content').prepend($('#content').children());
	$('#content').remove();
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
	teams = [ {
		name: "Valor",
		values: "Team Valor's values rely on strength. They believe that Pokémon have great strength, and they are interested in ways to increase those strengths for battle.",
		leader: "Candela",
		message: "There is no doubt that the Pokemon in our team have trained are the strongest in battle!",
		sigil: "assets/images/valor.svg",
		pokemon: "assets/images/moltres.svg"
	}, {
		name: "Mystic",
		values: "Team Mystic's values rely on trusting in wisdom. They believe that Pokémon have great wisdom, and they are interested in learning more about how they evolve.",
		leader: "Blanche",
		message: "With our calm analysis of every situation, we can't lose!",
		sigil: "assets/images/mystic.svg",
		pokemon: "assets/images/articuno.svg"
	}, {
		name: "Instinct",
		values: "Team Instinct's values rely on trusting intuition. They believe that Pokémon have great intuition, and they are interested in learning more about the significance of their hatching.",
		leader: "Spark",
		message: "You never lose when you trust your instincts!",
		sigil: "assets/images/instinct.svg",
		pokemon: "assets/images/zapdos.svg"
	}];
	items = [ {
		name: "backpack",
		img: "assets/images/backpack.svg"
	}, {
		name: "pokeballs",
		img: "assets/images/pokeballs.svg"
	}, {
		name: "moneyBag",
		img: "assets/images/money-bag.svg"
	}, {
		name: "pokeBag",
		img: "assets/images/pokebag.svg"
	}];
	pokemons = [ {
		id: 0,
		name: "Meowth",
		img: "assets/images/meowth.svg",
		hp: 100,
		attack: 15,
		computerAttack: 7,
		pokeball: "assets/images/pokeball.svg",
		type: "Normal",
		abilities: "Unnerve",
		genderRatio: "50% male, 50% female",
		catchRate: "33.3%",
		pokedexNumber: "#052",
		EVYield: ['hp: 0', 'atk: 0', 'def: 0', 'sAtk: 0', 'sDef: 0', 'speed: 1'],
		height: "0.4 meters",
		weight: "9.3 lbs.",
		pokedexEntry: "Meowth, the Scratch Cat Pokémon. Meowth loves to roam at night to gather coins and other objects that sparkle, but it spend most of the daylight hours sleeping."
	}, {
		id: 1,
		name: "Pikachu",
		img: "assets/images/pikachu.svg",
		hp: 120,
		attack: 8,
		computerAttack: 15,
		pokeball: "assets/images/superball.svg",
		type: "Electric",
		abilities: "Static",
		genderRatio: "50% male, 50% female",
		catchRate: "24.8%",
		pokedexNumber: "#025",
		EVYield: ['hp: 0', 'atk: 0', 'def: 0', 'sAtk: 0', 'sDef: 0', 'speed: 2'],
		height: "0.4 meters",
		weight: "13.2 lbs.",
		pokedexEntry: "Pikachu, the Mouse Pokémon. It can generate electric attacks from the electric pouches located in both of its cheeks."
	}, {
		id: 2,
		name: "Snorlax",
		img: "assets/images/snorlax.svg",
		hp: 165,
		attack: 4,
		computerAttack: 20,
		pokeball: "assets/images/ultra-ball.svg",
		type: "Normal",
		abilities: "Immunity",
		genderRatio: "87.5% male, 12.5% female",
		catchRate: "3.3%",
		pokedexNumber: "#143",
		EVYield: ['hp: 2', 'atk: 0', 'def: 0', 'sAtk: 0', 'sDef: 0', 'speed: 0'],
		height: "2.1 meters",
		weight: "1014.1 lbs.",
		pokedexEntry: "Snorlax, the Sleeping Pokémon. Snorlax isn't satisfied unless it eats at least 900 pounds of food per day. Once it is full, it promptly goes to sleep."
	}, {
		id: 3,
		name: "Dratini",
		img: "assets/images/dratini.svg",
		hp: 180,
		attack: 3,
		computerAttack: 25,
		pokeball: "assets/images/mega-ball.svg",
		type: "Dragon",
		abilities: "Shed Skin",
		genderRatio: "50% male, 50% female",
		catchRate: "5.9%",
		pokedexNumber: "#147",
		EVYield: ['hp: 0', 'atk: 1', 'def: 0', 'sAtk: 0', 'sDef: 0', 'speed: 0'],
		height: "1.8 meters",
		weight: "7.3 lbs.",
		pokedexEntry: "Dratini, the Dragon Pokémon. Dratini sheds its skin as it grows, often doing so while hidden behind large powerful waterfalls."
	}];
	attackMultiplier = 1;
	pickedPokemon = false;
	pickedOpponent = false;
	pickedPlayer = false;
	pickedTeam = false;
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
		img.attr('width', '40%');
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
				$(this).parent().insertBefore('#male');
			}
			//This hides the players while the user is choosing a team 
			$('#playerBoard').hide();
			//This sets up the team screen 
			var chooseTextTeam = $('<h2>');
			var team = $('<div>');
			chooseTextTeam.attr('id', "chooseTextTeam");
			chooseTextTeam.addClass('text-center');
			chooseTextTeam.text("CHOOSE A TEAM");
			chooseTextTeam.appendTo('#teamBoard');
			team.addClass('row');
			team.appendTo('#teamBoard');
			for (j=0; j < teams.length; j++) {
				var teamChoices = $('<div>');
				var img = $('<img>');
				var boxBlock = $('<div>');
				var boxText = $('<p>');
				teamChoices.attr('id', teams[j].name);
				teamChoices.addClass('box col-4');
				teamChoices.appendTo(team);
				img.addClass('box-img-top team d-block mx-auto');
				img.attr('src', teams[j].sigil);
				img.attr('alt', teams[j].name);
				img.attr('width', '50%');
				img.appendTo(teamChoices);
				boxBlock.addClass('box-block team-block');
				boxBlock.appendTo(teamChoices);
				boxText.addClass('box-text');
				boxText.text('Team: ' + teams[j].name);
				boxText.append('<br>');
				boxText.append('Team Leader: ' + teams[j].leader);
				boxText.append('<br>');
				boxText.append(teams[j].message);
				boxText.appendTo(boxBlock);
			}
			//This displays the description of each team when Hovered
			$('.team').hover(
				function() {
					$(this).parent().find('.team-block').css('visibility', 'visible');
				}, function() {
					$(this).parent().find('.team-block').css('visibility', 'hidden');
				}
			);	
		}
	});
}
playerSettingClick();
//Team Setting Click
function teamSettingClick() {
	$(document).on('click', '.team', function() {
		if(!pickedTeam) {
			$('.team').removeClass('team');
			$('.team-block').remove();
			chooseTextTeam.remove();
			var navLeft = $('<div>');
			var content = $('<div>');
			var navRight = $('<div>');
			navLeft.addClass('col-1');
			navLeft.attr('id', 'navLeft');
			content.addClass('col-10');
			content.attr('id', 'content');
			navRight.addClass('col-1');
			navRight.attr('id', 'navRight');
			$('#navbars-and-content').prepend(content);
			//this makes sure that all of the siblings are moved into the col-10
			content.prepend(content.siblings());
			$('#navbars-and-content').prepend(navLeft);
			$('#navbars-and-content').append(navRight);
			$('#playerBoard').show();
			//This makes sure that one of the other teams gets randomly selected to be the team of the computer
			var opponentTeam = $(this).parent().siblings();
			opponentTeam = $(opponentTeam[Math.round(Math.random())]);
			opponentTeam.removeClass('col-4');
			opponentTeam.find('.d-block').attr('width', '100%');
			opponentTeam.appendTo(navRight);
			//This makes sure that the team that I picked gets moved to the navbar on the left and the proper classes are removed
			$(this).parent().removeClass('col-4');
			$(this).attr('width', '100%');
			$(this).parent().appendTo(navLeft);
			//This empties out the left over team
			$('#teamBoard').empty();
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
		for(k = 0; k < pokemons.length; k++) {
			var pokemonChoices = $('<div>');
			var box = $('<div>');
			var img1 = $('<img>');
			pokemonChoices.attr('id', k);
			pokemonChoices.addClass('col-3 pokemons');
			pokemonChoices.appendTo('#pokemons');
			box.addClass('box');
			box.appendTo(pokemonChoices);
			img1.addClass('mx-auto img-fluid');
			//can you put more attributes in one line?
			img1.attr('src', pokemons[k].pokeball);
			img1.attr('alt', pokemons[k].name);
			img1.attr('width', '70%');
			img1.appendTo(box);
			//This sets up the container for each pokemon
			var pokemonName = $('<div>');
			pokemonName.attr('id', pokemons[k].name.toLowerCase());
			pokemonName.appendTo('#description');
			//This sets up the stats portion of the description screen
			var pokemonStats = $('<div>');
			var img2 = $('<img>');
			var box2 = $('<div>');
			var h4Stats = $('<h4>');
			var pStats = $('<p>');
			pokemonStats.attr('id', "stats" + k);
			pokemonStats.addClass('box col-4 float-left pokemon-block');
			pokemonStats.appendTo(pokemonName);
			img2.attr('src', 'assets/images/fist.svg');
			img2.attr('alt', 'Stats');
			img2.attr('width', '50%');
			img2.addClass('box-img-top mx-auto');
			img2.appendTo(pokemonStats);
			box2.addClass('box-block');
			box2.appendTo(pokemonStats);
			h4Stats.addClass('box-title');
			h4Stats.text('STATS');
			h4Stats.appendTo(box2);
			pStats.addClass('box-text');
			pStats.text(pokemons[k].pokedexEntry);
			pStats.appendTo(box2);
			//This sets up the properties portion of the description screen
			var pokemonProperties = $('<div>');
			var img3 = $('<img>');
			var box3 = $('<div>');
			var h4Properties = $('<h4>');
			var pProperties = $('<p>');
			pokemonProperties.attr('id', "properties" + k);
			pokemonProperties.addClass('box col-4 float-left pokemon-block');
			pokemonProperties.appendTo(pokemonName);
			img3.attr('src', 'assets/images/scene.svg');
			img3.attr('alt', 'properties');
			img3.attr('width', '50%');
			img3.addClass('box-img-top mx-auto');
			img3.appendTo(pokemonProperties);
			box3.addClass('box-block');
			box3.appendTo(pokemonProperties);
			h4Properties.addClass('box-title');
			h4Properties.text('PROPERTIES');
			h4Properties.appendTo(box3);
			pProperties.addClass('box-text');
			pProperties.text(pokemons[k].pokedexNumber);
			pProperties.appendTo(box3);
			//This sets up the pokedex portion of the description screen
			var pokemonPokedex = $('<div>');
			var img4 = $('<img>');
			var box4 = $('<div>');
			var h4Pokedex = $('<h4>');
			var pPokedex = $('<p>');
			pokemonPokedex.attr('id', "pokedex" + k);
			pokemonPokedex.addClass('box col-4 float-left pokemon-block');
			pokemonPokedex.appendTo(pokemonName);
			img4.attr('src', 'assets/images/heart.svg');
			img4.attr('alt', 'pokedex');
			img4.attr('width', '50%');
			img4.addClass('box-img-top mx-auto');
			img4.appendTo(pokemonPokedex);
			box4.addClass('box-block');
			box4.appendTo(pokemonPokedex);
			h4Pokedex.addClass('box-title');
			h4Pokedex.text('POKEDEX');
			h4Pokedex.appendTo(box4);
			pPokedex.addClass('box-text');
			for(f=0; f<pokemons[k].EVYield.length; f++) {
				pPokedex.append(pokemons[k].EVYield[f] + '<br>');
			}
			pPokedex.appendTo(box4);
		}
		//This displays the pokemon when you hover over the pokeball
		//This also displays the pokemon description when you hover over the pokeball
		$('.pokemons').hover(
			function() {
				$(this).find('.img-fluid').attr('src', pokemons[$(this).attr('id')].img);
				//This shows the correct description by picking up the id of the pokemon and using that as the target for the correct description element
				$($('#description').children()[$(this).attr('id')]).show();
			}, function() {
				$(this).find('.img-fluid').attr('src', pokemons[$(this).attr('id')].pokeball);
				$($('#description').children()[$(this).attr('id')]).hide();
			}
		);	
	});
}
teamSettingClick();
//PokemonSettingClick
function pokemonSettingClick() {
	$(document).on('click', '.pokemons', function() {
		// $(this).parent().addClass('text-center');
		console.log($(this).parent());
		//This hides back the description of the pokemon when clicked
		$($('#description').children()[$(this).attr('id')]).hide();
		$(this).unbind("mouseleave");	
		$(this).unbind("mouseenter");	
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
			//This adds the items to our navbar on the left
			for (g=0; g<items.length; g++) {
				var item = $('<div>');
				var itemImage = $('<img>');
				item.attr('id', items[g].name);
				item.addClass('box mt-1');
				item.appendTo(navLeft);
				itemImage.attr('src', items[g].img);
				itemImage.attr('alt', items[g].name);
				itemImage.attr('width', '100%');
				itemImage.addClass('box-img-top d-block mx-auto');
				itemImage.appendTo(item);
			}
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
			$('#description').addClass('collapse');
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
			//This will only occur if there are no pokemon left
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
				$('#description').removeClass('collapse');
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

