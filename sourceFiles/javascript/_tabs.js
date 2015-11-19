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

