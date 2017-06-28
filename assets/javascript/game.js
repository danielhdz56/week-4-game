$('.player').hover(
	function() {
		$(this).find('h3').show();
	}, function() {
		$(this).find('h3').hide();
	}
);
//$('.player').one('click', function() {
// Won't work as expected because this is a static event handler
//This means that it installs an event handler on any objects that match the .player selector AT THAT MOMENT IN TIME.
//Those event handlers are then in place FOREVER. They no longer look at what classes any elements have. 
//This means that changing a class after you install a static event handler does not affect which elements have event handlers on them BECAUSE THEY HAVE ALREADY BEEN ADDED.
$(document).one('click', '.player', function() {
	console.log('You clicked');
	$(this).siblings().addClass('enemies');
	$('.player').toggleClass('m-0a');	
	$(this).siblings().appendTo('#enemyBoard');
	$('#enemies').show();
	$('#enemies').removeClass('player');
});