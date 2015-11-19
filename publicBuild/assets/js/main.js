function floatingLabels() {
	

	if( $('.floating-labels').length > 0 ) floatLabels();

	function floatLabels() {
		var inputFields = $('.floating-labels .cd-label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			//check if user is filling one of the form fields 
			checkVal(singleInput);
			singleInput.on('change keyup', function(){
				checkVal(singleInput);	
			});
		});
	}

	function checkVal(inputField) {
		( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
	}

	
}

function contactForm() {


		
	$('.cd-form').tidyform({

		before: function(formData){
			//stop form submit by returning false
			//event before submit, e.data contains the submitted form data.
			//modify submitted form data by returning modified formData object.
			
			// console.log(formData);


			var valid = true,
	        	message = '',
	        	pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	    
		    $('.cd-form input').each(function() {

		        var $this = $(this),
		            inputName = $this.attr("name");
		        
		        if(!$this.val()) {
		            valid = false;
		            message += 'Please enter your ' + inputName + '\n';
		        }
		        
		        if(inputName == "email" && $this.val() !== ""){
		           
		            if(!pattern.test($this.val())){
		                message += "Please enter email in correct format\n";                
		                valid  = false;
		            }
		        }
		    });
	    
		    if(!valid) {

		    	$('.form-response .error').show();
		    	$('.form-response .error').append(message);
		       
		    	formData.preventDefault();
		
		    } else {

		    	$('.form-response .error').hide();
		    	console.log(formData);

		    };


		},
		success: function(e){
			// console.log('tidyform success', e);

			$('.form-response .success').show();
			//e.success 
			//e.data contains the submitted form data. do what you want to do
		},	
		error: function(e){
			// console.log('tidyform error', e);

			//e.message contains technical errors
		},

	});

		

}
//set your google maps parameters
	var latitude = 55.672259,
		longitude = 12.532897,
		latitude2 = 55.678760,
		longitude2 = 12.567462,
		map_zoom = 13;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = ( is_internetExplorer11 ) ? 'assets/img/cd-icon-location.png' : 'assets/img/cd-icon-location.svg';
		
	//define the basic color of your map, plus a value for saturation and brightness
	var	main_color = '#0088F2',
		saturation_value= -20,
		brightness_value= 5;

	//we define here the style of the map
	var style= [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		//style different elements on the map
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}
	];
		
	//set google map options
	var map_options = {
      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//add a custom marker to the map				
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude, longitude),
	    map: map,
	    visible: true,
	 	icon: marker_url,
	});

	var marker2 = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude2, longitude2),
	    map: map,
	    visible: true,
	 	icon: marker_url,
	});

	//add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map 
	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	  		controlUIzoomOut= document.getElementById('cd-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
function menu() {
	var secondaryNav = $('.cd-secondary-nav'),
		secondaryNavTopPosition = secondaryNav.offset().top,
		taglineOffesetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
		contentSections = $('.cd-section');
	
	$(window).on('scroll', function(){
		//on desktop - assign a position fixed to logo and action button and move them outside the viewport
		( $(window).scrollTop() > taglineOffesetTop ) ? $('#cd-logo, .cd-btn').addClass('is-hidden') : $('#cd-logo, .cd-btn').removeClass('is-hidden');
		
		//on desktop - fix secondary navigation on scrolling
		if($(window).scrollTop() > secondaryNavTopPosition ) {
			//fix secondary navigation
			secondaryNav.addClass('is-fixed');
			//push the .cd-main-content giving it a top-margin
			$('.cd-main-content').addClass('has-top-margin');	
			//on Firefox CSS transition/animation fails when parent element changes position attribute
			//so we to change secondary navigation childrens attributes after having changed its position value
			setTimeout(function() {
	            secondaryNav.addClass('animate-children');
	            $('#cd-logo').addClass('slide-in');
	            $('.header-logo').addClass('slide-in');
				$('.cd-btn').addClass('slide-in');
	        }, 50);
		} else {
			secondaryNav.removeClass('is-fixed');
			$('.cd-main-content').removeClass('has-top-margin');
			setTimeout(function() {
	            secondaryNav.removeClass('animate-children');
	            $('#cd-logo').removeClass('slide-in');
	            $('.header-logo').removeClass('slide-in');
				$('.cd-btn').removeClass('slide-in');
	        }, 50);
		}

		//on desktop - update the active link in the secondary fixed navigation
		updateSecondaryNavigation();
	});

	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
			if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}
		});
	}

	//on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
	$('.cd-secondary-nav-trigger').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		secondaryNav.find('ul').toggleClass('is-visible');
	});

	//smooth scrolling when clicking on the secondary navigation items
	secondaryNav.find('ul a').on('click', function(event){
        event.preventDefault();
        var target= $(this.hash);
        $('body,html').animate({
        	'scrollTop': target.offset().top - secondaryNav.height() + 1
        	}, 400
        ); 
        //on mobile - close secondary navigation
        $('.cd-secondary-nav-trigger').removeClass('menu-is-open');
        secondaryNav.find('ul').removeClass('is-visible');
    });

    //on mobile - open/close primary navigation clicking/tapping the menu icon
	$('.cd-primary-nav').on('click', function(event){
		if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
	});
}

//
// taken from this article
// http://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css
// big up to the authors for nice and easy implemenation of animations!

function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay')
        var screenSize = $(window).width();    
    


    if (Modernizr.touch) {

        // no delay on touch devices (assume it's mobile)
        osElement.css({
            '-webkit-animation-delay':  0,
            '-moz-animation-delay':     0,
            'animation-delay':          0
        });

    } if (screenSize < 768) { 

        // no delay on smaller screens
        osElement.css({
            '-webkit-animation-delay':  0,
            '-moz-animation-delay':     0,
            'animation-delay':          0
        });

    } else {

        osElement.css({
            '-webkit-animation-delay':  osAnimationDelay,
            '-moz-animation-delay':     osAnimationDelay,
            'animation-delay':          osAnimationDelay
        });
    
    };


 
    var osTrigger = ( trigger ) ? trigger : osElement;
 
    osTrigger.waypoint(function() {
        osElement.addClass('animated').addClass(osAnimationClass);
    },{
        triggerOnce: true,
        offset: '90%'
    });
  });
}
function smartVimeo() {

    var vimeoHook = $('.vimeo-player');
    var overlayHook = $('.video-embed__overlay');

    vimeoHook.each(function() {

        var vimeoPlayer = $(this);
        var vimeoID = vimeoPlayer.data('vimeo-id');
        

        // fetch JSON data from Vimeo
        $.getJSON('http://vimeo.com/api/v2/video/'+vimeoID+'.json?callback=?', function(json) {  

            // store returned dato into variables
            videoData = json[0];
            videoThumbURL = videoData.thumbnail_large; // 640x480
            videoTitle = videoData.title;
            videoTags = videoData.tags;
              
            // trigger inject function
            injectVideoData();
            
        });
       

        function injectVideoData() {
            vimeoPlayer.attr('src', videoThumbURL);
            vimeoPlayer.attr('title', videoTitle);
            vimeoPlayer.attr('alt', videoTags);
        };

        function insertVimeoVideo() {

            overlayHook.click(function(){
                $(this).fadeOut();
                $(this).parent().html('<iframe src="https://player.vimeo.com/video/'+$(this).siblings('.vimeo-player').data('vimeo-id')+'?portrait=0&title=0&color=bf1f48&badge=0&byline=0&autoplay=1" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
            });

        };

        // trigger video function
        insertVimeoVideo();

    });

};






function tabs() {


	function checkStep() {
		
		var tabs = $('ul.tabs');


		if ( $('ul.tabs li:nth-of-type(1)').hasClass('current')  ) {
			tabs.addClass('step1');
			tabs.removeClass('step2');
			tabs.removeClass('step3');
			tabs.removeClass('step4');
		} 

		if ( $('ul.tabs li:nth-of-type(2)').hasClass('current')  ) {
			tabs.addClass('step2');
			tabs.removeClass('step1');
			tabs.removeClass('step3');
			tabs.removeClass('step4');
		}

		if ( $('ul.tabs li:nth-of-type(3)').hasClass('current')  ) {
			tabs.addClass('step3');
			tabs.removeClass('step1');
			tabs.removeClass('step2');
			tabs.removeClass('step4');
		}

		if ( $('ul.tabs li:nth-of-type(4)').hasClass('current')  ) {
			tabs.addClass('step4');
			tabs.removeClass('step1');
			tabs.removeClass('step2');
			tabs.removeClass('step3');
		}


	}

	
	checkStep(); // initial step check


	$('ul.tabs li').click(function(){


		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab__content').removeClass('current');

		$(this).addClass('current');
		$('.tab__title span span').addClass('flipInX');
		$('.tab__body').addClass('fadeIn');
		$("#"+tab_id).addClass('current');
		

		checkStep();
	})

}


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9mbG9hdGluZy1sYWJlbHMuanMiLCJfZm9ybS5qcyIsIl9tYXAuanMiLCJfbWVudS5qcyIsIl9zY3JvbGwtYW5pbWF0aW9uLmpzIiwiX3NtYXJ0LXZpbWVvLmpzIiwiX3RhYnMuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmxvYXRpbmdMYWJlbHMoKSB7XG5cdFxuXG5cdGlmKCAkKCcuZmxvYXRpbmctbGFiZWxzJykubGVuZ3RoID4gMCApIGZsb2F0TGFiZWxzKCk7XG5cblx0ZnVuY3Rpb24gZmxvYXRMYWJlbHMoKSB7XG5cdFx0dmFyIGlucHV0RmllbGRzID0gJCgnLmZsb2F0aW5nLWxhYmVscyAuY2QtbGFiZWwnKS5uZXh0KCk7XG5cdFx0aW5wdXRGaWVsZHMuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHNpbmdsZUlucHV0ID0gJCh0aGlzKTtcblx0XHRcdC8vY2hlY2sgaWYgdXNlciBpcyBmaWxsaW5nIG9uZSBvZiB0aGUgZm9ybSBmaWVsZHMgXG5cdFx0XHRjaGVja1ZhbChzaW5nbGVJbnB1dCk7XG5cdFx0XHRzaW5nbGVJbnB1dC5vbignY2hhbmdlIGtleXVwJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0Y2hlY2tWYWwoc2luZ2xlSW5wdXQpO1x0XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrVmFsKGlucHV0RmllbGQpIHtcblx0XHQoIGlucHV0RmllbGQudmFsKCkgPT0gJycgKSA/IGlucHV0RmllbGQucHJldignLmNkLWxhYmVsJykucmVtb3ZlQ2xhc3MoJ2Zsb2F0JykgOiBpbnB1dEZpZWxkLnByZXYoJy5jZC1sYWJlbCcpLmFkZENsYXNzKCdmbG9hdCcpO1xuXHR9XG5cblx0XG59IiwiXG5mdW5jdGlvbiBjb250YWN0Rm9ybSgpIHtcblxuXG5cdFx0XG5cdCQoJy5jZC1mb3JtJykudGlkeWZvcm0oe1xuXG5cdFx0YmVmb3JlOiBmdW5jdGlvbihmb3JtRGF0YSl7XG5cdFx0XHQvL3N0b3AgZm9ybSBzdWJtaXQgYnkgcmV0dXJuaW5nIGZhbHNlXG5cdFx0XHQvL2V2ZW50IGJlZm9yZSBzdWJtaXQsIGUuZGF0YSBjb250YWlucyB0aGUgc3VibWl0dGVkIGZvcm0gZGF0YS5cblx0XHRcdC8vbW9kaWZ5IHN1Ym1pdHRlZCBmb3JtIGRhdGEgYnkgcmV0dXJuaW5nIG1vZGlmaWVkIGZvcm1EYXRhIG9iamVjdC5cblx0XHRcdFxuXHRcdFx0Ly8gY29uc29sZS5sb2coZm9ybURhdGEpO1xuXG5cblx0XHRcdHZhciB2YWxpZCA9IHRydWUsXG5cdCAgICAgICAgXHRtZXNzYWdlID0gJycsXG5cdCAgICAgICAgXHRwYXR0ZXJuID0gL15cXHcrQFthLXpBLVpfXSs/XFwuW2EtekEtWl17MiwzfSQvO1xuXHQgICAgXG5cdFx0ICAgICQoJy5jZC1mb3JtIGlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcblxuXHRcdCAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHQgICAgICAgICAgICBpbnB1dE5hbWUgPSAkdGhpcy5hdHRyKFwibmFtZVwiKTtcblx0XHQgICAgICAgIFxuXHRcdCAgICAgICAgaWYoISR0aGlzLnZhbCgpKSB7XG5cdFx0ICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcblx0XHQgICAgICAgICAgICBtZXNzYWdlICs9ICdQbGVhc2UgZW50ZXIgeW91ciAnICsgaW5wdXROYW1lICsgJ1xcbic7XG5cdFx0ICAgICAgICB9XG5cdFx0ICAgICAgICBcblx0XHQgICAgICAgIGlmKGlucHV0TmFtZSA9PSBcImVtYWlsXCIgJiYgJHRoaXMudmFsKCkgIT09IFwiXCIpe1xuXHRcdCAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgaWYoIXBhdHRlcm4udGVzdCgkdGhpcy52YWwoKSkpe1xuXHRcdCAgICAgICAgICAgICAgICBtZXNzYWdlICs9IFwiUGxlYXNlIGVudGVyIGVtYWlsIGluIGNvcnJlY3QgZm9ybWF0XFxuXCI7ICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICB2YWxpZCAgPSBmYWxzZTtcblx0XHQgICAgICAgICAgICB9XG5cdFx0ICAgICAgICB9XG5cdFx0ICAgIH0pO1xuXHQgICAgXG5cdFx0ICAgIGlmKCF2YWxpZCkge1xuXG5cdFx0ICAgIFx0JCgnLmZvcm0tcmVzcG9uc2UgLmVycm9yJykuc2hvdygpO1xuXHRcdCAgICBcdCQoJy5mb3JtLXJlc3BvbnNlIC5lcnJvcicpLmFwcGVuZChtZXNzYWdlKTtcblx0XHQgICAgICAgXG5cdFx0ICAgIFx0Zm9ybURhdGEucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0XHQgICAgfSBlbHNlIHtcblxuXHRcdCAgICBcdCQoJy5mb3JtLXJlc3BvbnNlIC5lcnJvcicpLmhpZGUoKTtcblx0XHQgICAgXHRjb25zb2xlLmxvZyhmb3JtRGF0YSk7XG5cblx0XHQgICAgfTtcblxuXG5cdFx0fSxcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihlKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCd0aWR5Zm9ybSBzdWNjZXNzJywgZSk7XG5cblx0XHRcdCQoJy5mb3JtLXJlc3BvbnNlIC5zdWNjZXNzJykuc2hvdygpO1xuXHRcdFx0Ly9lLnN1Y2Nlc3MgXG5cdFx0XHQvL2UuZGF0YSBjb250YWlucyB0aGUgc3VibWl0dGVkIGZvcm0gZGF0YS4gZG8gd2hhdCB5b3Ugd2FudCB0byBkb1xuXHRcdH0sXHRcblx0XHRlcnJvcjogZnVuY3Rpb24oZSl7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygndGlkeWZvcm0gZXJyb3InLCBlKTtcblxuXHRcdFx0Ly9lLm1lc3NhZ2UgY29udGFpbnMgdGVjaG5pY2FsIGVycm9yc1xuXHRcdH0sXG5cblx0fSk7XG5cblx0XHRcblxufSIsIi8vc2V0IHlvdXIgZ29vZ2xlIG1hcHMgcGFyYW1ldGVyc1xuXHR2YXIgbGF0aXR1ZGUgPSA1NS42NzIyNTksXG5cdFx0bG9uZ2l0dWRlID0gMTIuNTMyODk3LFxuXHRcdGxhdGl0dWRlMiA9IDU1LjY3ODc2MCxcblx0XHRsb25naXR1ZGUyID0gMTIuNTY3NDYyLFxuXHRcdG1hcF96b29tID0gMTM7XG5cblx0Ly9nb29nbGUgbWFwIGN1c3RvbSBtYXJrZXIgaWNvbiAtIC5wbmcgZmFsbGJhY2sgZm9yIElFMTFcblx0dmFyIGlzX2ludGVybmV0RXhwbG9yZXIxMT0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3RyaWRlbnQnKSA+IC0xO1xuXHR2YXIgbWFya2VyX3VybCA9ICggaXNfaW50ZXJuZXRFeHBsb3JlcjExICkgPyAnYXNzZXRzL2ltZy9jZC1pY29uLWxvY2F0aW9uLnBuZycgOiAnYXNzZXRzL2ltZy9jZC1pY29uLWxvY2F0aW9uLnN2Zyc7XG5cdFx0XG5cdC8vZGVmaW5lIHRoZSBiYXNpYyBjb2xvciBvZiB5b3VyIG1hcCwgcGx1cyBhIHZhbHVlIGZvciBzYXR1cmF0aW9uIGFuZCBicmlnaHRuZXNzXG5cdHZhclx0bWFpbl9jb2xvciA9ICcjMDA4OEYyJyxcblx0XHRzYXR1cmF0aW9uX3ZhbHVlPSAtMjAsXG5cdFx0YnJpZ2h0bmVzc192YWx1ZT0gNTtcblxuXHQvL3dlIGRlZmluZSBoZXJlIHRoZSBzdHlsZSBvZiB0aGUgbWFwXG5cdHZhciBzdHlsZT0gWyBcblx0XHR7XG5cdFx0XHQvL3NldCBzYXR1cmF0aW9uIGZvciB0aGUgbGFiZWxzIG9uIHRoZSBtYXBcblx0XHRcdGVsZW1lbnRUeXBlOiBcImxhYmVsc1wiLFxuXHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHR7c2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZX1cblx0XHRcdF1cblx0XHR9LCAgXG5cdCAgICB7XHQvL3BvaSBzdGFuZHMgZm9yIHBvaW50IG9mIGludGVyZXN0IC0gZG9uJ3Qgc2hvdyB0aGVzZSBsYWJsZXMgb24gdGhlIG1hcCBcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaVwiLFxuXHRcdFx0ZWxlbWVudFR5cGU6IFwibGFiZWxzXCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHt2aXNpYmlsaXR5OiBcIm9mZlwifVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0Ly9kb24ndCBzaG93IGhpZ2h3YXlzIGxhYmxlcyBvbiB0aGUgbWFwXG5cdCAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkLmhpZ2h3YXknLFxuXHQgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzJyxcblx0ICAgICAgICBzdHlsZXJzOiBbXG5cdCAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxuXHQgICAgICAgIF1cblx0ICAgIH0sIFxuXHRcdHsgXHRcblx0XHRcdC8vZG9uJ3Qgc2hvdyBsb2NhbCByb2FkIGxhYmxlcyBvbiB0aGUgbWFwXG5cdFx0XHRmZWF0dXJlVHlwZTogXCJyb2FkLmxvY2FsXCIsIFxuXHRcdFx0ZWxlbWVudFR5cGU6IFwibGFiZWxzLmljb25cIiwgXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHt2aXNpYmlsaXR5OiBcIm9mZlwifSBcblx0XHRcdF0gXG5cdFx0fSxcblx0XHR7IFxuXHRcdFx0Ly9kb24ndCBzaG93IGFydGVyaWFsIHJvYWQgbGFibGVzIG9uIHRoZSBtYXBcblx0XHRcdGZlYXR1cmVUeXBlOiBcInJvYWQuYXJ0ZXJpYWxcIiwgXG5cdFx0XHRlbGVtZW50VHlwZTogXCJsYWJlbHMuaWNvblwiLCBcblx0XHRcdHN0eWxlcnM6IFtcblx0XHRcdFx0e3Zpc2liaWxpdHk6IFwib2ZmXCJ9XG5cdFx0XHRdIFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0Ly9kb24ndCBzaG93IHJvYWQgbGFibGVzIG9uIHRoZSBtYXBcblx0XHRcdGZlYXR1cmVUeXBlOiBcInJvYWRcIixcblx0XHRcdGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuXHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHR7dmlzaWJpbGl0eTogXCJvZmZcIn1cblx0XHRcdF1cblx0XHR9LCBcblx0XHQvL3N0eWxlIGRpZmZlcmVudCBlbGVtZW50cyBvbiB0aGUgbWFwXG5cdFx0eyBcblx0XHRcdGZlYXR1cmVUeXBlOiBcInRyYW5zaXRcIiwgXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsIFxuXHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHR7IGh1ZTogbWFpbl9jb2xvciB9LFxuXHRcdFx0XHR7IHZpc2liaWxpdHk6IFwib25cIiB9LCBcblx0XHRcdFx0eyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSwgXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XG5cdFx0XHRdXG5cdFx0fSwgXG5cdFx0e1xuXHRcdFx0ZmVhdHVyZVR5cGU6IFwicG9pXCIsXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHsgaHVlOiBtYWluX2NvbG9yIH0sXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxuXHRcdFx0XHR7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LCBcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaS5nb3Zlcm5tZW50XCIsXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHsgaHVlOiBtYWluX2NvbG9yIH0sXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxuXHRcdFx0XHR7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LCBcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaS5zcG9ydF9jb21wbGV4XCIsXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHsgaHVlOiBtYWluX2NvbG9yIH0sXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxuXHRcdFx0XHR7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LCBcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaS5hdHRyYWN0aW9uXCIsXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHsgaHVlOiBtYWluX2NvbG9yIH0sXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxuXHRcdFx0XHR7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LCBcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaS5idXNpbmVzc1wiLFxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuXHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHR7IGh1ZTogbWFpbl9jb2xvciB9LFxuXHRcdFx0XHR7IHZpc2liaWxpdHk6IFwib25cIiB9LCBcblx0XHRcdFx0eyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSwgXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRmZWF0dXJlVHlwZTogXCJ0cmFuc2l0XCIsXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHsgaHVlOiBtYWluX2NvbG9yIH0sXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxuXHRcdFx0XHR7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LCBcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGZlYXR1cmVUeXBlOiBcInRyYW5zaXQuc3RhdGlvblwiLFxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuXHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHR7IGh1ZTogbWFpbl9jb2xvciB9LFxuXHRcdFx0XHR7IHZpc2liaWxpdHk6IFwib25cIiB9LCBcblx0XHRcdFx0eyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSwgXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGVcIixcblx0XHRcdHN0eWxlcnM6IFtcblx0XHRcdFx0eyBodWU6IG1haW5fY29sb3IgfSxcblx0XHRcdFx0eyB2aXNpYmlsaXR5OiBcIm9uXCIgfSwgXG5cdFx0XHRcdHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sIFxuXHRcdFx0XHR7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxuXHRcdFx0XVxuXHRcdFx0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRmZWF0dXJlVHlwZTogXCJyb2FkXCIsXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHsgaHVlOiBtYWluX2NvbG9yIH0sXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxuXHRcdFx0XHR7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LCBcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGZlYXR1cmVUeXBlOiBcInJvYWQuaGlnaHdheVwiLFxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuXHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHR7IGh1ZTogbWFpbl9jb2xvciB9LFxuXHRcdFx0XHR7IHZpc2liaWxpdHk6IFwib25cIiB9LCBcblx0XHRcdFx0eyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSwgXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XG5cdFx0XHRdXG5cdFx0fSwgXG5cdFx0e1xuXHRcdFx0ZmVhdHVyZVR5cGU6IFwid2F0ZXJcIixcblx0XHRcdGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5XCIsXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHsgaHVlOiBtYWluX2NvbG9yIH0sXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxuXHRcdFx0XHR7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LCBcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cblx0XHRcdF1cblx0XHR9XG5cdF07XG5cdFx0XG5cdC8vc2V0IGdvb2dsZSBtYXAgb3B0aW9uc1xuXHR2YXIgbWFwX29wdGlvbnMgPSB7XG4gICAgICBcdGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXRpdHVkZSwgbG9uZ2l0dWRlKSxcbiAgICAgIFx0em9vbTogbWFwX3pvb20sXG4gICAgICBcdHBhbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgXHR6b29tQ29udHJvbDogZmFsc2UsXG4gICAgICBcdG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgIFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuICAgICAgXHRtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgXHRzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICBcdHN0eWxlczogc3R5bGUsXG4gICAgfVxuICAgIC8vaW5pemlhbGl6ZSB0aGUgbWFwXG5cdHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29nbGUtY29udGFpbmVyJyksIG1hcF9vcHRpb25zKTtcblx0Ly9hZGQgYSBjdXN0b20gbWFya2VyIHRvIHRoZSBtYXBcdFx0XHRcdFxuXHR2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdCAgXHRwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXRpdHVkZSwgbG9uZ2l0dWRlKSxcblx0ICAgIG1hcDogbWFwLFxuXHQgICAgdmlzaWJsZTogdHJ1ZSxcblx0IFx0aWNvbjogbWFya2VyX3VybCxcblx0fSk7XG5cblx0dmFyIG1hcmtlcjIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0ICBcdHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdGl0dWRlMiwgbG9uZ2l0dWRlMiksXG5cdCAgICBtYXA6IG1hcCxcblx0ICAgIHZpc2libGU6IHRydWUsXG5cdCBcdGljb246IG1hcmtlcl91cmwsXG5cdH0pO1xuXG5cdC8vYWRkIGN1c3RvbSBidXR0b25zIGZvciB0aGUgem9vbS1pbi96b29tLW91dCBvbiB0aGUgbWFwXG5cdGZ1bmN0aW9uIEN1c3RvbVpvb21Db250cm9sKGNvbnRyb2xEaXYsIG1hcCkge1xuXHRcdC8vZ3JhcCB0aGUgem9vbSBlbGVtZW50cyBmcm9tIHRoZSBET00gYW5kIGluc2VydCB0aGVtIGluIHRoZSBtYXAgXG5cdCAgXHR2YXIgY29udHJvbFVJem9vbUluPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Qtem9vbS1pbicpLFxuXHQgIFx0XHRjb250cm9sVUl6b29tT3V0PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Qtem9vbS1vdXQnKTtcblx0ICBcdGNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQoY29udHJvbFVJem9vbUluKTtcblx0ICBcdGNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQoY29udHJvbFVJem9vbU91dCk7XG5cblx0XHQvLyBTZXR1cCB0aGUgY2xpY2sgZXZlbnQgbGlzdGVuZXJzIGFuZCB6b29tLWluIG9yIG91dCBhY2NvcmRpbmcgdG8gdGhlIGNsaWNrZWQgZWxlbWVudFxuXHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKGNvbnRyb2xVSXpvb21JbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0ICAgIG1hcC5zZXRab29tKG1hcC5nZXRab29tKCkrMSlcblx0XHR9KTtcblx0XHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihjb250cm9sVUl6b29tT3V0LCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHQgICAgbWFwLnNldFpvb20obWFwLmdldFpvb20oKS0xKVxuXHRcdH0pO1xuXHR9XG5cblx0dmFyIHpvb21Db250cm9sRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gXHR2YXIgem9vbUNvbnRyb2wgPSBuZXcgQ3VzdG9tWm9vbUNvbnRyb2woem9vbUNvbnRyb2xEaXYsIG1hcCk7XG5cbiAgXHQvL2luc2VydCB0aGUgem9vbSBkaXYgb24gdGhlIHRvcCBsZWZ0IG9mIHRoZSBtYXBcbiAgXHRtYXAuY29udHJvbHNbZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLkxFRlRfVE9QXS5wdXNoKHpvb21Db250cm9sRGl2KTsiLCJmdW5jdGlvbiBtZW51KCkge1xuXHR2YXIgc2Vjb25kYXJ5TmF2ID0gJCgnLmNkLXNlY29uZGFyeS1uYXYnKSxcblx0XHRzZWNvbmRhcnlOYXZUb3BQb3NpdGlvbiA9IHNlY29uZGFyeU5hdi5vZmZzZXQoKS50b3AsXG5cdFx0dGFnbGluZU9mZmVzZXRUb3AgPSAkKCcjY2QtaW50cm8tdGFnbGluZScpLm9mZnNldCgpLnRvcCArICQoJyNjZC1pbnRyby10YWdsaW5lJykuaGVpZ2h0KCkgKyBwYXJzZUludCgkKCcjY2QtaW50cm8tdGFnbGluZScpLmNzcygncGFkZGluZ1RvcCcpLnJlcGxhY2UoJ3B4JywgJycpKSxcblx0XHRjb250ZW50U2VjdGlvbnMgPSAkKCcuY2Qtc2VjdGlvbicpO1xuXHRcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuXHRcdC8vb24gZGVza3RvcCAtIGFzc2lnbiBhIHBvc2l0aW9uIGZpeGVkIHRvIGxvZ28gYW5kIGFjdGlvbiBidXR0b24gYW5kIG1vdmUgdGhlbSBvdXRzaWRlIHRoZSB2aWV3cG9ydFxuXHRcdCggJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gdGFnbGluZU9mZmVzZXRUb3AgKSA/ICQoJyNjZC1sb2dvLCAuY2QtYnRuJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpIDogJCgnI2NkLWxvZ28sIC5jZC1idG4nKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XG5cdFx0XG5cdFx0Ly9vbiBkZXNrdG9wIC0gZml4IHNlY29uZGFyeSBuYXZpZ2F0aW9uIG9uIHNjcm9sbGluZ1xuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNlY29uZGFyeU5hdlRvcFBvc2l0aW9uICkge1xuXHRcdFx0Ly9maXggc2Vjb25kYXJ5IG5hdmlnYXRpb25cblx0XHRcdHNlY29uZGFyeU5hdi5hZGRDbGFzcygnaXMtZml4ZWQnKTtcblx0XHRcdC8vcHVzaCB0aGUgLmNkLW1haW4tY29udGVudCBnaXZpbmcgaXQgYSB0b3AtbWFyZ2luXG5cdFx0XHQkKCcuY2QtbWFpbi1jb250ZW50JykuYWRkQ2xhc3MoJ2hhcy10b3AtbWFyZ2luJyk7XHRcblx0XHRcdC8vb24gRmlyZWZveCBDU1MgdHJhbnNpdGlvbi9hbmltYXRpb24gZmFpbHMgd2hlbiBwYXJlbnQgZWxlbWVudCBjaGFuZ2VzIHBvc2l0aW9uIGF0dHJpYnV0ZVxuXHRcdFx0Ly9zbyB3ZSB0byBjaGFuZ2Ugc2Vjb25kYXJ5IG5hdmlnYXRpb24gY2hpbGRyZW5zIGF0dHJpYnV0ZXMgYWZ0ZXIgaGF2aW5nIGNoYW5nZWQgaXRzIHBvc2l0aW9uIHZhbHVlXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICBzZWNvbmRhcnlOYXYuYWRkQ2xhc3MoJ2FuaW1hdGUtY2hpbGRyZW4nKTtcblx0ICAgICAgICAgICAgJCgnI2NkLWxvZ28nKS5hZGRDbGFzcygnc2xpZGUtaW4nKTtcblx0ICAgICAgICAgICAgJCgnLmhlYWRlci1sb2dvJykuYWRkQ2xhc3MoJ3NsaWRlLWluJyk7XG5cdFx0XHRcdCQoJy5jZC1idG4nKS5hZGRDbGFzcygnc2xpZGUtaW4nKTtcblx0ICAgICAgICB9LCA1MCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlY29uZGFyeU5hdi5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcblx0XHRcdCQoJy5jZC1tYWluLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGFzLXRvcC1tYXJnaW4nKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHNlY29uZGFyeU5hdi5yZW1vdmVDbGFzcygnYW5pbWF0ZS1jaGlsZHJlbicpO1xuXHQgICAgICAgICAgICAkKCcjY2QtbG9nbycpLnJlbW92ZUNsYXNzKCdzbGlkZS1pbicpO1xuXHQgICAgICAgICAgICAkKCcuaGVhZGVyLWxvZ28nKS5yZW1vdmVDbGFzcygnc2xpZGUtaW4nKTtcblx0XHRcdFx0JCgnLmNkLWJ0bicpLnJlbW92ZUNsYXNzKCdzbGlkZS1pbicpO1xuXHQgICAgICAgIH0sIDUwKTtcblx0XHR9XG5cblx0XHQvL29uIGRlc2t0b3AgLSB1cGRhdGUgdGhlIGFjdGl2ZSBsaW5rIGluIHRoZSBzZWNvbmRhcnkgZml4ZWQgbmF2aWdhdGlvblxuXHRcdHVwZGF0ZVNlY29uZGFyeU5hdmlnYXRpb24oKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gdXBkYXRlU2Vjb25kYXJ5TmF2aWdhdGlvbigpIHtcblx0XHRjb250ZW50U2VjdGlvbnMuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFjdHVhbCA9ICQodGhpcyksXG5cdFx0XHRcdGFjdHVhbEhlaWdodCA9IGFjdHVhbC5oZWlnaHQoKSArIHBhcnNlSW50KGFjdHVhbC5jc3MoJ3BhZGRpbmdUb3AnKS5yZXBsYWNlKCdweCcsICcnKSkgKyBwYXJzZUludChhY3R1YWwuY3NzKCdwYWRkaW5nQm90dG9tJykucmVwbGFjZSgncHgnLCAnJykpLFxuXHRcdFx0XHRhY3R1YWxBbmNob3IgPSBzZWNvbmRhcnlOYXYuZmluZCgnYVtocmVmPVwiIycrYWN0dWFsLmF0dHIoJ2lkJykrJ1wiXScpO1xuXHRcdFx0aWYgKCAoIGFjdHVhbC5vZmZzZXQoKS50b3AgLSBzZWNvbmRhcnlOYXYuaGVpZ2h0KCkgPD0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICkgJiYgKCBhY3R1YWwub2Zmc2V0KCkudG9wICsgIGFjdHVhbEhlaWdodCAtIHNlY29uZGFyeU5hdi5oZWlnaHQoKSA+ICQod2luZG93KS5zY3JvbGxUb3AoKSApICkge1xuXHRcdFx0XHRhY3R1YWxBbmNob3IuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRhY3R1YWxBbmNob3IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9vbiBtb2JpbGUgLSBvcGVuL2Nsb3NlIHNlY29uZGFyeSBuYXZpZ2F0aW9uIGNsaWNraW5nL3RhcHBpbmcgdGhlIC5jZC1zZWNvbmRhcnktbmF2LXRyaWdnZXJcblx0JCgnLmNkLXNlY29uZGFyeS1uYXYtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ21lbnUtaXMtb3BlbicpO1xuXHRcdHNlY29uZGFyeU5hdi5maW5kKCd1bCcpLnRvZ2dsZUNsYXNzKCdpcy12aXNpYmxlJyk7XG5cdH0pO1xuXG5cdC8vc21vb3RoIHNjcm9sbGluZyB3aGVuIGNsaWNraW5nIG9uIHRoZSBzZWNvbmRhcnkgbmF2aWdhdGlvbiBpdGVtc1xuXHRzZWNvbmRhcnlOYXYuZmluZCgndWwgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHRhcmdldD0gJCh0aGlzLmhhc2gpO1xuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgXHQnc2Nyb2xsVG9wJzogdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIHNlY29uZGFyeU5hdi5oZWlnaHQoKSArIDFcbiAgICAgICAgXHR9LCA0MDBcbiAgICAgICAgKTsgXG4gICAgICAgIC8vb24gbW9iaWxlIC0gY2xvc2Ugc2Vjb25kYXJ5IG5hdmlnYXRpb25cbiAgICAgICAgJCgnLmNkLXNlY29uZGFyeS1uYXYtdHJpZ2dlcicpLnJlbW92ZUNsYXNzKCdtZW51LWlzLW9wZW4nKTtcbiAgICAgICAgc2Vjb25kYXJ5TmF2LmZpbmQoJ3VsJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICB9KTtcblxuICAgIC8vb24gbW9iaWxlIC0gb3Blbi9jbG9zZSBwcmltYXJ5IG5hdmlnYXRpb24gY2xpY2tpbmcvdGFwcGluZyB0aGUgbWVudSBpY29uXG5cdCQoJy5jZC1wcmltYXJ5LW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRpZigkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wcmltYXJ5LW5hdicpKSAkKHRoaXMpLmNoaWxkcmVuKCd1bCcpLnRvZ2dsZUNsYXNzKCdpcy12aXNpYmxlJyk7XG5cdH0pO1xufVxuIiwiLy9cbi8vIHRha2VuIGZyb20gdGhpcyBhcnRpY2xlXG4vLyBodHRwOi8vd3d3Lm94eWdlbm5hLmNvbS90dXRvcmlhbHMvc2Nyb2xsLWFuaW1hdGlvbnMtdXNpbmctd2F5cG9pbnRzLWpzLWFuaW1hdGUtY3NzXG4vLyBiaWcgdXAgdG8gdGhlIGF1dGhvcnMgZm9yIG5pY2UgYW5kIGVhc3kgaW1wbGVtZW5hdGlvbiBvZiBhbmltYXRpb25zIVxuXG5mdW5jdGlvbiBvblNjcm9sbEluaXQoIGl0ZW1zLCB0cmlnZ2VyICkge1xuICBpdGVtcy5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3NFbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgb3NBbmltYXRpb25DbGFzcyA9IG9zRWxlbWVudC5hdHRyKCdkYXRhLW9zLWFuaW1hdGlvbicpLFxuICAgICAgICBvc0FuaW1hdGlvbkRlbGF5ID0gb3NFbGVtZW50LmF0dHIoJ2RhdGEtb3MtYW5pbWF0aW9uLWRlbGF5JylcbiAgICAgICAgdmFyIHNjcmVlblNpemUgPSAkKHdpbmRvdykud2lkdGgoKTsgICAgXG4gICAgXG5cblxuICAgIGlmIChNb2Rlcm5penIudG91Y2gpIHtcblxuICAgICAgICAvLyBubyBkZWxheSBvbiB0b3VjaCBkZXZpY2VzIChhc3N1bWUgaXQncyBtb2JpbGUpXG4gICAgICAgIG9zRWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWRlbGF5JzogIDAsXG4gICAgICAgICAgICAnLW1vei1hbmltYXRpb24tZGVsYXknOiAgICAgMCxcbiAgICAgICAgICAgICdhbmltYXRpb24tZGVsYXknOiAgICAgICAgICAwXG4gICAgICAgIH0pO1xuXG4gICAgfSBpZiAoc2NyZWVuU2l6ZSA8IDc2OCkgeyBcblxuICAgICAgICAvLyBubyBkZWxheSBvbiBzbWFsbGVyIHNjcmVlbnNcbiAgICAgICAgb3NFbGVtZW50LmNzcyh7XG4gICAgICAgICAgICAnLXdlYmtpdC1hbmltYXRpb24tZGVsYXknOiAgMCxcbiAgICAgICAgICAgICctbW96LWFuaW1hdGlvbi1kZWxheSc6ICAgICAwLFxuICAgICAgICAgICAgJ2FuaW1hdGlvbi1kZWxheSc6ICAgICAgICAgIDBcbiAgICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIG9zRWxlbWVudC5jc3Moe1xuICAgICAgICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWRlbGF5JzogIG9zQW5pbWF0aW9uRGVsYXksXG4gICAgICAgICAgICAnLW1vei1hbmltYXRpb24tZGVsYXknOiAgICAgb3NBbmltYXRpb25EZWxheSxcbiAgICAgICAgICAgICdhbmltYXRpb24tZGVsYXknOiAgICAgICAgICBvc0FuaW1hdGlvbkRlbGF5XG4gICAgICAgIH0pO1xuICAgIFxuICAgIH07XG5cblxuIFxuICAgIHZhciBvc1RyaWdnZXIgPSAoIHRyaWdnZXIgKSA/IHRyaWdnZXIgOiBvc0VsZW1lbnQ7XG4gXG4gICAgb3NUcmlnZ2VyLndheXBvaW50KGZ1bmN0aW9uKCkge1xuICAgICAgICBvc0VsZW1lbnQuYWRkQ2xhc3MoJ2FuaW1hdGVkJykuYWRkQ2xhc3Mob3NBbmltYXRpb25DbGFzcyk7XG4gICAgfSx7XG4gICAgICAgIHRyaWdnZXJPbmNlOiB0cnVlLFxuICAgICAgICBvZmZzZXQ6ICc5MCUnXG4gICAgfSk7XG4gIH0pO1xufSIsImZ1bmN0aW9uIHNtYXJ0VmltZW8oKSB7XG5cbiAgICB2YXIgdmltZW9Ib29rID0gJCgnLnZpbWVvLXBsYXllcicpO1xuICAgIHZhciBvdmVybGF5SG9vayA9ICQoJy52aWRlby1lbWJlZF9fb3ZlcmxheScpO1xuXG4gICAgdmltZW9Ib29rLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHZpbWVvUGxheWVyID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIHZpbWVvSUQgPSB2aW1lb1BsYXllci5kYXRhKCd2aW1lby1pZCcpO1xuICAgICAgICBcblxuICAgICAgICAvLyBmZXRjaCBKU09OIGRhdGEgZnJvbSBWaW1lb1xuICAgICAgICAkLmdldEpTT04oJ2h0dHA6Ly92aW1lby5jb20vYXBpL3YyL3ZpZGVvLycrdmltZW9JRCsnLmpzb24/Y2FsbGJhY2s9PycsIGZ1bmN0aW9uKGpzb24pIHsgIFxuXG4gICAgICAgICAgICAvLyBzdG9yZSByZXR1cm5lZCBkYXRvIGludG8gdmFyaWFibGVzXG4gICAgICAgICAgICB2aWRlb0RhdGEgPSBqc29uWzBdO1xuICAgICAgICAgICAgdmlkZW9UaHVtYlVSTCA9IHZpZGVvRGF0YS50aHVtYm5haWxfbGFyZ2U7IC8vIDY0MHg0ODBcbiAgICAgICAgICAgIHZpZGVvVGl0bGUgPSB2aWRlb0RhdGEudGl0bGU7XG4gICAgICAgICAgICB2aWRlb1RhZ3MgPSB2aWRlb0RhdGEudGFncztcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGluamVjdCBmdW5jdGlvblxuICAgICAgICAgICAgaW5qZWN0VmlkZW9EYXRhKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgXG5cbiAgICAgICAgZnVuY3Rpb24gaW5qZWN0VmlkZW9EYXRhKCkge1xuICAgICAgICAgICAgdmltZW9QbGF5ZXIuYXR0cignc3JjJywgdmlkZW9UaHVtYlVSTCk7XG4gICAgICAgICAgICB2aW1lb1BsYXllci5hdHRyKCd0aXRsZScsIHZpZGVvVGl0bGUpO1xuICAgICAgICAgICAgdmltZW9QbGF5ZXIuYXR0cignYWx0JywgdmlkZW9UYWdzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBpbnNlcnRWaW1lb1ZpZGVvKCkge1xuXG4gICAgICAgICAgICBvdmVybGF5SG9vay5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaHRtbCgnPGlmcmFtZSBzcmM9XCJodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vJyskKHRoaXMpLnNpYmxpbmdzKCcudmltZW8tcGxheWVyJykuZGF0YSgndmltZW8taWQnKSsnP3BvcnRyYWl0PTAmdGl0bGU9MCZjb2xvcj1iZjFmNDgmYmFkZ2U9MCZieWxpbmU9MCZhdXRvcGxheT0xXCIgZnJhbWVib3JkZXI9XCIwXCIgd2Via2l0QWxsb3dGdWxsU2NyZWVuIG1vemFsbG93ZnVsbHNjcmVlbiBhbGxvd0Z1bGxTY3JlZW4+PC9pZnJhbWU+Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRyaWdnZXIgdmlkZW8gZnVuY3Rpb25cbiAgICAgICAgaW5zZXJ0VmltZW9WaWRlbygpO1xuXG4gICAgfSk7XG5cbn07XG5cblxuXG5cblxuIiwiZnVuY3Rpb24gdGFicygpIHtcblxuXG5cdGZ1bmN0aW9uIGNoZWNrU3RlcCgpIHtcblx0XHRcblx0XHR2YXIgdGFicyA9ICQoJ3VsLnRhYnMnKTtcblxuXG5cdFx0aWYgKCAkKCd1bC50YWJzIGxpOm50aC1vZi10eXBlKDEpJykuaGFzQ2xhc3MoJ2N1cnJlbnQnKSAgKSB7XG5cdFx0XHR0YWJzLmFkZENsYXNzKCdzdGVwMScpO1xuXHRcdFx0dGFicy5yZW1vdmVDbGFzcygnc3RlcDInKTtcblx0XHRcdHRhYnMucmVtb3ZlQ2xhc3MoJ3N0ZXAzJyk7XG5cdFx0XHR0YWJzLnJlbW92ZUNsYXNzKCdzdGVwNCcpO1xuXHRcdH0gXG5cblx0XHRpZiAoICQoJ3VsLnRhYnMgbGk6bnRoLW9mLXR5cGUoMiknKS5oYXNDbGFzcygnY3VycmVudCcpICApIHtcblx0XHRcdHRhYnMuYWRkQ2xhc3MoJ3N0ZXAyJyk7XG5cdFx0XHR0YWJzLnJlbW92ZUNsYXNzKCdzdGVwMScpO1xuXHRcdFx0dGFicy5yZW1vdmVDbGFzcygnc3RlcDMnKTtcblx0XHRcdHRhYnMucmVtb3ZlQ2xhc3MoJ3N0ZXA0Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKCAkKCd1bC50YWJzIGxpOm50aC1vZi10eXBlKDMpJykuaGFzQ2xhc3MoJ2N1cnJlbnQnKSAgKSB7XG5cdFx0XHR0YWJzLmFkZENsYXNzKCdzdGVwMycpO1xuXHRcdFx0dGFicy5yZW1vdmVDbGFzcygnc3RlcDEnKTtcblx0XHRcdHRhYnMucmVtb3ZlQ2xhc3MoJ3N0ZXAyJyk7XG5cdFx0XHR0YWJzLnJlbW92ZUNsYXNzKCdzdGVwNCcpO1xuXHRcdH1cblxuXHRcdGlmICggJCgndWwudGFicyBsaTpudGgtb2YtdHlwZSg0KScpLmhhc0NsYXNzKCdjdXJyZW50JykgICkge1xuXHRcdFx0dGFicy5hZGRDbGFzcygnc3RlcDQnKTtcblx0XHRcdHRhYnMucmVtb3ZlQ2xhc3MoJ3N0ZXAxJyk7XG5cdFx0XHR0YWJzLnJlbW92ZUNsYXNzKCdzdGVwMicpO1xuXHRcdFx0dGFicy5yZW1vdmVDbGFzcygnc3RlcDMnKTtcblx0XHR9XG5cblxuXHR9XG5cblx0XG5cdGNoZWNrU3RlcCgpOyAvLyBpbml0aWFsIHN0ZXAgY2hlY2tcblxuXG5cdCQoJ3VsLnRhYnMgbGknKS5jbGljayhmdW5jdGlvbigpe1xuXG5cblx0XHR2YXIgdGFiX2lkID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRhYicpO1xuXG5cdFx0JCgndWwudGFicyBsaScpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLnRhYl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG5cblx0XHQkKHRoaXMpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLnRhYl9fdGl0bGUgc3BhbiBzcGFuJykuYWRkQ2xhc3MoJ2ZsaXBJblgnKTtcblx0XHQkKCcudGFiX19ib2R5JykuYWRkQ2xhc3MoJ2ZhZGVJbicpO1xuXHRcdCQoXCIjXCIrdGFiX2lkKS5hZGRDbGFzcygnY3VycmVudCcpO1xuXHRcdFxuXG5cdFx0Y2hlY2tTdGVwKCk7XG5cdH0pXG5cbn1cblxuIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cblxuXHQvLyBtYWtlcyB2aCB3b3JrIHByb3Blcmx5IGluIGlPUyBTYWZhcmkgYW5kIG90aGVyIG1vYmlsZSBicm93c2Vyc1xuXHR2aWV3cG9ydFVuaXRzQnVnZ3lmaWxsLmluaXQoKTtcblxuXG5cdC8vIGluaXRpYWxpemUgY3VzdG9tIGZ1bmN0aW9uc1xuXHRtZW51KCk7XG5cdHRhYnMoKTtcblx0c21hcnRWaW1lbygpO1xuXHRmbG9hdGluZ0xhYmVscygpO1xuXHRjb250YWN0Rm9ybSgpO1xuXG5cblx0Ly8gYWN0aXZldGVzIG9uIHNjcm9sbCBhbmltYXRpb25zXG5cdC8vIGFuaW1hdGlvbiBzZXR0aW5nIHRocm91Z2h0IEhUTUwgZGF0YS0gYXR0cmlidXRlc1xuXHQvLyBzZWUgX3Njcm9sbC1hbmltYXRpb25zLmpzIGZvciBtb3JlIGluZm9cblx0b25TY3JvbGxJbml0KCAkKCcub3MtYW5pbWF0aW9uJykgKTtcblxuXG5cblx0Ly8gaGFja3kgd2F5IHRvIGdldCBzbW9vdGggc2Nyb2xsIHdoZW4gY2xpY2tpbmcgYSBsaW5rIGluIC5jYWxsLXRvLWFjdGlvblxuXHQkKCcuY2FsbC10by1hY3Rpb24gYVtocmVmKj0jXTpub3QoW2hyZWY9I10pJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cblx0XHR2YXIgc2Vjb25kYXJ5TmF2ID0gJCgnLmNkLXNlY29uZGFyeS1uYXYnKTtcblxuXHRcdGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuXHRcdFx0dmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcblx0XHRcdHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuXHRcdFx0aWYgKHRhcmdldC5sZW5ndGgpIHtcblx0XHRcdFx0JCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0c2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gc2Vjb25kYXJ5TmF2LmhlaWdodCgpICsgMVxuXHRcdFx0XHR9LCA4MDApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblx0XG5cblxuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
