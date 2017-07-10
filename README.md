# week-4-game
<h1>Pokemon RPG</h1>
<h2>Description</h2>
<p>Intereactive game that dynamically updates the HTML page using the jQuery library.</p>
<h2>How it Works</h2>
	<ul>
		<li>When the game starts, the player will choose one of two characters. The opponent will automatically be the characters not chosen.</li>
		<li>After choosing a character, the player will choose a team. The opponent will randomly be assigned one of the teams not chosen.
		<li>The player will then choose a pokemon by clicking on them. The player will fight as that pokemon for the rest of the game.</li>
		<li>The player must then choose an enemy pokemon to battle.</li>
		<li>Enemy pokemon not chosen are then moved to another part of the screen.</li>
		<li>The player will now be able to click the battle button.
			<ul>
				<li>Whenever the player clicks the battle button, their pokemon damages the enemy pokemon. The opponent will lose HP (health points). These points are displayed at the bottom of the enemy pokemon's picture.</li>
				<li>The opponent pokemon will instantly counter the attack. When that happens, the player's pokemon will lose some of their HP. These points are shown at the bottom of the player pokemon's picture.</li>
			</ul>
		</li>
		<li>The player will keep hitting the battle button in an effort to defeat their opponent.
			<ul>
				<li>When the opponent's HP is reduced to zero or below, remove the enemy from the opponent area. The player character can now choose a new pokemon to battle.</li>
			</ul>
		</li>
		<li>The player wins the game by defeating all enemy pokemon. The player loses the game if their pokemon's HP falls to zero or below.</li>
	</ul>
<h2>Game Design Notes</h2>
	<ul>
		<li>Each pokemon in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.</li>
		<li>Each time the player attacks, their pokemon's Attack Power increases by its base Attack Power.
			<ul>
				<li>For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).</li>
			</ul>
		</li>
		<li>The enemy pokemon only has Counter Attack Power.
			<ul>
				<li>Unlike the player's Attack Points, Counter Attack Power never changes.</li>
			</ul>
		</li>
		<li>The Health Points, Attack Power and Counter Attack Power of each character differ.</li>
		<li>No characters in the game can heal or recover Health Points.
			<ul>
				<li>To win the game the player must pick enemies with low counter attack power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.</li>
			</ul>
		</li>
		<li>Players should be able to win and lose the game no matter what pokemon they choose. The challenge should come from picking the right enemies, not choosing the strongest pokemon.</li>
	</ul>
<h3>Technology Used</h3>
<ul>
	<li>HTML5</li>
	<li>CSS3</li>
	<li>JS</li>
	<li>JQuery</li>
</ul>
<h3>Resources Used</h3>
<ul>
	<li>Stack Overflow</li>
	<li>Google</li>
	<li>Bulbapedia</li>
	<li>Khinsider</li>
	<li>Flaticon</li>
	<li>JQuery Documentation</li>
	<li>Google Fonts</li>
	<li>MDN</li>
	<li>UiGradients</li>
	<li>Composition Book</li>
	<li>Pens</li>
</ul>
<h3>Credit</h3>
<h5>Fonts</h5>
<p><strong>Natanael Gama</strong></p>
<a href="https://www.ndiscovered.com">Personal Link</a>
