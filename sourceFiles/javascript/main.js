jQuery(document).ready(function($) {


	// makes vh work properly in iOS Safari and other mobile browsers
	viewportUnitsBuggyfill.init();


	// initialize custom functions
	menu();
	tabs();
	smartVimeo();
	floatingLabels();
	contactForm();


	// activetes on scroll animations
	// animation setting throught HTML data- attributes
	// see _scroll-animations.js for more info
	onScrollInit( $('.os-animation') );



	// hacky way to get smooth scroll when clicking a link in .call-to-action
	$('.call-to-action a[href*=#]:not([href=#])').click(function() {

		var secondaryNav = $('.cd-secondary-nav');

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - secondaryNav.height() + 1
				}, 800);
				return false;
			}
		}
	});
	



});
