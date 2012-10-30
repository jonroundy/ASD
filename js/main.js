$(function(){
	//site code
	
	var menuStatus;
 
    $("a.showMenu").click(function(){
        if(menuStatus != true){
        $(".ui-page-active").animate({
            marginLeft: "165px",
          }, 300, function(){menuStatus = true});
          return false;
          } else {
            $(".ui-page-active").animate({
            marginLeft: "0px",
          }, 300, function(){menuStatus = false});
            return false;
          }
    });
 
    $('.pages').live("swipeleft", function(){
        if (menuStatus){
        $(".ui-page-active").animate({
            marginLeft: "0px",
          }, 300, function(){menuStatus = false});
          }
    });
 
    $('.pages').live("swiperight", function(){
        if (!menuStatus){
        $(".ui-page-active").animate({
            marginLeft: "165px",
          }, 300, function(){menuStatus = true});
          }
    });
 
    $("#menu li a").click(function(){
        var p = $(this).parent();
        if($(p).hasClass('active')){
            $("#menu li").removeClass('active');
        } else {
            $("#menu li").removeClass('active');
            $(p).addClass('active');
        }
    });//Slide Menu
});

$('#home').on('pageinit', function(){
	//code needed for main page goes here
});	

$('#addWorkorder').on('pageinit', function(){		
		var fErrorslink = $('#fErrorsLink');
		
		$('#workOrderForm').validate({
			invalidHandler: function(form, validator){
				//$(".label.error").appendTo("#formErrors");
				
				fErrorsLink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
					var cleanString = html.replace(/[:]/g, ""); //Removes all instances of :

				};
				$("#formErrors ul").html(cleanString, html)
				//$("#taskFormErrors p").blink();
		
			},
			submitHandler: function() {
				$('#workOrderForm').serializeArray();
				storeData(this.key);
			}
		});//End of myform. 


}); // End of addWorkorder





/*
$("#workOrderForm").validate(function(){

}); // Validation for form
*/
var storeData = function(key){
			if(!key){
			var id					= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ky that's been passed along from the editSubmit event handler
			//To the validate function, and then passed here, into the storeData function.
			id = key;
		};
			if($("input[name='urgent']").is(':checked')) {
				$('#urgent').val("Yes");
			} else {
				$('#urgent').val("No");
		};
			//Gather up all our form field values and store in an object.
			//Object properties are going to contain array with the form label and input value
		var item					= {};
		item.oem					= ["OEM List: ", $('#oemList').val()];
		item.device					= ["Device: ", $('#deviceList').val()];
		item.serial					= ["Serial / Service Tag: ", $('#serial').val()];
		item.custName				= ["Customer Name: ", $('#custName').val()];
		item.address				= ["Address: ", $('#address').val()];
		item.city					= ["City: ", $('#city').val()];
		item.state					= ["State: ", $('#stateList').val()];
		item.zipcode				= ["Zipcode: ", $('#zipcode').val()];
		item.date					= ["Date: ", $('#date').val()];
		item.esttime			 	= ["Estimated Repair Time: ", $('#esttime').val()];
		item.urgent					= ["Work order UGRENT? ", $('#urgent').val()];
		item.textbox			 	= ["Notes: ", $('#textbox').val()];
		console.log($('#urgent'));

			//Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
			//Save form elements into LS
			localStorage.setItem(id, JSON.stringify(item));
			alert("Task Saved!");
			console.log(item);
			window.location.reload(); 
		//loadPage();
		//letsr();
		console.log("id", id);
		

}; //End of storeData.



$("#clear").click(function() {
  		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{	
			var ask = confirm("Are you sure you want to clear LocalStorage?");
			if(ask){
				localStorage.clear();
				alert("LocalStorage has been cleared!");
				window.location.reload();
		}
		return false;
	}

});
