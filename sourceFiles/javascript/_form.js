
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