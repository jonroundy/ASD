$(function(){
	//site code
	
	//$("[data-role=header]").fixedtoolbar({ tapToggle: false }); //Fix for header toggle
	//$("[data-role=footer]").fixedtoolbar({ tapToggle: false }); //Fix for footer toggle
	
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
	
	/*	//delete $.validator.methods.date;
		var myform = $('#woForm'),
			errorslink= $('#woerrorslink')
		;
		
		myform.validate({
			invalidHandler: function(form, validator){
				errorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
					var cleanString = html.replace(/[:]/g, ""); //Removes all instances of
				};
				$("#workOrderErrors ul").html(cleanString, html)
				//$("#taskFormErrors p").blink();
		
			},
			submitHandler: function() {
				var data = myform.serializeArray();
				storeData(this.key);
			}
});//End of myform.
*/
}); // addWorkorder end

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var storeData = function(key){
			if(!key){
			var id					= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ky that's been passed along from the editSubmit event handler
			//To the validate function, and then passed here, into the storeData function.
			id = key;
		}
			//Gather up all our form field values and store in an object.
			//Object properties are going to contain array with the form label and input value
			getCheckboxVault();
		var item					= {};
			item.cats				= ["OEM List: ", $("#oemList").value];
			item.devicelst			= ["Device List: ", $("#deviceList").value];
			item.serial		    	= ["Serial: ", $("#serial").value];
			item.cname		    	= ["Customer Name: ", $("#custName").value];
			item.address		    = ["Street Address: ", $("#address").value];
			item.city			    = ["City: ", $("#city").value];
			item.state 			    = ["State: ", $("#stateList").value];
			item.zipcode		    = ["Zipcode: ", $("#zipcode").value];
			item.date				= ["Date: ", $("date").value];
			item.urgent				= ["Urgent: ", urgentValue];
			item.esttime			= ["Estimated Time.", $("esttime").value];
			item.textbox			= ["Notes: ", $("textbox").value];
			//Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
			//Save form elements into LS
			localStorage.setItem(id, JSON.stringify(item));
			console.log(storeData);
			alert("Task Saved!");
		loadPage();
		
	};
